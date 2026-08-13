import { AUTH_URL } from "@/lib/links";
import { Reveal } from "./reveal";
import { ParallaxPhone } from "./parallax";
import { HoverLink } from "./hover";

export function Cta() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-30 md:px-8">
      <Reveal>
        <div className="relative grid items-end overflow-hidden rounded-[24px] bg-ink lg:grid-cols-[1fr_380px]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(oklch(1_0_0/0.045)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.045)_1px,transparent_1px)] bg-[length:56px_56px] [mask-image:radial-gradient(70%_80%_at_30%_40%,#000,transparent_78%)]" />
          <div className="pointer-events-none absolute inset-x-[-10%] bottom-[-55%] left-[10%] h-[420px] bg-[radial-gradient(46%_60%_at_50%_100%,oklch(0.53_0.18_264/0.45),transparent_70%)]" />

          <div className="relative flex flex-col gap-5 self-center px-8 py-16 md:px-14 md:py-21">
            <span className="inline-flex h-7.5 w-fit items-center gap-2 rounded-full border border-white/15 px-3.25 text-[13px] font-medium text-[oklch(0.85_0_0)]">
              <span className="size-1.5 rounded-full bg-ok motion-safe:animate-pulse-dot" />
              Escritorio, tablet y celular
            </span>
            <h2 className="m-0 max-w-[16ch] text-[clamp(2.125rem,5.5vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-[oklch(0.99_0_0)]">
              Tu negocio en el bolsillo, no en el cuaderno
            </h2>
            <p className="m-0 max-w-[44ch] text-lg leading-[1.55] text-[oklch(0.78_0_0)]">
              Vendés en el mostrador y mirás cómo va el local desde donde estés.
              14 días gratis, sin tarjeta, sin instalar nada.
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-3">
              <HoverLink
                href={AUTH_URL}
                lift={-3}
                className="inline-flex h-14 items-center rounded-[13px] bg-action px-7.5 text-base font-medium text-action-fg no-underline shadow-[0_10px_34px_oklch(0.53_0.18_264/0.4)] transition-[box-shadow,background-color] duration-280 ease-brand hover:bg-action-hover hover:shadow-[0_18px_46px_oklch(0.53_0.18_264/0.5)]"
              >
                Crear mi comercio
              </HoverLink>
              <HoverLink
                href="#faq"
                lift={-3}
                className="inline-flex h-14 items-center rounded-[13px] border border-white/20 px-6 text-base font-medium text-[oklch(0.92_0_0)] no-underline transition-[background-color,border-color] duration-280 ease-brand hover:border-white/35 hover:bg-white/5 hover:text-white"
              >
                Tengo una duda
              </HoverLink>
            </div>
          </div>

          <ParallaxPhone />
        </div>
      </Reveal>
    </section>
  );
}
