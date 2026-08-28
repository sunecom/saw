"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("common.nav");
  const tCommon = useTranslations("common");
  const currentLocale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("home"), href: "" },
    { label: t("solutions"), href: "/solutions" },
    { label: t("capabilities"), href: "/capabilities" },
    { label: t("programs"), href: "/programs" },
    { label: t("lab"), href: "/lab" },
  ].map((item) => ({ ...item, href: `/${currentLocale}${item.href}` }));

  const switchLocale = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextLocale = currentLocale === "zh" ? "en" : "zh";
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace(/^\/(zh|en)/, "");
      window.location.href = `/${nextLocale}${path || ""}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${currentLocale}`} className="flex items-center gap-3">
            <img src="/logo.webp" alt="SAW ArrayWright" className="h-14 w-auto" />
            <span className="text-sm font-medium text-muted transition hover:text-foreground">SAW ARRAYWRIGHT</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-muted transition hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={switchLocale} className="hidden rounded border border-border px-2 py-1 text-xs font-medium text-muted transition hover:bg-card-bg md:block">
              {currentLocale === "zh" ? "EN" : "中"}
            </button>
            <Link href={`/${currentLocale}/programs`} className="hidden rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-blue/90 md:inline-block">
              {tCommon("footer.submit")}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border md:hidden"
              aria-label={mobileOpen ? tCommon("closeMenu") : tCommon("openMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
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

        {mobileOpen && (
          <nav id="mobile-menu" className="mt-4 border-t border-border/50 pt-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-muted transition hover:bg-card-bg hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <button onClick={switchLocale} className="mx-4 rounded border border-border py-2 text-sm text-muted">
                {currentLocale === "zh" ? "Switch to English → EN" : "切换到中文 → 中"}
              </button>
              <Link
                href={`/${currentLocale}/programs`}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-accent-blue px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-accent-blue/90"
              >
                {tCommon("footer.submit")}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
