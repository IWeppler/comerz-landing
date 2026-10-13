import { Bebas_Neue, Inter_Tight } from "next/font/google";
import "./landing.css";
import { SiteNav } from "./components/site-nav";
import { Hero } from "./components/hero";
import { Overview } from "./components/overview";
import { Proof } from "./components/proof";
import { Cash, Import, Sell } from "./components/features";
import { Rail } from "./components/rail";
import { Pocket } from "./components/pocket";
import { Pricing } from "./components/pricing";
import { Faq } from "./components/faq";
import { Safe } from "./components/safe";
import { SiteFooter } from "./components/site-footer";
import { THEME_KEY } from "./components/bits";

/** Titulares de sección. Las fuentes de la landing no las carga el resto del sitio. */
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

/** Carteles en mayúsculas. Solo viene en 400. */
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

/**
 * Aplica el tema elegido en el pie antes de que se pinte la página, así no
 * parpadea. Corre apenas el navegador lee la raíz `.landing`, que es su padre.
 */
const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||t==="light")document.currentScript.parentElement.dataset.theme=t}catch(e){}`;

export default function Home() {
  return (
    // `clip` en lugar de `hidden`: recorta el desborde igual, pero sin
    // convertir al contenedor en scroller, que rompería el parallax del hero.
    // `landing` activa los tokens propios de esta página (landing.css).
    <div
      suppressHydrationWarning
      className={`landing ${interTight.variable} ${bebas.variable} relative flex-1 overflow-x-clip bg-canvas font-sans text-fg`}
    >
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      {/* Without JS the rising blocks would stay hidden, so unhide them. */}
      <noscript>
        <style>{`[data-rise]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>
      <div aria-hidden className="grain" />
      <SiteNav />
      <main>
        <Hero />
        <Proof />
        <Overview />
        <Sell />
        <Cash />
        <Import />
        <Rail />
        <Pocket />
        <Pricing />
        <Faq />
        <Safe />
      </main>
      <SiteFooter />
    </div>
  );
}
