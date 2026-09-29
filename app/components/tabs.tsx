"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SlidingPill } from "./hover";

export type Tab = { id: string; label: string; hint: string; panel: ReactNode };

/**
 * Cross-fades between panels that all share one grid cell, so the block keeps
 * the height of the tallest panel and nothing jumps while switching.
 */
export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  /** Flechas, Inicio y Fin recorren la fila, como espera un lector de pantalla. */
  const move = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % tabs.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i - 1 + tabs.length) % tabs.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? tabs.length - 1
              : -1;
    if (next < 0) return;

    e.preventDefault();
    setActive(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

  return (
    <>
      {/* On phones the row sticks under the nav, so switching panels never means
        scrolling back up to the top of the section. */}
      <div className="sticky top-[74px] z-30 -mx-5 bg-canvas/85 px-5 backdrop-blur-[12px] md:static md:mx-0 md:bg-transparent md:px-0 md:backdrop-blur-none">
        <div
          role="tablist"
          aria-label="Pantallas de Comerz"
          className="grid grid-cols-4 border-b border-line"
        >
          {tabs.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onKeyDown={(e) => move(e, i)}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "group relative flex cursor-pointer flex-col items-start gap-1 border-0 bg-transparent py-3.5 pr-3 text-left font-sans transition-colors duration-250 ease-brand md:py-6 md:pr-8",
                  selected ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                <span className="font-display text-[15px] font-semibold tracking-[-0.01em] md:text-xl">
                  {tab.label}
                </span>
                <span
                  className={cn(
                    "hidden text-sm leading-[1.45] md:block",
                    selected ? "text-fg-secondary" : "text-fg-muted",
                  )}
                >
                  {tab.hint}
                </span>
                {selected && (
                  <SlidingPill
                    group="tabs-active"
                    className="absolute inset-x-0 -bottom-px h-[2px] bg-action"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid md:mt-10">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              aria-hidden={!selected}
              inert={!selected}
              style={{ gridArea: "1 / 1" }}
              className={cn(
                "flex flex-col gap-7 transition-[opacity,transform] duration-450 ease-brand md:gap-9",
                selected
                  ? "z-2 translate-y-0 opacity-100"
                  : "pointer-events-none z-1 translate-y-2 opacity-0",
              )}
            >
              {tab.panel}
            </div>
          );
        })}
      </div>
    </>
  );
}
