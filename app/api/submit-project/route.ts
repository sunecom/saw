import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const MAX_REQUESTS_PER_HOUR = 10;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  
  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    return false;
  }
  
  record.count++;
  return true;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "提交过于频繁，请稍后再试" },
      { status: 429 }
    );
  }
  
  try {
    const data = await request.json();
    
    const required = ["name", "company", "phone", "email", "role", "type", "stage"];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `缺少必填字段: ${field}` },
          { status: 400 }
        );
      }
    }
    
    if (!validateEmail(data.email)) {
      return NextResponse.json(
        { success: false, message: "邮箱格式不正确" },
        { status: 400 }
      );
    }
    
    if (!validatePhone(data.phone)) {
      return NextResponse.json(
        { success: false, message: "手机号格式不正确" },
        { status: 400 }
      );
    }
    
    const jsonStr = JSON.stringify(data);
    if (jsonStr.length > 10000) {
      return NextResponse.json(
        { success: false, message: "提交数据过大" },
        { status: 413 }
      );
    }
    
    const dataDir = join(process.cwd(), "data", "projects");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    
    const existingFiles = readdirSync(dataDir);
    if (existingFiles.length >= 1000) {
      return NextResponse.json(
        { success: false, message: "线索库已满，请联系管理员" },
        { status: 503 }
      );
    }
    
    const enrichedData = {
      ...data,
      submitted_at: new Date().toISOString(),
      ip_address: ip,
      user_agent: request.headers.get("user-agent"),
      lead_status: "新线索",
      website_version: "V2.1"
    };
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const filename = `${timestamp}-${Date.now()}.json`;
    const filepath = join(dataDir, filename);
    
    writeFileSync(filepath, JSON.stringify(enrichedData, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: "提交成功，我们将在3个工作日内与您联系",
      lead_id: filename.replace(".json", "")
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { success: false, message: "提交失败，请稍后重试" },
      { status: 500 }
    );
  }
}
