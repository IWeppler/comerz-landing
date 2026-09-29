import { Crop, type Shot } from "./crop";
import { Reveal } from "./reveal";

/**
 * Each reason is backed by one crop of the real app: a single takeaway and the
 * piece of screen that proves it, not a mock rebuilt in markup.
 */
const REASONS: { title: string; body: string; caption: string; shot: Shot }[] = [
  {
    title: "Sabés cuánto ganaste hoy",
    body: "Ingresos, ganancia y margen real de cada día, sin sentarte a la noche a sacar cuentas. Comparado contra la semana anterior, solo.",
    caption: "Panel de la semana: ganancia y margen contra la semana anterior.",
    shot: {
      src: "/assets/dashboard2.png",
      alt: "Indicadores de la semana: ingresos, unidades, ticket promedio y ganancia con su variación",
      width: 1556,
      height: 771,
      region: { x: 0, y: 92, w: 624, h: 430 },
    },
  },
  {
    title: "El stock se descuenta solo",
    body: "Cada venta baja las unidades. Te avisa qué se está por acabar y qué mercadería tenés frenada juntando polvo hace meses.",
    caption: "Inventario con el stock de cada producto. En rojo, lo que se agotó.",
    shot: {
      src: "/assets/table-stock.png",
      alt: "Tabla de inventario con producto, categoría y unidades en stock",
      width: 1565,
      height: 879,
      region: { x: 100, y: 92, w: 930, h: 600 },
    },
  },
  {
    title: "Nadie te queda debiendo",
    body: "Cuenta corriente por cliente con la deuda vencida a la vista. Se acabó el «che, ¿este ya me pagó?».",
    caption: "El aviso que aparece cuando hay deuda vencida.",
    shot: {
      src: "/assets/dashboard2.png",
      alt: "Aviso de Comerz: tenés 76.000 pesos en deuda vencida de 2 clientes",
      width: 1556,
      height: 771,
      region: { x: 4, y: 536, w: 508, h: 143 },
    },
  },
];

export function Why() {
  return (
    <section id="por-que" className="mx-auto max-w-[1200px] px-5 pt-24 md:px-8 md:pt-36">
      <Reveal>
        <span className="text-sm font-semibold text-(--color-accent)">Por qué cambiarte</span>
        <h2 className="mt-3 mb-0 max-w-[18ch] font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
          El cuaderno no te avisa que estás perdiendo plata
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col md:mt-20">
        {REASONS.map((reason) => (
          <Reveal
            key={reason.title}
            className="grid items-center gap-7 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14"
          >
            <div className="flex flex-col gap-3 md:col-span-5">
              <h3 className="m-0 font-display text-[clamp(1.625rem,2.8vw,2.25rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
                {reason.title}
              </h3>
              <p className="m-0 max-w-[40ch] text-base leading-[1.65] text-fg-secondary md:text-[17px]">
                {reason.body}
              </p>
            </div>

            <figure className="m-0 md:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-md">
                <Crop {...reason.shot} vw={[100, 55]} />
              </div>
              <figcaption className="mt-3 text-[13px] text-fg-muted">
                {reason.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
