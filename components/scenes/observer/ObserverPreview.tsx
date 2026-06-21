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
];

export function ObserverPreview() {
  const p = useLessonPlayer(SHOTS);
  const shot = p.current ?? SHOTS[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl bg-black shadow-xl">
        <ObserverScene activeShot={shot.id} />
        <SubtitleBar text={shot.caption} stepKey={p.index} />
      </div>

      <ProgressBar index={p.index} total={p.total} onSeek={p.goTo} />
      <Controls
        isPlaying={p.isPlaying}
        atStart={p.atStart}
        atEnd={p.atEnd}
        onPlay={p.play}
        onPause={p.pause}
        onPrev={p.prev}
        onNext={p.next}
      />
    </div>
  );
}
