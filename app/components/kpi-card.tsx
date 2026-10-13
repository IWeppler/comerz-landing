import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Una cifra del panel sacada afuera de la pantalla, como las tarjetas de
 * Comerz: etiqueta, monto grande y la variación en verde. `dark` es la versión
 * de vidrio para ir encima de una foto; la clara es sólida, porque sobre el
 * fondo liso de papel el vidrio no tiene nada que mostrar detrás.
 */
export function KpiCard({
  label,
  value,
  delta,
  note,
  tone = "light",
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  note?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "w-[248px] rounded-[20px] border p-4.5 text-left",
        dark
          ? "border-white/14 bg-[rgb(18_18_18/0.55)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_30px_60px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl backdrop-saturate-150"
          : "border-line bg-surface text-fg shadow-[0_2px_6px_-2px_rgb(38_34_28/0.08),0_28px_56px_-28px_rgb(38_34_28/0.32)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={cn("text-[13.5px] font-medium", dark ? "text-white/70" : "text-fg-secondary")}>
          {label}
        </span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[12px] font-semibold tabular-nums",
              dark ? "bg-[#3ecf8e]/15 text-[#3ecf8e]" : "bg-(--color-up)/12 text-(--color-up)",
            )}
          >
            <ArrowUpRight aria-hidden strokeWidth={2.25} className="size-3.5" />
            {delta}
          </span>
        )}
      </div>
      <div className="mt-2.5 font-display text-[30px] leading-none font-semibold tracking-[-0.035em] tabular-nums">
        {value}
      </div>
      {note && (
        <div className={cn("mt-2 text-[12.5px]", dark ? "text-white/55" : "text-fg-muted")}>{note}</div>
      )}
    </div>
  );
}
