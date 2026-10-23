import { TRIAL_URL } from "@/lib/links";
import { WRAP } from "./bits";
import { HeroMedia } from "./hero-media";
import { KpiCard } from "./kpi-card";

/**
 * Imagen del hero. Por ahora es una captura del panel, desenfocada para que no
 * compita con el texto; cuando esté la foto del local (horizontal, unos
 * 2400 × 1600), se cambia la ruta y `placeholder` pasa a false.
 */
const HERO_IMAGE = { src: "/assets/panel.webp", placeholder: true };

/**
 * Apertura: arriba negro liso con el cartel; desde el medio de la pantalla
 * entra la imagen con parallax, y sobre ella quedan el remate del asterisco,
 * los botones y, más abajo, el manifiesto.
 */
export function Hero() {
  return (
    <section id="top" className="relative isolate bg-[#111] text-white">
      <HeroMedia src={HERO_IMAGE.src} soft={HERO_IMAGE.placeholder} />

      <div
        className={`${WRAP} relative flex min-h-[100svh] flex-col pt-[clamp(104px,15vh,150px)] pb-[clamp(40px,7vh,80px)]`}
      >
        <span className="rise-in mb-[clamp(16px,3vh,28px)] inline-flex items-center text-[clamp(16px,1.2vw,18px)] font-light text-white/60">
          Sistema de gestión y punto de venta
        </span>

        {/* Static paint first: the headline is the LCP element, so its entrance
          is a CSS animation instead of waiting for hydration. */}
        <h1 className="poster m-0 text-[clamp(72px,12.6vw,204px)]">
          <span className="rise-in block [animation-delay:80ms]">
            Hacé crecer
          </span>
          <span className="rise-in block [animation-delay:200ms]">
            tu comercio<span className="text-[#ff5a2e]">*</span>
          </span>
        </h1>

        <div className="mt-auto flex flex-col gap-8 pt-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[620px] flex-col gap-7">
            <p className="rise-in m-0 text-[clamp(19px,1.8vw,26px)] leading-[1.35] font-medium tracking-[-0.01em] [animation-delay:320ms]">
              *con un solo sistema para vender, cobrar, controlar el stock y
              saber cuánto ganás de verdad.
            </p>

            <div className="rise-in flex flex-wrap items-center gap-3 [animation-delay:440ms]">
              <a
                href={TRIAL_URL}
                className="inline-flex items-center rounded-full bg-[#e8401a] px-7 py-4 text-base font-semibold text-white no-underline transition-opacity hover:opacity-80 active:scale-[0.96]"
              >
                Probar 14 días gratis
              </a>
              <a
                href="#funciones"
                className="inline-flex items-center rounded-full border-[1.5px] border-white/35 px-7 py-4 text-base font-semibold text-white no-underline backdrop-blur-sm transition-opacity hover:opacity-80 active:scale-[0.96]"
              >
                Ver qué hace
              </a>
            </div>
          </div>

          {/* La semana de un negocio, donde Subscrr pone el QR. */}
          <div className="rise-in hidden [animation-delay:560ms] lg:block">
            <KpiCard
              tone="dark"
              className="bob"
              label="Vendiste esta semana"
              value="$ 4.788.003"
              delta="22%"
              note="43 ventas, ticket promedio $ 111.349"
            />
          </div>
        </div>
      </div>

      <div
        className={`${WRAP} relative pt-[clamp(60px,12vh,140px)] pb-[clamp(110px,22vh,240px)]`}
      >
        <p className="m-0 max-w-[1080px] font-display text-[clamp(28px,4vw,58px)] leading-[1.1] font-semibold tracking-[-0.035em] text-balance">
          Más o menos sabés cuánto vendiste este mes. El &quot;más o meno&quot;
          es el problema. Comerz anota cada venta, cada peso de la caja y cada
          fiado, para que sepas exactamente cómo está tu negocio.
        </p>
      </div>
    </section>
  );
}
