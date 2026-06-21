"use client";

import { useCallback, useEffect, useState } from "react";

// Content-agnostic step machine. Drives any ordered list of steps with optional
// per-step duration. Used for both the analogy phase and the code phase.

export type PlayableStep = { id: string; durationMs?: number };

export const DEFAULT_DURATION_MS = 3500;

export function useLessonPlayer<T extends PlayableStep>(steps: T[]) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // Tracks whether the *last* index change was a manual jump (Anterior/
  // Siguiente/dot/restart — should render instantly, no animation) or an
  // auto-play tick (should play at the authored cinematic pace). Starts as
  // "auto" so the very first shot still plays its intro animation on mount.
  const [lastAction, setLastAction] = useState<"manual" | "auto">("auto");

  const total = steps.length;
  const atStart = index === 0;
  const atEnd = index === total - 1;

  const next = useCallback(() => {
    setLastAction("manual");
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);
  const prev = useCallback(() => {
    setLastAction("manual");
    setIndex((i) => Math.max(i - 1, 0));
  }, []);
  const goTo = useCallback(
    (i: number) => {
      setLastAction("manual");
      setIndex(Math.max(0, Math.min(i, total - 1)));
    },
    [total]
  );
  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const reset = useCallback(() => {
    setLastAction("manual");
    setIndex(0);
    setIsPlaying(false);
  }, []);
  // Auto-play always restarts the lesson from the beginning, even if it
  // already finished. The restart itself is an instant jump (no rewind
  // animation back through the whole timeline); only the ticks that follow
  // play at the authored pace. While running, the trigger itself is disabled
  // (see Controls) rather than toggling into a pause button.
  const autoPlay = useCallback(() => {
    setLastAction("manual");
    setIndex(0);
    setIsPlaying(true);
  }, []);

  // Auto-play: advance after the current step's duration; stop at the end.
  useEffect(() => {
    if (!isPlaying) return;
    if (atEnd) {
      setIsPlaying(false);
      return;
    }
    const duration = steps[index]?.durationMs ?? DEFAULT_DURATION_MS;
    const timer = setTimeout(() => {
      setLastAction("auto");
      setIndex((i) => Math.min(i + 1, total - 1));
    }, duration);
    return () => clearTimeout(timer);
  }, [isPlaying, index, atEnd, total, steps]);

  return {
    index,
    current: steps[index] as T | undefined,
    total,
    isPlaying,
    atStart,
    atEnd,
    /** True when the current shot should render instantly (no tween). */
    instant: lastAction === "manual",
    next,
    prev,
    goTo,
    play,
    pause,
    reset,
    autoPlay,
  };
}
