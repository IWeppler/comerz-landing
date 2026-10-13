"use client";

import { useReducedMotion } from "motion/react";

/**
 * Un video corto que se repite solo, sin sonido, como un GIF. Con movimiento
 * reducido no arranca solo: muestra los controles y lo da play quien quiera.
 * `sources` va de la más liviana a la más compatible: el navegador usa la
 * primera que sabe reproducir. `rate` acelera la reproducción; se vuelve a
 * aplicar cada vez que el video carga, porque el navegador la resetea.
 */
export function LoopVideo({
  sources,
  label,
  rate = 1,
  className,
}: {
  sources: { src: string; type: string }[];
  label: string;
  rate?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <video
      key={reduce ? "still" : "loop"}
      aria-label={label}
      autoPlay={!reduce}
      controls={!!reduce}
      muted
      loop
      playsInline
      preload="metadata"
      onLoadedMetadata={(e) => {
        e.currentTarget.playbackRate = rate;
      }}
      className={className}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
