import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAW ArrayWright | 光伏阵列智造计划",
  description: "为机器人重新设计光伏建造。SAW光伏阵列智造计划 — 项目评估、场景建模、施工仿真、数据闭环。",
  keywords: ["光伏", "太阳能", "机器人", "智能制造", "EPC", "光伏电站", "SAW", "ArrayWright"],
  openGraph: {
    title: "SAW ArrayWright | 光伏阵列智造计划",
    description: "为机器人重新设计光伏建造",
    type: "website",
    locale: "zh_CN",
    siteName: "SAW ArrayWright",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAW ArrayWright | 光伏阵列智造计划",
    description: "为机器人重新设计光伏建造",
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
    "serviceType": ["光伏阵列设计", "机器人施工仿真", "项目评估"]
  };

  return (
    <html lang="zh-CN" className="dark">
      <head>
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
