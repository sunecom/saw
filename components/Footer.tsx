import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card-bg/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4">
              <img src="/logo.webp" alt="SAW ArrayWright" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted">
              光伏阵列智造计划<br />
              为机器人重新设计光伏建造
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">导航</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/solutions" className="hover:text-foreground">解决方案</Link></li>
              <li><Link href="/capabilities" className="hover:text-foreground">技术能力</Link></li>
              <li><Link href="/programs" className="hover:text-foreground">项目计划</Link></li>
              <li><Link href="/lab" className="hover:text-foreground">实验室</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">联系</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>合作咨询：<a href="mailto:12221634@qq.com" className="hover:text-foreground">12221634@qq.com</a></li>
              <li>隐私问题：<a href="mailto:1952902717@qq.com" className="hover:text-foreground">1952902717@qq.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">发起团队</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>天伏能科</li>
              <li>AiToMoney</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/30 pt-8 text-center">
          <p>© 2026 SAW ArrayWright. 光伏阵列智造计划. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
