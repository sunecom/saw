import { NextResponse } from "next/server";
import * as lark from "@larksuiteoapi/node-sdk";
import { z } from "zod";
import "dotenv/config";

const MAX_REQUESTS_PER_HOUR = 10;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_HOUR) return false;
  record.count++;
  return true;
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function buildRedirectUrl(request: Request, path: string): URL {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || new URL(request.url).host;
  const proto = request.headers.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "");
  return new URL(`${proto}://${host}${path}`);
}

function normalizeArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v as string[];
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

const leadSchema = z.object({
  name: z.string().min(1, "姓名不能为空").max(50, "姓名不能超过 50 字"),
  company: z.string().max(100, "公司名称不能超过 100 字").optional().default(""),
  email: z.string().email("邮箱格式不正确").max(100),
  phone: z.string().regex(/^$|^1[3-9]\d{9}$/, "手机号格式不正确").optional().default(""),
  projectType: z.union([z.string(), z.array(z.string())]).optional(),
  location: z.string().max(100, "地点不能超过 100 字").optional().default(""),
  scale: z.string().max(50, "规模不能超过 50 字").optional().default(""),
  stage: z.string().max(50).optional().default(""),
  materials: z.union([z.string(), z.array(z.string())]).optional(),
  description: z.string().max(2000, "描述不能超过 2000 字").optional().default(""),
  consent: z.literal("true", { message: "请先阅读并同意隐私政策" }),
});

type LeadData = z.infer<typeof leadSchema> & {
  projectType: string[];
  materials: string[];
};

const client = new lark.Client({
  appId: process.env.FEISHU_APP_ID || "",
  appSecret: process.env.FEISHU_APP_SECRET || "",
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const accept = request.headers.get("accept") || "";
  const isPlainBrowserPost = accept.includes("text/html");
  const okRedirect = (msg?: string) => {
    const path = msg ? `/programs?status=success&msg=${encodeURIComponent(msg)}` : `/programs?status=success`;
    return NextResponse.redirect(buildRedirectUrl(request, path), 303);
  };
  const errRedirect = (msg: string) =>
    NextResponse.redirect(buildRedirectUrl(request, `/programs?status=error&msg=${encodeURIComponent(msg)}`), 303);
  const okJson = (data: LeadData) =>
    NextResponse.json({ success: true, message: "提交成功，我们将在3个工作日内与您联系", data });
  const errJson = (msg: string, status = 400) =>
    NextResponse.json({ success: false, message: msg }, { status });

  if (!rateLimit(ip)) {
    return isPlainBrowserPost ? errRedirect("提交过于频繁，请稍后再试") : errJson("提交过于频繁，请稍后再试", 429);
  }

  let data: LeadData;
  const ct = (request.headers.get("content-type") || "").toLowerCase();

  try {
    if (ct.startsWith("application/x-www-form-urlencoded") || ct.startsWith("multipart/form-data")) {
      const fd = await request.formData();
      const raw: Record<string, unknown> = {};
      for (const [k, v] of fd.entries()) raw[k] = v;
      const parsed = leadSchema.safeParse(raw);
      if (!parsed.success) {
        const firstMsg = parsed.error.issues[0].message || "输入数据格式错误";
        return isPlainBrowserPost ? errRedirect(firstMsg) : errJson(firstMsg);
      }
      data = { ...parsed.data, projectType: normalizeArray(parsed.data.projectType), materials: normalizeArray(parsed.data.materials) };
    } else {
      const raw = await request.json();
      const parsed = leadSchema.safeParse(raw);
      if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        return errJson(firstError.message || "输入数据格式错误");
      }
      data = { ...parsed.data, projectType: normalizeArray(parsed.data.projectType), materials: normalizeArray(parsed.data.materials) };
    }
  } catch (parseErr) {
    console.error("Parse error:", parseErr);
    return isPlainBrowserPost ? errRedirect("数据解析失败") : errJson("数据解析失败");
  }

  const fields: Record<string, string | number | string[]> = {
    "姓名": data.name,
    "公司": data.company || "",
    "邮箱": data.email,
    "电话": data.phone || "",
    "项目规模": data.scale || "",
    "项目地点": data.location || "",
    "补充说明": data.description || "",
    "IP地址": ip,
    "提交时间": Date.now(),
    "隐私授权时间": Date.now(),
    "线索状态": "新线索",
  };

  if (data.projectType.length > 0) fields["项目类型"] = data.projectType.join(", ");
  if (data.materials.length > 0) fields["已有资料"] = data.materials.join(", ");

  const res = await client.bitable.appTableRecord.create({
    path: {
      app_token: process.env.FEISHU_BITABLE_APP || "",
      table_id: process.env.FEISHU_BITABLE_TABLE || "",
    },
    data: { fields },
  });

  if (res.code !== 0) {
    console.error("Lead submitted to bitable:", res);
    return isPlainBrowserPost ? errRedirect("提交失败，请稍后重试") : errJson("提交失败，请稍后重试", 500);
  }

  const recordId = (res.data?.record && res.data.record.record_id) || "";
  console.log("Lead saved to bitable:", recordId);

  // 发送飞书群通知（非阻塞）
  try {
    const chatId = process.env.FEISHU_NOTIFY_CHAT_ID;
    if (chatId) {
      const notifyText = [
        "🔔 新项目线索",
        "姓名：" + data.name,
        "公司：" + (data.company || "未提供"),
        "邮箱：" + data.email,
        "电话：" + (data.phone || "未提供"),
        "项目规模：" + (data.scale || "未提供"),
        "项目地点：" + (data.location || "未提供"),
        "当前阶段：" + (data.stage || "未提供"),
        "项目类型：" + (data.projectType.length ? data.projectType.join(", ") : "未选择"),
        "已有资料：" + (data.materials.length ? data.materials.join(", ") : "未提供"),
        "补充说明：" + (data.description || "无"),
        "记录 ID：" + recordId,
      ].join(`\n`);
      await client.im.message.create({
        params: { receive_id_type: "chat_id" },
        data: {
          receive_id: chatId,
          msg_type: "text",
          content: JSON.stringify({ text: notifyText }),
        },
      });
      console.log("Lead notified to chat:", chatId);
    }
  } catch (notifyErr) {
    console.error("Notify error (non-fatal):", notifyErr);
  }

  return isPlainBrowserPost ? okRedirect() : okJson(data);
}
