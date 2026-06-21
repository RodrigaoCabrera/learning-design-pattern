"use client";

type Props = {
  text: string;
  index: number;
  total: number;
};

export function NarrationPanel({ text, index, total }: Props) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        Paso {index + 1} de {total}
      </p>
      <p className="text-lg leading-relaxed text-ink" aria-live="polite">
        {text}
      </p>
    </div>
  );
}
