import Image from "next/image";
import { ArrowRight, HandCoins, Megaphone, UserPlus } from "lucide-react";
import { SOCIOS_URL } from "@/lib/links";
import { WRAP } from "./bits";
import { Reveal } from "./rise";

const STEPS = [
  { icon: UserPlus, label: "Sumate como socio" },
  { icon: Megaphone, label: "Recomendá Comerz" },
  { icon: HandCoins, label: "Cobrá por cada cuenta activa" },
];

/**
 * Banner del programa de socios, entre los precios y las preguntas. Es el
 * único bloque con fondo naranja de la página: tiene que cortar el scroll.
 * La foto viene recortada sin fondo, así que se apoya directo sobre el naranja.
 */
export function Referral() {
  return (
    <section
      id="socios"
      aria-label="Programa de socios"
      className={`${WRAP} scroll-mt-16 py-[clamp(48px,8vh,96px)]`}
    >
      <Reveal className="relative mx-auto grid max-w-[1180px] overflow-hidden rounded-[28px] bg-(--color-accent) text-[#111] md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative z-10 flex flex-col gap-6 px-[clamp(24px,4vw,56px)] pt-[clamp(36px,6vh,64px)] pb-8 md:pb-[clamp(36px,6vh,64px)]">
          <span className="w-fit rounded-full bg-[#111] px-3 py-1.5 text-[12px] font-semibold text-white">
            Programa de socios
          </span>

          <h2 className="poster m-0 text-[clamp(52px,7.4vw,112px)]">
            Recomendá Comerz.
            <br />
            <span className="text-white">Ganá con cada comercio.</span>
          </h2>

          <p className="m-0 max-w-[480px] text-[clamp(15px,1.15vw,17px)] leading-[1.55] text-[#111]/80">
            Si conocés comercios que todavía anotan en un cuaderno, sumate como socio y llevate
            una parte de cada cuenta que se active con tu recomendación.
          </p>

          <ol className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 rounded-2xl bg-[#111]/8 px-3.5 py-3 text-[14px] leading-tight font-semibold text-white"
              >
                <Icon aria-hidden strokeWidth={2} className="size-5 shrink-0" />
                {label}
              </li>
            ))}
          </ol>

          <a
            href={SOCIOS_URL}
            className="group mt-2 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#111] py-4 pr-6 pl-7 text-[16px] font-semibold text-white no-underline shadow-[0_14px_40px_-12px_rgb(80_20_5/0.6)] transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-12px_rgb(80_20_5/0.7)] active:scale-[0.96]"
          >
            Quiero ser socio
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-white text-[#111] transition-transform duration-300 ease-brand group-hover:translate-x-1">
              <ArrowRight aria-hidden strokeWidth={2.25} className="size-4" />
            </span>
          </a>
        </div>

        {/* En mobile va abajo del texto; en desktop ocupa la columna derecha
          de punta a punta, anclada abajo para que el teléfono no se corte. */}
        <div className="relative mx-auto aspect-[941/1672] w-full max-w-[320px] md:aspect-auto md:max-w-none">
          {/* PNG recortado sin fondo: el naranja lo pone el bloque, así coincide
            también en modo oscuro. El buzo llega hasta los bordes de la foto,
            así que la máscara los desvanece para que no quede un corte recto. */}
          <Image
            src="/assets/socio.webp"
            alt="Un socio de Comerz mira sorprendido su teléfono: comisión acreditada por un comercio nuevo"
            fill
            sizes="(min-width: 768px) 470px, 320px"
            className="object-cover object-bottom [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_14%)]"
          />
        </div>
      </Reveal>
    </section>
  );
}
