"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";
import type { ReactNode } from "react";

/**
 * Hover primitives for the landing page.
 *
 * Motion only drives transforms — springs read better than a fixed-duration
 * curve on something the pointer starts and stops at will. Paint properties
 * (color, border, shadow) stay on CSS `hover:` utilities, so the two systems
 * never fight over the same declaration.
 */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

/** Slower, heavier spring for the larger surfaces (cards, panels). */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.9,
};

/** A card that lifts under the pointer and settles back on a spring. */
export function HoverCard({
  children,
  className,
  lift = -4,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: lift }}
      transition={SPRING_SOFT}
    >
      {children}
    </motion.div>
  );
}

/** A link that lifts, shifts or presses under the pointer. */
export function HoverLink({
  children,
  href,
  className,
  lift = -2,
  shift = 0,
  press = 0.98,
  ...rest
}: {
  children: ReactNode;
  href: string;
  className?: string;
  lift?: number;
  shift?: number;
  press?: number;
} & Omit<HTMLMotionProps<"a">, "href" | "className" | "children">) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={className}
      whileHover={reduce ? undefined : { y: lift, x: shift }}
      whileTap={reduce ? undefined : { scale: press, y: 0 }}
      transition={SPRING}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

/**
 * The pill that slides between the items of a segmented control or nav row.
 * Every instance sharing a `group` id animates as one element.
 */
export function SlidingPill({
  group,
  className,
  fade = false,
}: {
  group: string;
  className: string;
  /** Fades in and out on mount — for pills that only exist while hovered. */
  fade?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      layoutId={group}
      className={className}
      initial={fade ? { opacity: 0 } : false}
      animate={fade ? { opacity: 1 } : undefined}
      exit={fade ? { opacity: 0 } : undefined}
      transition={reduce ? { duration: 0 } : SPRING}
    />
  );
}
