import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["zh", "en"] as const;
export const defaultLocale = "zh" as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return {
    locale,
    messages,
    timeZone: "Asia/Shanghai",
    now: new Date(),
  };
});
