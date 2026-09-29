import { Plus } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/links";
import { Reveal } from "./reveal";

const ITEMS = [
  {
    q: "¿Tengo que cargar todos mis productos antes de empezar?",
    a: "No. Empezás con lo que más vendés y el resto lo vas cargando con Carga rápida, que te deja subir varios productos con foto, talle y color de una sola vez. Muchos arrancan con 50 productos el primer día.",
  },
  {
    q: "¿Necesito comprar una máquina o un lector especial?",
    a: "No. Funciona en la computadora que ya tenés, en una tablet o en el celular, desde el navegador. Si después querés sumar un lector de códigos o una impresora de tickets, andan sin configurar nada raro.",
  },
  {
    q: "¿Se me pierden las ventas si se corta internet?",
    a: "Los datos viven en la nube y se sincronizan apenas vuelve la conexión. Nada queda solo en esa computadora, así que tampoco perdés el historial si se te rompe el equipo.",
  },
  {
    q: "Ya tengo todo en un Excel, ¿lo puedo pasar?",
    a: "Sí. Hay una plantilla de productos y otra de clientes: completás, subís el archivo y quedan cargados. Si tu planilla es un quilombo, escribinos y te la ordenamos nosotros.",
  },
  {
    q: "¿Qué pasa cuando terminan los 14 días?",
    a: "Elegís el plan y seguís donde estabas, con todo lo que cargaste. Si decidís que no, tus datos quedan disponibles para descargar y no te cobramos nada: no pedimos tarjeta para la prueba.",
  },
];

/** Las mismas preguntas, en el formato que Google despliega en el resultado. */
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section
      id="faq"
      className="mx-auto grid max-w-[1200px] gap-8 px-5 pt-24 md:px-8 md:pt-36 lg:grid-cols-12 lg:gap-10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Reveal className="flex flex-col gap-4 lg:col-span-4">
        <h2 className="m-0 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
          Preguntas frecuentes sobre el sistema
        </h2>
        <p className="m-0 max-w-[34ch] text-base leading-[1.6] text-fg-secondary">
          ¿No está la tuya?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-(--color-accent) underline decoration-(--color-brand-line) underline-offset-4 transition-colors hover:decoration-current"
          >
            Escribinos por WhatsApp
          </a>
        </p>
      </Reveal>

      <Reveal className="lg:col-span-8">
        <div className="border-t border-line">
          {ITEMS.map((item) => (
            <details key={item.q} name="faq" className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center gap-4 py-5.5 text-base font-medium transition-colors hover:text-(--color-accent) md:py-6.5 md:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{item.q}</span>
                <Plus
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-5 shrink-0 text-fg-muted transition-transform duration-300 ease-brand group-open:rotate-45"
                />
              </summary>
              <p className="m-0 max-w-[62ch] pb-6 text-[15px] leading-[1.7] text-fg-secondary md:pb-7 md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
