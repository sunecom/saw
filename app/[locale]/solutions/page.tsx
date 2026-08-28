import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn ? "Solutions — Utility-Scale & Carport" : "工程方案 — 大型地面电站与车棚";
  const description = isEn
    ? "SAW solutions for utility-scale ground-mounted stations and commercial solar carports. Scene modeling, robot-friendly mount design, construction simulation."
    : "SAW 光伏工程方案：大型地面电站与商业光伏车棚两大主线。场景建模、机器人友好型支架设计、施工仿真。";
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/solutions`, languages: { "zh-CN": "/zh/solutions", "en-US": "/en/solutions" } },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("solutions");
  const tCommon = await getTranslations("common.nav");

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{t("title")}</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted">{t("subtitle")}</p>
      </div>

      <section className="mb-12">
        <div className="gradient-border p-8 md:p-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/10">
              <svg className="h-5 w-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t("largePlant.title")}</h2>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">{t("largePlant.stage")}</span>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">{locale === "zh" ? "场景描述" : "Scenario"}</h3>
                <p className="text-sm text-muted">{t("largePlant.sceneDesc")}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">{t("largePlant.challenges")}</h3>
                <ul className="space-y-1 text-sm text-muted">
                  {(t.raw("largePlant.challengeItems") as string[]).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">{t("largePlant.solutionTitle")}</h3>
                <ul className="space-y-1 text-sm text-muted">
                  {(t.raw("largePlant.solutionItems") as string[]).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg border border-border md:h-80">
              <Image src="/solar-plant.jpg" alt={t("largePlant.imageLabel")} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-sm text-muted">{t("largePlant.imageLabel")}</div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{locale === "zh" ? "当前进展" : "Current Progress"}</span>
              <div className="flex items-center gap-4">
                <div className="h-2 w-48 rounded bg-border"><div className="h-full w-1/5 rounded bg-accent-blue" /></div>
                <span className="text-sm text-accent-blue">{t("largePlant.status")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="gradient-border p-8 md:p-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-orange/10">
              <svg className="h-5 w-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t("carport.title")}</h2>
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">{t("carport.stage")}</span>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">{locale === "zh" ? "场景描述" : "Scenario"}</h3>
                <p className="text-sm text-muted">{t("carport.sceneDesc")}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">{t("carport.challenges")}</h3>
                <ul className="space-y-1 text-sm text-muted">
                  {(t.raw("carport.challengeItems") as string[]).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">{t("carport.solutionTitle")}</h3>
                <ul className="space-y-1 text-sm text-muted">
                  {(t.raw("carport.solutionItems") as string[]).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg border border-border md:h-80">
              <Image src="/carport-render.webp" alt={t("carport.imageLabel")} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-sm text-muted">{t("carport.imageLabel")}</div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{locale === "zh" ? "当前进展" : "Current Progress"}</span>
              <div className="flex items-center gap-4">
                <div className="h-2 w-48 rounded bg-border"><div className="h-full w-2/5 rounded bg-gradient-to-r from-accent-blue to-accent-orange" /></div>
                <span className="text-sm text-accent-orange">{t("carport.status")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
