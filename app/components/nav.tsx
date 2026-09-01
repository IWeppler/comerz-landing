"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { AUTH_URL } from "@/lib/links";
import { HoverLink, SlidingPill, SPRING_SOFT } from "./hover";

const LINKS = [
  { href: "/#modulos", label: "Qué hace" },
  { href: "/#por-que", label: "Por qué cambiarte" },
  { href: "/#precios", label: "Precio" },
  { href: "/#faq", label: "Preguntas" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    // Al hacer scroll la barra se despega del borde, se angosta y queda
    // flotando como un notch translúcido sobre el contenido.
    <motion.div
      className="fixed inset-x-0 top-0 z-60"
      animate={{
        paddingTop: scrolled ? 12 : 0,
        paddingInline: scrolled ? 16 : 0,
      }}
      transition={reduce ? { duration: 0 } : SPRING_SOFT}
    >
      <motion.div
        animate={{
          maxWidth: scrolled ? 960 : 1200,
          borderRadius: scrolled ? 20 : 0,
        }}
        transition={reduce ? { duration: 0 } : SPRING_SOFT}
        className={cn(
          "relative mx-auto flex items-center gap-9 border px-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-brand md:px-8",
          scrolled
            ? "border-line bg-canvas/70 shadow-md backdrop-blur-[16px] backdrop-saturate-180"
            : "border-transparent bg-transparent",
        )}
      >
        <motion.div
          className="relative z-10 flex w-full items-center gap-9"
          animate={{ height: scrolled ? 60 : 72 }}
          transition={reduce ? { duration: 0 } : SPRING_SOFT}
        >
          <Link
            href="/#top"
            className="flex items-center gap-2.5 text-fg no-underline"
          >
            <Image
              src="/assets/logo.png"
              alt="Comerz"
              width={500}
              height={500}
              priority
              className="block size-8 rounded-[9px]"
            />
            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              Comerz
            </span>
          </Link>

          {/* One pill follows the pointer across the row instead of each link
            lighting up on its own. */}
          <div
            className="ml-2 hidden items-center gap-1 lg:flex"
            onPointerLeave={() => setHovered(null)}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onPointerEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors duration-200",
                  hovered === link.href ? "text-fg" : "text-fg-secondary",
                )}
              >
                <AnimatePresence>
                  {hovered === link.href && (
                    <SlidingPill
                      fade
                      group="nav-hover"
                      className="absolute inset-0 rounded-lg bg-surface-alt"
                    />
                  )}
                </AnimatePresence>
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </div>

          {/* En mobile la barra queda con el logo y el botón nada más: lo
            demás vive adentro del menú. */}
          <div className="ml-auto flex items-center gap-2.5">
            <a
              href={AUTH_URL}
              className="hidden h-10 items-center rounded-[10px] px-3.5 text-sm font-medium text-fg-secondary no-underline transition-colors hover:bg-surface-alt hover:text-fg lg:inline-flex"
            >
              Ingresar
            </a>
            <HoverLink
              href={AUTH_URL}
              lift={-1}
              className="hidden h-10 items-center rounded-[10px] bg-action px-4.5 text-sm font-medium whitespace-nowrap text-action-fg no-underline transition-colors duration-250 ease-brand hover:bg-action-hover lg:inline-flex"
            >
              Probar 14 días
            </HoverLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-[10px] border border-line bg-surface text-fg transition-colors hover:bg-surface-alt lg:hidden"
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
        </motion.div>

        {/* Menú de pantalla completa: la barra de mobile solo tiene el logo y
          el botón, así que acá adentro va la navegación y los dos accesos. */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-mobile"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2 }}
              className="fixed inset-0 z-0 flex h-[100dvh] flex-col overflow-y-auto bg-canvas px-5 pt-24 pb-8 lg:hidden"
            >
              <nav className="flex flex-col">
                {LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.28, delay: 0.05 + i * 0.045 }
                    }
                    className="border-b border-line py-4.5 text-[22px] font-medium tracking-[-0.02em] text-fg no-underline"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2.5 pt-10">
                <a
                  href={AUTH_URL}
                  className="inline-flex h-13 items-center justify-center rounded-[13px] bg-action text-base font-medium text-action-fg no-underline"
                >
                  Probar 14 días gratis
                </a>
                <a
                  href={AUTH_URL}
                  className="inline-flex h-13 items-center justify-center rounded-[13px] border border-line-strong bg-surface text-base font-medium text-fg no-underline"
                >
                  Ingresar a mi cuenta
                </a>
                <span className="mt-2 text-center text-[13px] text-fg-muted">
                  14 días gratis · Sin tarjeta · Sin instalar nada
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
