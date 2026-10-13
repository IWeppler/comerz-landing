"use client";

import { motion, type MotionValue } from "motion/react";
import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/cn";

/**
 * The backdrop every small fragment sits on: a sunken panel with one product
 * card floating in the middle. The card fades between loops.
 */
export function Stage({
  stageRef,
  opacity,
  label,
  children,
  className,
}: {
  stageRef: RefObject<HTMLDivElement | null>;
  opacity?: MotionValue<number>;
  /** What the fragment shows, for screen readers; the scene itself is hidden. */
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={label}
      className="flex h-full min-h-[380px] items-center justify-center rounded-2xl border border-line bg-sunken px-5 py-10 md:px-10"
    >
      <motion.div
        aria-hidden
        style={{ opacity }}
        className={cn(
          "relative w-full max-w-[400px] overflow-hidden rounded-2xl border border-line bg-surface shadow-lg select-none",
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Small status pill in the app's own style. */
export function Pill({
  tone,
  children,
  className,
}: {
  tone: "ok" | "warn" | "danger" | "neutral";
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-[7px] px-2 text-[12px] font-medium whitespace-nowrap",
        tone === "ok" && "bg-ok-bg text-ok",
        tone === "warn" && "bg-warn-bg text-warn",
        tone === "danger" && "bg-danger-bg text-danger",
        tone === "neutral" && "bg-surface-alt text-fg-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
