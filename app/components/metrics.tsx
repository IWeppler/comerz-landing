"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { formatAmount } from "@/lib/cn";

/**
 * Counts up to `value` the first time it scrolls into view. The number lives in
 * a motion value, so the count never re-renders React; the server renders the
 * final value.
 */
export function Counter({
  value,
  prefix = "$ ",
  className,
}: {
  value: number;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const count = useMotionValue(value);
  const text = useTransform(count, (v) => `${prefix}${formatAmount(Math.round(v))}`);

  useEffect(() => {
    if (!inView || reduce) return;
    count.set(0);
    const controls = animate(count, value, { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduce, value, count]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

/** Tweens between amounts when `value` changes, e.g. when the billing cycle flips. */
export function Amount({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const amount = useMotionValue(value);
  const text = useTransform(amount, (v) => `$ ${formatAmount(Math.round(v))}`);

  useEffect(() => {
    if (reduce) {
      amount.set(value);
      return;
    }
    const controls = animate(amount, value, { duration: 0.42, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [value, reduce, amount]);

  return <motion.span className={className}>{text}</motion.span>;
}
