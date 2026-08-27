"use client";
import { useState } from "react";

export default function ProjectForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!consent) { setError("请先阅读并同意隐私政策"); return; }
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name"), company: form.get("company"), title: form.get("title"),
      phone: form.get("phone"), email: form.get("email"), role: form.get("role"),
      type: form.get("type"), location: form.get("location"), scale: form.get("scale"),
      stage: form.get("stage"), materials: form.getAll("materials"),
      description: form.get("description"),
      consent_at: new Date().toISOString(), privacy_version: "1.0"
    };
    try {
      const res = await fetch("/api/submit-project", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      if (res.ok) setSubmitted(true); else setError(result.message || "提交失败");
    } catch { setError("网络错误，请稍后重试"); } finally { setLoading(false); }
  }

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl">✅</div>
        <h3 className="mb-2 text-xl font-bold text-foreground">提交成功</h3>
        <p className="text-muted">我们已收到您的项目资料，将在3个工作日内与您联系。</p>
      </div>
    );
  }

  const inputClass = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none";
  const labelClass = "mb-2 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">{error}</div>}
      
      <div className="grid gap-6 md:grid-cols-2">
        <div><label className={labelClass}>姓名 *</label><input type="text" name="name" required maxLength={50} className={inputClass} placeholder="请输入姓名" /></div>
        <div><label className={labelClass}>公司 *</label><input type="text" name="company" required maxLength={100} className={inputClass} placeholder="请输入公司名称" /></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div><label className={labelClass}>职务</label><input type="text" name="title" maxLength={50} className={inputClass} placeholder="请输入职务" /></div>
        <div><label className={labelClass}>手机 *</label><input type="tel" name="phone" required pattern="1[3-9]\d{9}" className={inputClass} placeholder="请输入11位手机号" /></div>
      </div>

      <div><label className={labelClass}>邮箱 *</label><input type="email" name="email" required maxLength={100} className={inputClass} placeholder="请输入邮箱" /></div>

      <div className="grid gap-6 md:grid-cols-2">
        <div><label className={labelClass}>项目角色 *</label>
          <select name="role" required className={inputClass}>
            <option value="">请选择</option>
            <option value="owner">业主</option>
            <option value="epc">EPC</option>
            <option value="design">设计</option>
            <option value="equipment">设备/支架</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div><label className={labelClass}>项目类型 *</label>
          <select name="type" required className={inputClass}>
            <option value="">请选择</option>
            <option value="ground">大型地面电站</option>
            <option value="carport">光伏车棚</option>
            <option value="other">其他</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div><label className={labelClass}>项目所在地</label><input type="text" name="location" className={inputClass} placeholder="如：江苏省南京市" /></div>
        <div><label className={labelClass}>预计规模</label><input type="text" name="scale" className={inputClass} placeholder="如：100MW" /></div>
      </div>

      <div><label className={labelClass}>当前阶段 *</label>
        <select name="stage" required className={inputClass}>
          <option value="">请选择</option>
          <option value="opportunity">机会</option>
          <option value="feasibility">可研</option>
          <option value="design">设计</option>
          <option value="procurement">采购</option>
          <option value="construction">施工</option>
          <option value="completed">已完成可复盘</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>是否已有资料（可多选）</label>
        <div className="flex flex-wrap gap-4">
          {["总图", "支架图", "工序资料", "暂无"].map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="materials" value={item} className="h-4 w-4 rounded border-border bg-background text-accent-blue focus:ring-accent-blue" />
              <span className="text-sm text-foreground">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>简要描述</label>
        <textarea name="description" rows={4} maxLength={2000} className={inputClass} placeholder="请简要描述您的项目情况..." />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 rounded border-border bg-background text-accent-blue focus:ring-accent-blue" />
        <span className="text-sm text-muted">我已阅读并同意 <a href="/privacy" className="text-accent-blue hover:underline" target="_blank">隐私政策</a>，授权 SAW 团队处理我提交的项目信息。</span>
      </div>

      <button type="submit" disabled={loading} className="w-full rounded-lg bg-accent-orange py-3 text-base font-semibold text-white transition hover:bg-accent-orange/90 disabled:opacity-50">
        {loading ? "提交中..." : "提交项目资料"}
      </button>
    </form>
  );
}
