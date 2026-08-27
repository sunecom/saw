import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://saw.aitomoney.online"),
  title: "SAW ArrayWright | 光伏阵列智造计划",
  description: "为机器人重新设计光伏建造。SAW光伏阵列智造计划 — 项目评估、场景建模、施工仿真、数据闭环。",
  keywords: ["光伏", "太阳能", "机器人", "智能制造", "EPC", "光伏电站", "SAW", "ArrayWright", "光伏车棚", "智能建造"],
  authors: [{ name: "SAW ArrayWright Team" }],
  creator: "天伏能科 × AiToMoney",
  publisher: "SAW ArrayWright",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "SAW ArrayWright | 光伏阵列智造计划",
    description: "为机器人重新设计光伏建造",
    type: "website",
    locale: "zh_CN",
    siteName: "SAW ArrayWright",
    url: "https://saw.aitomoney.online",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAW ArrayWright | 光伏阵列智造计划",
    description: "为机器人重新设计光伏建造",
  },
  alternates: {
    canonical: "https://saw.aitomoney.online",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SAW ArrayWright",
    "alternateName": "光伏阵列智造计划",
    "url": "https://saw.aitomoney.online",
    "logo": "https://saw.aitomoney.online/logo.png",
    "description": "为机器人重新设计光伏建造。项目评估、场景建模、施工仿真、数据闭环。",
    "founder": [
      {
        "@type": "Organization",
        "name": "天伏能科"
      },
      {
        "@type": "Organization",
        "name": "AiToMoney"
      }
    ],
    "areaServed": "CN",
    "serviceType": ["光伏阵列设计", "机器人施工仿真", "项目评估", "场景建模"],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@saw-arraywright.com"
    },
    "sameAs": []
  };

  return (
    <html lang="zh-CN" className="dark">
      <head>
        <link rel="canonical" href="https://saw.aitomoney.online" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="grid-bg min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
