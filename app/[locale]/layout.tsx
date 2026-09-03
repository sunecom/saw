import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// === 关键：layout 只返回 site-level metadata（不返回 per-page canonical/alternates）===
// Per-page metadata 必须在每个 page.tsx 的 generateMetadata 里返回
// 这样 next-intl layout 不会给所有子页面覆盖错位的 canonical
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    metadataBase: new URL("https://saw.aitomoney.online"),
    title: {
      template: isEn ? "%s | SAW ArrayWright" : "%s | SAW ArrayWright",
      default: isEn ? "SAW ArrayWright | Digital Engineering Foundation for Machine-Built Solar" : "SAW ArrayWright｜面向机器施工的光伏工程数字底座",
    },
    keywords: isEn
      ? ["solar", "photovoltaic", "robot", "smart manufacturing", "EPC", "solar plant", "SAW", "ArrayWright", "solar carport", "robotic construction"]
      : ["光伏", "太阳能", "机器人", "智能制造", "EPC", "光伏电站", "SAW", "ArrayWright", "光伏车棚", "智能建造"],
    authors: [{ name: "SAW ArrayWright Team" }],
    creator: "天伏能科 × AiToMoney",
    publisher: "SAW ArrayWright",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      siteName: "SAW ArrayWright",
      locale: isEn ? "en_US" : "zh_CN",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "zh" | "en")) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const isEn = locale === "en";
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SAW ArrayWright",
    alternateName: isEn ? "Solar Array Robotic Manufacturing Initiative" : "光伏阵列智造计划",
    url: isEn ? "https://saw.aitomoney.online/en" : "https://saw.aitomoney.online",
    logo: "https://saw.aitomoney.online/logo.webp",
    description: isEn
      ? "The digital engineering foundation for machine-built solar, turning solar projects into tasks machines can understand, execute, and verify."
      : "面向机器施工的光伏工程数字底座，把光伏工程转化为机器可理解、可执行、可验证的任务体系。",
    founder: [{ "@type": "Organization", name: "天伏能科" }, { "@type": "Organization", name: "AiToMoney" }],
    areaServed: "CN",
    serviceType: isEn
      ? ["Solar array design", "Robotic construction simulation", "Project assessment", "Scene modeling"]
      : ["光伏阵列设计", "机器人施工仿真", "项目评估", "场景建模"],
    contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: "12221634@qq.com" },
    sameAs: ["https://github.com/sunecom/saw"],
  };

  return (
    <html lang={isEn ? "en" : "zh-CN"} className="dark" suppressHydrationWarning>
      <body className={inter.className + " antialiased"}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent-blue focus:px-4 focus:py-2 focus:text-white">
          {isEn ? "Skip to content" : "跳到主要内容"}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
          <div className="grid-bg min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
