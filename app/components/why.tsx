import { Reveal } from "./reveal";
import { Bar, Counter } from "./metrics";
import { HoverCard } from "./hover";

const CARD =
  "flex h-full flex-col gap-3 rounded-[18px] border border-line bg-surface p-7.5 transition-[box-shadow,border-color] duration-350 ease-brand hover:border-line-strong hover:shadow-md";
const VISUAL =
  "-mx-1.5 -mt-1.5 mb-1.5 h-26 rounded-[13px] border border-line bg-canvas px-4 py-3.5";

export function Why() {
  return (
    <section id="por-que" className="mx-auto max-w-[1200px] px-5 pt-30 md:px-8">
      <Reveal className="mb-13 max-w-[54ch]">
        <span className="text-xs font-semibold tracking-[0.09em] text-brand uppercase">
          Por qué cambiarte
        </span>
        <h2 className="mt-3.5 mb-0 text-[clamp(2rem,5vw,3rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
          El cuaderno no te avisa que estás perdiendo plata
        </h2>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        <Reveal>
          <HoverCard className={CARD}>
            <div className={`${VISUAL} flex flex-col justify-between`}>
              <span className="text-[10px] font-semibold tracking-[0.09em] text-fg-muted uppercase">
                Ganancia · hoy
              </span>
              <div className="flex items-baseline gap-2.5">
                <Counter
                  value={486800}
                  className="font-mono text-[26px] font-medium tracking-[-0.02em]"
                />
                <span className="inline-flex h-5 items-center rounded-md bg-ok-bg px-[7px] font-mono text-[11px] font-medium text-ok">
                  ↗ +14%
                </span>
              </div>
            </div>
            <h3 className="m-0 text-[19px] font-semibold tracking-[-0.015em]">
              Sabés cuánto ganaste hoy
            </h3>
            <p className="m-0 text-[15px] leading-[1.6] text-fg-secondary">
              Ingresos, ganancia y margen real de cada día, sin sentarte a la noche a
              sacar cuentas. Comparado contra la semana anterior, solo.
            </p>
          </HoverCard>
        </Reveal>

        <Reveal delay={90}>
          <HoverCard className={CARD}>
            <div className={`${VISUAL} flex flex-col justify-center gap-2.25`}>
              <div className="flex items-center gap-2.5">
                <span className="flex-1 text-xs text-fg-secondary">Vestido Frunce</span>
                <span className="font-mono text-xs text-warn">3 u.</span>
              </div>
              <Bar pct={18} tone="warn" />
              <div className="flex items-center gap-2.5">
                <span className="flex-1 text-xs text-fg-secondary">Vestido Paula</span>
                <span className="font-mono text-xs text-danger">0 u.</span>
              </div>
              <Bar pct={4} tone="danger" delay={120} />
            </div>
            <h3 className="m-0 text-[19px] font-semibold tracking-[-0.015em]">
              El stock se descuenta solo
            </h3>
            <p className="m-0 text-[15px] leading-[1.6] text-fg-secondary">
              Cada venta baja las unidades. Te avisa qué se está por acabar y qué
              mercadería tenés frenada juntando polvo hace meses.
            </p>
          </HoverCard>
        </Reveal>

        <Reveal delay={180}>
          <HoverCard className={CARD}>
            <div className={`${VISUAL} flex flex-col justify-center gap-2`}>
              <div className="flex items-center gap-2.5">
                <span className="size-5.5 rounded-full bg-sunken" />
                <span className="flex-1 text-xs text-fg-secondary">Marcela G.</span>
                <span className="inline-flex h-[19px] items-center rounded-full bg-danger-bg px-[7px] text-[11px] font-medium text-danger">
                  Vencida
                </span>
                <span className="font-mono text-xs">$ 46.000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="size-5.5 rounded-full bg-sunken" />
                <span className="flex-1 text-xs text-fg-secondary">Nadia P.</span>
                <span className="inline-flex h-[19px] items-center rounded-full bg-warn-bg px-[7px] text-[11px] font-medium text-warn">
                  3 días
                </span>
                <span className="font-mono text-xs">$ 30.000</span>
              </div>
            </div>
            <h3 className="m-0 text-[19px] font-semibold tracking-[-0.015em]">
              Nadie te queda debiendo
            </h3>
            <p className="m-0 text-[15px] leading-[1.6] text-fg-secondary">
              Cuenta corriente por cliente con la deuda vencida a la vista. Se acabó el
              «che, ¿este ya me pagó?».
            </p>
          </HoverCard>
        </Reveal>
      </div>
    </section>
  );
}
