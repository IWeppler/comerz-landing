import { Counter } from "./metrics";
import { Reveal } from "./reveal";

const STATS = [
  {
    value: 25_000_000,
    prefix: "$ ",
    suffix: "",
    label: "facturado con Comerz",
    hint: "Ventas registradas por los comercios en el último trimestre",
  },
  {
    value: 1200,
    prefix: "+ ",
    suffix: "",
    label: "transacciones registradas",
    hint: "Tickets emitidos entre mostrador, tablet y celular",
  },
  {
    value: 5,
    prefix: "",
    suffix: "",
    label: "comercios activos",
    hint: "Indumentaria, kiosco, ferretería, perfumería y más",
  },
];

export function Stats() {
  return (
    <section className="mt-20 border-y border-line bg-surface">
      <Reveal className="mx-auto max-w-[1200px] px-5 py-11 md:px-8">
        <span className="text-xs font-semibold tracking-[0.09em] text-fg-muted uppercase">
          Comerz en números
        </span>

        <div className="mt-7 grid gap-8 md:grid-cols-3 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i === 0
                  ? "flex flex-col gap-1.5 md:pr-9"
                  : "flex flex-col gap-1.5 md:border-l md:border-line md:pr-9 md:pl-9"
              }
            >
              <span className="flex items-baseline font-mono text-[clamp(2rem,4vw,2.75rem)] leading-none font-medium tracking-[-0.035em]">
                <Counter value={stat.value} prefix={stat.prefix} />
                {stat.suffix}
              </span>
              <span className="text-[15px] font-medium">{stat.label}</span>
              <p className="m-0 max-w-[32ch] text-sm leading-[1.55] text-fg-secondary">
                {stat.hint}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
