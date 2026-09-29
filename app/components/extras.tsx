import Image from "next/image";
import { CloudCheck, FileSpreadsheet, Receipt } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Crop } from "./crop";
import { Reveal } from "./reveal";

const CELL = "flex h-full flex-col gap-3 rounded-2xl border border-line p-6 md:p-7";
const TITLE = "m-0 font-display text-xl font-semibold tracking-[-0.02em]";
const BODY = "m-0 text-[15px] leading-[1.6] text-fg-secondary";

function Small({
  icon,
  title,
  children,
  delay,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className={cn(CELL, "bg-surface")}>
        <span className="mb-3 text-(--color-accent)">{icon}</span>
        <h3 className={TITLE}>{title}</h3>
        <p className={BODY}>{children}</p>
      </div>
    </Reveal>
  );
}

const ICON = { strokeWidth: 1.75, className: "size-6", "aria-hidden": true } as const;

export function Extras() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-24 md:px-8 md:pt-36">
      <Reveal className="mb-8 md:mb-12">
        <h2 className="m-0 max-w-[18ch] font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
          Los detalles que hacen que no vuelvas al cuaderno
        </h2>
      </Reveal>

      {/* Six cells, six things: the catalogue gets the big photo tile, the
        quick start gets the brand colour, Insights runs the full width. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal className="sm:col-span-2 lg:row-span-2">
          <div className={cn(CELL, "gap-4 bg-surface")}>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/whatsappp.png"
                alt=""
                width={128}
                height={128}
                className="size-7"
              />
              <h3 className={TITLE}>Catálogo online por WhatsApp</h3>
            </div>
            <p className={`${BODY} max-w-[46ch]`}>
              El mismo producto que cargás para vender ya queda publicado. Mandás un
              link y el cliente ve fotos, talles y precio actualizado.
            </p>
            <div className="mt-auto overflow-hidden rounded-xl border border-line">
              <Crop
                src="/assets/vender2.png"
                alt="Productos del catálogo con foto, nombre y precio"
                width={1280}
                height={924}
                region={{ x: 0, y: 100, w: 866, h: 472 }}
                vw={[100, 45]}
              />
            </div>
          </div>
        </Reveal>

        <Small delay={80} icon={<Receipt {...ICON} />} title="Tickets digitales">
          Se lo mandás al cliente por WhatsApp o lo imprimís. Queda guardado en el
          historial.
        </Small>

        <Small delay={160} icon={<CloudCheck {...ICON} />} title="No perdés nada">
          Si se rompe la compu, tus ventas siguen ahí. Se sincroniza cuando vuelve
          internet.
        </Small>

        <Small delay={240} icon={<FileSpreadsheet {...ICON} />} title="Traés tu Excel">
          Plantilla de productos y de clientes. Subís el archivo y queda todo cargado.
        </Small>

        <Reveal delay={320}>
          <div className={cn(CELL, "border-transparent bg-action text-action-fg")}>
            <span className="font-display text-[3.25rem] leading-none font-semibold tracking-[-0.04em]">
              5 min
            </span>
            <h3 className={cn(TITLE, "mt-auto")}>Arrancás hoy</h3>
            <p className="m-0 text-[15px] leading-[1.6]">
              Cargás lo que más vendés y ya registrás la primera venta. El resto lo
              sumás después.
            </p>
          </div>
        </Reveal>

        <Reveal className="sm:col-span-2 lg:col-span-4">
          <div className="grid items-center gap-6 rounded-2xl border border-(--color-brand-line) bg-(--color-brand-soft) p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-10 md:p-9">
            <div className="flex flex-col gap-3">
              <h3 className={TITLE}>Comerz Insights</h3>
              <p className={`${BODY} max-w-[38ch]`}>
                No solo te muestra números: te dice qué hacer con ellos.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-md">
              <Crop
                src="/assets/dashboard3.png"
                alt="Avisos de Comerz Insights: capital inmovilizado e inventario estancado"
                width={2560}
                height={1440}
                region={{ x: 432, y: 1094, w: 682, h: 270 }}
                vw={[100, 55]}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
