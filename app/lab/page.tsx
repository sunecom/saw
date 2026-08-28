import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAW 实验室｜光伏阵列自动建造研究与工程日志",
  description: "SAW 实验室发布光伏阵列自动建造、机器人友好支架、施工仿真与核心平台相关的技术研究、工程日志与公开记录。",
  alternates: { canonical: "/lab" },
  openGraph: {
    title: "SAW 实验室｜光伏阵列自动建造研究与工程日志",
    description: "SAW 实验室发布光伏阵列自动建造、机器人友好支架、施工仿真与核心平台相关的技术研究、工程日志与公开记录。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAW 实验室｜光伏阵列自动建造研究与工程日志",
    description: "SAW 实验室发布光伏阵列自动建造、机器人友好支架、施工仿真与核心平台相关的技术研究、工程日志与公开记录。",
  },
};

import Link from "next/link";

// 示例文章数据（后续可从 Markdown 文件读取）
const articles = [
  {
    slug: "saw-core-architecture",
    title: "SAW Core 架构设计思路",
    excerpt: "介绍 SAW Core 的技术架构，包括跨项目数据、技能、事件和设备适配器的设计原则...",
    date: "2026-08-27",
    tags: ["架构", "SAW Core"],
  },
  {
    slug: "carport-mvp-plan",
    title: "SAW Carport MVP 计划",
    excerpt: "首个工程示范场景的实施计划，包括场景选择、技术验证目标和时间节点...",
    date: "2026-08-26",
    tags: ["Carport", "MVP"],
  },
  {
    slug: "robot-friendly-mount-design",
    title: "机器人友好型支架设计探索",
    excerpt: "探讨如何设计适合机器人安装的光伏支架，包括接口标准和施工工序优化...",
    date: "2026-08-25",
    tags: ["支架", "机器人"],
  },
];

export default function LabPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">实验室</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          技术博客与工程日志，记录 SAW 的研发进展与思考
        </p>
      </div>

      {/* 标签筛选 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {["全部", "架构", "SAW Core", "Carport", "MVP", "支架", "机器人"].map((tag) => (
          <button
            key={tag}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition hover:border-accent-blue hover:text-accent-blue"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/lab/${article.slug}`}
            className="gradient-border block p-6 transition hover:border-accent-blue/50"
          >
            <div className="mb-2 flex items-center gap-3">
              <time className="text-sm text-muted">{article.date}</time>
              <div className="flex gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs text-accent-blue"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">{article.title}</h2>
            <p className="text-sm text-muted">{article.excerpt}</p>
          </Link>
        ))}
      </div>

      {/* 空状态提示 */}
      <div className="mt-12 text-center text-sm text-muted">
        <p>更多文章持续更新中...</p>
      </div>
    </div>
  );
}
