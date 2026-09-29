"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/*
 * The notebook is an object, not UI: it keeps its paper colours in both themes
 * and owns its palette here instead of borrowing the page tokens.
 */
const PAPER = "oklch(0.972 0.014 92)";
const RULE = "oklch(0.83 0.035 235 / 0.55)";
const MARGIN = "oklch(0.7 0.13 22 / 0.55)";
const INK = "oklch(0.3 0.04 262)";
const RED_PEN = "oklch(0.55 0.19 27)";
const COVER = "oklch(0.26 0.012 60)";

/** One ruled line of the page, in px. Every row sits on exactly one line. */
const LINE = 44;

type Row = {
  item: string;
  amount: string;
  /** Written, then crossed out by hand. */
  struck?: boolean;
  /** Scribbled in red next to the row. */
  note?: string;
};

const ROWS: Row[] = [
  { item: "Remera oversize M", amount: "18.900" },
  { item: "Jean recto 42", amount: "42.500" },
  { item: "Buzo L", amount: "31.000", struck: true, note: "devolvió" },
  { item: "Campera puffer", amount: "74.000" },
  { item: "Marta (fiado)", amount: "30.000", note: "¿pagó?" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Reduced motion is handled in CSS, not with useReducedMotion: the server
 * cannot know the preference, so a JS branch would render different HTML on
 * each side and break hydration. These overrides beat Motion inline styles.
 * The result: the page shows fully written, open and still.
 */
const STILL_TILT = "motion-reduce:![transform:rotate(-3deg)]";

/** When each row starts being written, in seconds after mount. */
const rowAt = (i: number) => 0.35 + i * 0.32;
const TOTAL_AT = rowAt(ROWS.length) + 0.2;

/**
 * A page of the shop's sales notebook, written in as the page loads: sales,
 * a return crossed out, a debt with a question mark, a total that was wrong.
 * As the hero scrolls away the hard cover swings down and closes it, which is
 * the headline happening.
 */
export function HeroNotebook({ handClassName }: { handClassName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Page scroll at which the whole page has been in view: 0 on desktop, where
  // it starts on screen; further down on phones, where it sits under the copy.
  // The cover only starts closing after that, so it is never shut unseen.
  const seenAt = useRef(0);
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const bottom = el.getBoundingClientRect().bottom + window.scrollY;
      seenAt.current = Math.max(0, bottom - window.innerHeight + 24);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  /** Scroll past the point where the page was seen, 0 before it. */
  const past = useTransform(scrollY, (y) => Math.max(0, y - seenAt.current));
  // Past 90deg the cover faces away (invisible, see backface); from there it
  // swings toward the reader and down onto the page. Negative angles would put
  // it behind the page instead.
  const coverRotate = useTransform(past, [40, 320], [91, 0]);
  // Edge-on it would still show as a hairline across the top of the page.
  const coverOpacity = useTransform(past, [40, 70], [0, 1]);
  const tilt = useTransform(past, [0, 320], [-3, 0]);

  // Writing starts when the page is on screen, not on mount: on phones it
  // sits below the fold and would otherwise be finished before anyone sees it.
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const write = (delay: number) => ({
    initial: { opacity: 0, x: -6 },
    animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 },
    transition: { duration: 0.45, delay, ease: EASE },
  });
  const strike = (delay: number) => ({
    initial: { scaleX: 0 },
    animate: { scaleX: inView ? 1 : 0 },
    transition: { duration: 0.35, delay, ease: EASE },
  });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[520px] px-2 [perspective:1800px] md:px-0">
      <motion.div
        style={{ rotate: tilt }}
        className={cn("relative [transform-style:preserve-3d]", STILL_TILT)}
      >
        {/* The page */}
        <div
          role="img"
          aria-label="Página de un cuaderno de ventas escrita a mano: una devolución tachada, un fiado sin cobrar y una suma corregida."
          className={cn("relative overflow-hidden rounded-[6px] pt-[104px] pr-5 pb-10 pl-[64px] md:pr-9 md:pl-[68px]", handClassName)}
          style={{
            backgroundColor: PAPER,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 ${LINE - 1}px, ${RULE} ${LINE - 1}px ${LINE}px)`,
            backgroundPosition: `0 ${104 - 8}px`,
            color: INK,
            boxShadow:
              "0 1px 0 oklch(0.9 0.01 90), 0 2px 0 oklch(0.94 0.01 90), 0 3px 0 oklch(0.88 0.01 90), 0 40px 70px -28px oklch(0.3 0.05 50 / 0.45)",
          }}
        >
          <div aria-hidden>
            {/* Double red margin, like every school notebook. */}
            <span className="absolute inset-y-0 left-[50px] w-px" style={{ background: MARGIN }} />
            <span className="absolute inset-y-0 left-[54px] w-px" style={{ background: MARGIN }} />

            <motion.p
              {...write(0.1)}
              className="motion-reduce:!opacity-100 motion-reduce:![transform:none] absolute top-8 right-6 left-[68px] m-0 flex items-baseline justify-between text-[46px] leading-none md:right-9"
            >
              <span>Ventas</span>
              <span className="text-[36px]">mar 29/9</span>
            </motion.p>

            <ul className="m-0 list-none p-0">
              {ROWS.map((row, i) => (
                <motion.li
                  key={row.item}
                  {...write(rowAt(i))}
                  className="motion-reduce:!opacity-100 motion-reduce:![transform:none] relative flex items-end justify-between gap-3 text-[31px] sm:text-[36px] md:text-[40px]"
                  style={{ height: LINE }}
                >
                  <span className="relative whitespace-nowrap">
                    {row.item}
                    {row.struck && (
                      <motion.span
                        {...strike(rowAt(i) + 0.55)}
                        className="motion-reduce:![transform:none] absolute top-[58%] -right-1 -left-1 h-[2.5px] origin-left -rotate-2 rounded-full"
                        style={{ background: INK }}
                      />
                    )}
                  </span>
                  {row.note && (
                    <motion.span
                      {...write(rowAt(i) + 0.8)}
                      className="motion-reduce:!opacity-100 motion-reduce:![transform:none] absolute right-[128px] -bottom-1 hidden rotate-[-6deg] text-[34px] sm:block"
                      style={{ color: RED_PEN }}
                    >
                      {row.note}
                    </motion.span>
                  )}
                  <span className="relative tabular-nums">
                    {row.amount}
                    {row.struck && (
                      <motion.span
                        {...strike(rowAt(i) + 0.7)}
                        className="motion-reduce:![transform:none] absolute top-[58%] -right-1 -left-1 h-[2.5px] origin-left rotate-3 rounded-full"
                        style={{ background: INK }}
                      />
                    )}
                  </span>
                </motion.li>
              ))}

              {/* The sum: underlined, written wrong, crossed out, redone in red. */}
              <motion.li
                {...write(TOTAL_AT)}
                className="motion-reduce:!opacity-100 motion-reduce:![transform:none] relative mt-[44px] flex items-end justify-between text-[36px] sm:text-[40px] md:text-[46px]"
                style={{ height: LINE }}
              >
                <span>Caja</span>
                <span className="relative flex items-end gap-3">
                  <span className="relative tabular-nums">
                    133.400
                    <motion.span
                      {...strike(TOTAL_AT + 0.6)}
                      className="motion-reduce:![transform:none] absolute top-1/2 -right-1 -left-1 h-[3px] origin-left -rotate-6 rounded-full"
                      style={{ background: RED_PEN }}
                    />
                  </span>
                  <motion.span
                    {...write(TOTAL_AT + 1)}
                    className="motion-reduce:!opacity-100 motion-reduce:![transform:none] tabular-nums"
                    style={{ color: RED_PEN }}
                  >
                    135.400
                  </motion.span>
                </span>
                <motion.span
                  {...strike(TOTAL_AT)}
                  className="motion-reduce:![transform:none] absolute -top-1 right-0 h-[2px] w-[58%] origin-right rounded-full"
                  style={{ background: INK }}
                />
              </motion.li>
              <motion.li
                {...write(TOTAL_AT + 1.4)}
                className="motion-reduce:!opacity-100 motion-reduce:![transform:none] flex items-end justify-end text-[28px] sm:text-[32px] md:text-[34px]"
                style={{ height: LINE, color: RED_PEN }}
              >
                ¿y los 2.000 que faltan?
              </motion.li>
            </ul>
          </div>
        </div>

        {/* The hard cover, hinged on the top edge. It starts edge-on with its
          back to the reader, so it is invisible until the scroll folds it
          down over the page. */}
        <motion.div
            aria-hidden
            style={{ rotateX: coverRotate, opacity: coverOpacity, backgroundColor: COVER }}
            className="absolute inset-0 origin-top rounded-[6px] [backface-visibility:hidden] motion-reduce:hidden"
          >
            <span className="absolute inset-x-0 top-0 h-7 rounded-t-[6px] bg-black/25" />
            <span
              className={cn(
                "absolute top-[38%] left-1/2 flex w-[58%] -translate-x-1/2 flex-col items-center gap-1 rounded-[4px] px-5 py-4",
                handClassName,
              )}
              style={{ backgroundColor: PAPER, color: INK }}
            >
              <span className="text-[52px] leading-none">VENTAS</span>
              <span className="text-[36px] leading-none">2026</span>
            </span>
          </motion.div>
      </motion.div>
    </div>
  );
}
