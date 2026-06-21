"use client";

type Props = {
  source: string;
  highlightLines: number[];
};

// Renders a code snippet with line numbers and highlights the active lines.
export function CodeBlock({ source, highlightLines }: Props) {
  const lines = source.split("\n");
  const highlighted = new Set(highlightLines);

  return (
    <pre className="overflow-x-auto rounded-xl bg-ink p-4 font-mono text-sm leading-relaxed text-slate-100">
      <code className="block">
        {lines.map((line, i) => {
          const n = i + 1;
          const isOn = highlighted.has(n);
          return (
            <div
              key={n}
              data-line={n}
              data-active={isOn || undefined}
              className={`flex -mx-4 px-4 transition-colors ${
                isOn ? "bg-accent/25" : ""
              }`}
            >
              <span className="mr-4 w-6 select-none text-right text-slate-500">
                {n}
              </span>
              <span className="whitespace-pre">{line || " "}</span>
            </div>
          );
        })}
      </code>
    </pre>
  );
}
