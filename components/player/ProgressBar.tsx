"use client";

type Props = {
  index: number;
  total: number;
  onSeek: (i: number) => void;
};

export function ProgressBar({ index, total, onSeek }: Props) {
  return (
    <div
      className="flex items-center gap-1.5"
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
          className={`h-2 flex-1 rounded-full transition ${
            i <= index ? "bg-accent" : "bg-accentSoft"
          }`}
        />
      ))}
    </div>
  );
}
