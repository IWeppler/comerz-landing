"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type RefObject } from "react";

/*
 * Shared clock for the product fragments. Each fragment is a pure function of
 * one motion value `t` (seconds): every element maps it to transform or
 * opacity with useTransform, so nothing animates layout and the whole scene
 * can be paused, resumed or frozen on its last frame.
 */

/**
 * Runs `t` from 0 to `length` while the fragment is on screen (and `active`,
 * for fragments inside inactive tabs), pausing otherwise and resuming where it
 * was. With reduced motion it never plays and sits on `final`.
 */
export function useTimeline(
  ref: RefObject<HTMLElement | null>,
  {
    length,
    final,
    loop = true,
    active = true,
  }: { length: number; final: number; loop?: boolean; active?: boolean },
) {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.4 });
  const t = useMotionValue(reduce ? final : 0);
  const playback = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (reduce) {
      playback.current?.stop();
      playback.current = null;
      t.set(final);
      return;
    }
    if (!inView || !active) {
      playback.current?.pause();
      return;
    }
    if (playback.current) {
      // A one-shot that already finished stays on its last frame.
      if (!loop && t.get() >= length) return;
      playback.current.play();
    } else {
      t.set(0);
      playback.current = animate(t, length, {
        duration: length,
        ease: "linear",
        repeat: loop ? Infinity : 0,
      });
    }
  }, [inView, active, reduce, t, length, final, loop]);

  useEffect(() => () => playback.current?.stop(), []);

  return t;
}

/** Piecewise map of the clock. Times must go up. */
export function useTrack(t: MotionValue<number>, times: number[], values: number[]) {
  return useTransform(t, times, values);
}

/**
 * Goes from `from` to `to` over `[a, b]`, holds, and snaps back at `reset`,
 * a moment when the fragment is faded out between loops.
 */
export function useStep(
  t: MotionValue<number>,
  [a, b]: [number, number],
  from: number,
  to: number,
  reset: number,
) {
  return useTrack(t, [a, b, reset, reset + 0.01], [from, to, to, from]);
}

/**
 * Fragment-wide fade used between loops: out just before `length`, back in as
 * the clock wraps to 0. Returns the opacity and the moment it is fully out.
 */
export function useLoopFade(t: MotionValue<number>, length: number) {
  const out: [number, number] = [length - 0.9, length - 0.6];
  const opacity = useTrack(t, [out[0], out[1], length - 0.3, length], [1, 0, 0, 1]);
  return { opacity, reset: out[1] + 0.05 };
}
