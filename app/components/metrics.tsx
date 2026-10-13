"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect } from "react";
import { formatAmount } from "@/lib/cn";

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
