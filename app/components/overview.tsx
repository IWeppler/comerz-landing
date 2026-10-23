import Image from "next/image";
import { TRIAL_URL } from "@/lib/links";
import { MoreLink, WRAP } from "./bits";
import { Reveal, RiseLines } from "./rise";

/**
 * La promesa entera en una pantalla: texto a la izquierda y, a la derecha, la
 * foto vertical con el panel en el celular.
 */
export function Overview() {
  return (
    <section className={`${WRAP} grid grid-cols-[minmax(0,1fr)] items-center gap-12 py-[clamp(70px,12vh,140px)] lg:grid-cols-2 lg:gap-16`}>
      <div className="flex flex-col items-start">
        <RiseLines
          lines={["Todo tu negocio.", "Y cuánto te deja", "de verdad."]}
          className="m-0 font-display text-[clamp(40px,4.8vw,76px)] leading-[1.02] font-medium tracking-[-0.04em]"
        />
        <Reveal delay={200} className="mt-7 flex flex-col gap-8">
          <p className="m-0 max-w-[30em] text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-fg-muted">
            Ventas, caja, stock y fiados en un solo lugar. La ganancia real del día,
            de la semana y del mes, y un aviso cuando algo se frena.
          </p>
          <MoreLink href={TRIAL_URL}>Probar 14 días gratis</MoreLink>
        </Reveal>
      </div>

      <Reveal className="relative mx-auto aspect-[941/1672] w-full max-w-[460px] overflow-hidden rounded-[40px] bg-[#e8401a]">
        <Image
          src="/assets/model.webp"
          alt="Una comerciante muestra el panel de Comerz en su celular: lo que vendió, la ganancia, el ticket promedio y las ventas de la semana"
          fill
          sizes="(min-width: 1024px) 460px, 92vw"
          className="object-cover"
        />
      </Reveal>
    </section>
  );
}
