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
          <p className="mt-2">如需行使上述权利，请联系：privacy@saw-arraywright.com</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">5. 政策更新</h2>
          <p>本隐私政策可能会不定期更新。当前版本：v1.0（2026年8月27日）</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">6. 联系我们</h2>
          <p>如有隐私相关问题，请联系：</p>
          <p className="mt-2">SAW ArrayWright 团队<br />邮箱：privacy@saw-arraywright.com</p>
        </section>
      </div>
    </div>
  );
}
