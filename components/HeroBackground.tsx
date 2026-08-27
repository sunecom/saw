"use client";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 视频背景 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* 渐变覆盖层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a]/80 via-[#1a1a2e]/70 to-[#0f172a]/90" />
      
      {/* 网格动画 */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* 光晕效果 */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-accent-orange/10 blur-3xl" />
    </div>
  );
}
