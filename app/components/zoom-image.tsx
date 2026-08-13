"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * Screenshot that opens full size in a modal — on a phone the inline version is
 * too small to read. The dialog is native, so Escape, focus trap and the
 * backdrop come for free; inside it the image is wider than the viewport and
 * pans horizontally, which beats scaling a 1900px capture down to 350px.
 */
export function ZoomImage({ src, alt, width, height, className }: Props) {
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
        className="group relative block w-full cursor-zoom-in border-0 bg-transparent p-0"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 60vw"
          className={className}
        />
        <span
          aria-hidden
          className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[11px] font-medium text-fg-secondary shadow-sm backdrop-blur-sm transition-colors duration-250 ease-brand group-hover:text-fg md:right-4 md:bottom-4"
        >
          <svg viewBox="0 0 16 16" className="size-3 fill-none stroke-current stroke-[1.6]">
            <circle cx="7" cy="7" r="4.6" />
            <path d="M10.4 10.4 14 14M7 5.2v3.6M5.2 7h3.6" strokeLinecap="round" />
          </svg>
          Ampliar
        </span>
      </button>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(false);
        }}
        className="m-0 max-h-none max-w-none bg-transparent p-0 backdrop:bg-[oklch(0.16_0_0/0.72)] backdrop:backdrop-blur-sm"
        style={{ width: "100vw", height: "100dvh" }}
      >
        <div className="flex h-full w-full flex-col justify-center gap-3 p-3 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="hidden text-[13px] text-white/70 md:inline">{alt}</span>
            <span className="text-[12px] text-white/60 md:hidden">
              Deslizá para ver el detalle
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg leading-none text-white transition-colors duration-250 ease-brand hover:bg-white/20"
            >
              ×
            </button>
          </div>

          <div
            ref={pan}
            className="overflow-x-auto overscroll-contain rounded-[14px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 768px) 240vw, 90vw"
              className="block h-auto w-[240%] max-w-none rounded-[14px] md:w-full"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
