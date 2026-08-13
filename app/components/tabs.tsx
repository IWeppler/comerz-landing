"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SlidingPill } from "./hover";

export type Tab = { id: string; label: string; panel: ReactNode };

/**
 * Cross-fades between panels that all share one grid cell, so the card keeps
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
      {/* On phones the bar sticks under the nav, so switching panels never means
        scrolling back up to the top of the section. */}
      <div className="sticky top-[74px] z-30 -mx-5 mb-4 bg-canvas/80 px-5 py-2 backdrop-blur-[12px] md:static md:mx-0 md:mb-6 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        <div
          role="tablist"
          aria-label="Pantallas de Comerz"
          className="flex w-full gap-1 rounded-[14px] border border-line bg-surface-alt p-1.25 md:w-fit md:gap-1.5"
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
                  "relative flex-1 cursor-pointer rounded-[10px] px-2 py-2 font-sans text-[13px] font-medium transition-colors duration-250 ease-brand md:flex-none md:px-5 md:py-2.5 md:text-sm",
                  selected ? "text-fg" : "text-fg-secondary hover:text-fg",
                )}
              >
                {selected && (
                  <SlidingPill
                    group="tabs-active"
                    className="absolute inset-0 rounded-[10px] border border-line bg-surface shadow-sm"
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid overflow-hidden rounded-[20px] border border-line bg-surface shadow-sm">
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
                "grid items-center transition-[opacity,transform] duration-450 ease-brand md:grid-cols-[minmax(300px,400px)_1fr]",
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
