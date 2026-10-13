"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * La imagen del hero, del medio de la pantalla para abajo. Es más alta que su
 * marco y se desplaza más lento que la página: el parallax. `soft` la desenfoca,
 * para cuando lo que hay es una captura llena de texto y no una foto.
 */
export function HeroMedia({ src, soft = false }: { src: string; soft?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-x-0 top-[52svh] bottom-0 -z-10 overflow-hidden"
    >
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -top-[14%] h-[128%]">
        <Image
          src={src}
          alt=""
          fill
          preload
          sizes="100vw"
          className={soft ? "scale-105 object-cover opacity-70 blur-[10px]" : "object-cover"}
        />
      </motion.div>
      {/* Velo para que el texto blanco lea encima de cualquier foto, más
        cerrado abajo, donde va el manifiesto. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_10/0.25)_0%,rgb(10_10_10/0.45)_40%,rgb(10_10_10/0.7)_100%)]" />
    </div>
  );
}
