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
    <div className="relative flex-1 overflow-x-hidden bg-canvas text-fg">
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
