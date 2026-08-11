"use client";

import { useEffect, useRef, useState } from "react";
import { cn, formatAmount } from "@/lib/cn";
import { prefersReducedMotion } from "./reveal";
import { HoverCard, HoverLink, SlidingPill } from "./hover";

type Cycle = "m" | "s";

type Plan = {
  name: string;
  monthly: number;
  semester: number;
  blurb: string;
  featured?: boolean;
  features: string[];
  excluded?: string;
  note?: string;
};

const PLANS: Plan[] = [
  {
    name: "Emprendedor",
    monthly: 30000,
    semester: 24000,
    blurb: "Para el comercio que atiende una persona. Un usuario.",
    features: [
      "Punto de venta, caja y ventas",
      "Gestión de productos y control de stock",
      "Catálogo online por WhatsApp",
      "Cuenta corriente",
      "Historial de ventas y tickets digitales",
    ],
    note: "(hasta 100 clientes activos)",
    excluded: "Sin reportes avanzados ni multi-caja",
  },
  {
    name: "Gestión",
    monthly: 50000,
    semester: 40000,
    blurb: "Para el comercio con empleados y más de un turno de caja.",
    featured: true,
    features: [
      "Todo lo de Emprendedor",
      "Varios usuarios con permisos",
      "Multi-caja por turno",
      "Reportes avanzados de rotación y rentabilidad",
      "Clientes en cuenta corriente sin tope",
    ],
  },
  {
    name: "Empresa",
    monthly: 70000,
    semester: 56000,
    blurb: "Para el que ya tiene más de un local y necesita verlos juntos.",
    features: [
      "Todo lo de Gestión",
      "Varias sucursales en un solo panel",
      "Stock y transferencias entre locales",
      "Usuarios ilimitados con roles",
      "Soporte prioritario y ayuda para migrar",
    ],
  },
];

/** Tweens the displayed price whenever the billing cycle changes. */
function Price({ plan, cycle }: { plan: Plan; cycle: Cycle }) {
  const target = cycle === "s" ? plan.semester : plan.monthly;
  const [display, setDisplay] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (prefersReducedMotion()) {
      from.current = target;
      setDisplay(target);
      return;
    }

    const start = from.current;
    if (start === target) return;

    const duration = 420;
    const t0 = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(start + (target - start) * eased);
      setDisplay(next);
      from.current = next;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span className="font-mono text-[40px] font-medium tracking-[-0.035em]">
      $ {formatAmount(display)}
    </span>
  );
}

function Check() {
  return (
    <span aria-hidden className="text-sm leading-[1.5] text-ok">
      ✓
    </span>
  );
}

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("m");

  const note =
    cycle === "s" ? "Pagando el semestre por adelantado" : "Facturado mes a mes";

  return (
    <section id="precios" className="mx-auto max-w-[1200px] px-5 pt-30 md:px-8">
      <div className="mb-12 flex flex-col items-center gap-3.5 text-center">
        <span className="text-xs font-semibold tracking-[0.09em] text-brand uppercase">
          Precio
        </span>
        <h2 className="m-0 max-w-[20ch] text-[clamp(2rem,5vw,3rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
          Elegí el plan que le queda a tu comercio
        </h2>
        <p className="m-0 max-w-[54ch] text-[17px] leading-[1.55] text-pretty text-fg-secondary">
          Sin módulos que se compran aparte y sin permanencia. Pagando el semestre entero
          te ahorrás un 20%, y arrancás con 14 días gratis para probarlo con tu mercadería
          de verdad.
        </p>

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-3.5">
          <div className="flex gap-1 rounded-xl border border-line bg-surface-alt p-1">
            {(
              [
                ["m", "Mensual"],
                ["s", "Semestral"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={cycle === id}
                onClick={() => setCycle(id)}
                className={cn(
                  "relative cursor-pointer rounded-[9px] px-4.5 py-2.25 font-sans text-sm font-medium transition-colors duration-250 ease-brand",
                  cycle === id ? "text-fg" : "text-fg-secondary hover:text-fg",
                )}
              >
                {cycle === id && (
                  <SlidingPill
                    group="cycle-active"
                    className="absolute inset-0 rounded-[9px] border border-line bg-surface shadow-sm"
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
          <span className="inline-flex h-6.5 items-center rounded-full border border-ok-border bg-ok-bg px-2.75 text-xs font-medium whitespace-nowrap text-ok">
            Ahorrás 20%
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1080px] items-start gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <HoverCard
            key={plan.name}
            lift={-6}
            className={cn(
              "overflow-hidden rounded-[20px] bg-surface transition-[box-shadow,border-color] duration-350 ease-brand",
              plan.featured
                ? "relative border-2 border-action shadow-[0_20px_50px_oklch(0.53_0.18_264/0.16)] hover:shadow-[0_28px_64px_oklch(0.53_0.18_264/0.22)]"
                : "border border-line hover:border-line-strong hover:shadow-md",
            )}
          >
            <div className="flex flex-col gap-1.75 border-b border-line px-6.5 pt-7 pb-5.5">
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-base font-semibold">{plan.name}</span>
                {plan.featured && (
                  <span className="inline-flex h-6 items-center rounded-full bg-action px-2.5 text-xs font-medium whitespace-nowrap text-action-fg">
                    El más elegido
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.75">
                <Price plan={plan} cycle={cycle} />
                <span className="text-sm text-fg-muted">/ mes</span>
              </div>
              <span className="min-h-[17px] text-xs text-fg-muted">{note}</span>
              <p className="mt-1.5 mb-0 text-sm leading-[1.55] text-fg-secondary">
                {plan.blurb}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 px-6.5 py-5.5">
              {plan.features.map((feature, i) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-sm leading-[1.5] text-fg-secondary">
                    {feature}
                    {plan.note && i === 3 && (
                      <span className="text-fg-muted"> {plan.note}</span>
                    )}
                  </span>
                </div>
              ))}
              {plan.excluded && (
                <div className="flex items-start gap-2.5">
                  <span aria-hidden className="text-sm leading-[1.5] text-fg-muted">
                    —
                  </span>
                  <span className="text-sm leading-[1.5] text-fg-muted">
                    {plan.excluded}
                  </span>
                </div>
              )}
            </div>

            <div className="px-6.5 pb-6.5">
              <HoverLink
                href="#top"
                lift={-1}
                press={0.985}
                className={cn(
                  "inline-flex h-11.5 w-full items-center justify-center rounded-xl text-[15px] font-medium no-underline transition-colors",
                  plan.featured
                    ? "bg-action text-action-fg hover:bg-action-hover"
                    : "border border-line-strong bg-surface text-fg hover:bg-surface-alt",
                )}
              >
                Probar 14 días gratis
              </HoverLink>
            </div>
          </HoverCard>
        ))}
      </div>
    </section>
  );
}
