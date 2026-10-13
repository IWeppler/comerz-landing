import { WRAP } from "./bits";
import { Reveal } from "./rise";

/** Cifras reales de uso, redondeadas siempre para abajo. */
const STATS = [
  { value: "100M", prefix: "$", label: "vendidos con Comerz" },
  { value: "6.000", label: "ventas cobradas" },
  { value: "9.000", label: "productos cargados" },
  { value: "400", label: "cuentas corrientes al día" },
];

/**
 * La prueba de que ya se usa, justo después del hero: cuatro cifras grandes en
 * la letra de los carteles, separadas solo por líneas finas entre ellas.
 */
export function Proof() {
  return (
    <section aria-label="Comerz en números" className={`${WRAP} pt-[clamp(56px,9vh,110px)]`}>
      <dl className="m-0 grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 90}
            className="flex flex-col-reverse gap-2 border-line py-7 pr-4 max-lg:[&:nth-child(-n+2)]:border-b lg:border-l lg:pl-[clamp(16px,2vw,32px)] lg:first:border-l-0 lg:first:pl-0 max-lg:even:border-l max-lg:even:pl-5"
          >
            <dt className="text-[clamp(14px,1.1vw,17px)] font-light text-fg-muted">{stat.label}</dt>
            <dd className="poster m-0 text-[clamp(56px,6.4vw,104px)] tabular-nums">
              <span className="text-(--color-accent)">+</span>
              {stat.prefix}
              {stat.value}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
