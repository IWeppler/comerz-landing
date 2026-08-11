import Image from "next/image";
import { Reveal } from "./reveal";
import { Tabs, type Tab } from "./tabs";

const COPY = "flex flex-col gap-3.25 p-8 md:p-11";
const EYEBROW = "font-mono text-xs text-fg-muted";
const TITLE =
  "m-0 text-[28px] leading-[1.12] font-semibold tracking-[-0.028em]";
const BODY = "m-0 text-[15px] leading-[1.6] text-fg-secondary";
const CHIPS = "mt-2.5 flex flex-wrap gap-2";
const CHIP =
  "inline-flex h-6.75 items-center rounded-full border border-line bg-surface-alt px-3 text-xs font-medium text-fg-secondary";
const SHOT =
  "flex h-full items-center overflow-hidden border-line bg-sunken py-10 md:border-l";
const MOCK =
  "flex h-full items-center justify-center border-line bg-sunken p-8 md:border-l md:p-12";

const INVENTORY_COLS = "grid grid-cols-[1fr_64px_92px_88px] gap-3.5 px-4.5";

const ROWS = [
  {
    name: "Vestido Lisa",
    stock: 12,
    price: "$ 39.000",
    state: "Activo",
    tone: "ok",
  },
  {
    name: "Vestido Frunce",
    stock: 3,
    price: "$ 25.000",
    state: "Bajo",
    tone: "warn",
  },
  {
    name: "Vestido Paula",
    stock: 0,
    price: "$ 32.000",
    state: "Sin stock",
    tone: "danger",
  },
  {
    name: "Vestido Gabriela",
    stock: 27,
    price: "$ 39.000",
    state: "Activo",
    tone: "ok",
  },
] as const;

const TONES = {
  ok: "bg-ok-bg border-ok-border text-ok",
  warn: "bg-warn-bg border-warn-border text-warn",
  danger: "bg-danger-bg border-danger-border text-danger",
} as const;

const TABS: Tab[] = [
  {
    id: "vender",
    label: "Vender",
    panel: (
      <>
        <div className={COPY}>
          <span className={EYEBROW}>01 · Vender</span>
          <h3 className={TITLE}>Cobrás en tres toques</h3>
          <p className={BODY}>
            Buscás el producto o lo tocás en la grilla, aplicás descuento,
            elegís cómo te pagan. El ticket se arma solo a la derecha y el stock
            baja en el momento.
          </p>
          <div className={CHIPS}>
            <span className={CHIP}>Descuentos</span>
            <span className={CHIP}>Talle y color</span>
            <span className={CHIP}>Ticket digital</span>
          </div>
        </div>
        <div className={SHOT}>
          <Image
            src="/assets/vendercomerz2.png"
            alt="Pantalla de venta con grilla de productos y el ticket a la derecha"
            width={1915}
            height={979}
            className="block h-auto w-full"
          />
        </div>
      </>
    ),
  },
  {
    id: "panel",
    label: "Panel",
    panel: (
      <>
        <div className={COPY}>
          <span className={EYEBROW}>02 · Panel</span>
          <h3 className={TITLE}>El puesto de mando</h3>
          <p className={BODY}>
            Ingresos, unidades, ticket promedio y ganancia del día, la semana o
            el año. Con avisos concretos: deuda vencida, capital inmovilizado,
            productos que no rotan.
          </p>
          <div className={CHIPS}>
            <span className="inline-flex h-6.75 items-center gap-1 rounded-full bg-ok-bg px-2.75 font-mono text-xs font-medium text-ok">
              ↗ +78%
            </span>
            <span className="inline-flex h-6.75 items-center rounded-full bg-danger-bg px-3 text-xs font-medium text-danger">
              Deuda vencida
            </span>
          </div>
        </div>
        <div className={SHOT}>
          <Image
            src="/assets/dashboard2.png"
            alt="Panel con los indicadores de la semana"
            width={1919}
            height={978}
            className="block h-auto w-full"
          />
        </div>
      </>
    ),
  },
  {
    id: "caja",
    label: "Caja",
    panel: (
      <>
        <div className={COPY}>
          <span className={EYEBROW}>03 · Caja</span>
          <h3 className={TITLE}>Abrís, vendés, arqueás</h3>
          <p className={BODY}>
            Apertura y cierre con el efectivo esperado contra el contado. Si
            falta plata, te enterás el mismo día y no a fin de mes.
          </p>
          <div className={CHIPS}>
            <span className="inline-flex h-6.75 items-center gap-1.5 rounded-full border border-ok-border bg-ok-bg px-3 text-xs font-medium text-ok">
              <span className="size-[5px] rounded-full bg-ok" />
              Caja abierta
            </span>
            <span className={CHIP}>Ingresos y egresos</span>
          </div>
        </div>
        <div className={MOCK}>
          <div className="w-full max-w-[420px] overflow-hidden rounded-[18px] border border-line bg-surface shadow-lg">
            <div className="flex flex-col gap-1.5 px-6 pt-5.5 pb-4.5">
              <span className="text-[17px] font-semibold tracking-[-0.01em]">
                Cerrar caja
              </span>
              <p className="m-0 text-[13px] leading-[1.55] text-fg-secondary">
                Se registra el arqueo del día y no podés registrar más ventas
                hasta abrir de nuevo.
              </p>
            </div>
            <div className="flex flex-col gap-2.25 px-6 pb-5 text-[13px]">
              <div className="flex justify-between">
                <span className="text-fg-secondary">Apertura</span>
                <span className="font-mono font-medium">$ 20.000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-secondary">Ventas en efectivo</span>
                <span className="font-mono font-medium">$ 108.400</span>
              </div>
              <div className="my-0.75 h-px bg-line" />
              <div className="flex justify-between">
                <span className="text-fg-secondary">Efectivo esperado</span>
                <span className="font-mono font-medium">$ 128.400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-secondary">Contado</span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex h-5 items-center rounded-md bg-ok-bg px-[7px] font-mono text-[11px] font-medium text-ok">
                    sin diferencia
                  </span>
                  <span className="font-mono font-medium">$ 128.400</span>
                </span>
              </div>
            </div>
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
      </>
    ),
  },
  {
    id: "inventario",
    label: "Inventario",
    panel: (
      <>
        <div className={COPY}>
          <span className={EYEBROW}>04 · Inventario</span>
          <h3 className={TITLE}>Carga rápida y catálogo</h3>
          <p className={BODY}>
            Cargás productos con foto, talle y color en lote. El mismo catálogo
            lo compartís por WhatsApp sin armar nada aparte.
          </p>
          <div className={CHIPS}>
            <span className="inline-flex h-6.75 items-center rounded-full bg-warn-bg px-3 text-xs font-medium text-warn">
              Stock crítico
            </span>
            <span className={CHIP}>Importar desde Excel</span>
          </div>
        </div>
        <div className={SHOT}>
          <Image
            src="/assets/table-stock.png"
            alt="Panel con los indicadores de la semana"
            width={1919}
            height={978}
            className="block h-auto w-full"
          />
        </div>
      </>
    ),
  },
];

export function Modules() {
  return (
    <section id="modulos" className="mx-auto max-w-[1200px] px-5 pt-30 md:px-8">
      <Reveal className="mb-9">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-[54ch]">
            <span className="text-xs font-semibold tracking-[0.09em] text-brand uppercase">
              Qué hace
            </span>
            <h2 className="mt-3.5 mb-0 text-[clamp(2rem,5vw,3rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
              Cuatro pantallas y ya está todo el negocio
            </h2>
          </div>
          <p className="m-0 max-w-[34ch] text-base leading-[1.6] text-fg-secondary">
            Sin módulos que se compran aparte. Todo viene junto desde el primer
            día.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <Tabs tabs={TABS} />
      </Reveal>
    </section>
  );
}
