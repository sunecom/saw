import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card-bg/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-orange">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-lg font-bold text-foreground">SAW</span>
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
              <li>合作咨询：<a href="mailto:contact@saw-arraywright.com" className="hover:text-foreground">contact@saw-arraywright.com</a></li>
              <li>隐私问题：<a href="mailto:privacy@saw-arraywright.com" className="hover:text-foreground">privacy@saw-arraywright.com</a></li>
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

        <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted">
          <p>© 2026 SAW ArrayWright. 光伏阵列智造计划. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
