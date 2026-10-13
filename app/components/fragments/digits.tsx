"use client";

import { motion, type MotionValue } from "motion/react";
import { useStep } from "./timeline";

/**
 * 0 to 9 stacked; moving the stack shows one digit through a one-line window.
 * Numbers change with a transform instead of new text, so nothing reflows.
 */
export function DigitStrip({ y, line }: { y: MotionValue<number>; line: number }) {
  return (
    <span className="inline-block overflow-hidden" style={{ height: line }}>
      <motion.span style={{ y }} className="flex flex-col">
        {Array.from({ length: 10 }, (_, d) => (
          <span
            key={d}
            className="block text-center"
            style={{ height: line, lineHeight: `${line}px` }}
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/**
 * A formatted number ("128.400") whose digits roll from `from` to `to`
 * (same length) over `window`, left to right, and snap back at `reset`.
 */
export function RollingNumber({
  t,
  from,
  to,
  window,
  reset,
  line,
}: {
  t: MotionValue<number>;
  from: string;
  to: string;
  window: [number, number];
  reset: number;
  line: number;
}) {
  const columns = [...to].filter((c) => /\d/.test(c)).length;
  const spread = (window[1] - window[0]) * 0.35;
  let column = 0;

  return (
    <span className="inline-flex">
      {[...to].map((char, i) => {
        if (!/\d/.test(char)) return <span key={i}>{char}</span>;
        const index = column++;
        const start = window[0] + (spread * index) / Math.max(1, columns - 1);
        return (
          <RollingDigit
            key={i}
            t={t}
            from={Number(from[i] ?? 0)}
            to={Number(char)}
            window={[start, start + (window[1] - window[0]) - spread]}
            reset={reset}
            line={line}
          />
        );
      })}
    </span>
  );
}

function RollingDigit({
  t,
  from,
  to,
  window,
  reset,
  line,
}: {
  t: MotionValue<number>;
  from: number;
  to: number;
  window: [number, number];
  reset: number;
  line: number;
}) {
  const y = useStep(t, window, -from * line, -to * line, reset);
  return <DigitStrip y={y} line={line} />;
}
