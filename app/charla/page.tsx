import type { Metadata } from "next";
import { CalendarDays, Ticket, Users, Video } from "lucide-react";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Reveal } from "../components/reveal";
import { HoverCard } from "../components/hover";
import { CHARLA } from "./datos";
import { Inscripcion } from "./form";

const DESCRIPCION = `Charla online y gratuita organizada por la ${CHARLA.organiza}: cómo pasar el cuaderno y las planillas a un sistema de gestión. ${CHARLA.fechaLarga} a las ${CHARLA.hora} por Google Meet.`;

export const metadata: Metadata = {
  title: CHARLA.titulo,
  description: DESCRIPCION,
  alternates: { canonical: "/charla" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://comerz.app/charla",
    siteName: "Comerz",
    title: `${CHARLA.titulo} — Comerz`,
    description: DESCRIPCION,
  },
};

/** La ficha del evento para Google, igual que el FAQPage de la home. */
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: CHARLA.titulo,
  description: DESCRIPCION,
  startDate: CHARLA.inicio,
  endDate: CHARLA.fin,
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  inLanguage: "es-AR",
  location: {
    "@type": "VirtualLocation",
    url: "https://comerz.app/charla",
    name: CHARLA.donde,
  },
  organizer: { "@type": "Organization", name: CHARLA.organiza },
  performer: { "@type": "Organization", name: "Comerz" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ARS",
    availability: "https://schema.org/InStock",
    url: "https://comerz.app/charla",
  },
};

const DATOS = [
  {
    icono: CalendarDays,
    etiqueta: "Cuándo",
    valor: `${CHARLA.fechaLarga}, ${CHARLA.hora}`,
  },
  {
    icono: Video,
    etiqueta: "Dónde",
    valor: `${CHARLA.donde}, desde tu casa o el local`,
  },
  { icono: Users, etiqueta: "Organiza", valor: CHARLA.organiza },
  { icono: Ticket, etiqueta: "Precio", valor: "Entrada libre y gratuita" },
];

const TEMAS = [
  {
    titulo: "Qué mirar antes de digitalizarte",
    texto:
      "Por dónde empezar cuando todo está en un cuaderno: qué conviene pasar primero y qué puede esperar sin que se te complique el día a día.",
  },
  {
    titulo: "Stock que cierra con la realidad",
    texto:
      "Cómo cargar los productos sin frenar el mostrador, y por qué el faltante aparece siempre en los mismos tres o cuatro artículos.",
  },
  {
    titulo: "Caja, fiado y cuentas claras",
    texto:
      "Arqueo al cierre, quién te debe y desde cuándo. Lo que hoy se anota en un papel y termina perdiéndose.",
  },
  {
    titulo: "Saber cuánto ganás, no cuánto vendés",
    texto:
      "La diferencia entre facturación y ganancia, y los números que te dicen si un producto conviene tenerlo en góndola.",
  },
];

const PARA_QUIEN = [
  "Tenés un comercio y anotás las ventas a mano",
  "Ya probaste con Excel y se te desordenó",
  "Querés entender qué es un sistema de gestión antes de contratar uno",
  "No sos técnico y no querés serlo",
];

export default function Charla() {
  return (
    <div className="relative flex-1 overflow-x-clip bg-canvas text-fg">
      <Nav />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        />

        <section className="relative px-5 pt-30 pb-6 md:px-8 md:pt-38">
          {/* Mismo papel cuadriculado y aurora que el hero de la home. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[linear-gradient(oklch(0.16_0_0/0.045)_1px,transparent_1px),linear-gradient(90deg,oklch(0.16_0_0/0.045)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:radial-gradient(90%_60%_at_50%_10%,#000_20%,transparent_78%)]" />
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-[720px] bg-[radial-gradient(46%_52%_at_40%_30%,oklch(0.53_0.18_264/0.14),transparent_72%),radial-gradient(38%_42%_at_78%_16%,oklch(0.7_0.17_35/0.1),transparent_72%)]" />

          {/* Desktop: contenido y formulario lado a lado, con la columna
            derecha fija al scrollear. Mobile: el formulario primero, porque es
            lo único que hay que hacer en esta página. */}
          <div className="relative mx-auto grid max-w-[1200px] items-start gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
            <div className="order-2 flex flex-col lg:order-1">
              <Reveal>
                <span className="inline-flex h-7.5 w-fit items-center gap-2 rounded-full border border-line bg-surface px-3.25 text-[13px] font-medium text-fg-secondary shadow-sm">
                  <span className="size-1.5 rounded-full bg-ok motion-safe:animate-pulse-dot" />
                  Charla online · Entrada libre
                </span>
              </Reveal>

              <h1 className="mt-5 mb-0 max-w-[18ch] text-[clamp(2.25rem,6.5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">
                {CHARLA.titulo}
              </h1>

              <Reveal>
                <p className="mt-5 mb-0 max-w-[56ch] text-lg leading-[1.55] text-pretty text-fg-secondary">
                  Una hora, sin vueltas técnicas: cómo pasar el cuaderno y las
                  planillas a un sistema que se sostiene solo. Con ejemplos de
                  comercios de acá, no de manuales.
                </p>
              </Reveal>

              <Reveal className="mt-9" delay={60}>
                {/* Lista de una columna: se lee de arriba abajo como una ficha,
                  igual en el celular que en el escritorio. */}
                <dl className="m-0 max-w-[46ch] rounded-[18px] border border-line bg-surface">
                  {DATOS.map(({ icono: Icono, etiqueta, valor }) => (
                    <div
                      key={etiqueta}
                      className="flex items-center gap-3.5 border-b border-line px-5 py-4 last:border-b-0"
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-surface-alt text-fg-secondary">
                        <Icono className="size-4.5" strokeWidth={1.75} />
                      </span>
                      <dt className="w-22 shrink-0 text-[11px] font-semibold tracking-[0.09em] text-fg-muted uppercase">
                        {etiqueta}
                      </dt>
                      <dd className="m-0 text-[15px] leading-[1.45] font-medium">
                        {valor}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className="mt-16 md:mt-20">
                <span className="text-xs font-semibold tracking-[0.09em] text-brand uppercase">
                  De qué vamos a hablar
                </span>
                <h2 className="mt-3.5 mb-0 max-w-[20ch] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
                  Cuatro cosas que cambian el mes que viene
                </h2>
              </Reveal>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 md:gap-5">
                {TEMAS.map((tema, i) => (
                  <Reveal key={tema.titulo} delay={i * 70}>
                    <HoverCard className="flex h-full flex-col gap-2.5 rounded-[18px] border border-line bg-surface p-6 transition-[box-shadow,border-color] duration-350 ease-brand hover:border-line-strong">
                      <span className="inline-flex size-8 items-center justify-center rounded-[10px] bg-surface-alt font-mono text-[13px] font-medium text-fg-secondary">
                        {i + 1}
                      </span>
                      <h3 className="m-0 text-[18px] leading-[1.25] font-semibold tracking-[-0.015em]">
                        {tema.titulo}
                      </h3>
                      <p className="m-0 text-[15px] leading-[1.6] text-fg-secondary">
                        {tema.texto}
                      </p>
                    </HoverCard>
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-16 md:mt-20">
                <div className="rounded-[24px] border border-line bg-surface-alt p-7 md:p-10">
                  <span className="text-xs font-semibold tracking-[0.09em] text-brand uppercase">
                    Para quién es
                  </span>
                  <h2 className="mt-3.5 mb-6 max-w-[22ch] text-[clamp(1.5rem,4vw,2rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
                    Si te pasa alguna de estas, es para vos
                  </h2>
                  <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                    {PARA_QUIEN.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-fg-secondary"
                      >
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-ok-bg text-[11px] text-ok">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal className="mt-10">
                <p className="m-0 max-w-[62ch] text-[15px] leading-[1.65] text-fg-muted">
                  La charla la da el equipo de Comerz por invitación de la{" "}
                  {CHARLA.organiza}. No hace falta tener el sistema ni contratar
                  nada: se puede venir a escuchar y listo.
                </p>
              </Reveal>
            </div>

            <div className="order-1 lg:sticky lg:top-24 lg:order-2">
              <Inscripcion />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
