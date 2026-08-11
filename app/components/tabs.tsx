"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SlidingPill } from "./hover";

export type Tab = { id: string; label: string; panel: ReactNode };

/**
 * Cross-fades between panels that all share one grid cell, so the card keeps
 * the height of the tallest panel and nothing jumps while switching.
 */
export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <>
      <div className="mb-6 flex w-fit flex-wrap gap-1.5 rounded-[14px] border border-line bg-surface-alt p-1.25">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative cursor-pointer rounded-[10px] px-5 py-2.5 font-sans text-sm font-medium transition-colors duration-250 ease-brand",
                selected
                  ? "text-fg"
                  : "text-fg-secondary hover:text-fg",
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

      <div className="grid overflow-hidden rounded-[20px] border border-line bg-surface shadow-sm">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
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
