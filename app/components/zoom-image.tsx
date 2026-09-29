"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { Crop, type Shot } from "./crop";

/**
 * Screenshot that opens full size in a modal: on a phone the inline version is
 * too small to read. Inline it can show just a `region` of the capture; the
 * dialog always shows the whole thing. The dialog is native, so Escape, focus
 * trap and the backdrop come for free; inside it the image is wider than the
 * viewport and pans horizontally, which beats scaling a 1900px capture down to
 * 350px.
 */
export function ZoomImage({
  vw = [100, 70],
  className,
  ...shot
}: Shot & { vw?: [number, number]; className?: string }) {
  const { src, alt, width, height } = shot;
  const dialog = useRef<HTMLDialogElement>(null);
  const pan = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;

    if (open) {
      el.showModal();
      document.body.style.overflow = "hidden";
      // Arranca centrado: el detalle útil de las capturas está en el medio.
      const box = pan.current;
      if (box) box.scrollLeft = (box.scrollWidth - box.clientWidth) / 2;
    } else if (el.open) {
      el.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ampliar imagen: ${alt}`}
        className="group relative block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
      >
        <Crop {...shot} vw={vw} className={className} />
        <span
          aria-hidden
          className="absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-[10px] border border-line bg-surface/90 text-fg-secondary shadow-sm backdrop-blur-sm transition-colors duration-250 ease-brand group-hover:text-fg md:right-4 md:bottom-4"
        >
          <ZoomIn strokeWidth={1.75} className="size-4" />
        </span>
      </button>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(false);
        }}
        className="m-0 max-h-none max-w-none bg-transparent p-0 backdrop:bg-[oklch(0.16_0.005_50/0.78)] backdrop:backdrop-blur-sm"
        style={{ width: "100vw", height: "100dvh" }}
      >
        <div className="flex h-full w-full flex-col justify-center gap-3 p-3 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="hidden text-[13px] text-white/75 md:inline">{alt}</span>
            <span className="text-[12px] text-white/70 md:hidden">
              Deslizá para ver el detalle
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-white/20 bg-white/10 text-white transition-colors duration-250 ease-brand hover:bg-white/20"
            >
              <X strokeWidth={1.75} className="size-4" />
            </button>
          </div>

          <div
            ref={pan}
            className="overflow-x-auto overscroll-contain rounded-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 768px) 240vw, 90vw"
              className="block h-auto w-[240%] max-w-none rounded-2xl md:w-full"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
