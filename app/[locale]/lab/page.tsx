import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn ? "SAW Lab — Research & Engineering Log" : "SAW 实验室 — 研究与工程日志";
  const description = isEn
    ? "SAW Lab publishes technical research, engineering logs, and open records on robotic solar array construction, robot-friendly mounts, construction simulation, and the core platform."
    : "SAW 实验室发布光伏阵列自动建造、机器人友好支架、施工仿真与核心平台相关的技术研究、工程日志与公开记录。";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/lab`,
      languages: { "zh-CN": `/zh/lab`, "en-US": `/en/lab` },
    },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// 简化：titleKey 改成裸 key（不带 labArticle. 前缀）
const articles = [
  {
    slug: "saw-core-architecture",
    titleKey: "sawCore",
    date: "2026-08-27",
    tagsZh: ["架构", "SAW Core"],
    tagsEn: ["Architecture", "SAW Core"],
  },
  {
    slug: "carport-mvp-plan",
    titleKey: "carport",
    date: "2026-08-26",
    tagsZh: ["车棚", "MVP"],
    tagsEn: ["Carport", "MVP"],
  },
  {
    slug: "robot-friendly-mount-design",
    titleKey: "mount",
    date: "2026-08-25",
    tagsZh: ["支架", "机器人"],
    tagsEn: ["Mount", "Robotics"],
  },
];

export default async function LabPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("lab");
  const tArticles = await getTranslations("labArticles");

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
                {(locale === "zh" ? article.tagsZh : article.tagsEn).map((tag) => (
                  <span key={tag} className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs text-accent-blue">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">{tArticles(`${article.titleKey}.title`)}</h2>
            <p className="text-sm text-muted">{tArticles(`${article.titleKey}.body`).split("\n\n")[0]}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted">
        <p>{locale === "zh" ? "更多文章持续更新中..." : "More articles coming soon..."}</p>
      </div>
    </div>
  );
}
