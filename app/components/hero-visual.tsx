"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./reveal";

/**
 * The app screenshot starts tilted back and settles flat as it scrolls up,
 * so the hero reads as one continuous movement rather than a static image.
 */
export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ticking = false;
    const frame = () => {
      ticking = false;
      const wrapEl = wrap.current;
      const tiltEl = tilt.current;
      if (!wrapEl || !tiltEl) return;

      const rect = wrapEl.getBoundingClientRect();
      // 1 while the frame is still low on screen, 0 once it has settled.
      const p = Math.max(
        0,
        Math.min(
          1,
          (rect.top - window.innerHeight * 0.12) / (window.innerHeight * 0.72),
        ),
      );

      tiltEl.style.transform = `rotateX(${(p * 15).toFixed(2)}deg) scale(${(1 - p * 0.07).toFixed(4)}) translateY(${(p * -10).toFixed(1)}px)`;
      tiltEl.style.opacity = String(1 - p * 0.18);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    frame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative mx-auto mt-18 max-w-[1160px] [perspective:2200px]"
    >
      <div ref={tilt} className="relative origin-top will-change-transform">
        <div className="pointer-events-none absolute inset-x-[6%] top-[14%] -bottom-[8%] bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.53_0.18_264/0.30),transparent_70%)] blur-[46px]" />

        <div className="relative overflow-hidden rounded-[20px] border border-line bg-surface shadow-lg">
          <div className="flex h-10 items-center gap-2 border-b border-line bg-surface-alt px-4">
            <span className="size-[9px] rounded-full bg-line-strong" />
            <span className="size-[9px] rounded-full bg-line-strong" />
            <span className="size-[9px] rounded-full bg-line-strong" />
            <span className="mx-auto font-mono text-[11px] text-fg-muted">
              app.comerz.app/panel
            </span>
          </div>
          <Image
            src="/assets/panel.png"
            alt="Panel de Comerz con ingresos, unidades, ticket promedio y tendencia de la semana"
            width={1920}
            height={1080}
            priority
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
