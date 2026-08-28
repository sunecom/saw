"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function ProjectForm() {
  const t = useTranslations("programs.form");
  const locale = useLocale();
  const isZh = locale === "zh";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [materials, setMaterials] = useState<string[]>([]);

  const inputClass = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue";
  const labelClass = "mb-2 block text-sm font-medium text-foreground";

  // 字段 value 保持英文常量（提交到后端），显示用 t() 翻译
  const projectTypeOptions = [
    { value: "large-ground", key: "ground" },
    { value: "carport", key: "carport" },
    { value: "distributed", key: "rooftop" },
    { value: "other", key: "other" },
  ];
  const stageOptions = [
    { value: "opportunity", key: "opportunity" },
    { value: "feasibility", key: "feasibility" },
    { value: "design", key: "design" },
    { value: "procurement", key: "procurement" },
    { value: "construction", key: "construction" },
    { value: "completed", key: "completed" },
  ];
  const materialOptions = [
    { value: "drawings", key: "drawings" },
    { value: "geotechnical", key: "geotechnical" },
    { value: "satellite", key: "satellite" },
    { value: "bom", key: "bom" },
    { value: "none", key: "none" },
  ];

  function handleMaterialChange(item: string, checked: boolean) {
    if (item === "none") {
      setMaterials(checked ? ["none"] : []);
    } else {
      let newMaterials = checked ? [...materials, item] : materials.filter((m) => m !== item);
      newMaterials = newMaterials.filter((m) => m !== "none");
      setMaterials(newMaterials);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!consent) {
      setError(isZh ? "请先阅读并同意隐私政策" : "Please read and agree to the privacy policy");
      return;
    }
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
      if (res.ok) setSubmitted(true);
      else setError(result.message || (isZh ? "提交失败" : "Submission failed"));
    } catch {
      setError(isZh ? "网络错误，请稍后重试" : "Network error, please try again");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mb-4 text-5xl">✅</div>
        <h3 className="mb-2 text-2xl font-bold text-foreground">{t("success")}</h3>
        <p className="text-muted">{t("successDesc")}</p>
      </div>
    );
  }

  return (
    <>
      <noscript>
        <p className="mb-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm text-yellow-400">
          {isZh ? "提示：当前禁用了 JavaScript，表单将以普通方式提交，请确保信息填写完整。" : "Note: JavaScript is disabled. Form will submit normally, please ensure all info is complete."}
        </p>
      </noscript>
      <form method="post" action="/api/submit-project" onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6" aria-label={isZh ? "项目资料提交表单" : "Project submission form"}>
        {error && (
          <div role="alert" aria-live="assertive" className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>{t("name")} *</label>
            <input id="name" type="text" name="name" required maxLength={50} autoComplete="name" className={inputClass} placeholder={t("namePlaceholder")} />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>{t("company")}</label>
            <input id="company" type="text" name="company" maxLength={100} autoComplete="organization" className={inputClass} placeholder={t("companyPlaceholder")} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>{t("email")} *</label>
            <input id="email" type="email" name="email" required maxLength={100} autoComplete="email" className={inputClass} placeholder={t("emailPlaceholder")} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>{t("phone")}</label>
            <input id="phone" type="tel" name="phone" maxLength={20} autoComplete="tel" className={inputClass} placeholder={t("phonePlaceholder")} />
          </div>
        </div>

        <div>
          <label htmlFor="projectType" className={labelClass}>{t("projectType")} *</label>
          <select id="projectType" name="projectType" required className={inputClass}>
            <option value="">{t("pleaseSelect")}</option>
            {projectTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>{t(`projectTypeOptions.${o.key}`)}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="location" className={labelClass}>{t("location")}</label>
            <input id="location" type="text" name="location" maxLength={100} autoComplete="address-level2" className={inputClass} placeholder={t("locationPlaceholder")} />
          </div>
          <div>
            <label htmlFor="scale" className={labelClass}>{t("scale")}</label>
            <input id="scale" type="text" name="scale" maxLength={50} className={inputClass} placeholder={t("scalePlaceholder")} />
          </div>
        </div>

        <div>
          <label htmlFor="stage" className={labelClass}>{t("stage")} *</label>
          <select id="stage" name="stage" required className={inputClass}>
            <option value="">{t("pleaseSelect")}</option>
            {stageOptions.map((o) => (
              <option key={o.value} value={o.value}>{t(`stageOptions.${o.key}`)}</option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className={labelClass}>{t("materials")}</legend>
          <div className="flex flex-wrap gap-4">
            {materialOptions.map((m) => (
              <label key={m.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  name="materials"
                  value={m.value}
                  checked={materials.includes(m.value)}
                  onChange={(e) => handleMaterialChange(m.value, e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-background text-accent-blue focus:ring-accent-blue"
                />
                <span className="text-sm text-foreground">{t(`materialsOptions.${m.key}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="description" className={labelClass}>{t("description")}</label>
          <textarea id="description" name="description" rows={4} maxLength={2000} className={inputClass} placeholder={t("descriptionPlaceholder")} />
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
            {t("consentPrefix")}{" "}
            <a href={`/${locale}/privacy`} className="text-accent-blue hover:underline" target="_blank">
              {t("consentLinkText")}
            </a>
            {t("consentSuffix")}
          </label>
        </div>

        <button type="submit" disabled={loading} aria-busy={loading} className="w-full rounded-lg bg-accent-orange py-3 text-base font-semibold text-white transition hover:bg-accent-orange/90 disabled:opacity-50">
          {loading ? t("submitting") : t("submit")}
        </button>
      </form>
    </>
  );
}
