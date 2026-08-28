import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";

const articles = [
  {
    slug: "saw-core-architecture",
    titleKey: "labArticle.sawCore",
    excerpt: "介绍 SAW Core 的技术架构，包括跨项目数据、技能、事件和设备适配器的设计原则...",
    date: "2026-08-27",
    tags: ["架构", "SAW Core"],
  },
  {
    slug: "carport-mvp-plan",
    titleKey: "labArticle.carport",
    excerpt: "首个工程示范场景的实施计划，包括场景选择、技术验证目标和时间节点...",
    date: "2026-08-26",
    tags: ["Carport", "MVP"],
  },
  {
    slug: "robot-friendly-mount-design",
    titleKey: "labArticle.mount",
    excerpt: "探讨如何设计适合机器人安装的光伏支架，包括接口标准和施工工序优化...",
    date: "2026-08-25",
    tags: ["支架", "机器人"],
  },
];

export default async function LabPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("lab");
  const tArticles = await getTranslations("labArticle");

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">{t("title")}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">{t("subtitle")}</p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${locale}/lab/${article.slug}`}
            className="gradient-border block p-6 transition hover:border-accent-blue/50"
          >
            <div className="mb-2 flex items-center gap-3">
              <time className="text-sm text-muted">{article.date}</time>
              <div className="flex gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs text-accent-blue">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">{tArticles(`${article.titleKey}.title` as any)}</h2>
            <p className="text-sm text-muted">{article.excerpt}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted">
        <p>{locale === "zh" ? "更多文章持续更新中..." : "More articles coming soon..."}</p>
      </div>
    </div>
  );
}
