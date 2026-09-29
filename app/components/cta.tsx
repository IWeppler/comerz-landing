import Image from "next/image";
import { Check } from "lucide-react";
import { AUTH_URL } from "@/lib/links";
import { Reveal } from "./reveal";
import { HoverLink } from "./hover";

const PROMISES = ["14 días gratis, sin tarjeta", "Sin instalar nada", "Escritorio, tablet y celular"];

/** The one full block of brand colour on the page, where the page asks for the sale. */
export function Cta() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-24 md:px-8 md:pt-36">
      <Reveal>
        <div className="grid gap-12 rounded-2xl bg-action px-7 py-14 text-action-fg md:px-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <h2 className="m-0 max-w-[15ch] font-display text-[clamp(2.375rem,5.6vw,4.25rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance">
              Tu negocio en el bolsillo, no en el cuaderno
            </h2>
            <p className="m-0 max-w-[40ch] text-lg leading-[1.55]">
              Vendés en el mostrador y mirás cómo va el local desde donde estés.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <HoverLink
                href={AUTH_URL}
                lift={-2}
                className="inline-flex h-13 items-center rounded-[10px] bg-[oklch(0.99_0.005_60)] px-6.5 text-base font-semibold whitespace-nowrap text-[oklch(0.52_0.19_35)] no-underline shadow-md transition-colors duration-280 ease-brand hover:bg-[oklch(0.95_0.02_50)]"
              >
                Probar 14 días gratis
              </HoverLink>
              <HoverLink
                href="#faq"
                lift={-2}
                className="inline-flex h-13 items-center rounded-[10px] border border-current/40 px-5.5 text-base font-medium whitespace-nowrap text-action-fg no-underline transition-colors duration-280 ease-brand hover:bg-white/10"
              >
                Tengo una duda
              </HoverLink>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Image
              src="/assets/logo.png"
              alt=""
              width={500}
              height={500}
              className="block size-16 rounded-2xl md:size-20"
            />
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-center gap-2.5 text-base font-medium">
                  <Check aria-hidden strokeWidth={2.25} className="size-4.5 shrink-0" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
