import Image from "next/image";
import { Eyebrow, MoreLink, WRAP } from "./bits";
import { LoopVideo } from "./loop-video";
import { Reveal, RiseLines } from "./rise";

/** Giant uppercase heading that opens a chapter. */
const POSTER_H2 = "poster m-0 text-[clamp(64px,10.5vw,168px)]";

/** Fine sentence-case heading for the quieter blocks. */
const DISPLAY_H2 =
  "m-0 font-display text-[clamp(40px,5vw,76px)] leading-[1.02] font-medium tracking-[-0.04em]";

/** Vender: la foto vertical al lado de lo que pasa en cada venta. */
export function Sell() {
  return (
    <section
      id="funciones"
      className={`${WRAP} scroll-mt-16 pt-[clamp(40px,6vh,80px)] pb-[clamp(50px,8vh,100px)]`}
    >
      <RiseLines lines={["Cobrás en", "tres toques."]} className={POSTER_H2} />

      <div className="mt-[clamp(36px,6vh,80px)] grid grid-cols-[minmax(0,1fr)] items-center gap-[clamp(30px,5vw,80px)] lg:grid-cols-[minmax(0,460px)_1fr]">
        <Reveal className="relative mx-auto aspect-[9/16] w-full max-w-[460px] overflow-hidden rounded-[40px] bg-[#ff3d00]">
          {/* La foto es más ancha que el marco: se recorta a los costados y el
            celular queda entero. */}
          <Image
            src="/assets/model2.webp"
            alt="Una mano sostiene el celular con una venta recién cobrada en Comerz: $309.000 en efectivo, lista para imprimir o mandar por WhatsApp"
            fill
            sizes="(min-width: 1024px) 460px, 92vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={150}>
          <p className="m-0 mb-7 max-w-[34em] text-[clamp(17px,1.4vw,22px)] leading-[1.55]">
            Tocás el producto, elegís talle y color, y cobrás. Lo demás lo hace
            Comerz: baja el stock, suma a la caja y te deja el ticket listo para
            mandar.
          </p>
          <ul className="ticks m-0 grid list-none gap-3.5 p-0 text-[clamp(16px,1.25vw,19px)] text-fg-secondary">
            <li>Búsqueda por nombre o con lector de códigos</li>
            <li>Talles, colores y descuentos en la misma venta</li>
            <li>El stock se descuenta solo, sin pasar nada a mano</li>
            <li>Ticket digital por WhatsApp, o impreso</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Caja: bloque centrado, como el de recordatorios de Subscrr. */
export function Cash() {
  return (
    <section
      className={`${WRAP} max-w-[1080px] py-[clamp(80px,14vh,180px)] text-center`}
    >
      <RiseLines lines={["La caja", "cierra justa."]} className={POSTER_H2} />
      <Reveal delay={150}>
        <p className="mx-auto mt-7 mb-0 max-w-[540px] text-[clamp(16px,1.2vw,19px)] leading-[1.6] text-fg-muted">
          Abrís con lo que hay, vendés, y al cerrar Comerz te dice cuánto
          tendría que haber. Si falta plata, te enterás ese mismo día y no a fin
          de mes.
        </p>
      </Reveal>

      <Reveal
        delay={250}
        className="mx-auto mt-[clamp(40px,7vh,80px)] max-w-[680px]"
      >
        {/* La foto corta los dedos contra los bordes: un fundido arriba y abajo
          los disuelve en el fondo. */}
        <Image
          src="/assets/caja-hand.webp"
          alt="La caja en Comerz: el dinero disponible, las cajas abiertas y la actividad de cada cuenta"
          width={1672}
          height={941}
          sizes="(min-width: 760px) 680px, 92vw"
          className="block h-auto w-full [mask-image:linear-gradient(180deg,transparent_0%,#000_14%,#000_80%,transparent_100%)]"
        />
      </Reveal>
    </section>
  );
}

/**
 * El video de cómo se sube el Excel, sin sonido y a 30 cuadros: WebM (VP9) para
 * los navegadores que lo leen y MP4 (H.264) para el resto. Mientras sea null
 * queda la captura de la tabla de stock.
 */
const IMPORT_VIDEO: { src: string; type: string }[] | null = [
  { src: "/assets/importar-stock.webm", type: "video/webm" },
  { src: "/assets/importar-stock.mp4", type: "video/mp4" },
];

const STEPS = [
  {
    title: "Bajás la plantilla",
    body: "Una para productos y otra para clientes.",
  },
  {
    title: "Pegás tu Excel",
    body: "Nombre, precio, costo, stock. Lo que ya tenés.",
  },
  { title: "La subís", body: "Y el inventario queda cargado, con su stock." },
];

/** Importar: tres pasos numerados y el video de cómo se sube la planilla. */
export function Import() {
  return (
    <section className={`${WRAP} py-[clamp(50px,8vh,100px)]`}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <Eyebrow>Stock · Desde tu Excel</Eyebrow>
          <RiseLines
            lines={["Traé tu planilla.", "El stock se arma solo."]}
            className={DISPLAY_H2}
          />
        </div>
        <Reveal delay={150} className="flex flex-col gap-6">
          <p className="m-0 max-w-[32em] text-[clamp(16px,1.2vw,19px)] leading-[1.6] text-fg-muted">
            No hace falta cargar producto por producto. Y desde que arrancás,
            cada venta baja las unidades y te avisa antes de que te quedes sin
            talles.
          </p>
          <MoreLink href="#faq">Cómo se importa</MoreLink>
        </Reveal>
      </div>

      <ol className="m-0 mt-[clamp(40px,6vh,70px)] grid list-none grid-cols-[minmax(0,1fr)] gap-8 border-t border-line p-0 pt-8 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 110} className="flex gap-5">
              <span className="poster text-[64px] leading-[0.8] text-(--color-accent)">
                {i + 1}
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-lg font-semibold tracking-[-0.01em]">
                  {step.title}
                </span>
                <span className="text-[15px] leading-[1.55] text-fg-muted">
                  {step.body}
                </span>
              </span>
            </Reveal>
          </li>
        ))}
      </ol>

      {IMPORT_VIDEO ? (
        <Reveal className="mt-[clamp(40px,6vh,70px)] aspect-[1920/1200] overflow-hidden rounded-[26px]">
          <LoopVideo
            sources={IMPORT_VIDEO}
            label="Cómo se sube una planilla de Excel al stock de Comerz"
            rate={1.3}
            className="block size-full object-cover"
          />
        </Reveal>
      ) : (
        // Solo las primeras filas: alcanza para ver la tabla sin que ocupe dos
        // pantallas.
        <Reveal className="mt-[clamp(40px,6vh,70px)] aspect-[1565/560] overflow-hidden rounded-[26px] border border-line bg-[#0b0d12]">
          <Image
            src="/assets/table-stock.webp"
            alt="El inventario en Comerz: cada producto con su categoría, stock, costo, precio y margen"
            width={1565}
            height={879}
            sizes="(min-width: 1320px) 1150px, 92vw"
            className="block h-auto w-full"
          />
        </Reveal>
      )}
    </section>
  );
}
