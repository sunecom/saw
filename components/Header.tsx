import Link from "next/link";

const navItems = [
  { label: "解决方案", href: "/solutions" },
  { label: "技术能力", href: "/capabilities" },
  { label: "项目计划", href: "/programs" },
  { label: "实验室", href: "/lab" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-orange">
              <span className="text-lg font-bold text-white">S</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-foreground">SAW</span>
              <span className="block text-xs text-muted">ArrayWright</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/programs"
            className="rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-blue/90"
          >
            提交项目
          </Link>
        </div>
      </div>
    </header>
  );
}
