import { WRAP } from "./bits";
import { Reveal } from "./rise";

/** Cifras reales de uso, redondeadas siempre para abajo. */
const STATS = [
  { value: "170M", prefix: "$", label: "vendidos con Comerz" },
  { value: "10.000", label: "ventas cobradas" },
  { value: "10.000", label: "productos cargados" },
  { value: "500", label: "cuentas corrientes al día" },
];

/**
 * La prueba de que ya se usa, justo después del hero: cuatro cifras grandes en
 * la letra de los carteles, separadas solo por líneas finas entre ellas.
 */
export function Proof() {
  return (
    <section
      aria-label="Comerz en números"
      className={`${WRAP} pt-[clamp(56px,9vh,110px)]`}
    >
      <dl className="m-0 grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 90}
            // `justify-end` en columna invertida apila todo arriba: los números
            // de una misma fila quedan a la misma altura aunque una etiqueta
            // ocupe dos renglones. En desktop cada cifra va centrada en su
            // columna para que la fila quede pareja de punta a punta.
            className="flex min-w-0 flex-col-reverse justify-end gap-2 border-line py-7 pr-4 max-lg:[&:nth-child(-n+2)]:border-b max-lg:even:border-l max-lg:even:pl-5 lg:items-center lg:border-l lg:px-[clamp(16px,2vw,32px)] lg:text-center lg:first:border-l-0"
          >
            <dt className="text-[clamp(14px,1.1vw,17px)] leading-snug font-light text-fg-muted">
              {stat.label}
            </dt>
            <dd className="poster m-0 text-[clamp(40px,11vw,60px)] whitespace-nowrap tabular-nums lg:text-[clamp(56px,5.4vw,88px)]">
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
