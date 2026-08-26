import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 确保数据目录存在
    const dataDir = join(process.cwd(), "data", "projects");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    
    // 生成文件名
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const filename = `${timestamp}-${Date.now()}.json`;
    const filepath = join(dataDir, filename);
    
    // 写入文件
    writeFileSync(filepath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, message: "Project submitted" });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { success: false, message: "Submit failed" },
      { status: 500 }
    );
  }
}
