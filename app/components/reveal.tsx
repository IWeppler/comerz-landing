"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades + lifts its children into place the first time they scroll into view.
 * Renders hidden on the server, so a `<noscript>` rule in the layout unhides it
 * when JS never runs, and a timeout below covers an observer that never fires.
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
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);

    // Safety net: nothing stays invisible.
    const timer = window.setTimeout(() => setShown(true), 3500);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      data-reveal=""
      data-shown={shown ? "" : undefined}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "translate-y-[22px] opacity-0 transition-[opacity,transform] duration-700 ease-brand",
        "data-shown:translate-y-0 data-shown:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
