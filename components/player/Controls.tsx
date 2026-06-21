"use client";

type Props = {
  isPlaying: boolean;
  atStart: boolean;
  atEnd: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const btn =
  "rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed";

export function Controls({
  isPlaying,
  atStart,
  atEnd,
  onPlay,
  onPause,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        className={`${btn} bg-white text-ink shadow-sm hover:bg-accentSoft`}
        onClick={onPrev}
        disabled={atStart}
        aria-label="Paso anterior"
      >
        ← Anterior
      </button>

      <button
        type="button"
        className={`${btn} bg-accent text-white hover:opacity-90`}
        onClick={isPlaying ? onPause : onPlay}
        disabled={atEnd && !isPlaying}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? "❚❚ Pausar" : "▶ Auto-play"}
      </button>

      <button
        type="button"
        className={`${btn} bg-white text-ink shadow-sm hover:bg-accentSoft`}
        onClick={onNext}
        disabled={atEnd}
        aria-label="Paso siguiente"
      >
        Siguiente →
      </button>
    </div>
  );
}
