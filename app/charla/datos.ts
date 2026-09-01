/** Datos de la charla, compartidos entre la página, el formulario y el mail. */

export const CHARLA = {
  titulo: "Cómo digitalizar la gestión de tu comercio",
  fechaLarga: "Lunes 7 de septiembre",
  hora: "15:00 hs",
  /** ISO con huso de Argentina, para el schema de Google. */
  inicio: "2026-09-07T15:00:00-03:00",
  fin: "2026-09-07T16:30:00-03:00",
  organiza: "Cámara de Empresarios de Tostado",
  donde: "Google Meet",
} as const;

/** Los rubros del select. El valor que se guarda es el mismo texto que se lee. */
export const RUBROS = [
  "Indumentaria",
  "Librería",
  "Electrónica",
  "Kiosco",
  "Almacén",
  "Otro",
] as const;

export type Rubro = (typeof RUBROS)[number];

/** De acá salen los dígitos que van en el wa.me. */
export function soloDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

/**
 * El mensaje que la persona termina enviando. El número no hace falta pedirlo:
 * llega solo, porque escribe desde su propio WhatsApp.
 */
export function mensajeInscripcion({
  nombre,
  rubro,
}: {
  nombre: string;
  rubro: string;
}) {
  return [
    `¡Hola! Me quiero anotar a la charla "${CHARLA.titulo}" del ${CHARLA.fechaLarga.toLowerCase()} a las ${CHARLA.hora}.`,
    "",
    `Nombre: ${nombre}`,
    `Rubro: ${rubro}`,
  ].join("\n");
}
