import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-2 text-4xl font-bold text-foreground">{t("title")}</h1>
      <p className="mb-8 text-sm text-muted">{t("lastUpdated")}</p>
      <div className="space-y-6 text-muted">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t("section1.title")}</h2>
          <p>{t("section1.intro")}</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {(t.raw("section1.items") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t("section2.title")}</h2>
          <p>{t("section2.intro")}</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {(t.raw("section2.items") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t("section3.title")}</h2>
          <p>{t("section3.intro")}</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {(t.raw("section3.items") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t("section4.title")}</h2>
          <p>{t("section4.intro")}</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {(t.raw("section4.items") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-2">{t("section4.contact")}</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t("section5.title")}</h2>
          <p><strong>{t("section5.controllerIntro")}</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {(t.raw("section5.controllerItems") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-3"><strong>{t("section5.retentionTitle")}</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {(t.raw("section5.retentionItems") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-3"><strong>{t("section5.turnaroundTitle")}</strong></p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {(t.raw("section5.turnaroundItems") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t("section6.title")}</h2>
          <p>{t("section6.intro")}</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {(t.raw("section6.providers") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-2">{t("section6.outro")}</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t("section7.title")}</h2>
          <p>{t("section7.content")}</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t("section8.title")}</h2>
          <p>{t("section8.content")}</p>
          <p className="mt-2">{t("section8.team")}<br />{t("section8.email")}</p>
        </section>
      </div>
    </div>
  );
}
