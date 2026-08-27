import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-7xl">
            为机器人<br />
            <span className="bg-gradient-to-r from-accent-blue to-accent-orange bg-clip-text text-transparent">重新设计光伏建造</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted md:text-xl">
            SAW ArrayWright — 光伏阵列智造计划<br />项目评估 · 场景建模 · 施工仿真 · 数据闭环
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/programs" className="rounded-lg bg-accent-blue px-8 py-3 font-semibold text-white glow-blue">提交您的项目</Link>
            <Link href="/solutions" className="rounded-lg border border-border bg-card-bg/50 px-8 py-3 font-semibold text-foreground">了解解决方案</Link>
          </div>
          <p className="mt-8 text-sm text-muted/90 px-3 py-1 rounded bg-black/30 backdrop-blur-sm">AI 概念示意 | 展示 SAW 研究方向，不代表已交付设备或真实项目业绩</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">两条主线，一个核心</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="gradient-border p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10">
                <svg className="h-6 w-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">大型光伏电站</h3>
              <p className="mb-4 text-muted">SAW的长期主战场。面向GW级地面电站，提供机器人友好的阵列设计与智能建造方案。</p>
              <div className="flex items-center gap-2 text-sm text-accent-blue"><span>长期战略</span><div className="h-1 flex-1 rounded bg-border" /><span>规划中</span></div>
            </div>
            <div className="gradient-border p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-orange/10">
                <svg className="h-6 w-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">SAW Carport</h3>
              <p className="mb-4 text-muted">首个公开、可参观、可快速MVP的工程示范场景。光伏车棚 + 机器人施工验证。</p>
              <div className="flex items-center gap-2 text-sm text-accent-orange"><span>首个MVP</span><div className="h-1 flex-1 rounded bg-border"><div className="h-full w-2/5 rounded bg-gradient-to-r from-accent-blue to-accent-orange" /></div><span>进行中</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card-bg/30">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground">SAW Core 核心能力</h2>
          <p className="mb-12 text-center text-muted">两条主线共用的技术底座</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[{t:"项目评估",d:"光伏阵列可行性分析",i:"📊"},{t:"场景建模",d:"3D场景重建与仿真",i:"🏗️"},{t:"施工仿真",d:"机器人施工路径规划",i:"🤖"},{t:"数据闭环",d:"施工数据回流与优化",i:"🔄"}].map((item)=>(
              <div key={item.t} className="rounded-lg border border-border bg-card-bg p-6 transition hover:border-accent-blue/50">
                <div className="mb-4 text-4xl">{item.i}</div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{item.t}</h3>
                <p className="text-sm text-muted">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">有真实光伏项目？</h2>
          <p className="mb-8 text-lg text-muted">无论您是EPC总包方还是电站业主，欢迎提交项目资料，进入SAW评估流程。</p>
          <Link href="/programs" className="inline-block rounded-lg bg-accent-orange px-8 py-3 font-semibold text-white glow-orange">提交项目资料</Link>
        </div>
      </section>

      <section className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-muted">联合发起：天伏能科 × AiToMoney</p>
        </div>
      </section>
    </>
  );
}
