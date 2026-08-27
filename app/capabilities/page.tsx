export default function CapabilitiesPage() {
  const capabilities = [
    {
      title: "SAW Site",
      subtitle: "场景模型",
      icon: "🔍",
      maturity: "Pilot",
      maturityLabel: "真实项目验证中",
      desc: "场景建模、可施工性与环境约束分析",
      details: [
        "项目数据整理与初步场景模型",
        "机器人可施工性评估",
        "环境约束与场地条件分析",
        "阵列布局优化建议"
      ],
      deliverable: "可提供项目数据整理和初步场景模型"
    },
    {
      title: "SAW Frame",
      subtitle: "机器人友好支架",
      icon: "🔩",
      maturity: "Prototype",
      maturityLabel: "原型验证中",
      desc: "机器人友好型支架、接口、紧固件与安装标准",
      details: [
        "支架接口标准化定义",
        "机器人抓取点设计",
        "紧固件适配方案",
        "安装工序优化"
      ],
      deliverable: "可提供支架接口规范与原型设计方案"
    },
    {
      title: "SAW Sim",
      subtitle: "施工仿真",
      icon: "📐",
      maturity: "Prototype",
      maturityLabel: "原型验证中",
      desc: "施工仿真、动作路径、节拍和工序设计",
      details: [
        "机器人动作路径规划",
        "工序节拍分析",
        "施工过程仿真",
        "效率优化方案"
      ],
      deliverable: "可提供施工仿真报告与工序优化建议"
    },
    {
      title: "SAW Field",
      subtitle: "现场验证",
      icon: "🔧",
      maturity: "Pilot",
      maturityLabel: "真实项目验证中",
      desc: "现场工作包、MVP验证和质量证据",
      details: [
        "现场施工方案制定",
        "MVP验证计划执行",
        "质量数据采集与证据收集",
        "施工效果评估"
      ],
      deliverable: "可提供现场MVP验证报告与质量证据"
    },
    {
      title: "SAW Core",
      subtitle: "核心平台",
      icon: "⚙️",
      maturity: "Prototype",
      maturityLabel: "原型验证中",
      desc: "跨项目数据、技能、事件和设备适配器",
      details: [
        "统一数据模型与存储",
        "技能模块复用管理",
        "事件驱动状态同步",
        "设备适配器接口"
      ],
      deliverable: "可提供数据接入与系统集成方案"
    }
  ];

  const maturityColors: Record<string, string> = {
    "Research": "bg-gray-500/10 text-gray-400",
    "Prototype": "bg-yellow-500/10 text-yellow-400",
    "Pilot": "bg-blue-500/10 text-blue-400",
    "Deliverable": "bg-green-500/10 text-green-400"
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">技术能力</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          SAW 五层产品架构，从场景到现场的完整技术栈
        </p>
      </div>

      {/* 成熟度说明 */}
      <div className="mb-12 rounded-lg border border-border bg-card-bg p-6">
        <h2 className="mb-4 text-lg font-bold text-foreground">技术成熟度说明</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-500/10 px-3 py-1 text-xs text-gray-400">Research</span>
            <span className="text-sm text-muted">研究与问题定义</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">Prototype</span>
            <span className="text-sm text-muted">原型和仿真验证</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">Pilot</span>
            <span className="text-sm text-muted">真实项目试点</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">Deliverable</span>
            <span className="text-sm text-muted">可交付产品/服务</span>
          </div>
        </div>
      </div>

      {/* 能力列表 */}
      <div className="space-y-6">
        {capabilities.map((cap) => (
          <div key={cap.title} className="gradient-border p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{cap.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{cap.title}</h2>
                  <p className="text-sm text-muted">{cap.subtitle}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${maturityColors[cap.maturity]}`}>
                {cap.maturity} · {cap.maturityLabel}
              </span>
            </div>
            
            <p className="mb-4 text-muted">{cap.desc}</p>
            
            <ul className="mb-4 space-y-2">
              {cap.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className="rounded-lg border border-border/50 bg-background/50 p-3">
              <p className="text-sm text-muted">
                <span className="font-semibold text-foreground">可交付成果：</span>
                {cap.deliverable}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 技术架构图 */}
      <section className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          SAW 产品架构
        </h2>
        <div className="gradient-border p-8">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
              <div className="mb-2 text-2xl">🔍</div>
              <h3 className="font-semibold text-foreground">SAW Site</h3>
              <p className="text-xs text-muted">场景模型</p>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
              <div className="mb-2 text-2xl">🔩</div>
              <h3 className="font-semibold text-foreground">SAW Frame</h3>
              <p className="text-xs text-muted">机器人友好支架</p>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
              <div className="mb-2 text-2xl">📐</div>
              <h3 className="font-semibold text-foreground">SAW Sim</h3>
              <p className="text-xs text-muted">施工仿真</p>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
              <div className="mb-2 text-2xl">🔧</div>
              <h3 className="font-semibold text-foreground">SAW Field</h3>
              <p className="text-xs text-muted">现场验证</p>
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