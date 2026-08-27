import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/programs" },
};

import ProjectForm from "./project-form";

export default function ProgramsPage() {
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
