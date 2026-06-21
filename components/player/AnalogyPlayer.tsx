"use client";

import type { Shot } from "@/lib/types";
import { useLessonPlayer } from "./useLessonPlayer";
import { Controls } from "./Controls";
import { ProgressBar } from "./ProgressBar";
import { SubtitleBar } from "./SubtitleBar";
import { SceneRenderer } from "@/components/scenes";

type Props = {
  sceneId: string;
  shots: Shot[];
};

// Plays a directed analogy scene: any pattern's shots, driven by the same
// step machine and chrome (Instagram-stories progress overlay, mobile tap
// zones, dedicated subtitle band). The scene component itself owns the
// cinematic direction (camera, characters, transitions).
export function AnalogyPlayer({ sceneId, shots }: Props) {
  const p = useLessonPlayer(shots);
  const shot = p.current ?? shots[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl bg-black shadow-xl">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 z-20">
            <ProgressBar index={p.index} total={p.total} onSeek={p.goTo} variant="overlay" />
          </div>

          <SceneRenderer sceneId={sceneId} activeShot={shot.id} instant={p.instant} />

          {/* Mobile tap zones: left/right thirds step back/forward, only below sm. */}
          <button
            type="button"
            className="absolute inset-y-0 left-0 z-10 w-1/3 sm:hidden"
            onClick={p.prev}
            disabled={p.atStart}
            aria-label="Paso anterior"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 z-10 w-1/3 sm:hidden"
            onClick={p.next}
            disabled={p.atEnd}
            aria-label="Paso siguiente"
          />
        </div>
        <SubtitleBar text={shot.caption} stepKey={p.index} />
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
