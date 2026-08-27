import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-8xl font-bold text-accent-blue/20">404</div>
        <h1 className="mb-4 text-2xl font-bold text-foreground">页面未找到</h1>
        <p className="mb-8 text-muted">您访问的页面不存在或已被移除</p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-accent-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-blue/90"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
