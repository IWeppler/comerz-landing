const RUBROS = [
  "Indumentaria",
  "Calzado",
  "Kiosco y autoservicio",
  "Ferretería",
  "Perfumería",
  "Librería",
  "Bazar y regalería",
  "Dietética",
  "Pet shop",
  "Marroquinería",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex gap-3.5 pl-3.5" aria-hidden={ariaHidden || undefined}>
      {RUBROS.map((rubro) => (
        <span
          key={rubro}
          className="inline-flex h-9.5 items-center rounded-full border border-line bg-canvas px-4.5 text-sm font-medium whitespace-nowrap text-fg-secondary"
        >
          {rubro}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  // return (
  //   <section className="mt-20 overflow-hidden border-y border-line bg-surface py-6.5">
  //     <div className="mx-auto mb-4.5 max-w-[1200px] px-5 md:px-8">
  //       <span className="text-xs font-semibold tracking-[0.09em] text-fg-muted uppercase">
  //         Pensado para el comercio argentino
  //       </span>
  //     </div>
  //     <div className="group relative [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
  //       <div className="flex w-max gap-3.5 motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
  //         <Track />
  //         <Track ariaHidden />
  //       </div>
  //     </div>
  //   </section>
  // );
}
