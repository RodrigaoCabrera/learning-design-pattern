"use client";

import type { Shot } from "@/lib/types";
import { useLessonPlayer } from "@/components/player/useLessonPlayer";
import { Controls } from "@/components/player/Controls";
import { ProgressBar } from "@/components/player/ProgressBar";
import { SubtitleBar } from "@/components/player/SubtitleBar";
import { ObserverScene } from "./ObserverScene";

// One continuous flow (acts are internal only). Captions are the subtitles and
// the script for future audio.
const SHOTS: Shot[] = [
  { id: "shot-1", act: "problem", caption: "Sos un profesor. Tenés que avisarles a 30 padres que hay tarea.", durationMs: 4000 },
  { id: "shot-2", act: "problem", caption: "Sin un sistema, llamás a cada padre, uno por uno.", durationMs: 4000 },
  { id: "shot-3", act: "problem", caption: "Marcar, esperar, avisar, colgar… 30 veces. Lento y agotador.", durationMs: 5500 },
  { id: "shot-4", act: "problem", caption: "Y si entra o sale un padre, vos tenés que mantener la lista a mano.", durationMs: 4500 },
  { id: "shot-5", act: "problem", caption: "Todo el trabajo recae en vos, el que avisa.", durationMs: 3500 },
  { id: "shot-6", act: "solution", caption: "Con un grupo de WhatsApp, todo cambia.", durationMs: 3500 },
  { id: "shot-7", act: "solution", caption: "Escribís el mensaje una sola vez. Los 30 lo reciben al mismo tiempo.", durationMs: 4500 },
  { id: "shot-8", act: "solution", caption: "No te importa quién lo leyó ni cuántos hay. Solo mandás el mensaje.", durationMs: 4500 },
  { id: "shot-9", act: "solution", caption: "Si uno se va, deja de recibir. Si uno entra, recibe todo. Vos no hacés nada extra.", durationMs: 5000 },
  { id: "shot-10", act: "solution", caption: "¿Necesitás una nueva reacción —un log, una alerta—? Sumás un escuchador más, sin tocar al profesor ni a los demás.", durationMs: 5500 },
  { id: "shot-11", act: "concept", caption: "El que avisa es el Sujeto. Los que escuchan son los Observadores. Entran y salen sin que el Sujeto lo note: están desacoplados.", durationMs: 6000 },
];

export function ObserverPreview() {
  const p = useLessonPlayer(SHOTS);
  const shot = p.current ?? SHOTS[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl bg-black shadow-xl">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 z-20">
            <ProgressBar index={p.index} total={p.total} onSeek={p.goTo} variant="overlay" />
          </div>

          <ObserverScene activeShot={shot.id} instant={p.instant} />

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
