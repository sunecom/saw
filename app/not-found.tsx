import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");
  const t404 = await getTranslations("404");
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-8xl font-bold text-accent-blue/20">{t404("code")}</div>
        <h1 className="mb-4 text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="mb-8 text-muted">{t("description")}</p>
        <Link
          href={`/${locale}`}
          className="inline-block rounded-lg bg-accent-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-blue/90"
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
