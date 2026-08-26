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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
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
