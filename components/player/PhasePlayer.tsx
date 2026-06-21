"use client";

import type { ReactNode } from "react";
import { useLessonPlayer, type PlayableStep } from "./useLessonPlayer";
import { Controls } from "./Controls";
import { ProgressBar } from "./ProgressBar";
import { NarrationPanel } from "./NarrationPanel";

type StageState<T> = { current: T | undefined; index: number };

type Props<T> = {
  steps: T[];
  getNarration: (step: T) => string;
  /** Renders the visual stage (SVG scene or code block) for the active step. */
  renderStage: (state: StageState<T>) => ReactNode;
};

// Generic player shell shared by the analogy and code phases: wires the step
// machine to the stage, narration, progress and controls.
export function PhasePlayer<T extends PlayableStep>({
  steps,
  getNarration,
  renderStage,
}: Props<T>) {
  const p = useLessonPlayer(steps);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {renderStage({ current: p.current, index: p.index })}
      </div>

      <NarrationPanel
        text={p.current ? getNarration(p.current) : ""}
        index={p.index}
        total={p.total}
      />

      <ProgressBar index={p.index} total={p.total} onSeek={p.goTo} />

      <Controls
        isPlaying={p.isPlaying}
        atStart={p.atStart}
        atEnd={p.atEnd}
        onAutoPlay={p.autoPlay}
        onPrev={p.prev}
        onNext={p.next}
      />
    </div>
  );
}
