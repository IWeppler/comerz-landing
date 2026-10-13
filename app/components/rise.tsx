"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Flips to `true` the first time the element scrolls into view. Without an
 * observer it shows right away, and a timeout covers one that never fires, so
 * nothing stays invisible.
 */
function useShown<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);

    const timer = window.setTimeout(() => setShown(true), 3500);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return [ref, shown] as const;
}

/** Hidden state shared by both wrappers: 30px down, blurred, transparent. */
const HIDDEN =
  "translate-y-[30px] opacity-0 blur-[10px] transition-[opacity,transform,filter] duration-900 ease-brand data-shown:translate-y-0 data-shown:opacity-100 data-shown:blur-[0px]";

/**
 * Rises its children into place, out of a blur, the first time they scroll
 * into view. Renders hidden on the server, so a `<noscript>` rule in the
 * landing page unhides it when JS never runs.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const [ref, shown] = useShown<HTMLDivElement>();

  return (
    <div
      ref={ref}
      id={id}
      data-rise=""
      data-shown={shown ? "" : undefined}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(HIDDEN, className)}
    >
      {children}
    </div>
  );
}

/**
 * A heading whose lines rise one after the other. The lines are given
 * explicitly, so the break falls where the copy wants it and not wherever the
 * width happens to wrap.
 */
export function RiseLines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
}) {
  const [ref, shown] = useShown<HTMLHeadingElement>();

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          data-rise=""
          data-shown={shown ? "" : undefined}
          style={{ transitionDelay: `${i * 120}ms` }}
          // Room below for descenders and the full stop, so the blur is not
          // clipped by the next line.
          className={cn("block pb-[0.08em]", HIDDEN, lineClassName)}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}
