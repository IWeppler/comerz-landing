import Image from "next/image";
import Link from "next/link";
import { AUTH_URL, TRIAL_URL, WHATSAPP_URL } from "@/lib/links";
import { ThemeToggle } from "./theme-toggle";

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: FooterLink[][] = [
  [
    { label: "Vender", href: "/#funciones" },
    { label: "Caja y arqueo", href: "/#funciones" },
    { label: "Stock e inventario", href: "/#funciones" },
    { label: "Cuenta corriente", href: "/#funciones" },
    { label: "Catálogo online", href: "/#funciones" },
  ],
  [
    { label: "Precios", href: "/#precios" },
    { label: "Preguntas frecuentes", href: "/#faq" },
    { label: "Escribinos por WhatsApp", href: WHATSAPP_URL, external: true },
  ],
  [
    { label: "Probar 14 días gratis", href: TRIAL_URL },
    { label: "Ingresar", href: AUTH_URL },
  ],
];

/**
 * Plancha negra al final, igual en cualquier tema: el último pedido de prueba
 * en cartel y, abajo, los links y el botón de tema.
 */
export function SiteFooter() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1320px] px-5 pt-[clamp(70px,12vh,140px)] md:px-[clamp(20px,5vw,84px)]">
        <h2 className="poster m-0 text-[clamp(60px,10vw,160px)]">
          Cerrá el cuaderno
          <br />
          hoy<span className="text-[#ff5a2e]">.</span>
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={TRIAL_URL}
            className="inline-flex items-center rounded-full bg-[#e8401a] px-8 py-4.5 text-base font-semibold text-white no-underline transition-opacity hover:opacity-80 active:scale-[0.96]"
          >
            Probar 14 días gratis
          </a>
          <span className="text-sm text-white/55">Sin tarjeta · Sin instalar nada</span>
        </div>

        <div className="mt-[clamp(60px,10vh,110px)] grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex items-start">
            <Link href="/#top" className="flex items-center gap-2.5 text-white no-underline">
              <Image
                src="/assets/logo.png"
                alt="Comerz"
                width={500}
                height={500}
                className="block size-[26px] rounded-[8px]"
              />
              <span className="text-[19px] font-bold tracking-[-0.03em]">Comerz</span>
            </Link>
          </div>

          {COLUMNS.map((column, i) => (
            <div key={i} className="flex flex-col gap-2.5">
              {column.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="w-fit text-[15px] text-white/85 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              {i === COLUMNS.length - 1 && <ThemeToggle />}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 pb-10 text-[13px] text-white/50">
          <span>© 2026 Comerz. Todos los derechos reservados.</span>
          <span>
            Hecho en Argentina · Powered by{" "}
            <a
              href="https://www.ignacioweppler.dev"
              target="_blank"
              rel="noopener"
              className="text-white/75 transition-colors hover:text-white"
            >
              Ignacio Weppler
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
