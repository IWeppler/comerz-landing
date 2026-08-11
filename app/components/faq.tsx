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

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[860px] px-5 pt-30 md:px-8">
      <Reveal>
        <h2 className="mt-0 mb-10 text-center text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.035em]">
          Lo que todos preguntan
        </h2>
      </Reveal>

      <Reveal>
        <div className="overflow-hidden rounded-[18px] border border-line bg-surface">
          {ITEMS.map((item, i) => (
            <details
              key={item.q}
              className={`group ${i < ITEMS.length - 1 ? "border-b border-line" : ""}`}
            >
              <summary className="flex items-center gap-4 px-6.5 py-5.75 text-base font-medium transition-colors hover:bg-surface-alt">
                <span className="flex-1">{item.q}</span>
                <span className="size-2.75 shrink-0 rotate-45 border-r-[1.5px] border-b-[1.5px] border-fg-muted transition-transform duration-300 ease-brand group-open:rotate-[-135deg]" />
              </summary>
              <p className="m-0 px-6.5 pb-6 text-[15px] leading-[1.65] text-fg-secondary">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
