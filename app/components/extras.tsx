import { Reveal } from "./reveal";
import { HoverCard } from "./hover";

const CARD =
  "flex h-full flex-col gap-2.5 rounded-[18px] border border-line bg-surface p-7 transition-[box-shadow,border-color] duration-350 ease-brand hover:border-line-strong hover:shadow-md";
const TITLE = "m-0 text-lg font-semibold tracking-[-0.015em]";
const BODY = "m-0 text-sm leading-[1.6] text-fg-secondary";
const STAT = "font-mono text-[30px] font-medium tracking-[-0.03em]";

const CATALOG_ITEMS = [
  { tag: "S M L", name: "Remera oversize", price: "$ 18.900" },
  { tag: "38–44", name: "Jean recto", price: "$ 42.500" },
  { tag: "Único", name: "Campera puffer", price: "$ 74.000" },
  { tag: "36–41", name: "Zapatilla urbana", price: "$ 58.200" },
];

export function Extras() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-30 md:px-8">
      <Reveal className="mb-11 max-w-[54ch]">
        <span className="text-xs font-semibold tracking-[0.09em] text-brand uppercase">
          Además
        </span>
        <h2 className="mt-3.5 mb-0 text-[clamp(2rem,5vw,3rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
          Los detalles que hacen que no vuelvas al cuaderno
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal className="sm:col-span-2">
          <HoverCard lift={-3} className={CARD}>
            <h3 className={TITLE}>Catálogo online por WhatsApp</h3>
            <p className={`${BODY} max-w-[44ch]`}>
              El mismo producto que cargás para vender ya queda publicado. Mandás un link
              y el cliente ve fotos, talles y precio actualizado.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CATALOG_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-1.5 rounded-[11px] border border-line bg-canvas p-2"
                >
                  <span className="flex h-14 items-center justify-center rounded-[8px] bg-sunken text-[11px] font-medium text-fg-muted">
                    {item.tag}
                  </span>
                  <span className="text-[12px] leading-[1.3] font-medium">{item.name}</span>
                  <span className="font-mono text-[12px] text-fg-secondary">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </HoverCard>
        </Reveal>

        <Reveal delay={80}>
          <HoverCard lift={-3} className={CARD}>
            <span className={STAT}>#0412</span>
            <h3 className={TITLE}>Tickets digitales</h3>
            <p className={BODY}>
              Se lo mandás al cliente por WhatsApp o lo imprimís. Queda guardado en el
              historial.
            </p>
          </HoverCard>
        </Reveal>

        <Reveal delay={160}>
          <HoverCard lift={-3} className={CARD}>
            <span className="inline-flex h-6.5 w-fit items-center gap-1.5 rounded-full border border-ok-border bg-ok-bg px-2.75 text-xs font-medium text-ok">
              <span className="size-[5px] rounded-full bg-ok motion-safe:animate-pulse-dot" />
              En la nube
            </span>
            <h3 className={TITLE}>No perdés nada</h3>
            <p className={BODY}>
              Si se rompe la compu, tus ventas siguen ahí. Se sincroniza cuando vuelve
              internet.
            </p>
          </HoverCard>
        </Reveal>

        <Reveal delay={240}>
          <HoverCard lift={-3} className={CARD}>
            <span className={STAT}>.xlsx</span>
            <h3 className={TITLE}>Traés tu Excel</h3>
            <p className={BODY}>
              Plantilla de productos y de clientes. Subís el archivo y queda todo cargado.
            </p>
          </HoverCard>
        </Reveal>

        <Reveal delay={320}>
          <HoverCard lift={-3} className={CARD}>
            <span className={STAT}>2 min</span>
            <h3 className={TITLE}>Arrancás hoy</h3>
            <p className={BODY}>
              Cargás lo que más vendés y ya registrás la primera venta. El resto lo sumás
              después.
            </p>
          </HoverCard>
        </Reveal>

        <Reveal delay={400} className="sm:col-span-2">
          <HoverCard lift={-3} className={CARD}>
            <h3 className={TITLE}>Comerz Insights</h3>
            <p className={`${BODY} max-w-[44ch]`}>
              No solo te muestra números: te dice qué hacer con ellos.
            </p>
            <div className="mt-2 flex flex-col gap-2.25">
              <div className="flex items-start gap-2.75 rounded-[11px] border border-line bg-canvas px-3.5 py-3">
                <span className="mt-px flex size-4.5 shrink-0 items-center justify-center rounded-[5px] bg-danger-bg text-[11px] font-semibold text-danger">
                  !
                </span>
                <p className="m-0 text-[13px] leading-[1.5] text-fg-secondary">
                  Tenés <span className="font-mono text-fg">$ 76.000</span> en deuda
                  vencida de 2 clientes.
                </p>
              </div>
              <div className="flex items-start gap-2.75 rounded-[11px] border border-line bg-canvas px-3.5 py-3">
                <span className="mt-px flex size-4.5 shrink-0 items-center justify-center rounded-[5px] bg-warn-bg text-[11px] font-semibold text-warn">
                  !
                </span>
                <p className="m-0 text-[13px] leading-[1.5] text-fg-secondary">
                  Tenés <span className="font-mono text-fg">$ 14.699.150</span> frenados
                  en stock que no rota.
                </p>
              </div>
            </div>
          </HoverCard>
        </Reveal>
      </div>
    </section>
  );
}
