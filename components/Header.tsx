"use client";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "解决方案", href: "/solutions" },
  { label: "技术能力", href: "/capabilities" },
  { label: "项目计划", href: "/programs" },
  { label: "实验室", href: "/lab" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="SAW ArrayWright" className="h-14 w-auto" />
              <span className="text-sm font-medium text-muted transition hover:text-foreground">SAW ARRAYWRIGHT</span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-muted transition hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/programs" className="hidden rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-blue/90 md:inline-block">
              提交项目
            </Link>

            {/* 移动端汉堡菜单 */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
              aria-label="菜单" aria-expanded={mobileOpen} aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {mobileOpen && (
          <nav id="mobile-menu" className="mt-4 border-t border-border/50 pt-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition hover:bg-card-bg hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/programs"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-accent-blue px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-accent-blue/90"
              >
                提交项目
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
