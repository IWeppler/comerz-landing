import Image from "next/image";
import { HoverLink } from "./hover";

const COLUMNS = [
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
      { label: "Importar desde Excel", href: "#top" },
      { label: "Escribinos por WhatsApp", href: "https://wa.me/5491154702118" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "#top" },
      { label: "Política de privacidad", href: "#top" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-30 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 pt-15 pb-8 md:px-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
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
                className="w-fit text-sm text-fg-secondary no-underline transition-colors hover:text-fg"
              >
                {link.label}
              </HoverLink>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 border-t border-line px-5 pt-6 pb-10 md:px-8">
        <span className="text-[13px] text-fg-muted">
          © 2026 Comerz. Todos los derechos reservados.
        </span>
        <span className="text-[13px] text-fg-muted">Hecho en Argentina</span>
      </div>
    </footer>
  );
}
