"use client";

import { useState } from "react";

export default function ProjectForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [materials, setMaterials] = useState<string[]>([]);

  const inputClass = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue";
  const labelClass = "mb-2 block text-sm font-medium text-foreground";

  function handleMaterialChange(item: string, checked: boolean) {
    if (item === "暂无") {
      setMaterials(checked ? ["暂无"] : []);
    } else {
      let newMaterials = checked 
        ? [...materials, item] 
        : materials.filter(m => m !== item);
      newMaterials = newMaterials.filter(m => m !== "暂无");
      setMaterials(newMaterials);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!consent) { setError("请先阅读并同意隐私政策"); return; }
    
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const data = {
        name: form.get("name"),
        company: form.get("company"),
        email: form.get("email"),
        phone: form.get("phone"),
        projectType: form.get("projectType"),
        location: form.get("location"),
        scale: form.get("scale"),
        stage: form.get("stage"),
        materials: materials,
        description: form.get("description"),
      };

      const res = await fetch("/api/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) setSubmitted(true); else setError(result.message || "提交失败");
    } catch { setError("网络错误，请稍后重试"); } finally { setLoading(false); }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mb-4 text-5xl">✅</div>
        <h3 className="mb-2 text-2xl font-bold text-foreground">提交成功</h3>
        <p className="text-muted">我们将在3个工作日内与您联系。</p>
      </div>
    );
  }

  return (
    <>
    <noscript><p className="mb-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm text-yellow-400">提示：当前禁用了 JavaScript，表单将以普通方式提交，请确保信息填写完整。</p></noscript>
      <form method="post" action="/api/submit-project" onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6" aria-label="项目资料提交表单">
      {error && <div role="alert" aria-live="assertive" className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">{error}</div>}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>姓名 *</label>
          <input id="name" type="text" name="name" required maxLength={50} autoComplete="name" className={inputClass} placeholder="您的姓名" />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>公司</label>
          <input id="company" type="text" name="company" maxLength={100} autoComplete="organization" className={inputClass} placeholder="公司名称" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>邮箱 *</label>
          <input id="email" type="email" name="email" required maxLength={100} autoComplete="email" className={inputClass} placeholder="your@email.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>电话</label>
          <input id="phone" type="tel" name="phone" maxLength={20} autoComplete="tel" className={inputClass} placeholder="13800138000" />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className={labelClass}>项目类型 *</label>
        <select id="projectType" name="projectType" required className={inputClass}>
          <option value="">请选择</option>
          <option value="large-ground">大型地面电站</option>
          <option value="distributed">工商业分布式</option>
          <option value="carport">光伏车棚</option>
          <option value="other">其他</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="location" className={labelClass}>项目所在地</label>
          <input id="location" type="text" name="location" maxLength={100} autoComplete="address-level2" className={inputClass} placeholder="如：江苏省南京市" />
        </div>
        <div>
          <label htmlFor="scale" className={labelClass}>预计规模</label>
          <input id="scale" type="text" name="scale" maxLength={50} className={inputClass} placeholder="如：100MW" />
        </div>
      </div>

      <div>
        <label htmlFor="stage" className={labelClass}>当前阶段 *</label>
        <select id="stage" name="stage" required className={inputClass}>
          <option value="">请选择</option>
          <option value="opportunity">机会</option>
          <option value="feasibility">可研</option>
          <option value="design">设计</option>
          <option value="procurement">采购</option>
          <option value="construction">施工</option>
          <option value="completed">已完成可复盘</option>
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>是否已有资料（可多选）</legend>
        <div className="flex flex-wrap gap-4">
          {["总图", "支架图", "工序资料", "暂无"].map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                name="materials" 
                value={item} 
                checked={materials.includes(item)}
                onChange={(e) => handleMaterialChange(item, e.target.checked)}
                className="h-4 w-4 rounded border-border bg-background text-accent-blue focus:ring-accent-blue" 
              />
              <span className="text-sm text-foreground">{item}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="description" className={labelClass}>简要描述</label>
        <textarea id="description" name="description" rows={4} maxLength={2000} className={inputClass} placeholder="请简要描述您的项目情况..." />
      </div>

      <div className="flex items-start gap-3">
        <input 
          id="consent" 
          type="checkbox" 
          checked={consent} 
          onChange={(e) => setConsent(e.target.checked)} 
          required
          className="mt-1 h-4 w-4 rounded border-border bg-background text-accent-blue focus:ring-accent-blue" 
        />
        <input type="hidden" name="consent" value={consent ? "true" : "false"} />
        <label htmlFor="consent" className="text-sm text-muted">
          我已阅读并同意 <a href="/privacy" className="text-accent-blue hover:underline" target="_blank">隐私政策</a>，授权 SAW 团队处理我提交的项目信息。
        </label>
      </div>

      <button type="submit" disabled={loading} aria-busy={loading} className="w-full rounded-lg bg-accent-orange py-3 text-base font-semibold text-white transition hover:bg-accent-orange/90 disabled:opacity-50">
        {loading ? "提交中..." : "提交项目资料"}
      </button>
    </form>
    </>
  );
}
