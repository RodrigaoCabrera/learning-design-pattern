"use client";

import type { CodeFragment } from "@/lib/types";
import { useLessonPlayer } from "./useLessonPlayer";
import { Controls } from "./Controls";
import { ProgressBar } from "./ProgressBar";
import { CodeBlock } from "./CodeBlock";

type Props = {
  source: string;
  tour: CodeFragment[];
};

// Guided code walkthrough: code stays on screen, each fragment highlights its
// lines and maps back to the analogy via its explanation text — no SVG bridge.
export function CodeTour({ source, tour }: Props) {
  const p = useLessonPlayer(tour);
  const fragment = p.current;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <ProgressBar index={p.index} total={p.total} onSeek={p.goTo} />
        <div className="grid gap-4 p-4 md:grid-cols-2">
          <CodeBlock source={source} highlightLines={fragment?.highlightLines ?? []} />
          <div className="self-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {fragment?.title}
            </p>
            <p className="text-lg leading-relaxed text-ink" aria-live="polite">
              {fragment?.explanation}
            </p>
          </div>
        </div>
      </div>

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
