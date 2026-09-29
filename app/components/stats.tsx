import { Counter } from "./metrics";
import { Reveal } from "./reveal";

const STATS = [
  {
    value: 25_000_000,
    prefix: "$ ",
    label: "facturado con Comerz",
    hint: "Ventas registradas por los comercios en el último trimestre",
  },
  {
    value: 1200,
    prefix: "+",
    label: "transacciones registradas",
    hint: "Tickets emitidos entre mostrador, tablet y celular",
  },
  {
    value: 5,
    prefix: "",
    label: "comercios activos",
    hint: "Indumentaria, kiosco, ferretería, perfumería y más",
  },
];

export function Stats() {
  return (
    <section aria-label="Comerz en números" className="mt-20 border-y border-line md:mt-28">
      <div className="mx-auto grid max-w-[1200px] divide-y divide-line px-5 md:grid-cols-[1.5fr_1fr_1fr] md:divide-x md:divide-y-0 md:px-8">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 80}
            className="flex flex-col gap-2 py-8 md:px-9 md:py-12 md:first:pl-0 md:last:pr-0"
          >
            <Counter
              value={stat.value}
              prefix={stat.prefix}
              className={`font-display leading-none font-semibold tracking-[-0.04em] tabular-nums ${
                i === 0
                  ? "text-[clamp(2.5rem,5.4vw,4.25rem)] text-(--color-accent)"
                  : "text-[clamp(2.25rem,4vw,3.25rem)]"
              }`}
            />
            <span className="mt-1 text-[15px] font-medium">{stat.label}</span>
            <p className="m-0 max-w-[34ch] text-sm leading-[1.55] text-fg-secondary">
              {stat.hint}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
