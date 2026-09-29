"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { AUTH_URL } from "@/lib/links";
import { Amount } from "./metrics";
import { HoverLink, SlidingPill } from "./hover";
import { Reveal } from "./reveal";

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

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("s");

  const note =
    cycle === "s" ? "Pagando el semestre por adelantado" : "Facturado mes a mes";

  return (
    <section id="precios" className="mx-auto max-w-[1200px] px-5 pt-24 md:px-8 md:pt-36">
      <Reveal className="mb-10 flex flex-col gap-8 md:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-[600px] flex-col gap-4">
          <span className="text-sm font-semibold text-(--color-accent)">
            Planes para cada etapa de tu negocio
          </span>
          <h2 className="m-0 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
            Todo lo que necesitás para llevar tu comercio
          </h2>
          <p className="m-0 text-lg leading-[1.55] text-pretty text-fg-secondary">
            Empezá gratis durante 14 días y elegí el plan que mejor se adapte a tu
            negocio.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2.5 lg:items-end">
          <div className="flex gap-1 rounded-[10px] border border-line bg-surface-alt p-1">
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
                  "relative cursor-pointer rounded-[7px] border-0 bg-transparent px-4.5 py-2.25 font-sans text-sm font-medium transition-colors duration-250 ease-brand",
                  cycle === id ? "text-fg" : "text-fg-secondary hover:text-fg",
                )}
              >
                {cycle === id && (
                  <SlidingPill
                    group="cycle-active"
                    className="absolute inset-0 rounded-[7px] border border-line bg-surface shadow-sm"
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
          <p className="m-0 text-sm text-fg-secondary">
            Pagando 6 meses por adelantado,{" "}
            <span className="font-semibold text-(--color-accent)">ahorrás 20%</span>
          </p>
        </div>
      </Reveal>

      {/* One comparison panel instead of three floating cards: the columns
        share a baseline, so plans read side by side. Phones stack them. */}
      <Reveal>
        <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col p-7 md:p-9",
                i > 0 && "border-t border-line lg:border-t-0 lg:border-l",
                plan.featured && "bg-(--color-brand-soft)",
              )}
            >
              {plan.featured && (
                <span className="absolute inset-x-0 top-0 h-1 bg-action" aria-hidden />
              )}

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="m-0 font-display text-2xl font-semibold tracking-[-0.02em]">
                  {plan.name}
                </h3>
                {plan.featured && (
                  <span className="text-sm font-semibold text-(--color-accent)">El más elegido</span>
                )}
              </div>
              <p className="mt-2 mb-0 min-h-[3.1em] text-[15px] leading-[1.55] text-fg-secondary">
                {plan.blurb}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <Amount
                  value={cycle === "s" ? plan.semester : plan.monthly}
                  className="font-display text-[2.75rem] leading-none font-semibold tracking-[-0.04em] tabular-nums"
                />
                <span className="text-sm text-fg-muted">/ mes</span>
              </div>
              <span className="mt-2 text-[13px] text-fg-muted">{note}</span>

              <ul className="m-0 mt-7 flex list-none flex-col gap-3 p-0">
                {plan.features.map((feature, j) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden
                      strokeWidth={2}
                      className="mt-0.5 size-4 shrink-0 text-(--color-accent)"
                    />
                    <span className="text-[15px] leading-[1.5]">
                      {feature}
                      {plan.note && j === 3 && (
                        <span className="text-fg-muted"> {plan.note}</span>
                      )}
                    </span>
                  </li>
                ))}
                {plan.excluded && (
                  <li className="flex items-start gap-2.5 text-fg-muted">
                    <Minus aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0" />
                    <span className="text-[15px] leading-[1.5]">{plan.excluded}</span>
                  </li>
                )}
              </ul>

              {/* Pushes the button to the shared bottom edge of the panel. */}
              <div className="mt-9 flex flex-1 items-end">
                <HoverLink
                  href={AUTH_URL}
                  lift={-1}
                  press={0.985}
                  className={cn(
                    "inline-flex h-12 w-full items-center justify-center rounded-[10px] text-[15px] font-medium no-underline transition-colors",
                    plan.featured
                      ? "bg-action text-action-fg shadow-[0_8px_22px_oklch(0.56_0.19_35/0.26)] hover:bg-action-hover"
                      : "border border-line-strong bg-surface text-fg hover:bg-surface-alt",
                  )}
                >
                  Probar 14 días gratis
                </HoverLink>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
