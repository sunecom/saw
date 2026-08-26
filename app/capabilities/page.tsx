export default function CapabilitiesPage() {
  const capabilities = [
    {
      title: "项目评估",
      icon: "📊",
      color: "accent-blue",
      desc: "光伏阵列可行性分析",
      details: [
        "项目阶段与资料完整度评估",
        "自动化适配场景判断",
        "关键工序、瓶颈与MVP机会初筛",
        "后续数字建模、仿真或联合试点建议"
      ],
      status: "可用"
    },
    {
      title: "场景建模",
      icon: "🏗️",
      color: "accent-blue",
      desc: "3D场景重建与仿真",
      details: [
        "整理项目、阵列、工序数据",
        "建立人工施工基线",
        "识别可复用数字对象和异常",
        "形成数据采集方案"
      ],
      status: "可用"
    },
    {
      title: "施工仿真",
      icon: "🤖",
      color: "accent-orange",
      desc: "机器人施工路径规划",
      details: [
        "明确试验假设、对照组和成功指标",
        "确定数据、设备、安全与人工接管边界",
        "形成现场MVP计划",
        "预算范围和成果归属建议"
      ],
      status: "原型中"
    },
    {
      title: "数据闭环",
      icon: "🔄",
      color: "accent-orange",
      desc: "施工数据回流与优化",
      details: [
        "现场工作包、质量证据和MVP验证",
        "跨项目数据、技能、事件和设备适配器",
        "多机器人协同",
        "全工序自动化和大型电站规模化部署"
      ],
      status: "研究中"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">技术能力</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          SAW Core 四大核心能力，从评估到闭环的完整技术栈
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {capabilities.map((cap) => (
          <div key={cap.title} className="gradient-border p-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{cap.icon}</span>
                <h2 className="text-xl font-bold text-foreground">{cap.title}</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                cap.status === "可用" ? "bg-green-500/10 text-green-400" :
                cap.status === "原型中" ? "bg-yellow-500/10 text-yellow-400" :
                "bg-blue-500/10 text-blue-400"
              }`}>
                {cap.status}
              </span>
            </div>
            
            <p className="mb-4 text-sm text-muted">{cap.desc}</p>
            
            <ul className="space-y-2">
              {cap.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 技术架构 */}
      <section className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          技术架构
        </h2>
        <div className="gradient-border p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
              <div className="mb-2 text-2xl">🔍</div>
              <h3 className="font-semibold text-foreground">SAW Site</h3>
              <p className="text-xs text-muted">场景建模与机器人可施工性</p>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
              <div className="mb-2 text-2xl">📐</div>
              <h3 className="font-semibold text-foreground">SAW Sim</h3>
              <p className="text-xs text-muted">施工仿真与工序节拍分析</p>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
              <div className="mb-2 text-2xl">🔧</div>
              <h3 className="font-semibold text-foreground">SAW Field</h3>
              <p className="text-xs text-muted">现场工作包与MVP验证</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="rounded-lg border-2 border-accent-orange bg-accent-orange/10 px-6 py-3 text-center">
              <h3 className="font-bold text-accent-orange">SAW Core</h3>
              <p className="text-xs text-muted">跨项目数据、技能、事件和设备适配器</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
