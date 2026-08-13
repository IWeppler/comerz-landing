import Image from "next/image";
import { AUTH_URL } from "@/lib/links";
import { HoverLink } from "./hover";

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Producto",
    links: [
      { label: "Punto de venta", href: "#modulos" },
      { label: "Inventario", href: "#modulos" },
      { label: "Caja y arqueo", href: "#modulos" },
      { label: "Catálogo online", href: "#modulos" },
      { label: "Precios", href: "#precios" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Importar desde Excel", href: "#faq" },
      {
        label: "Escribinos por WhatsApp",
        href: "https://wa.me/5491154702118",
        external: true,
      },
    ],
  },
  {
    title: "Empezar",
    links: [
      { label: "Probar 14 días gratis", href: AUTH_URL, external: true },
      { label: "Ingresar a mi cuenta", href: AUTH_URL, external: true },
      { label: "Ver los planes", href: "#precios" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface md:mt-30">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 pt-11 pb-8 sm:grid-cols-2 md:px-8 md:gap-10 md:pt-15 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/assets/logo.png"
              alt="Comerz"
              width={500}
              height={500}
              className="block size-7.5 rounded-lg"
            />
            <span className="text-base font-semibold tracking-[-0.02em]">Comerz</span>
          </div>
          <p className="m-0 max-w-[34ch] text-sm leading-[1.6] text-fg-secondary">
            Gestión comercial y punto de venta para comercios que quieren dejar el
            cuaderno.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title} className="flex flex-col gap-2.75">
            <span className="mb-0.5 text-xs font-semibold tracking-[0.08em] text-fg-muted uppercase">
              {column.title}
            </span>
            {column.links.map((link) => (
              <HoverLink
                key={link.label}
                href={link.href}
                lift={0}
                shift={3}
                press={1}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="w-fit text-sm text-fg-secondary no-underline transition-colors hover:text-fg"
              >
                {link.label}
              </HoverLink>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-line px-5 pt-6 pb-10 md:px-8">
        <span className="text-[13px] text-fg-muted">
          © 2026 Comerz. Todos los derechos reservados.
        </span>
        <span className="text-[13px] text-fg-muted">
          Hecho en Argentina · Powered by{" "}
          <a
            href="https://www.ignacioweppler.com"
            target="_blank"
            rel="noopener"
            className="text-fg-secondary underline decoration-line-strong underline-offset-[3px] transition-colors hover:text-fg hover:decoration-fg-muted"
          >
            Ignacio Weppler
          </a>
        </span>
      </div>
    </footer>
  );
}
