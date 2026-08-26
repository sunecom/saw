export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">解决方案</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          SAW Core 技术底座支撑两条主线：大型光伏电站与 SAW Carport 示范场景
        </p>
      </div>

      {/* 大型光伏电站 */}
      <section className="mb-16">
        <div className="gradient-border p-8 md:p-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/10">
              <svg className="h-5 w-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground">大型光伏电站</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">场景描述</h3>
                <p className="text-sm text-muted">
                  面向 GW 级地面电站，提供机器人友好的阵列设计与智能建造方案。SAW的长期主战场与最终价值方向。
                </p>
              </div>
              
              <div>
                <h3 className="mb-2 font-semibold text-foreground">技术挑战</h3>
                <ul className="space-y-1 text-sm text-muted">
                  <li>• 复杂地形下的阵列布局优化</li>
                  <li>• 大规模施工的精度控制</li>
                  <li>• 多工序协同与节拍平衡</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">SAW 解决方案</h3>
                <ul className="space-y-1 text-sm text-muted">
                  <li>• SAW Site：场景建模与机器人可施工性分析</li>
                  <li>• SAW Sim：施工仿真与工序节拍优化</li>
                  <li>• SAW Field：现场质量证据与 MVP 验证</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-lg border border-border bg-background/50 p-8">
              <div className="text-center">
                <div className="mb-4 text-6xl">⚡</div>
                <p className="text-sm text-muted">大型电站场景</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">当前进展</span>
              <div className="flex items-center gap-4">
                <div className="h-2 w-48 rounded bg-border">
                  <div className="h-full w-1/5 rounded bg-accent-blue" />
                </div>
                <span className="text-sm text-accent-blue">规划阶段</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAW Carport */}
      <section>
        <div className="gradient-border p-8 md:p-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-orange/10">
              <svg className="h-5 w-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground">SAW Carport</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">场景描述</h3>
                <p className="text-sm text-muted">
                  首个公开、可参观、可快速 MVP 的工程示范场景。光伏车棚 + 机器人施工验证，是 SAW Core 技术的首次落地。
                </p>
              </div>
              
              <div>
                <h3 className="mb-2 font-semibold text-foreground">技术挑战</h3>
                <ul className="space-y-1 text-sm text-muted">
                  <li>• 车棚结构适配性</li>
                  <li>• 有限空间内的机器人作业</li>
                  <li>• 快速部署与可参观性</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">SAW 解决方案</h3>
                <ul className="space-y-1 text-sm text-muted">
                  <li>• 机器人友好型支架设计</li>
                  <li>• 简化施工工序验证</li>
                  <li>• 数据闭环优化</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-lg border border-border bg-background/50 p-8">
              <div className="text-center">
                <div className="mb-4 text-6xl">🏗️</div>
                <p className="text-sm text-muted">SAW Carport 场景</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">当前进展</span>
              <div className="flex items-center gap-4">
                <div className="h-2 w-48 rounded bg-border">
                  <div className="h-full w-2/5 rounded bg-gradient-to-r from-accent-blue to-accent-orange" />
                </div>
                <span className="text-sm text-accent-orange">进行中</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
