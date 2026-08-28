import ProjectForm from "./project-form";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function ProgramsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ status?: string; msg?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programs");
  const sp = await searchParams;
  const status = sp?.status;
  const msg = sp?.msg;

  const items = [
    { name: "SAW Site", key: "site", statusColor: "bg-green-500/10 text-green-400" },
    { name: "SAW Sim", key: "sim", statusColor: "bg-yellow-500/10 text-yellow-400" },
    { name: "SAW Carport", key: "carport", statusColor: "bg-green-500/10 text-green-400" },
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">{t("title")}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">{t("subtitle")}</p>
      </div>

      {/* 联合开发计划 */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">{t("openPrograms.title")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.key} className="gradient-border p-6">
              <h3 className="mb-2 text-lg font-bold text-foreground">{it.name}</h3>
              <p className="mb-4 text-sm text-muted">{t(`openPrograms.${it.key}.desc`)}</p>
              <span className={`rounded-full px-3 py-1 text-xs ${it.statusColor}`}>{t(`openPrograms.${it.key}.status`)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 表单提交结果提示 */}
      {status === "success" && (
        <div role="status" aria-live="polite" className="mb-8 rounded-lg border border-green-500/50 bg-green-500/10 p-6">
          <h2 className="mb-2 text-xl font-bold text-green-400">{t("form.success")}</h2>
          <p className="text-sm text-muted">
            {t("form.successDesc")}
            {msg && <span className="mt-2 block text-foreground">{msg}</span>}
          </p>
        </div>
      )}
      {status === "error" && (
        <div role="alert" aria-live="assertive" className="mb-8 rounded-lg border border-red-500/50 bg-red-500/10 p-6">
          <h2 className="mb-2 text-xl font-bold text-red-400">{t("form.error")}</h2>
          <p className="text-sm text-muted">
            {msg ? decodeURIComponent(msg) : (locale === "zh" ? "请检查填写的信息后重试。" : "Please review your input and try again.")}
          </p>
        </div>
      )}

      {/* 项目提交表单 */}
      <section>
        <h2 className="mb-8 text-2xl font-bold text-foreground">{t("submitTitle")}</h2>
        <div className="gradient-border p-8">
          <ProjectForm />
        </div>
      </section>
    </div>
  );
}
