import { setRequestLocale, getTranslations } from "next-intl/server";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn ? "Capabilities — Site / Sim / Field / Core" : "技术能力 — Site / Sim / Field / Core";
  const description = isEn
    ? "SAW four technical capabilities: scene modeling & robot constructability (SAW Site), construction simulation & cycle-time optimization (SAW Sim), on-site quality evidence & MVP validation (SAW Field), and shared technical foundation (SAW Core)."
    : "SAW 四大技术能力：场景建模与机器人可施工性分析（SAW Site）、施工仿真与节拍优化（SAW Sim）、现场质量证据与 MVP 验证（SAW Field）、跨主线共享技术底座（SAW Core）。";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/capabilities`,
      languages: { "zh-CN": `/zh/capabilities`, "en-US": `/en/capabilities` },
    },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CapabilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("capabilities");

  const icons = ["🔍", "🔩", "📐", "🔧", "⚙️"];
  const keys = ["site", "frame", "sim", "field", "core"] as const;
  const maturityList = ["Research", "Prototype", "Research", "Research", "Prototype"];

  const items = keys.map((k, i) => ({
    key: k,
    icon: icons[i],
    maturity: maturityList[i],
    ...(t.raw(`items.${k}`) as { subtitle: string; desc: string; details: string[]; deliverable: string }),
  }));

  const maturityColors: Record<string, string> = {
    "Research": "bg-gray-500/10 text-gray-400",
    "Prototype": "bg-yellow-500/10 text-yellow-400",
    "Pilot": "bg-blue-500/10 text-blue-400",
    "Deliverable": "bg-green-500/10 text-green-400",
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">{t("title")}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">{t("subtitle")}</p>
      </div>

      {/* 成熟度说明 */}
      <div className="mb-12 rounded-lg border border-border bg-card-bg p-6">
        <h2 className="mb-4 text-lg font-bold text-foreground">{locale === "zh" ? "技术成熟度说明" : "Maturity Levels"}</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-500/10 px-3 py-1 text-xs text-gray-400">{t("maturity.Research")}</span>
            <span className="text-sm text-muted">{locale === "zh" ? "研究与问题定义" : "Research & problem definition"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">{t("maturity.Prototype")}</span>
            <span className="text-sm text-muted">{locale === "zh" ? "原型和仿真验证" : "Prototype & simulation"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">{t("maturity.Pilot")}</span>
            <span className="text-sm text-muted">{locale === "zh" ? "真实项目试点" : "Real project pilot"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">{t("maturity.Deliverable")}</span>
            <span className="text-sm text-muted">{locale === "zh" ? "可交付产品/服务" : "Deliverable product/service"}</span>
          </div>
        </div>
      </div>

      {/* 能力列表 */}
      <div className="space-y-6">
        {items.map((cap) => (
          <div key={cap.key} className="gradient-border p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{cap.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-foreground">SAW {cap.key.charAt(0).toUpperCase() + cap.key.slice(1)}</h2>
                  <p className="text-sm text-muted">{cap.subtitle}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${maturityColors[cap.maturity]}`}>
                {t(`maturity.${cap.maturity}` as "maturity.Research")}
              </span>
            </div>
            <p className="mb-4 text-muted">{cap.desc}</p>
            <ul className="mb-4 space-y-2">
              {cap.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="rounded-lg border border-border/50 bg-background/50 p-3">
              <p className="text-sm text-muted">
                <span className="font-semibold text-foreground">{locale === "zh" ? "可交付成果：" : "Deliverable: "}</span>
                {cap.deliverable}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
