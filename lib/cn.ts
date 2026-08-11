export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Thousands-separated in the es-AR style, without relying on ICU data. */
export function formatAmount(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
