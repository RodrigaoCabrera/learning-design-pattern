"use client";

type Props = {
  isPlaying: boolean;
  atStart: boolean;
  atEnd: boolean;
  onAutoPlay: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const btn =
  "rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed";

export function Controls({
  isPlaying,
  atStart,
  atEnd,
  onAutoPlay,
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

      {/* Auto-play always restarts from the first shot. It only disables
          while it's actively running — never because the lesson ended. */}
      <button
        type="button"
        className={`${btn} bg-accent text-white hover:opacity-90`}
        onClick={onAutoPlay}
        disabled={isPlaying}
        aria-label="Reproducir desde el inicio"
      >
        {isPlaying ? "❚❚ Reproduciendo…" : "▶ Auto-play"}
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
