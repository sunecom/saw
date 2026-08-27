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

// Zod Schema 验证
const leadSchema = z.object({
  name: z.string().min(1, "姓名不能为空").max(50, "姓名不能超过 50 字"),
  company: z.string().max(100, "公司名称不能超过 100 字").optional().default(""),
  email: z.string().email("邮箱格式不正确").max(100),
  phone: z.string().regex(/^$|^1[3-9]\d{9}$/, "手机号格式不正确").optional().default(""),
  projectType: z.array(z.string()).optional(),
  location: z.string().max(100, "地点不能超过 100 字").optional().default(""),
  scale: z.string().max(50, "规模不能超过 50 字").optional().default(""),
  stage: z.string().max(50).optional().default(""),
  materials: z.array(z.string()).optional(),
  description: z.string().max(2000, "描述不能超过 2000 字").optional().default(""),
  consent: z.literal("true", { message: "请先阅读并同意隐私政策" }),
});

// 飞书客户端
const client = new lark.Client({
  appId: process.env.FEISHU_APP_ID || "",
  appSecret: process.env.FEISHU_APP_SECRET || "",
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "提交过于频繁，请稍后再试" },
      { status: 429 }
    );
  }

  try {
    const raw = await request.json();
    
    // Zod 验证
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { success: false, message: firstError.message || "输入数据格式错误" },
        { status: 400 }
      );
    }
    const data = parsed.data;
    
    // 写入飞书多维表格
    const fields: Record<string, string | number | string[]> = {
      "姓名": data.name,
      "公司": data.company,
      "邮箱": data.email,
      "电话": data.phone,
      "项目规模": data.scale,
      "项目地点": data.location,
      "补充说明": data.description,
      "IP地址": ip,
      "提交时间": Date.now(),
      "隐私授权时间": Date.now(),
      "线索状态": "新线索",
    };

    // 处理项目类型（多选）
    if (data.projectType && data.projectType.length > 0) {
      fields["项目类型"] = data.projectType.join(", ");
    }

    // 处理已有资料（多选）
    if (data.materials && data.materials.length > 0) {
      fields["已有资料"] = data.materials.join(", ");
    }

    const res = await client.bitable.appTableRecord.create({
      path: {
        app_token: process.env.FEISHU_BITABLE_APP || "",
        table_id: process.env.FEISHU_BITABLE_TABLE || "",
      },
      data: { fields },
    });

    if (res.code !== 0) {
      console.error("Lead submitted to bitable:", res);
      return NextResponse.json(
        { success: false, message: "提交失败，请稍后重试" },
        { status: 500 }
      );
    }

    console.log("Lead saved to bitable:", res.data?.record?.record_id);
    // 发送飞书群通知
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
          "项目类型：" + ((data.projectType && data.projectType.length) ? data.projectType.join(", ") : "未选择"),
          "已有资料：" + ((data.materials && data.materials.length) ? data.materials.join(", ") : "未提供"),
          "补充说明：" + (data.description || "无"),
          "记录 ID：" + (res.data && res.data.record && res.data.record.record_id)
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

    return NextResponse.json({ success: true, message: "提交成功，我们将在3个工作日内与您联系" });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { success: false, message: "提交失败，请稍后重试" },
      { status: 500 }
    );
  }
}
