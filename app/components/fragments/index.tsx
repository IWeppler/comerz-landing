"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

/*
 * Deferred loading for the animated fragments. Each scene's code is only
 * downloaded when its spot is about to scroll into view. Until then a box of
 * the same size holds the place, so nothing jumps.
 */

function StagePlaceholder() {
  return (
    <div
      aria-hidden
      className="h-full min-h-[380px] rounded-2xl border border-line bg-sunken"
    />
  );
}

function InsightsPlaceholder() {
  return (
    <div
      aria-hidden
      className="min-h-[275px] rounded-2xl border border-line bg-surface md:min-h-[295px]"
    />
  );
}

const Cuenta = dynamic(() => import("./cuenta"), { ssr: false, loading: StagePlaceholder });
const Insights = dynamic(() => import("./insights"), {
  ssr: false,
  loading: InsightsPlaceholder,
});

/** Mounts `children` once the spot is near the viewport. */
function Deferred({
  fallback,
  children,
}: {
  fallback: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "300px 0px" });
  // Once mounted it stays mounted.
  const [opened, setOpened] = useState(false);
  if (near && !opened) setOpened(true);

  return (
    <div ref={ref} className="h-full">
      {opened ? children : fallback}
    </div>
  );
}

export function CuentaFragment() {
  return (
    <Deferred fallback={<StagePlaceholder />}>
      <Cuenta active />
    </Deferred>
  );
}

export function InsightsFragment() {
  return (
    <Deferred fallback={<InsightsPlaceholder />}>
      <Insights />
    </Deferred>
  );
}
