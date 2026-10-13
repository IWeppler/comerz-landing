"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { Lightbulb, PackageX } from "lucide-react";
import { RollingNumber } from "./digits";
import { useTimeline, useTrack } from "./timeline";

const LENGTH = 4.6;

/**
 * A bare figure turns into advice: the value of stock that is not moving
 * rolls up, then gives way to the sentence Comerz shows about it, and then
 * to what to do. Plays once.
 */
export default function InsightsScene() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTimeline(ref, { length: LENGTH, final: LENGTH, loop: false });
  // Nothing resets in a one-shot.
  const never = LENGTH + 10;

  const zero = useTrack(t, [0.25, 0.35], [1, 0]);
  const rolling = useTrack(t, [0.25, 0.35], [0, 1]);
  const figure = useTrack(t, [1.9, 2.3], [1, 0]);
  const figureY = useTrack(t, [1.9, 2.3], [0, -18]);
  const figureScale = useTrack(t, [1.9, 2.3], [1, 0.94]);
  const sentence = useTrack(t, [2.1, 2.55], [0, 1]);
  const sentenceY = useTrack(t, [2.1, 2.55], [14, 0]);
  const advice = useTrack(t, [3, 3.45], [0, 1]);
  const adviceY = useTrack(t, [3, 3.45], [10, 0]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Comerz Intelligence convierte una cifra en un aviso: tenés 2.184.000 pesos en productos que no se venden hace 90 días. Considerá armar un combo o un descuento temporal para moverlos."
      className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-lg"
    >
      <div aria-hidden className="select-none">
        <div className="flex items-center gap-2 border-b border-line px-6 py-4 text-[13px] font-semibold tracking-[0.02em] text-fg-secondary md:px-8">
          <Lightbulb strokeWidth={1.75} className="size-4" />
          Comerz Intelligence
        </div>

        <div className="relative min-h-[220px] px-6 py-8 md:min-h-[240px] md:px-8 md:py-10">
          {/* The raw figure */}
          <motion.div
            style={{ opacity: figure, y: figureY, scale: figureScale }}
            className="absolute inset-x-6 top-8 flex origin-left flex-col gap-2 md:inset-x-8 md:top-10"
          >
            <span className="inline-flex items-center gap-2 text-[14px] text-fg-muted">
              <PackageX strokeWidth={1.75} className="size-4" />
              Stock sin movimiento
            </span>
            <span className="relative font-mono text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.03em] tabular-nums">
              <motion.span style={{ opacity: zero }} className="absolute left-0">
                $&nbsp;0
              </motion.span>
              <motion.span style={{ opacity: rolling }} className="inline-flex">
                $&nbsp;
                <RollingNumber
                  t={t}
                  from="0.000.000"
                  to="2.184.000"
                  window={[0.3, 1.5]}
                  reset={never}
                  line={56}
                />
              </motion.span>
            </span>
          </motion.div>

          {/* What it means */}
          <motion.p
            style={{ opacity: sentence, y: sentenceY }}
            className="m-0 max-w-[24ch] font-display text-[clamp(1.5rem,3.2vw,2.125rem)] leading-[1.15] font-semibold tracking-[-0.025em] text-balance"
          >
            Tenés <span className="text-(--color-accent)">$ 2.184.000</span> en productos
            que no se venden hace 90 días.
          </motion.p>

          {/* What to do about it */}
          <motion.p
            style={{ opacity: advice, y: adviceY }}
            className="m-0 mt-6 flex max-w-[44ch] items-start gap-2.5 text-[15px] leading-[1.55] text-fg-secondary"
          >
            <span className="mt-1 h-3.5 w-[3px] shrink-0 rounded-full bg-action" />
            Considerá armar un combo o un descuento temporal para moverlos.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
