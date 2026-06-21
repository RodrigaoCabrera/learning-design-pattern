import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLessonPlayer } from "@/components/player/useLessonPlayer";

const steps = [
  { id: "s1", durationMs: 1000 },
  { id: "s2", durationMs: 1000 },
  { id: "s3", durationMs: 1000 },
];

describe("useLessonPlayer", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("starts at the first step", () => {
    const { result } = renderHook(() => useLessonPlayer(steps));
    expect(result.current.index).toBe(0);
    expect(result.current.current?.id).toBe("s1");
    expect(result.current.atStart).toBe(true);
    expect(result.current.atEnd).toBe(false);
  });

  it("advances and goes back manually within bounds", () => {
    const { result } = renderHook(() => useLessonPlayer(steps));
    act(() => result.current.next());
    expect(result.current.index).toBe(1);
    act(() => result.current.prev());
    act(() => result.current.prev()); // clamp at 0
    expect(result.current.index).toBe(0);
  });

  it("clamps at the last step", () => {
    const { result } = renderHook(() => useLessonPlayer(steps));
    act(() => result.current.goTo(99));
    expect(result.current.index).toBe(2);
    expect(result.current.atEnd).toBe(true);
  });

  it("auto-plays through steps by duration and stops at the end", () => {
    const { result } = renderHook(() => useLessonPlayer(steps));
    act(() => result.current.play());
    expect(result.current.isPlaying).toBe(true);

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.index).toBe(1);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.index).toBe(2);

    // At the end, auto-play stops.
    expect(result.current.isPlaying).toBe(false);
  });

  it("pause halts auto-advance", () => {
    const { result } = renderHook(() => useLessonPlayer(steps));
    act(() => result.current.play());
    act(() => result.current.pause());
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.index).toBe(0);
  });
});
