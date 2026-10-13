import Image from "next/image";
import { WRAP } from "./bits";
import { KpiCard } from "./kpi-card";
import { Reveal, RiseLines } from "./rise";

/** El negocio en el celular: cartel centrado y el teléfono con dos notas. */
export function Pocket() {
  return (
    <section className={`${WRAP} py-[clamp(80px,14vh,180px)] text-center`}>
      <RiseLines lines={["Tu negocio,", "en el bolsillo."]} className="poster m-0 text-[clamp(64px,10.5vw,168px)]" />
      <Reveal delay={150}>
        <p className="mx-auto mt-7 mb-0 max-w-[540px] text-[clamp(16px,1.2vw,19px)] leading-[1.6] text-fg-muted">
          En la compu del mostrador, en la tablet o en el celular, sin instalar nada.
          Mirás cómo viene el día desde donde estés.
        </p>
      </Reveal>

      <Reveal delay={250} className="relative mx-auto mt-[clamp(48px,8vh,90px)] w-[min(100%,480px)]">
        {/* Asoman por encima del borde del celular, como si salieran de la
          pantalla, con lo que el panel no muestra a la vista. */}
        <KpiCard
          className="bob absolute top-[16%] -left-[24%] z-10 hidden sm:block"
          label="Disponible ahora"
          value="$ 17.232.151"
          note="En todas tus cuentas"
        />
        <KpiCard
          className="bob absolute -right-[24%] bottom-[14%] z-10 hidden [animation-delay:1.4s] sm:block"
          label="Ganancia"
          value="$ 2.337.502"
          delta="16%"
          note="50% de margen"
        />
        <Image
          src="/assets/iphone2.webp"
          alt="Comerz en el celular: lo que vendiste, la ganancia, el ticket promedio, las unidades y las ventas de la semana"
          width={1024}
          height={1536}
          sizes="(min-width: 640px) 480px, 92vw"
          className="block h-auto w-full"
        />
      </Reveal>
    </section>
  );
}
