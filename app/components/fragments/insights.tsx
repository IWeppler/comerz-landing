"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { ArrowUp, Mic, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { useTimeline, useTrack } from "./timeline";

/** Cada pregunta arranca en su momento: dictado, borrador, envío y respuesta. */
const STARTS = [0, 4.2, 8.4];
const LENGTH = 12.8;
/** Separación entre burbujas; igual al `gap-3.5` de la pila. */
const GAP = 14;

const NUM = "font-mono font-semibold tabular-nums";
const ALERT = `${NUM} text-(--color-accent)`;

/** Las cifras son de la tienda de demo, las mismas que muestra el panel. */
const CHAT: { question: string; answer: ReactNode }[] = [
  {
    question: "¿Cuánto me debe Marta López?",
    answer: (
      <>
        Marta López debe <span className={NUM}>$ 184.500</span>. De eso,{" "}
        <span className={ALERT}>$ 62.000</span> está vencido hace 38 días.
      </>
    ),
  },
  {
    question: "¿Cuánto stock tengo en Hombres y cuánto vale?",
    answer: (
      <>
        Tenés <span className={NUM}>342</span> unidades en 58 productos de Hombres. Valen{" "}
        <span className={NUM}>$ 4.860.000</span> al costo y{" "}
        <span className={NUM}>$ 9.120.000</span> a precio de venta.
      </>
    ),
  },
  {
    question: "¿Cuánto vendí esta semana?",
    answer: (
      <>
        Esta semana vendiste <span className={NUM}>$ 4.788.003</span> en 43 ventas,{" "}
        <span className={ALERT}>22% más</span> que la semana pasada.
      </>
    ),
  },
];

/** Repite un tramo de la animación en cada pregunta, corrido a su inicio. */
function perQuestion(times: number[], values: number[]) {
  return {
    times: STARTS.flatMap((s) => times.map((x) => s + x)),
    values: STARTS.flatMap(() => values),
  };
}

/** Barras del dictado: alturas fijas, cada una late con su propio desfase. */
const BARS = [0.45, 0.8, 0.6, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.5, 0.75, 0.35];

function Bar({ t, i, h }: { t: MotionValue<number>; i: number; h: number }) {
  const o = (i % 4) * 0.08;
  const { times, values } = perQuestion(
    [0.3 + o, 0.5 + o, 0.7 + o, 0.9 + o, 1.1 + o, 1.3 + o],
    [0.25, h, 0.35, h * 0.8, 0.3, h * 0.9],
  );
  const scaleY = useTrack(t, times, values);
  return (
    <motion.span
      style={{ scaleY }}
      className="block h-4 w-[3px] origin-center rounded-full bg-(--color-accent)"
    />
  );
}

/** Cuándo entra cada burbuja, relativo al inicio de su pregunta. */
const QUESTION_IN: [number, number] = [2.2, 2.5];
const ANSWER_IN: [number, number] = [2.9, 3.3];

/** Momentos de entrada de las seis burbujas, en orden. */
const BUBBLES_IN = STARTS.flatMap((s) => [
  [s + QUESTION_IN[0], s + QUESTION_IN[1]],
  [s + ANSWER_IN[0], s + ANSWER_IN[1]],
]);

function Bubble({
  t,
  window: [a, b],
  className,
  children,
}: {
  t: MotionValue<number>;
  window: number[];
  className: string;
  children: ReactNode;
}) {
  const opacity = useTrack(t, [a, b], [0, 1]);
  const y = useTrack(t, [a, b], [12, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

function Draft({ t, start, children }: { t: MotionValue<number>; start: number; children: string }) {
  const opacity = useTrack(t, [1.55, 1.8, 2.15, 2.3].map((x) => start + x), [0, 1, 1, 0]);
  return (
    <motion.span style={{ opacity }} className="absolute inset-0 truncate">
      {children}
    </motion.span>
  );
}

/**
 * Lo que hace hoy Comerz Intelligence: el dueño dicta tres preguntas seguidas,
 * las revisa en el borrador, las manda y recibe cada respuesta con sus datos.
 * Las burbujas viejas suben como en cualquier chat. Se reproduce una vez y
 * queda en el último cuadro.
 */
export default function InsightsScene() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTimeline(ref, { length: LENGTH, final: LENGTH, loop: false });

  // El borrador de cada pregunta: dictado, texto, y al mandarlo se vacía.
  const waveTrack = perQuestion([0.15, 0.3, 1.45, 1.6], [0, 1, 1, 0]);
  const wave = useTrack(t, waveTrack.times, waveTrack.values);
  const placeholderTrack = perQuestion([0.1, 0.15, 2.25, 2.4], [1, 0, 0, 1]);
  const placeholder = useTrack(t, placeholderTrack.times, placeholderTrack.values);
  const sendTrack = perQuestion([1.75, 1.9, 2.2, 2.35], [0.35, 1, 1, 0.35]);
  const send = useTrack(t, sendTrack.times, sendTrack.values);
  const rating = useTrack(t, [STARTS[2] + 3.9, STARTS[2] + 4.2], [0, 1]);

  // La pila completa está siempre en el layout, pegada abajo. Mientras una
  // burbuja no entró, la pila baja su alto, así lo último visible queda al
  // pie; al entrar, la pila sube. Todo es transform, nada anima el layout.
  const bubbles = useRef<(HTMLDivElement | null)[]>([]);
  const heights = useRef<number[]>(BUBBLES_IN.map(() => 0));
  const measured = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      heights.current = bubbles.current.map((el) => el?.offsetHeight ?? 0);
      measured.set(measured.get() + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    bubbles.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [measured]);

  const stackY = useTransform(() => {
    measured.get();
    const now = t.get();
    return BUBBLES_IN.reduce((offset, [a, b], i) => {
      const shown = Math.min(1, Math.max(0, (now - a) / (b - a)));
      return offset + (heights.current[i] + GAP) * (1 - shown);
    }, 0);
  });

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Comerz Intelligence: el dueño pregunta cuánto le debe Marta López (184.500 pesos, 62.000 vencidos hace 38 días), cuánto stock tiene en la categoría Hombres y cuánto vale (342 unidades, 4.860.000 pesos al costo y 9.120.000 a precio de venta) y cuánto vendió esta semana (4.788.003 pesos en 43 ventas, 22% más que la semana pasada). Abajo, los botones Me sirvió y No me sirvió."
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lg"
    >
      <div aria-hidden className="flex h-full select-none flex-col">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5 text-[13px] font-semibold text-fg-secondary md:px-7">
          <Sparkles strokeWidth={1.75} className="size-4 text-(--color-accent)" />
          Comerz Intelligence
          <span className="rounded-full bg-(--color-brand-soft) px-2 py-0.5 text-[11px] text-(--color-accent)">
            Beta
          </span>
        </div>

        {/* Las burbujas que suben se desvanecen bajo el encabezado. */}
        <div className="relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-5 py-5 [mask-image:linear-gradient(to_bottom,transparent,black_48px)] md:px-7">
          <motion.div style={{ y: stackY }} className="flex flex-col gap-3.5">
            {CHAT.map(({ question, answer }, i) => (
              <div key={question} className="contents">
                <div ref={(el) => void (bubbles.current[i * 2] = el)} className="ml-auto max-w-[80%]">
                  <Bubble
                    t={t}
                    window={BUBBLES_IN[i * 2]}
                    className="rounded-[18px] rounded-br-md bg-fg px-4 py-2.5 text-[15px] leading-snug text-canvas"
                  >
                    {question}
                  </Bubble>
                </div>
                <div ref={(el) => void (bubbles.current[i * 2 + 1] = el)} className="max-w-[88%]">
                  <Bubble
                    t={t}
                    window={BUBBLES_IN[i * 2 + 1]}
                    className="rounded-[18px] rounded-bl-md bg-surface-alt px-4 py-3 text-[15px] leading-[1.5]"
                  >
                    {answer}
                    {i === CHAT.length - 1 && (
                      <motion.span style={{ opacity: rating }} className="mt-3 flex gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 text-[12px] text-fg-secondary">
                          <ThumbsUp strokeWidth={1.75} className="size-3.5" />
                          Me sirvió
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 text-[12px] text-fg-secondary">
                          <ThumbsDown strokeWidth={1.75} className="size-3.5" />
                          No me sirvió
                        </span>
                      </motion.span>
                    )}
                  </Bubble>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* El borrador: primero escucha, después muestra lo dictado para revisarlo. */}
        <div className="mx-4 mb-4 flex items-center gap-3 rounded-full border border-line-strong bg-canvas py-2 pr-2 pl-4 md:mx-6 md:mb-6">
          <Mic strokeWidth={1.75} className="size-4 shrink-0 text-fg-muted" />
          <span className="relative h-5 flex-1 text-[14px]">
            <motion.span style={{ opacity: placeholder }} className="absolute inset-0 truncate text-fg-muted">
              Preguntale a tu negocio
            </motion.span>
            <motion.span style={{ opacity: wave }} className="absolute inset-y-0 left-0 flex items-center gap-[3px]">
              {BARS.map((h, i) => (
                <Bar key={i} t={t} i={i} h={h} />
              ))}
            </motion.span>
            {CHAT.map(({ question }, i) => (
              <Draft key={question} t={t} start={STARTS[i]}>
                {question}
              </Draft>
            ))}
          </span>
          <motion.span
            style={{ opacity: send }}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-action text-white"
          >
            <ArrowUp strokeWidth={2.25} className="size-4" />
          </motion.span>
        </div>
      </div>
    </div>
  );
}
