import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("common.nav");
  const tFooter = useTranslations("common.footer");
  const currentLocale = useLocale();
  const prefix = `/${currentLocale}`;

  const items = [
    { label: t("solutions"), href: `${prefix}/solutions` },
    { label: t("capabilities"), href: `${prefix}/capabilities` },
    { label: t("programs"), href: `${prefix}/programs` },
    { label: t("lab"), href: `${prefix}/lab` },
  ];

  return (
    <footer className="border-t border-border/50 bg-card-bg/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4">
              <img src="/logo.webp" alt="SAW ArrayWright" className="h-8 w-auto" />
            </div>
            <p className="whitespace-pre-line text-sm text-muted">{tFooter("tagline")}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{tFooter("navigation")}</h4>
            <ul className="space-y-2 text-sm text-muted">
              {items.map((item) => (
                <li key={item.href}><Link href={item.href} className="hover:text-foreground">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{tFooter("contact")}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                {currentLocale === "zh" ? "合作咨询：" : "Partnership: "}
                <a href="mailto:12221634@qq.com" className="hover:text-foreground">12221634@qq.com</a>
              </li>
              <li>
                {currentLocale === "zh" ? "隐私问题：" : "Privacy: "}
                <a href="mailto:1952902717@qq.com" className="hover:text-foreground">1952902717@qq.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{tFooter("partners")}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>天伏能科</li>
              <li>AiToMoney</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/30 pt-8 text-center">
          <p>{tFooter("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
