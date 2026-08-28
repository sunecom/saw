import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

const articles: Record<string, { title: string; date: string; tags: string[]; content: string; author?: string }> = {
  "saw-core-architecture": {
    title: "SAW Core 架构设计思路",
    date: "2026-08-27",
    tags: ["架构", "SAW Core"],
    author: "SAW Team",
    content: `SAW Core 是整个光伏阵列智造计划的技术底座，负责连接项目评估、场景建模、施工仿真和现场验证四个环节。

## 设计原则

SAW Core 采用适配器模式，将不同项目的数据、技能、事件和设备统一管理：

- **数据标准化**：统一的光伏阵列数据模型
- **技能可复用**：施工工序模块化为可调用技能
- **事件驱动**：现场状态变化实时同步
- **设备无关**：通过适配器支持多种机器人

## 技术架构

SAW Core 分为四层：

1. **数据层**：项目、阵列、工序的标准化存储
2. **技能层**：可复用的施工工序模块
3. **事件层**：状态变化通知与订阅
4. **适配层**：设备与外部系统接口

## 下一步

当前 SAW Core 处于原型阶段，正在 SAW Carport 项目中验证核心概念。后续将扩展到大型地面电站场景。`,
  },
  "carport-mvp-plan": {
    title: "SAW Carport MVP 计划",
    date: "2026-08-26",
    tags: ["Carport", "MVP"],
    author: "SAW Team",
    content: `SAW Carport 是 SAW 技术的首个公开工程示范场景，目标是验证机器人施工光伏车棚的可行性。

## 场景选择

选择商业/园区停车场作为示范场景：

- 规模适中，适合快速验证
- 可参观性强，便于展示
- 结构相对标准化，利于机器人适配

## 验证目标

MVP 阶段重点验证：

1. 机器人友好型支架的可安装性
2. 简化施工工序的效率提升
3. 数据闭环对质量控制的帮助

## 时间节点

- **Q3 2026**：完成场景建模与仿真
- **Q4 2026**：现场施工验证
- **Q1 2027**：数据复盘与优化`,
  },
  "robot-friendly-mount-design": {
    title: "机器人友好型支架设计探索",
    date: "2026-08-25",
    tags: ["支架", "机器人"],
    author: "SAW Team",
    content: `传统光伏支架设计以人工安装为前提，未考虑机器人作业的需求。SAW Frame 项目旨在定义机器人友好型支架的接口标准。

## 设计挑战

机器人安装支架需要考虑：

- **定位精度**：机器人视觉与机械臂的公差范围
- **抓取点**：支架结构需提供明确的抓取位置
- **连接方式**：螺栓、卡扣等连接需适配机器人操作

## 初步方案

SAW Frame 的初步设计包括：

1. 标准化接口定义
2. 模块化支架单元
3. 机器人施工工序优化

## 开放讨论

支架设计需要与支架厂商、机器人公司协同。欢迎相关领域的合作伙伴参与讨论。`,
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "文章未找到" };
  const description = article.content.split("\n\n")[0].slice(0, 160);
  return {
    title: `${article.title}｜SAW ArrayWright`,
    description,
    alternates: { canonical: `/lab/${slug}` },
    openGraph: {
      title: `${article.title}｜SAW ArrayWright`,
      description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "SAW Arraywright"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title}｜SAW ArrayWright`,
      description,
    },
  };
}

// 简易 inline markdown：解析 **bold**、行内 [text](url)、段落/标题/列表
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // 解析 **bold** 和 [text](url)
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

export default async function LabPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  const articleUrl = `https://saw.aitomoney.online/lab/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.content.split("\n\n")[0].slice(0, 160),
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: article.author || "SAW ArrayWright" },
    publisher: {
      "@type": "Organization",
      name: "SAW ArrayWright",
      logo: { "@type": "ImageObject", url: "https://saw.aitomoney.online/logo.webp" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/lab" className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
        ← 返回实验室
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <time className="text-sm text-muted" dateTime={article.date}>{article.date}</time>
          <div className="flex gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs text-accent-blue">{tag}</span>
            ))}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">{article.title}</h1>
      </header>

      <div className="prose prose-invert max-w-none">
        {renderMarkdown(article.content)}
      </div>
    </article>
  );
}
