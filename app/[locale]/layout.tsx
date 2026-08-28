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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn ? "SAW Arraywright | Solar Array Robotic Manufacturing" : "SAW Arraywright｜光伏阵列智造计划";
  const description = isEn
    ? "Re-engineering solar construction for robots. SAW — project assessment, scene modeling, construction simulation, data-driven verification."
    : "为机器人重新设计光伏建造。SAW光伏阵列智造计划 — 项目评估、场景建模、施工仿真、数据闭环。";
  const ogImage = "https://saw.aitomoney.online/og-image.png";
  return {
    metadataBase: new URL("https://saw.aitomoney.online"),
    title,
    description,
    keywords: isEn
      ? ["solar", "photovoltaic", "robot", "smart manufacturing", "EPC", "solar plant", "SAW", "Arraywright", "solar carport", "robotic construction"]
      : ["光伏", "太阳能", "机器人", "智能制造", "EPC", "光伏电站", "SAW", "Arraywright", "光伏车棚", "智能建造"],
    authors: [{ name: "SAW Arraywright Team" }],
    creator: "天伏能科 × AiToMoney",
    publisher: "SAW Arraywright",
    alternates: {
      canonical: isEn ? "/en" : "/",
      languages: { "zh-CN": "/", "en-US": "/en" },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title, description, type: "website",
      locale: isEn ? "en_US" : "zh_CN",
      siteName: "SAW Arraywright",
      url: isEn ? "https://saw.aitomoney.online/en" : "https://saw.aitomoney.online",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
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
    name: "SAW Arraywright",
    alternateName: isEn ? "Solar Array Robotic Manufacturing Initiative" : "光伏阵列智造计划",
    url: isEn ? "https://saw.aitomoney.online/en" : "https://saw.aitomoney.online",
    logo: "https://saw.aitomoney.online/logo.webp",
    description: isEn
      ? "Re-engineering solar construction for robots. Project assessment, scene modeling, construction simulation, data-driven verification."
      : "为机器人重新设计光伏建造。项目评估、场景建模、施工仿真、数据闭环。",
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
