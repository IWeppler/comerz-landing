import { Cloud, Download, HardDrive, CreditCard } from "lucide-react";
import { MoreLink, WRAP } from "./bits";
import { Reveal, RiseLines } from "./rise";

const TAGS = [
  { icon: Cloud, label: "Todo guardado en la nube" },
  { icon: HardDrive, label: "Si se rompe la compu, no perdés nada" },
  { icon: Download, label: "Tus datos se descargan cuando quieras" },
  { icon: CreditCard, label: "Sin tarjeta para probar" },
];

/** Franja de confianza antes del pie: un cartel y cuatro garantías. */
export function Safe() {
  return (
    <section className={`${WRAP} py-[clamp(60px,10vh,120px)]`}>
      <RiseLines lines={["Tu negocio, a salvo."]} className="poster m-0 text-[clamp(56px,8.4vw,132px)]" />
      <Reveal delay={150} className="mt-9 flex flex-col gap-9">
        <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
          {TAGS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium"
            >
              <Icon aria-hidden strokeWidth={1.75} className="size-4 text-(--color-accent)" />
              {label}
            </li>
          ))}
        </ul>
        <MoreLink href="#faq">Cómo cuidamos tus datos</MoreLink>
      </Reveal>
    </section>
  );
}
