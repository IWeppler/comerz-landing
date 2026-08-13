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
    a: "Elegís el plan y seguís donde estabas, con todo lo que cargaste. Si decidís que no, tus datos quedan disponibles para descargar y no te cobramos nada — no pedimos tarjeta para la prueba.",
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
    <section id="faq" className="mx-auto max-w-[860px] px-5 pt-20 md:px-8 md:pt-30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Reveal>
        <h2 className="mt-0 mb-7 text-center text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.035em] md:mb-10">
          Preguntas frecuentes sobre el sistema
        </h2>
      </Reveal>

      <Reveal>
        <div className="overflow-hidden rounded-[18px] border border-line bg-surface">
          {ITEMS.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              className={`group ${i < ITEMS.length - 1 ? "border-b border-line" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 text-[15px] font-medium transition-colors hover:bg-surface-alt md:px-6.5 md:py-5.75 md:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{item.q}</span>
                <span className="size-2.75 shrink-0 rotate-45 border-r-[1.5px] border-b-[1.5px] border-fg-muted transition-transform duration-300 ease-brand group-open:rotate-[-135deg]" />
              </summary>
              <p className="m-0 px-5 pb-5 text-[14.5px] leading-[1.65] text-fg-secondary md:px-6.5 md:pb-6 md:text-[15px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
