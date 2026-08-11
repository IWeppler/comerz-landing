"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { HoverLink, SlidingPill, SPRING_SOFT } from "./hover";

const LINKS = [
  { href: "#modulos", label: "Qué hace" },
  { href: "#por-que", label: "Por qué cambiarte" },
  { href: "#precios", label: "Precio" },
  { href: "#faq", label: "Preguntas" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          "mx-auto flex items-center gap-9 border px-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-brand md:px-8",
          scrolled
            ? "border-line bg-canvas/70 shadow-md backdrop-blur-[16px] backdrop-saturate-180"
            : "border-transparent bg-transparent",
        )}
      >
        <motion.div
          className="flex w-full items-center gap-9"
          animate={{ height: scrolled ? 60 : 72 }}
          transition={reduce ? { duration: 0 } : SPRING_SOFT}
        >
          <a
            href="#top"
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
          </a>

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

          <div className="ml-auto flex items-center gap-2.5">
            <a
              href="#top"
              className="hidden h-10 items-center rounded-[10px] px-3.5 text-sm font-medium text-fg-secondary no-underline transition-colors hover:bg-surface-alt hover:text-fg sm:inline-flex"
            >
              Ingresar
            </a>
            <HoverLink
              href="#precios"
              lift={-1}
              className="inline-flex h-10 items-center rounded-[10px] bg-action px-4.5 text-sm font-medium whitespace-nowrap text-action-fg no-underline transition-colors duration-250 ease-brand hover:bg-action-hover"
            >
              Probar 14 días
            </HoverLink>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
