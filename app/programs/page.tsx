import type { Metadata } from "next";
import ProjectForm from "./project-form";

export const metadata: Metadata = {
  title: "联合开发与项目提交｜SAW ArrayWright",
  description: "提交光伏项目资料，与 SAW 团队联合开发机器人友好阵列方案。适用于业主、EPC、设计院、设备与支架厂商。",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "联合开发与项目提交｜SAW ArrayWright",
    description: "提交光伏项目资料，与 SAW 团队联合开发机器人友好阵列方案。适用于业主、EPC、设计院、设备与支架厂商。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "联合开发与项目提交｜SAW ArrayWright",
    description: "提交光伏项目资料，与 SAW 团队联合开发机器人友好阵列方案。适用于业主、EPC、设计院、设备与支架厂商。",
  },
};

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; msg?: string }>;
}) {
  const params = await searchParams;
  const status = params?.status;
  const msg = params?.msg;

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">项目计划</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          提交您的光伏项目资料，进入 SAW 评估流程
        </p>
      </div>

      {/* 联合开发计划 */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">联合开发计划</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="gradient-border p-6">
            <h3 className="mb-2 text-lg font-bold text-foreground">SAW Site</h3>
            <p className="mb-4 text-sm text-muted">场景建模与机器人可施工性验证</p>
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">开放报名</span>
          </div>
          <div className="gradient-border p-6">
            <h3 className="mb-2 text-lg font-bold text-foreground">SAW Sim</h3>
            <p className="mb-4 text-sm text-muted">施工仿真与工序节拍分析</p>
            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">即将开放</span>
          </div>
          <div className="gradient-border p-6">
            <h3 className="mb-2 text-lg font-bold text-foreground">SAW Carport</h3>
            <p className="mb-4 text-sm text-muted">公开工程示范子项目</p>
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">开放报名</span>
          </div>
        </div>
      </section>

      {/* 表单提交结果提示（无 JS POST 场景） */}
      {status === "success" && (
        <div role="status" aria-live="polite" className="mb-8 rounded-lg border border-green-500/50 bg-green-500/10 p-6">
          <h2 className="mb-2 text-xl font-bold text-green-400">✓ 提交成功</h2>
          <p className="text-sm text-muted">
            我们已收到您的项目资料，将在 3 个工作日内与您联系。
            {msg && <span className="mt-2 block text-foreground">{msg}</span>}
          </p>
        </div>
      )}
      {status === "error" && (
        <div role="alert" aria-live="assertive" className="mb-8 rounded-lg border border-red-500/50 bg-red-500/10 p-6">
          <h2 className="mb-2 text-xl font-bold text-red-400">✗ 提交失败</h2>
          <p className="text-sm text-muted">
            {msg ? decodeURIComponent(msg) : "请检查填写的信息后重试。"}
          </p>
        </div>
      )}

      {/* 项目提交表单 */}
      <section>
        <h2 className="mb-8 text-2xl font-bold text-foreground">提交项目资料</h2>
        <div className="gradient-border p-8">
          <ProjectForm />
        </div>
      </section>
    </div>
  );
}
