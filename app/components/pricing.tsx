"use client";

import { useState } from "react";
import { ArrowRight, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { AUTH_URL } from "@/lib/links";
import { WRAP } from "./bits";
import { Amount } from "./metrics";
import { Reveal, RiseLines } from "./rise";

type Cycle = "m" | "s";

type Plan = {
  name: string;
  monthly: number;
  semester: number;
  blurb: string;
  featured?: boolean;
  features: string[];
  excluded?: string;
};

const PLANS: Plan[] = [
  {
    name: "Emprendedor",
    monthly: 30000,
    semester: 24000,
    blurb: "Para el comercio que atiende una persona.",
    features: [
      "Punto de venta, caja y ventas",
      "Productos y control de stock",
      "Catálogo online por WhatsApp",
      "Cuenta corriente, hasta 100 clientes activos",
      "Historial de ventas y tickets digitales",
    ],
    excluded: "Sin reportes avanzados ni multi-caja",
  },
  {
    name: "Gestión",
    monthly: 50000,
    semester: 40000,
    blurb: "Para el comercio con empleados y más de un turno.",
    featured: true,
    features: [
      "Todo lo de Emprendedor",
      "Varios usuarios con permisos",
      "Multi-caja por turno",
      "Reportes de rotación y rentabilidad",
      "Cuenta corriente sin tope de clientes",
    ],
  },
  {
    name: "Empresa",
    monthly: 70000,
    semester: 56000,
    blurb: "Para el que ya tiene más de un local.",
    features: [
      "Todo lo de Gestión",
      "Varias sucursales en un solo panel",
      "Stock y transferencias entre locales",
      "Usuarios ilimitados con roles",
      "Soporte prioritario y ayuda para migrar",
    ],
  },
];

/**
 * Tres planes sin cajas, leídos de corrido: nombre y precio en cartel, la
 * lista abajo. El destacado se marca con el naranja del precio, nada más.
 */
export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("s");

  return (
    <section id="precios" className={`${WRAP} scroll-mt-16 py-[clamp(80px,14vh,180px)]`}>
      <RiseLines
        lines={["Probalo gratis.", "Pagá cuando te sirva."]}
        className="poster m-0 text-center text-[clamp(52px,8.4vw,132px)]"
      />

      <Reveal delay={150} className="mt-10 flex flex-col items-center gap-3">
        <div className="flex gap-1 rounded-full bg-surface-alt p-1">
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
                "inline-flex cursor-pointer items-center gap-2 rounded-full border-0 px-5 py-2.5 font-sans text-sm font-semibold transition-colors duration-300 ease-brand",
                cycle === id ? "bg-action text-white" : "bg-transparent text-fg-muted hover:text-fg",
              )}
            >
              {label}
              {id === "s" && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] font-bold",
                    cycle === id ? "bg-white/20 text-white" : "bg-(--color-brand-soft) text-(--color-accent)",
                  )}
                >
                  −20%
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="m-0 text-sm text-fg-muted">
          {cycle === "s" ? "Pagando el semestre por adelantado" : "Facturado mes a mes"} · 14 días
          gratis, sin tarjeta
        </p>
      </Reveal>

      <div className="mx-auto mt-[clamp(48px,8vh,90px)] grid max-w-[1180px] grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-16 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 110} className="flex flex-col">
            <div className="flex h-6 items-center">
              {plan.featured && (
                <span className="rounded-full bg-(--color-brand-soft) px-2.5 py-1 text-[11px] font-bold text-(--color-accent)">
                  El más elegido
                </span>
              )}
            </div>
            <h3 className="poster m-0 mt-3 text-[40px]">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <Amount
                value={cycle === "s" ? plan.semester : plan.monthly}
                className={cn(
                  "poster text-[clamp(64px,6.4vw,92px)] leading-none tabular-nums",
                  plan.featured && "text-(--color-accent)",
                )}
              />
              <span className="text-sm text-fg-muted">/mes</span>
            </div>
            <p className="mt-3 mb-0 text-[15px] text-fg-muted">{plan.blurb}</p>

            <ul className="m-0 mt-7 flex list-none flex-col gap-3 border-t border-line p-0 pt-7">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[15px] leading-[1.5]">
                  <ArrowRight
                    aria-hidden
                    strokeWidth={2}
                    className="mt-0.75 size-4 shrink-0 text-(--color-accent)"
                  />
                  {feature}
                </li>
              ))}
              {plan.excluded && (
                <li className="flex items-start gap-3 text-[15px] leading-[1.5] text-fg-muted">
                  <Minus aria-hidden strokeWidth={2} className="mt-0.75 size-4 shrink-0" />
                  {plan.excluded}
                </li>
              )}
            </ul>

            {/* Pushes the button to the shared bottom edge of the row. */}
            <div className="mt-9 flex flex-1 items-end">
              <a
                href={AUTH_URL}
                className={cn(
                  "inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-[15px] font-semibold no-underline transition-opacity hover:opacity-80 active:scale-[0.96]",
                  plan.featured ? "bg-action text-white" : "bg-fg text-canvas",
                )}
              >
                {plan.featured ? "Empezar con Gestión" : "Probar 14 días gratis"}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
