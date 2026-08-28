import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-8 text-4xl font-bold text-foreground">隐私政策</h1>
      <div className="space-y-6 text-muted">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">1. 信息收集</h2>
          <p>当您通过 SAW 网站提交项目资料时，我们会收集以下信息：</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>联系人信息：姓名、公司、职务、手机、邮箱</li>
            <li>项目信息：角色、类型、所在地、规模、阶段、已有资料、项目描述</li>
            <li>技术信息：IP 地址、User-Agent、提交时间</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">2. 信息使用</h2>
          <p>您提交的信息将用于：</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>评估您的项目是否适合 SAW 技术方案</li>
            <li>SAW 团队与您联系，沟通项目合作事宜</li>
            <li>形成项目线索库，用于 SAW 内部管理和跟进</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">3. 信息保护</h2>
          <p>我们采取以下措施保护您的信息：</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>数据传输采用 HTTPS 加密</li>
            <li>数据存储于安全的服务器环境</li>
            <li>仅 SAW 核心团队可访问项目线索数据</li>
            <li>不会将您的信息出售或分享给第三方</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">4. 您的权利</h2>
          <p>您有权：</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>要求查看我们收集的您的信息</li>
            <li>要求更正或删除您的信息</li>
            <li>撤回授权，停止我们处理您的信息</li>
          </ul>
          <p className="mt-2">如需行使上述权利，请联系：1952902717@qq.com</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">5. 数据处理责任主体与保存规则</h2>
          <p><strong>数据处理责任主体</strong>：SAW Arraywright 项目由天伏能科（江苏天伏能科新能源有限公司）与 AiToMoney 联合发起，两方为<strong>共同数据处理者</strong>。其中：</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>天伏能科负责光伏工程与现场数据处理</li>
            <li>AiToMoney 负责网站运营与项目线索接收</li>
            <li>SAW 项目团队（两方共同组成）负责具体跟进与产品开发</li>
          </ul>
          <p className="mt-3"><strong>保存期限</strong>：</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>项目线索默认保存 <strong>24 个月</strong>，自您最后一次主动跟进之日起计算</li>
            <li>已签约合作项目的数据，按合同约定与法律要求延长保存</li>
            <li>未跟进 / 关闭的线索，到期后 30 天内安全删除</li>
            <li>如法律诉讼、监管要求或合规审计需要，可依法延长保存</li>
          </ul>
          <p className="mt-3"><strong>处理时限</strong>：</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>查看请求：收到后 7 个工作日内回复</li>
            <li>更正请求：收到后 7 个工作日内完成</li>
            <li>删除请求：收到后 15 个工作日内完成</li>
            <li>撤回授权：自撤回之日起 7 个工作日内停止处理</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">6. 第三方处理与数据共享</h2>
          <p>当前阶段，SAW 项目数据<strong>不向任何第三方共享或出售</strong>。我们使用的服务提供商：</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>飞书（多维表格与消息通知）：项目线索存储与群通知发送</li>
            <li>阿里云 / 腾讯云服务器：网站部署与运行</li>
          </ul>
          <p className="mt-2">上述服务提供商仅在提供服务所必需的范围内接触数据，并承担同等的保密与安全义务。如未来接入邮件营销、CRM、统计分析或第三方云服务，本隐私政策将同步更新，并提前通知已提交线索的用户。</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">7. 政策更新</h2>
          <p>本隐私政策可能会不定期更新。当前版本：v1.1（2026年8月28日）</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">8. 联系我们</h2>
          <p>如有隐私相关问题，请联系：</p>
          <p className="mt-2">SAW ArrayWright 团队<br />邮箱：1952902717@qq.com</p>
        </section>
      </div>
    </div>
  );
}
