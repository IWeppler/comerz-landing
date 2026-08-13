import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { Stats } from "./components/stats";
import { Why } from "./components/why";
import { Modules } from "./components/modules";
import { Extras } from "./components/extras";
import { Pricing } from "./components/pricing";
import { Faq } from "./components/faq";
import { Cta } from "./components/cta";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    // `clip` en lugar de `hidden`: recorta el desborde de los glows igual, pero
    // sin convertir al contenedor en scroller, que rompe el `sticky` de Tabs.
    <div className="relative flex-1 overflow-x-clip bg-canvas text-fg">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Why />
        <Modules />
        <Extras />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
