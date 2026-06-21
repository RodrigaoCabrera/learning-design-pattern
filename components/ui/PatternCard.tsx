import Link from "next/link";
import type { PatternMeta } from "@/lib/catalog";

const categoryLabel: Record<PatternMeta["category"], string> = {
  creational: "Creacional",
  structural: "Estructural",
  behavioral: "Comportamiento",
};

export function PatternCard({ pattern }: { pattern: PatternMeta }) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          {categoryLabel[pattern.category]}
        </span>
        {!pattern.available && (
          <span className="rounded-full bg-accentSoft px-2 py-0.5 text-xs font-medium text-accent">
            Próximamente
          </span>
        )}
      </div>
      <h2 className="mt-2 text-xl font-bold">{pattern.name}</h2>
      <p className="mt-1 text-sm text-muted">{pattern.tagline}</p>
    </>
  );

  const base =
    "block rounded-2xl bg-white p-5 shadow-sm transition";

  if (!pattern.available) {
    return <div className={`${base} opacity-60`}>{inner}</div>;
  }

  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className={`${base} hover:-translate-y-1 hover:shadow-md`}
    >
      {inner}
    </Link>
  );
}
