"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { Pill, Stage } from "./stage";
import { useLoopFade, useStep, useTimeline } from "./timeline";

const LENGTH = 8;
const FINAL = 6.5;

/**
 * A customer's running account: an overdue debt, a payment comes in, the
 * balance goes to zero and the debt reads as settled.
 */
export default function CuentaScene({ active = true }: { active?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTimeline(ref, { length: LENGTH, final: FINAL, active });
  const { opacity, reset } = useLoopFade(t, LENGTH);

  const payment = useStep(t, [0.8, 1.2], 0, 1, reset);
  const paymentX = useStep(t, [0.8, 1.2], 12, 0, reset);
  const owed = useStep(t, [1.7, 2], 1, 0, reset);
  const owedY = useStep(t, [1.7, 2], 0, -10, reset);
  const settled = useStep(t, [1.8, 2.1], 0, 1, reset);
  const settledY = useStep(t, [1.8, 2.1], 10, 0, reset);
  const overdue = useStep(t, [2.2, 2.5], 1, 0, reset);
  const paid = useStep(t, [2.2, 2.5], 0, 1, reset);

  return (
    <Stage
      stageRef={ref}
      opacity={opacity}
      label="Cuenta corriente en Comerz: Marcela Gómez debe 46.000 pesos vencidos, entra un pago por transferencia, el saldo queda en cero y la cuenta pasa a saldada."
    >
      <div className="flex items-center gap-3 px-6 pt-5.5">
        <span className="flex size-10 items-center justify-center rounded-full bg-surface-alt text-[13px] font-semibold text-fg-secondary">
          MG
        </span>
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold">Marcela Gómez</span>
          <span className="text-[12px] text-fg-muted">Cuenta corriente</span>
        </span>
      </div>

      <div className="flex items-end justify-between px-6 pt-6 pb-5">
        <span className="flex flex-col gap-1.5">
          <span className="text-[13px] text-fg-secondary">Saldo</span>
          <span className="relative block h-9 w-[150px] overflow-hidden font-mono text-[28px] leading-9 font-semibold tabular-nums">
            <motion.span style={{ opacity: owed, y: owedY }} className="absolute left-0">
              $&nbsp;46.000
            </motion.span>
            <motion.span style={{ opacity: settled, y: settledY }} className="absolute left-0">
              $&nbsp;0
            </motion.span>
          </span>
        </span>
        <span className="relative mb-1.5">
          <motion.span style={{ opacity: overdue }} className="block">
            <Pill tone="danger">Vencida</Pill>
          </motion.span>
          <motion.span style={{ opacity: paid }} className="absolute top-0 right-0">
            <Pill tone="ok">Saldada</Pill>
          </motion.span>
        </span>
      </div>

      <ul className="m-0 flex list-none flex-col p-0 text-[14px]">
        <li className="flex h-[54px] items-center justify-between border-t border-line px-6">
          <span className="flex flex-col">
            <span className="font-medium">Compra</span>
            <span className="text-[12px] text-fg-muted">12/9</span>
          </span>
          <span className="font-mono font-medium tabular-nums">$ 46.000</span>
        </li>
        <motion.li
          style={{ opacity: payment, x: paymentX }}
          className="flex h-[54px] items-center justify-between border-t border-line px-6"
        >
          <span className="flex flex-col">
            <span className="font-medium">Pago</span>
            <span className="text-[12px] text-fg-muted">Transferencia</span>
          </span>
          <span className="font-mono font-medium text-ok tabular-nums">− $ 46.000</span>
        </motion.li>
      </ul>
    </Stage>
  );
}
