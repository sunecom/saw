import Link from "next/link";
import type { Metadata } from "next";
import HeroBackground from "@/components/HeroBackground";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn ? "Robot-Friendly Solar Array Manufacturing" : "为机器人重新设计光伏建造";
  const description = isEn
    ? "SAW ArrayWright: project assessment, scene modeling, construction simulation, and on-site data verification for utility-scale solar and solar carport."
    : "SAW ArrayWright 光伏阵列智造计划：项目评估、场景建模、施工仿真与现场数据闭环。大型地面电站与光伏车棚两条工程主线。";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { "zh-CN": "/zh", "en-US": "/en" },
    },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const coreIcons = ["📊", "🏗️", "🤖", "🔄"];
  const coreLabels = t.raw("intro.coreItems") as string[];
  const coreDescs = t.raw("intro.coreDescs") as string[];

  return (
    <>
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1 className="mb-8 text-4xl font-bold leading-[1.15] text-foreground md:text-6xl">
            {t("hero.title").split("机器人").map((part: string, i: number, arr: string[]) =>
              i < arr.length - 1 ? (
                <span key={i} className="block">
                  {part}
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="absolute -inset-x-1 inset-y-0 -z-10 rounded bg-gradient-to-r from-accent-orange/30 to-accent-blue/30 blur-md" />
                    机器人
                  </span>
                </span>
              ) : (
                <span key={i} className="block">{part}</span>
              )
            )}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-foreground/85 md:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/solutions`} className="rounded-lg bg-accent-orange px-8 py-3.5 font-semibold text-white shadow-lg shadow-accent-orange/30 transition hover:bg-accent-orange/90">
              {t("hero.cta")}
            </Link>
            <Link href={`/${locale}/programs`} className="rounded-lg border border-foreground/30 bg-black/30 px-8 py-3.5 font-semibold text-foreground backdrop-blur transition hover:border-foreground/60 hover:bg-black/40">
              {t("hero.secondary")}
            </Link>
          </div>
          <p className="mt-10 inline-block rounded-md border border-foreground/10 bg-black/60 px-4 py-2 text-xs text-foreground/80 backdrop-blur-md md:text-sm">
            {t("concept.disclaimer")}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">{t("intro.title")}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="gradient-border p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10">
                <svg className="h-6 w-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{t("intro.track1Title")}</h3>
              <p className="mb-4 text-muted">{t("intro.track1Desc")}</p>
              <div className="flex items-center gap-2 text-sm text-accent-blue">
                <span>{t("progress.label")}</span>
                <div className="h-1 flex-1 rounded bg-border" />
                <span>{t("progress.status")}</span>
              </div>
            </div>
            <div className="gradient-border p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-orange/10">
                <svg className="h-6 w-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{t("intro.track2Title")}</h3>
              <p className="mb-4 text-muted">{t("intro.track2Desc")}</p>
              <div className="flex items-center gap-2 text-sm text-accent-orange">
                <span>{locale === "zh" ? "首个MVP" : "First MVP"}</span>
                <div className="h-1 flex-1 rounded bg-border">
                  <div className="h-full w-2/5 rounded bg-gradient-to-r from-accent-blue to-accent-orange" />
                </div>
                <span>{locale === "zh" ? "进行中" : "In Progress"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card-bg/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground">{t("intro.core")}</h2>
          <p className="mb-12 text-center text-muted">{locale === "zh" ? "两条主线共用的技术底座" : "Shared technical foundation across both tracks"}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreIcons.map((icon, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card-bg p-6 transition hover:border-accent-blue/50">
                <div className="mb-4 text-4xl">{icon}</div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{coreLabels[idx]}</h3>
                <p className="text-sm text-muted">{coreDescs[idx]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">{t("cta.title")}</h2>
          <p className="mb-8 text-lg text-muted">{t("cta.description")}</p>
          <Link href={`/${locale}/programs`} className="inline-block rounded-lg bg-accent-orange px-8 py-3 font-semibold text-white glow-orange">
            {t("cta.button")}
          </Link>
        </div>
      </section>

      <section className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-muted">{locale === "zh" ? "联合发起：天伏能科 × AiToMoney" : "Initiated by Tianfu Nengke × AiToMoney"}</p>
        </div>
      </section>
    </>
  );
}
