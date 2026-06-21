"use client";

import { useCallback, useEffect, useState } from "react";

// Content-agnostic step machine. Drives any ordered list of steps with optional
// per-step duration. Used for both the analogy phase and the code phase.

export type PlayableStep = { id: string; durationMs?: number };

export const DEFAULT_DURATION_MS = 3500;

export function useLessonPlayer<T extends PlayableStep>(steps: T[]) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const total = steps.length;
  const atStart = index === 0;
  const atEnd = index === total - 1;

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, total - 1)),
    [total]
  );
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  const goTo = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(i, total - 1))),
    [total]
  );
  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const reset = useCallback(() => {
    setIndex(0);
    setIsPlaying(false);
  }, []);

  // Auto-play: advance after the current step's duration; stop at the end.
  useEffect(() => {
    if (!isPlaying) return;
    if (atEnd) {
      setIsPlaying(false);
      return;
    }
    const duration = steps[index]?.durationMs ?? DEFAULT_DURATION_MS;
    const timer = setTimeout(
      () => setIndex((i) => Math.min(i + 1, total - 1)),
      duration
    );
    return () => clearTimeout(timer);
  }, [isPlaying, index, atEnd, total, steps]);

  return {
    index,
    current: steps[index] as T | undefined,
    total,
    isPlaying,
    atStart,
    atEnd,
    next,
    prev,
    goTo,
    play,
    pause,
    reset,
  };
}
