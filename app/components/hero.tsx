import { ArrowRight } from "lucide-react";
import localFont from "next/font/local";
import { AUTH_URL } from "@/lib/links";
import { HeroNotebook } from "./hero-notebook";
import { HoverLink } from "./hover";

/**
 * Ballpoint handwriting for the notebook only, loaded here and not in the root
 * layout so the site's type stack stays untouched. Self-hosted (OFL, see
 * app/fonts) and cut down to Latin + Spanish characters: 19 KB. Not preloaded,
 * so it never competes with the headline, which is the LCP.
 */
const hand = localFont({
  src: "../fonts/ReenieBeanie-latin.woff2",
  weight: "400",
  display: "swap",
  preload: false,
});

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-24 md:px-8">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] items-center gap-16 pt-10 pb-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:pt-16">
        {/* Static on purpose: the headline is the LCP element, so it paints
          with the first frame instead of waiting on an entrance animation. */}
        <div className="flex flex-col items-start gap-7">
          <h1 className="m-0 font-display text-[clamp(3.5rem,8.2vw,7rem)] leading-[0.92] font-semibold tracking-[-0.045em]">
            Cerrá el
            <br />
            cuaderno.
          </h1>

          <p className="m-0 max-w-[36ch] text-lg leading-[1.55] text-pretty text-fg-secondary md:text-xl">
            Comerz es el sistema de punto de venta para tu comercio: ventas, caja,
            stock y fiados en un solo lugar.
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <HoverLink
              href={AUTH_URL}
              lift={-2}
              className="inline-flex h-13 items-center rounded-[10px] bg-action px-6.5 text-base font-medium whitespace-nowrap text-action-fg no-underline shadow-[0_8px_22px_oklch(0.56_0.19_35/0.26)] transition-[box-shadow,background-color] duration-280 ease-brand hover:bg-action-hover hover:shadow-[0_14px_32px_oklch(0.56_0.19_35/0.32)]"
            >
              Probar 14 días gratis
            </HoverLink>
            <HoverLink
              href="#modulos"
              lift={-2}
              className="group inline-flex h-13 items-center gap-2 rounded-[10px] border border-line-strong px-5.5 text-base font-medium whitespace-nowrap text-fg no-underline transition-colors duration-280 ease-brand hover:bg-surface-alt"
            >
              Ver cómo funciona
              <ArrowRight
                aria-hidden
                strokeWidth={1.75}
                className="size-4 text-fg-muted transition-transform duration-280 ease-brand group-hover:translate-x-0.5"
              />
            </HoverLink>
          </div>
        </div>

        <HeroNotebook handClassName={hand.className} />
      </div>
    </section>
  );
}
