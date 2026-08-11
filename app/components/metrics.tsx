"use client";

import { useState } from "react";
import { cn, formatAmount } from "@/lib/cn";
import { prefersReducedMotion, useInView } from "./reveal";

/** Counts up to `value` when scrolled into view. Renders the final value on the server. */
export function Counter({
  value,
  prefix = "$ ",
  className,
}: {
  value: number;
  prefix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);

  const ref = useInView<HTMLSpanElement>(() => {
    if (prefersReducedMotion()) return;

    const duration = 1100;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(value * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatAmount(display)}
    </span>
  );
}

/** Horizontal meter that grows to `pct` when scrolled into view. */
export function Bar({
  pct,
  tone,
  delay = 0,
}: {
  pct: number;
  tone: "warn" | "danger";
  delay?: number;
}) {
  const [grown, setGrown] = useState(false);
  const ref = useInView<HTMLDivElement>(() => setGrown(true));

  return (
    <div ref={ref} className="h-[5px] overflow-hidden rounded-[3px] bg-sunken">
      <div
        style={{ width: grown ? `${pct}%` : 0, transitionDelay: `${delay}ms` }}
        className={cn(
          "h-full rounded-[3px] transition-[width] duration-1000 ease-brand",
          tone === "warn" ? "bg-warn" : "bg-danger",
        )}
      />
    </div>
  );
}
