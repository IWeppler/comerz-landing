"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * El celular entra desde abajo del panel: arranca casi todo tapado por el borde
 * inferior y va subiendo a medida que la sección entra en pantalla. El recorte
 * lo hace el `overflow-hidden` del panel del CTA.
 */
export function ParallaxPhone({ rise = 160 }: { rise?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [rise, 0]);
  const y = useSpring(raw, { stiffness: 90, damping: 22, mass: 0.5 });

  return (
    <div
      ref={ref}
      className="relative min-h-[360px] self-end overflow-hidden md:min-h-[400px] lg:min-h-[470px] lg:overflow-visible"
    >
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 flex justify-center will-change-transform"
      >
        <Image
          src="/assets/comerz-mobile4-crop.png"
          alt="Comerz en el celular, vista de panel en modo oscuro"
          width={900}
          height={1829}
          priority
          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 48vw, 340px"
          className="block h-auto w-[74%] max-w-[340px] drop-shadow-[0_30px_60px_oklch(0_0_0/0.55)] sm:w-[48%] lg:w-[92%]"
        />
      </motion.div>
    </div>
  );
}
