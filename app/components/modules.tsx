import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { Tabs, type Tab } from "./tabs";
import { ZoomImage } from "./zoom-image";
import type { Shot } from "./crop";

const FRAME = "overflow-hidden rounded-2xl border border-line bg-surface shadow-md";

/** Copy on top, the screen at full width underneath: big enough to read. */
function Panel({
  title,
  body,
  features,
  children,
}: {
  title: string;
  body: string;
  features: string[];
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex max-w-[62ch] flex-col gap-3">
        <h3 className="m-0 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] font-semibold tracking-[-0.028em]">
          {title}
        </h3>
        <p className="m-0 text-base leading-[1.65] text-fg-secondary md:text-[17px]">
          {body}
        </p>
        <ul className="m-0 mt-1 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm font-medium">
              <Check aria-hidden strokeWidth={2} className="size-4 text-(--color-accent)" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}

function Screen(shot: Shot) {
  return (
    <div className={FRAME}>
      <ZoomImage {...shot} vw={[100, 90]} />
    </div>
  );
}

const TABS: Tab[] = [
  {
    id: "vender",
    label: "Vender",
    hint: "El mostrador",
    panel: (
      <Panel
        title="Cobrás en tres toques"
        body="Buscás el producto o lo tocás en la grilla, aplicás descuento, elegís cómo te pagan. El ticket se arma solo a la derecha y el stock baja en el momento."
        features={["Descuentos", "Talle y color", "Ticket digital"]}
      >
        <Screen
          src="/assets/vender2.png"
          alt="Pantalla de venta con grilla de productos y el ticket a la derecha"
          width={1280}
          height={924}
          region={{ x: 0, y: 0, w: 1280, h: 640 }}
        />
      </Panel>
    ),
  },
  {
    id: "panel",
    label: "Panel",
    hint: "Cómo va el negocio",
    panel: (
      <Panel
        title="El puesto de mando"
        body="Ingresos, unidades, ticket promedio y ganancia del día, la semana o el año. Con avisos concretos: deuda vencida, capital inmovilizado, productos que no rotan."
        features={["Día, semana, mes o año", "Avisos de deuda y stock"]}
      >
        <Screen
          src="/assets/dashboard2.png"
          alt="Panel con los indicadores de la semana"
          width={1556}
          height={771}
          region={{ x: 0, y: 0, w: 1542, h: 771 }}
        />
      </Panel>
    ),
  },
  {
    id: "caja",
    label: "Caja",
    hint: "Apertura y arqueo",
    panel: (
      <Panel
        title="Abrís, vendés, arqueás"
        body="Apertura y cierre con el efectivo esperado contra el contado. Si falta plata, te enterás el mismo día y no a fin de mes."
        features={["Apertura y cierre", "Ingresos y egresos"]}
      >
        {/* The real close-register dialog, rebuilt at size: there is no
          screenshot of it, and this is the one screen that fits in a card. */}
        <div className={`${FRAME} flex items-center justify-center bg-sunken p-5 md:aspect-[2/1] md:p-12`}>
          <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
            <div className="flex flex-col gap-1.5 px-6 pt-5.5 pb-4.5">
              <span className="text-[17px] font-semibold tracking-[-0.01em]">Cerrar caja</span>
              <p className="m-0 text-[13px] leading-[1.55] text-fg-secondary">
                Se registra el arqueo del día y no podés registrar más ventas hasta
                abrir de nuevo.
              </p>
            </div>
            <dl className="m-0 flex flex-col gap-2.25 px-6 pb-5 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-fg-secondary">Apertura</dt>
                <dd className="m-0 font-mono font-medium">$ 20.000</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fg-secondary">Ventas en efectivo</dt>
                <dd className="m-0 font-mono font-medium">$ 108.400</dd>
              </div>
              <div className="my-0.75 h-px bg-line" />
              <div className="flex justify-between">
                <dt className="text-fg-secondary">Efectivo esperado</dt>
                <dd className="m-0 font-mono font-medium">$ 128.400</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-fg-secondary">Contado</dt>
                <dd className="m-0 inline-flex items-center gap-2">
                  <span className="inline-flex h-5 items-center rounded-md bg-ok-bg px-[7px] font-mono text-[11px] font-medium text-ok">
                    sin diferencia
                  </span>
                  <span className="font-mono font-medium">$ 128.400</span>
                </dd>
              </div>
            </dl>
            <div className="flex justify-end gap-2.5 border-t border-line bg-surface-alt px-6 py-4">
              <span className="inline-flex h-9 items-center rounded-[10px] border border-line bg-surface px-4 text-[13px] font-medium">
                Cancelar
              </span>
              <span className="inline-flex h-9 items-center rounded-[10px] bg-action px-4 text-[13px] font-medium text-action-fg">
                Cerrar caja
              </span>
            </div>
          </div>
        </div>
      </Panel>
    ),
  },
  {
    id: "inventario",
    label: "Inventario",
    hint: "Stock y catálogo",
    panel: (
      <Panel
        title="Carga rápida y catálogo"
        body="Cargás productos con foto, talle y color en lote. El mismo catálogo lo compartís por WhatsApp sin armar nada aparte."
        features={["Carga en lote", "Importar desde Excel"]}
      >
        <Screen
          src="/assets/table-stock.png"
          alt="Tabla de inventario con stock, precios y estado de cada producto"
          width={1565}
          height={879}
          region={{ x: 0, y: 0, w: 1565, h: 782 }}
        />
      </Panel>
    ),
  },
];

export function Modules() {
  return (
    <section id="modulos" className="mx-auto max-w-[1200px] px-5 pt-24 md:px-8 md:pt-36">
      <Reveal className="mb-8 flex max-w-[720px] flex-col gap-4 md:mb-12">
        <h2 className="m-0 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
          Cuatro pantallas y ya está todo el negocio
        </h2>
        <p className="m-0 text-lg leading-[1.6] text-fg-secondary">
          El sistema de gestión y el punto de venta vienen juntos: nada de módulos
          que se compran aparte. Todo desde el primer día.
        </p>
      </Reveal>

      <Reveal>
        <Tabs tabs={TABS} />
      </Reveal>
    </section>
  );
}
