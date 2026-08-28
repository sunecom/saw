import type { MetadataRoute } from "next";

const SITE = "https://saw.aitomoney.online";
const LOCALES = ["zh", "en"] as const;

const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "capabilities", priority: 0.8, changeFrequency: "monthly" },
  { path: "programs", priority: 0.8, changeFrequency: "monthly" },
  { path: "lab", priority: 0.7, changeFrequency: "weekly" },
  { path: "lab/saw-core-architecture", priority: 0.6, changeFrequency: "monthly" },
  { path: "lab/carport-mvp-plan", priority: 0.6, changeFrequency: "monthly" },
  { path: "lab/robot-friendly-mount-design", priority: 0.6, changeFrequency: "monthly" },
  { path: "privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const page of PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE}/${locale}${page.path ? "/" + page.path : ""}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l === "zh" ? "zh-CN" : "en-US", `${SITE}/${l}${page.path ? "/" + page.path : ""}`])
          ),
        },
      });
    }
  }
  return entries;
}
