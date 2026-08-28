import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";

// 文章元信息（slug, date, tags）— 正文用 t() 拿双语
const articles: Record<string, { slug: string; date: string; tagsZh: string[]; tagsEn: string[]; author?: string }> = {
  "saw-core-architecture": {
    slug: "sawCore",
    date: "2026-08-27",
    tagsZh: ["架构", "SAW Core"],
    tagsEn: ["Architecture", "SAW Core"],
    author: "SAW Team",
  },
  "carport-mvp-plan": {
    slug: "carport",
    date: "2026-08-26",
    tagsZh: ["车棚", "MVP"],
    tagsEn: ["Carport", "MVP"],
    author: "SAW Team",
  },
  "robot-friendly-mount-design": {
    slug: "mount",
    date: "2026-08-25",
    tagsZh: ["支架", "机器人"],
    tagsEn: ["Mount", "Robotics"],
    author: "SAW Team",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const article = articles[slug];
  if (!article) return { title: "文章未找到" };
  const t = await getTranslations("labArticles");
  const title = t(`${article.slug}.title`);
  const body = t(`${article.slug}.body`);
  const description = body.split("\n\n")[0].slice(0, 160);
  return {
    title: `${title}｜SAW ArrayWright`,
    description,
    alternates: { canonical: `/${locale}/lab/${slug}` },
    openGraph: {
      title: `${title}｜SAW ArrayWright`,
      description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "SAW ArrayWright"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}｜SAW ArrayWright`,
      description,
    },
  };
}

// 简易 inline markdown：解析 **bold**、行内 [text](url)
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIdx = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      nodes.push(text.slice(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++} className="font-semibold text-foreground">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("[")) {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        nodes.push(<a key={key++} href={linkMatch[2]} className="text-accent-blue hover:underline">{linkMatch[1]}</a>);
      }
    }
    lastIdx = match.index + token.length;
  }
  if (lastIdx < text.length) {
    nodes.push(text.slice(lastIdx));
  }
  return nodes;
}

function renderMarkdown(content: string): ReactNode {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i} className="mb-4 mt-8 text-2xl font-bold text-foreground">{block.slice(3)}</h2>;
    }
    if (block.startsWith("### ")) {
      return <h3 key={i} className="mb-3 mt-6 text-xl font-semibold text-foreground">{block.slice(4)}</h3>;
    }
    if (block.match(/^-\s/m) || block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="my-4 list-disc space-y-2 pl-6 marker:text-muted">
          {items.map((item, j) => (
            <li key={j} className="text-muted leading-relaxed">{renderInline(item.slice(2))}</li>
          ))}
        </ul>
      );
    }
    if (block.match(/^\d+\.\s/m) || block.match(/^\d+\. /)) {
      const items = block.split("\n").filter((l) => /^\d+\. /.test(l));
      return (
        <ol key={i} className="my-4 list-decimal space-y-2 pl-6 marker:text-marker marker:font-semibold">
          {items.map((item, j) => (
            <li key={j} className="text-muted leading-relaxed">{renderInline(item.replace(/^\d+\. /, ""))}</li>
          ))}
        </ol>
      );
    }
    if (block.startsWith("> ")) {
      const lines = block.split("\n").map((l) => l.replace(/^> ?/, ""));
      return (
        <blockquote key={i} className="my-4 border-l-4 border-accent-blue/40 bg-accent-blue/5 px-4 py-2 italic text-muted">
          {lines.map((l, j) => <p key={j}>{renderInline(l)}</p>)}
        </blockquote>
      );
    }
    return <p key={i} className="my-3 leading-relaxed text-muted">{renderInline(block)}</p>;
  });
}

export default async function LabPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  const t = await getTranslations("labArticles");
  const title = t(`${article.slug}.title`);
  const body = t(`${article.slug}.body`);
  const description = body.split("\n\n")[0].slice(0, 160);

  const articleUrl = `https://saw.aitomoney.online/${locale}/lab/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: article.author || "SAW ArrayWright" },
    publisher: {
      "@type": "Organization",
      name: "SAW ArrayWright",
      logo: { "@type": "ImageObject", url: "https://saw.aitomoney.online/logo.webp" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href={"/" + locale + "/lab"} className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
        {locale === "zh" ? "← 返回实验室" : "← Back to Lab"}
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <time className="text-sm text-muted" dateTime={article.date}>{article.date}</time>
          <div className="flex gap-2">
            {(locale === "zh" ? article.tagsZh : article.tagsEn).map((tag) => (
              <span key={tag} className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs text-accent-blue">{tag}</span>
            ))}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">{title}</h1>
      </header>

      <div className="prose prose-invert max-w-none">
        {renderMarkdown(body)}
      </div>
    </article>
  );
}
