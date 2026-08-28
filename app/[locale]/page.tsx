import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tNav = await getTranslations("common.nav");

  const coreItems = [
    { icon: "📊", key: "0" },
    { icon: "🏗️", key: "1" },
    { icon: "🤖", key: "2" },
    { icon: "🔄", key: "3" },
  ];
  const coreLabels = t.raw("intro.coreItems") as string[];

  return (
    <>
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-7xl">
            {t("hero.title").split("机器人").map((part: string, i: number, arr: string[]) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <br />
                  <span className="bg-gradient-to-r from-accent-blue to-accent-orange bg-clip-text text-transparent">
                    机器人
                  </span>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted md:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/programs`} className="rounded-lg bg-accent-blue px-8 py-3 font-semibold text-white glow-blue">
              {t("hero.cta")}
            </Link>
            <Link href={`/${locale}/solutions`} className="rounded-lg border border-border bg-card-bg/50 px-8 py-3 font-semibold text-foreground">
              {t("hero.secondary")}
            </Link>
          </div>
          <p className="mt-8 inline-block rounded bg-black/30 px-3 py-1 text-sm text-muted/90 backdrop-blur-sm">
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
              <h3 className="mb-2 text-xl font-bold text-foreground">{tNav("solutions")}</h3>
              <p className="mb-4 text-muted">{t("intro.paragraph1")}</p>
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
              <h3 className="mb-2 text-xl font-bold text-foreground">SAW Carport</h3>
              <p className="mb-4 text-muted">{t("intro.paragraph2")}</p>
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
            {coreItems.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card-bg p-6 transition hover:border-accent-blue/50">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{coreLabels[idx]}</h3>
                <p className="text-sm text-muted">{t("intro.paragraph1")}</p>
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
