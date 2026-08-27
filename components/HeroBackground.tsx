"use client";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 深色渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#1a1a2e] to-[#0f172a]" />
      
      {/* 动态网格 */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* 光晕效果 - 模拟工业科技感 */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-accent-orange/10 blur-3xl delay-1000" />
      
      {/* 扫描线效果 */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.1) 2px, rgba(59,130,246,0.1) 4px)",
        animation: "scan 8s linear infinite"
      }} />
      
      {/* 视频占位（待真实素材） */}
      {/*
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/hero-video.webm" type="video/webm" />
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a]/70 via-[#1a1a2e]/60 to-[#0f172a]/80" />
      */}
    </div>
  );
}
