"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { CHARLA_MEET_URL, CHARLA_WHATSAPP_URL } from "@/lib/links";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HoverLink } from "../components/hover";
import { CHARLA, RUBROS, mensajeInscripcion, soloDigitos } from "./datos";

const CAMPO =
  "h-12 w-full rounded-[11px] border border-line bg-canvas px-3.5 text-[15px] text-fg outline-none transition-[border-color,box-shadow] duration-250 ease-brand placeholder:text-fg-muted focus:border-action focus:shadow-[0_0_0_3px_oklch(0.53_0.18_264/0.16)]";
const CAMPO_ERROR = "border-danger-border focus:border-danger";
const ETIQUETA = "text-[13px] font-medium text-fg-secondary";
const AYUDA = "text-[12.5px] text-danger";

type Campo = "nombre" | "rubro";
type Errores = Partial<Record<Campo, string>>;

/** El destinatario del wa.me, sacado del mismo link que usa el botón de abajo. */
const DESTINO = soloDigitos(CHARLA_WHATSAPP_URL);

function validar(nombre: string, rubro: string) {
  const errores: Errores = {};

  if (nombre.length < 2) errores.nombre = "Escribí tu nombre.";

  if (!RUBROS.includes(rubro as (typeof RUBROS)[number])) {
    errores.rubro = "Elegí un rubro.";
  }

  return errores;
}

export function Inscripcion() {
  const [errores, setErrores] = useState<Errores>({});
  const [enviado, setEnviado] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const datos = new FormData(e.currentTarget);
    const nombre = String(datos.get("nombre") ?? "").trim();
    const rubro = String(datos.get("rubro") ?? "").trim();

    const fallas = validar(nombre, rubro);
    setErrores(fallas);
    if (Object.keys(fallas).length > 0) return;

    const mensaje = mensajeInscripcion({ nombre, rubro });
    const url = `https://wa.me/${DESTINO}?text=${encodeURIComponent(mensaje)}`;

    // Abrirlo adentro del submit es lo que evita que el navegador lo tome por
    // popup. Si igual lo bloquea, el link queda a mano en la confirmación.
    window.open(url, "_blank", "noopener,noreferrer");
    setEnviado(url);
  }

  // Una vez enviado, la tarjeta deja de ser formulario y pasa a ser el pase de
  // entrada: el link del Meet reemplaza a los campos en el mismo lugar.
  if (enviado) {
    return (
      <div className="flex flex-col gap-4 rounded-[18px] border border-ok-border bg-surface p-6 shadow-md md:p-7">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-ok-bg text-xl text-ok">
          ✓
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="m-0 text-[21px] font-semibold tracking-[-0.02em]">
            Listo, tenés tu lugar
          </h2>
          <p className="m-0 text-[15px] leading-[1.6] text-fg-secondary">
            Con el mensaje armado: mandalo y quedás anotado.
            Nos vemos el {CHARLA.fechaLarga.toLowerCase()} a las {CHARLA.hora}.
          </p>
        </div>

        <a
          href={CHARLA_MEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-1 rounded-[13px] border border-line bg-canvas px-4 py-3.5 no-underline transition-colors duration-250 ease-brand hover:border-line-strong hover:bg-surface-alt"
        >
          <span className="text-[11px] font-semibold tracking-[0.09em] text-fg-muted uppercase">
            Agendar y entrar al Meet
          </span>
          <span className="font-mono text-[13.5px] break-all text-action">
            {CHARLA_MEET_URL.replace("https://", "")}
          </span>
        </a>

        <p className="m-0 text-[13px] leading-[1.55] text-fg-muted">
          ¿No se te abrió WhatsApp?{" "}
          <a
            href={enviado}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-secondary transition-colors hover:text-fg"
          >
            Abrilo desde acá
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    // `noValidate`: los mensajes los pone el formulario, no los globos del
    // navegador, que además no se pueden colgar del trigger de Radix.
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-[18px] border border-line bg-surface p-6 shadow-md md:p-7"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="m-0 text-[21px] font-semibold tracking-[-0.02em]">
          Anotate gratis
        </h2>
        <p className="m-0 text-[14px] leading-[1.55] text-fg-secondary">
          Completá los datos y envias el WhatsApp con el mensaje listo.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className={ETIQUETA}>
          Nombre y apellido
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          maxLength={80}
          autoComplete="name"
          placeholder="Ana Pérez"
          aria-invalid={errores.nombre ? true : undefined}
          aria-describedby={errores.nombre ? "error-nombre" : undefined}
          className={cn(CAMPO, errores.nombre && CAMPO_ERROR)}
        />
        {errores.nombre && (
          <span id="error-nombre" className={AYUDA}>
            {errores.nombre}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="rubro" className={ETIQUETA}>
          Rubro
        </label>
        <Select name="rubro">
          <SelectTrigger
            id="rubro"
            aria-invalid={errores.rubro ? true : undefined}
            aria-describedby={errores.rubro ? "error-rubro" : undefined}
            className={cn(errores.rubro && CAMPO_ERROR)}
          >
            <SelectValue placeholder="Elegí tu rubro" />
          </SelectTrigger>
          <SelectContent>
            {RUBROS.map((rubro) => (
              <SelectItem key={rubro} value={rubro}>
                {rubro}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errores.rubro && (
          <span id="error-rubro" className={AYUDA}>
            {errores.rubro}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="relative mt-1 inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-[13px] bg-action text-[15px] font-medium text-action-fg shadow-action transition-[box-shadow,background-color] duration-280 ease-brand hover:bg-action-hover"
      >
        <span className="pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(100deg,transparent,oklch(1_0_0/0.28),transparent)] motion-safe:animate-sheen" />
        <IconoWhatsApp className="relative size-4.5" />
        <span className="relative">Reservar mi lugar</span>
      </button>

      <div className="flex items-center gap-3 text-[12px] text-fg-muted">
        <span className="h-px flex-1 bg-line" />o
        <span className="h-px flex-1 bg-line" />
      </div>

      <HoverLink
        href={CHARLA_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        lift={-2}
        className="inline-flex h-13 items-center justify-center gap-2.5 rounded-[13px] border border-line bg-surface text-[15px] font-medium text-fg no-underline shadow-sm transition-[background-color,border-color,box-shadow] duration-280 ease-brand hover:border-line-strong hover:bg-surface-alt hover:shadow-md"
      >
        <IconoWhatsApp className="size-4.5 text-ok" />
        Escribinos directamente
      </HoverLink>
    </form>
  );
}

function IconoWhatsApp({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cn("fill-current", className)}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.25.69-1.43 1.32-1.99 1.4-.53.08-1.2.11-1.94-.12-.45-.14-1.02-.33-1.76-.65-3.1-1.34-5.12-4.46-5.28-4.67-.15-.21-1.26-1.67-1.26-3.19s.8-2.26 1.08-2.57c.28-.31.61-.39.82-.39.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.86 2.08.94 2.23.08.16.13.34.02.55-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.15-.32.32-.14.63.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.54.31.15.49.13.67-.08.18-.21.77-.9.98-1.21.2-.31.41-.26.69-.16.28.1 1.76.83 2.07.98.31.15.51.23.59.36.08.13.08.75-.17 1.44Z" />
    </svg>
  );
}
