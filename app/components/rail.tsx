"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TRIAL_URL, WHATSAPP_URL } from "@/lib/links";
import { Eyebrow, MoreLink, WRAP } from "./bits";
import { CuentaFragment, InsightsFragment } from "./fragments";
import { Reveal, RiseLines } from "./rise";

type Card = {
  id: string;
  eyebrow: string;
  title: [string, string];
  body: string;
  link: { label: string; href: string; external?: boolean };
  visual: ReactNode;
};

/** A screenshot cropped to its top-left corner, framed like a window. */
function Shot({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <div className="h-full overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_26px_60px_-28px_rgb(38_34_28/0.34)]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 560px, 88vw"
        className="block h-full w-full object-cover object-top-left"
      />
    </div>
  );
}

const CARDS: Card[] = [
  {
    id: "Intelligence",
    eyebrow: "Comerz Intelligence",
    title: ["Te dice qué está", "frenado."],
    body: "Mira tus ventas, tu stock y tus fiados, y te avisa en castellano: plata parada en mercadería, deuda vencida, productos que no rotan. Y qué conviene hacer.",
    link: { label: "Probarlo con tus datos", href: TRIAL_URL },
    visual: <InsightsFragment />,
  },
  {
    id: "cuenta",
    eyebrow: "Cuenta corriente",
    title: ["Nadie te queda", "debiendo."],
    body: "Cada cliente con su saldo y la deuda vencida a la vista. Cuando te pagan, queda saldado. Se acabó el «che, ¿este ya me pagó?».",
    link: { label: "Probar 14 días gratis", href: TRIAL_URL },
    visual: <CuentaFragment />,
  },
  {
    id: "catalogo",
    eyebrow: "Catálogo online",
    title: ["Mandás un link.", "Te compran."],
    body: "El mismo producto que cargás para vender queda publicado. Lo compartís por WhatsApp y el cliente ve fotos, talles y precio actualizados.",
    link: { label: "Preguntanos cómo se ve", href: WHATSAPP_URL, external: true },
    visual: (
      <div className="relative h-full overflow-hidden rounded-[18px] bg-[#ff3d00]">
        <Image
          src="/assets/ecommerce.webp"
          alt="El catálogo online de una tienda en una tablet: la foto de unas zapatillas con su precio, color, talle y el botón para añadir al carrito"
          fill
          sizes="(min-width: 1024px) 600px, 88vw"
          className="object-cover"
        />
      </div>
    ),
  },
];

/**
 * Lo que va más allá de vender, cobrar y contar: tarjetas grandes que se
 * deslizan de costado, con la siguiente asomando. Los puntos marcan cuál está
 * en foco y llevan a cada una.
 */
export function Rail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const cards = () => Array.from(railRef.current?.children ?? []) as HTMLElement[];

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    // The card whose left edge is closest to the rail's padding edge.
    const left = rail.scrollLeft + parseFloat(getComputedStyle(rail).paddingLeft);
    let best = 0;
    cards().forEach((card, i) => {
      if (Math.abs(card.offsetLeft - left) < Math.abs(cards()[best].offsetLeft - left)) best = i;
    });
    setActive(best);
  };

  const goTo = (i: number) => {
    const rail = railRef.current;
    const card = cards()[i];
    if (!rail || !card) return;
    rail.scrollTo({
      left: card.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft),
      behavior: "smooth",
    });
  };

  return (
    <section className="py-[clamp(50px,8vh,100px)]">
      <div className={WRAP}>
        <RiseLines
          lines={["Y lo que ningún", "cuaderno hace."]}
          className="poster m-0 text-[clamp(64px,10.5vw,168px)]"
        />
      </div>

      <Reveal className="mt-[clamp(36px,6vh,70px)]">
        <div
          ref={railRef}
          onScroll={onScroll}
          className="rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:px-[max(clamp(20px,5vw,84px),calc((100vw-1320px)/2+clamp(20px,5vw,84px)))] md:[scroll-padding-inline:max(clamp(20px,5vw,84px),calc((100vw-1320px)/2+clamp(20px,5vw,84px)))]"
          aria-label="Más funciones"
          role="region"
        >
          {CARDS.map((card, i) => (
            <article
              key={card.id}
              aria-roledescription="tarjeta"
              aria-label={`${i + 1} de ${CARDS.length}`}
              className="grid w-[min(1150px,calc(100vw-40px))] shrink-0 snap-start grid-cols-[minmax(0,1fr)] items-center gap-10 rounded-[40px] border border-line bg-surface p-[clamp(28px,5vw,72px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
            >
              <div className="flex flex-col">
                <Eyebrow>{card.eyebrow}</Eyebrow>
                <h3 className="m-0 font-display text-[clamp(34px,4vw,56px)] leading-[1.04] font-medium tracking-[-0.035em]">
                  {card.title[0]}
                  <br />
                  {card.title[1]}
                </h3>
                <p className="mt-6 mb-8 max-w-[30em] text-[clamp(15px,1.15vw,18px)] leading-[1.6] text-fg-muted">
                  {card.body}
                </p>
                <MoreLink href={card.link.href} external={card.link.external}>
                  {card.link.label}
                </MoreLink>
              </div>
              <div className="h-[clamp(300px,40vw,440px)]">{card.visual}</div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex justify-center gap-1.5">
          {CARDS.map((card, i) => (
            <button
              key={card.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a ${card.eyebrow}`}
              aria-current={active === i}
              className={cn(
                "h-1.5 cursor-pointer rounded-full border-0 p-0 transition-[width,background-color] duration-400 ease-brand",
                active === i ? "w-5 bg-(--color-accent)" : "w-1.5 bg-line-strong hover:bg-fg-muted",
              )}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
