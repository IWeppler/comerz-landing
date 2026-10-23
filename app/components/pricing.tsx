"use client";

import { useState } from "react";
import { ArrowRight, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { TRIAL_URL } from "@/lib/links";
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
      "1 usuario",
      "Hasta 1.000 productos",
      "Hasta 500 ventas por mes",
      "Cuenta corriente para hasta 50 clientes",
    ],
    excluded: "Sin reportes, roles ni varios puestos",
  },
  {
    name: "Gestión",
    monthly: 50000,
    semester: 40000,
    blurb: "Para el comercio con empleados y más de un turno.",
    featured: true,
    features: [
      "5 usuarios, con roles y permisos por rol",
      "Hasta 5.000 productos",
      "Hasta 5.000 ventas por mes",
      "Cuenta corriente para hasta 250 clientes",
      "Reportes y exportación al contador",
      "Un turno de caja por vendedor",
      "Varios puestos con una sola caja: el vendedor arma el pedido y otra persona cobra",
    ],
  },
  {
    name: "Empresa",
    monthly: 70000,
    semester: 56000,
    blurb: "Para el comercio que ya no entra en ningún tope.",
    features: [
      "Todo lo de Gestión",
      "Usuarios sin tope",
      "Productos sin tope",
      "Ventas sin tope",
      "Cuenta corriente sin tope de clientes",
    ],
  },
];

/** Lo que trae cualquier plan; va una sola vez, debajo de los tres. */
const INCLUDED = [
  "Punto de venta y caja con turnos",
  "Ventas con historial completo",
  "Control de stock",
  "Tienda online con tu stock y tus precios",
  "Clientes y cuenta corriente",
  "Tickets digitales",
  "Facturación electrónica ARCA",
  "Panel con Comerz Intelligence",
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
                href={TRIAL_URL}
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

      <Reveal className="mx-auto mt-[clamp(64px,10vh,120px)] max-w-[1180px] border-t border-line pt-10">
        <h3 className="m-0 text-[15px] font-semibold text-fg-muted">En los tres planes</h3>
        <ul className="m-0 mt-6 grid list-none grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-3 p-0 sm:grid-cols-2 md:grid-cols-4">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.5]">
              <ArrowRight
                aria-hidden
                strokeWidth={2}
                className="mt-0.75 size-4 shrink-0 text-(--color-accent)"
              />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
