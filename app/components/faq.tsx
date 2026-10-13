import { Plus } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/links";
import { MoreLink, WRAP } from "./bits";
import { Reveal, RiseLines } from "./rise";

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
      className={`${WRAP} grid scroll-mt-16 gap-10 py-[clamp(50px,8vh,100px)] lg:grid-cols-12 lg:gap-12`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <div className="flex flex-col gap-6 lg:col-span-5">
        <RiseLines lines={["Buenas", "preguntas."]} className="poster m-0 text-[clamp(64px,8vw,128px)]" />
        <Reveal delay={150}>
          <MoreLink href={WHATSAPP_URL} external>
            ¿No está la tuya? Escribinos
          </MoreLink>
        </Reveal>
      </div>

      <Reveal className="lg:col-span-7">
        <div className="border-t border-line">
          {ITEMS.map((item) => (
            <details key={item.q} name="faq" className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center gap-4 py-6 text-[17px] font-semibold tracking-[-0.01em] transition-opacity hover:opacity-70 md:text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{item.q}</span>
                <Plus
                  aria-hidden
                  strokeWidth={2}
                  className="size-5 shrink-0 text-(--color-accent) transition-transform duration-300 ease-brand group-open:rotate-45"
                />
              </summary>
              <p className="m-0 max-w-[60ch] pb-7 text-[15px] leading-[1.7] text-fg-muted md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
