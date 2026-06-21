"use client";

type Props = {
  index: number;
  total: number;
  onSeek: (i: number) => void;
  /** "overlay" = thin Instagram-stories style bars on top of a dark scene. */
  variant?: "default" | "overlay";
};

export function ProgressBar({ index, total, onSeek, variant = "default" }: Props) {
  const isOverlay = variant === "overlay";
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={index + 1}
      aria-label={`Paso ${index + 1} de ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSeek(i)}
          aria-label={`Ir al paso ${i + 1}`}
          className={`h-1 flex-1 rounded-full transition ${
            i <= index
              ? isOverlay
                ? "bg-white"
                : "bg-accent"
              : isOverlay
                ? "bg-white/30"
                : "bg-accentSoft"
          }`}
        />
      ))}
    </div>
  );
}
