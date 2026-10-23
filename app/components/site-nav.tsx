"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { AUTH_URL, TRIAL_URL } from "@/lib/links";

const LINKS = [
  { href: "/#funciones", label: "Funciones" },
  { href: "/#precios", label: "Precios" },
  { href: "/#faq", label: "Preguntas" },
];

/**
 * La barra de la landing siempre es oscura y de texto blanco: arriba de todo
 * es transparente sobre el hero negro, y al scrollear se angosta en una franja
 * negra.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Motion already tracks the page scroll; the bar only re-renders when it
  // crosses the threshold, not on every frame.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Con el menú abierto no se scrollea lo de atrás, y Escape lo cierra.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const compact = scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-60 border-b text-white transition-[background-color,border-color,padding] duration-300 ease-brand",
        compact || open
          ? "border-white/8 bg-[#111] py-1.5"
          : "border-transparent bg-transparent py-3.5",
      )}
    >
      <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-5 md:px-[clamp(20px,5vw,84px)]">
        <Link href="/#top" className="flex items-center gap-2.5 text-white no-underline">
          <Image
            src="/assets/logo.png"
            alt="Comerz"
            width={500}
            height={500}
            preload
            className={cn(
              "block rounded-[8px] transition-[width,height] duration-300 ease-brand",
              compact ? "size-[22px]" : "size-[26px]",
            )}
          />
          <span
            className={cn(
              "font-sans font-bold tracking-[-0.03em] transition-[font-size] duration-300",
              compact ? "text-base" : "text-[19px]",
            )}
          >
            Comerz
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Principal">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "group relative font-medium text-white/70 no-underline transition-colors hover:text-white",
                compact ? "text-[13px]" : "text-sm",
              )}
            >
              {link.label}
              {/* Subrayado naranja que se dibuja de izquierda a derecha. */}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-[#e8401a] transition-transform duration-400 ease-brand group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          ))}
          <a
            href={AUTH_URL}
            className={cn(
              "font-medium text-white/70 no-underline transition-colors hover:text-white",
              compact ? "text-[13px]" : "text-sm",
            )}
          >
            Ingresar
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <a
            href={TRIAL_URL}
            className={cn(
              "inline-flex items-center rounded-full bg-[#e8401a] font-semibold whitespace-nowrap text-white no-underline transition-[opacity,padding,font-size] duration-300 hover:opacity-80 active:scale-[0.96]",
              compact ? "px-3.5 py-1.5 text-[13px]" : "px-5 py-2.75 text-sm",
            )}
          >
            Probar gratis
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="relative inline-flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white lg:hidden"
          >
            <span className="relative block h-3 w-4.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-[transform,opacity] duration-250 ease-brand",
                    i === 0 && (open ? "top-1.5 rotate-45" : "top-0"),
                    i === 1 && (open ? "top-1.5 opacity-0" : "top-1.5"),
                    i === 2 && (open ? "top-1.5 -rotate-45" : "top-3"),
                  )}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      {/* Menú de pantalla completa: en mobile la barra solo tiene el logo, el
        botón y la hamburguesa, así que acá adentro va la navegación. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            className="fixed inset-x-0 top-[52px] bottom-0 flex flex-col overflow-y-auto bg-[#111] px-5 pt-6 pb-8 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Menú">
              {[...LINKS, { href: AUTH_URL, label: "Ingresar" }].map((link, i) => (
                <motion.a
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={reduce ? { duration: 0 } : { duration: 0.35, delay: 0.04 + i * 0.05 }}
                  className="poster border-b border-white/10 py-4 text-[44px] text-white no-underline"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <a
              href={TRIAL_URL}
              className="mt-auto inline-flex h-13 items-center justify-center rounded-full bg-[#e8401a] text-base font-semibold text-white no-underline"
            >
              Probar 14 días gratis
            </a>
            <span className="mt-3 text-center text-[13px] text-white/50">
              Sin tarjeta y sin instalar nada
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
