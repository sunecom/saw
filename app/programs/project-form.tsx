"use client";

import { useState } from "react";

export default function ProjectForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    
    try {
      const res = await fetch("/api/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            姓名 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
            placeholder="请输入姓名"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            公司 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="company"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
            placeholder="请输入公司名称"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            职务
          </label>
          <input
            type="text"
            name="title"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
            placeholder="请输入职务"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            手机 <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
            placeholder="请输入手机号"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          邮箱 <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
          placeholder="请输入邮箱"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            项目角色 <span className="text-red-400">*</span>
          </label>
          <select
            name="role"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-accent-blue focus:outline-none"
          >
            <option value="">请选择</option>
            <option value="owner">业主</option>
            <option value="epc">EPC</option>
            <option value="design">设计</option>
            <option value="equipment">设备/支架</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            项目类型 <span className="text-red-400">*</span>
          </label>
          <select
            name="type"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-accent-blue focus:outline-none"
          >
            <option value="">请选择</option>
            <option value="ground">大型地面电站</option>
            <option value="carport">光伏车棚</option>
            <option value="other">其他</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            项目所在地
          </label>
          <input
            type="text"
            name="location"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
            placeholder="如：江苏省南京市"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            预计规模
          </label>
          <input
            type="text"
            name="scale"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"            placeholder="如：100MW"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          当前阶段 <span className="text-red-400">*</span>
        </label>
        <select
          name="stage"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-accent-blue focus:outline-none"
        >
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
        <label className="mb-2 block text-sm font-medium text-foreground">
          是否已有资料
        </label>
        <div className="flex flex-wrap gap-4">
          {["总图", "支架图", "工序资料", "暂无"].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="materials"
                value={item}
                className="h-4 w-4 rounded border-border bg-background text-accent-blue focus:ring-accent-blue"
              />
              <span className="text-sm text-foreground">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          简要描述
        </label>
        <textarea
          name="description"
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
          placeholder="请简要描述您的项目情况..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-accent-orange py-3 text-base font-semibold text-white transition hover:bg-accent-orange/90 disabled:opacity-50"
      >
        {loading ? "提交中..." : "提交项目资料"}
      </button>
    </form>
  );
}
