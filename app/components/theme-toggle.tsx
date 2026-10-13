"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { THEME_KEY } from "./bits";

const root = () => document.querySelector<HTMLElement>(".landing");

/** The theme in effect: the one forced on the landing root, else the system's. */
function readTheme(): "light" | "dark" {
  const forced = root()?.dataset.theme;
  if (forced === "light" || forced === "dark") return forced;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(onChange);
  const el = root();
  if (el) observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/**
 * Pasa la landing de claro a oscuro y al revés, y lo recuerda. El script del
 * principio de la página lo vuelve a aplicar antes de pintar en la próxima
 * visita.
 */
export function ThemeToggle() {
  // The server cannot know the theme; it renders the light label.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as const);
  const next = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    const el = root();
    if (el) el.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="mt-1 inline-flex w-fit cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-sans text-[15px] text-white/85 transition-colors hover:text-white"
    >
      {theme === "dark" ? (
        <Sun aria-hidden strokeWidth={1.75} className="size-4" />
      ) : (
        <Moon aria-hidden strokeWidth={1.75} className="size-4" />
      )}
      {theme === "dark" ? "Claro" : "Oscuro"}
    </button>
  );
}
