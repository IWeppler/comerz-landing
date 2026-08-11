import { Reveal } from "./reveal";
import { HeroVisual } from "./hero-visual";
import { HoverLink } from "./hover";

const HEADLINE = [
  { word: "Todo" },
  { word: "tu" },
  { word: "negocio" },
  { word: "en" },
  { word: "un" },
  { word: "solo", accent: true },
  { word: "lugar", accent: true },
];

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-32 md:px-8 md:pt-42">
      {/* Grid paper + aurora wash behind the headline. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[linear-gradient(oklch(0.16_0_0/0.045)_1px,transparent_1px),linear-gradient(90deg,oklch(0.16_0_0/0.045)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:radial-gradient(90%_60%_at_50%_18%,#000_20%,transparent_78%)]" />
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[820px] bg-[radial-gradient(46%_52%_at_50%_30%,oklch(0.53_0.18_264/0.16),transparent_72%),radial-gradient(38%_42%_at_76%_18%,oklch(0.7_0.17_35/0.12),transparent_72%)]" />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
        <Reveal>
          <HoverLink
            href="#modulos"
            lift={-1}
            className="group inline-flex h-9 items-center gap-2.5 rounded-full border border-line bg-surface px-2 text-[13px] font-medium text-fg-secondary no-underline shadow-sm transition-[box-shadow,border-color] duration-250 ease-brand hover:border-line-strong hover:shadow-md"
          >
            <span className="inline-flex h-6 items-center rounded-full bg-[oklch(0.7_0.17_35/0.14)] px-2.5 text-xs font-semibold text-[oklch(0.52_0.17_35)]">
              Nuevo
            </span>
            <span className="text-left">Catálogo online para compartir por WhatsApp</span>
            <span className="pr-2 text-fg-muted transition-transform duration-250 ease-brand group-hover:translate-x-0.5">
              →
            </span>
          </HoverLink>
        </Reveal>

        <h1 className="m-0 max-w-[14ch] text-[clamp(2.75rem,9vw,5.125rem)] leading-[0.96] font-semibold tracking-[-0.045em] text-balance">
          {HEADLINE.map(({ word, accent }, i) => (
            <span
              key={word}
              style={{ animationDelay: `${60 + i * 55}ms` }}
              className={`inline-block motion-safe:animate-word-in ${accent ? "text-action" : ""}`}
            >
              {word}
              {i < HEADLINE.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <Reveal>
          <p className="m-0 max-w-[56ch] text-lg leading-[1.55] text-pretty text-fg-secondary md:text-xl">
            Dejá el cuaderno y las diez planillas de excel. Vendés, cobrás, controlás el stock y
            sabés cuánto ganaste — todo desde la misma pantalla, actualizado al instante.
          </p>
        </Reveal>

        <Reveal className="mt-1.5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <HoverLink
              href="#precios"
              lift={-3}
              className="relative inline-flex h-13.5 items-center gap-2.5 overflow-hidden rounded-[13px] bg-action px-7 text-base font-medium text-action-fg no-underline shadow-action transition-[box-shadow,background-color] duration-280 ease-brand hover:bg-action-hover hover:shadow-action-lg"
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(100deg,transparent,oklch(1_0_0/0.28),transparent)] motion-safe:animate-sheen" />
              <span className="relative">Probar 14 días gratis</span>
            </HoverLink>
            <HoverLink
              href="#modulos"
              lift={-3}
              className="group inline-flex h-13.5 items-center gap-2.5 rounded-[13px] border border-line-strong bg-surface px-6 text-base font-medium whitespace-nowrap text-fg no-underline transition-[background-color,border-color] duration-280 ease-brand hover:bg-surface-alt"
            >
              <span className="inline-flex size-5.5 items-center justify-center rounded-full bg-sunken text-[9px] text-fg-secondary transition-colors duration-280 ease-brand group-hover:bg-action group-hover:text-action-fg">
                ▶
              </span>
              Ver cómo funciona
            </HoverLink>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-4.5 text-[13px] text-fg-muted">
            <span className="inline-flex items-center gap-[7px]">
              <span className="size-1.5 rounded-full bg-ok motion-safe:animate-pulse-dot" />
              Sin tarjeta
            </span>
            <span className="size-[3px] rounded-full bg-line-strong" />
            <span>Sin instalar nada</span>
            <span className="size-[3px] rounded-full bg-line-strong" />
            <span>Andá probando mientras vendés</span>
          </div>
        </Reveal>
      </div>

      <HeroVisual />
    </section>
  );
}
