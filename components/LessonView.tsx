"use client";

import { useState } from "react";
import type { Pattern } from "@/lib/types";
import { AnalogyPlayer } from "./player/AnalogyPlayer";
import { CodeTour } from "./player/CodeTour";

type PhaseKey = "analogy" | "code";

// Composes the two learning phases for a pattern: a directed cinematic
// analogy, then a guided code tour mapped to it by text (no SVG bridge).
export function LessonView({ pattern }: { pattern: Pattern }) {
  const [phase, setPhase] = useState<PhaseKey>("analogy");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <span className="text-sm font-medium uppercase tracking-wide text-muted">
          {labelForCategory(pattern.category)}
        </span>
        <h1 className="text-3xl font-bold">{pattern.name}</h1>
        <p className="text-muted">{pattern.tagline}</p>
      </header>

      <div className="flex gap-2">
        <PhaseTab
          active={phase === "analogy"}
          onClick={() => setPhase("analogy")}
        >
          1 · Analogía
        </PhaseTab>
        <PhaseTab active={phase === "code"} onClick={() => setPhase("code")}>
          2 · Código
        </PhaseTab>
      </div>

      {phase === "analogy" ? (
        <AnalogyPlayer sceneId={pattern.analogy.sceneId} shots={pattern.analogy.shots} />
      ) : (
        <CodeTour source={pattern.code.source} tour={pattern.code.tour} />
      )}
    </div>
  );
}

function PhaseTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active ? "bg-accent text-white" : "bg-white text-muted shadow-sm"
      }`}
    >
      {children}
    </button>
  );
}

function labelForCategory(category: Pattern["category"]): string {
  switch (category) {
    case "creational":
      return "Patrón creacional";
    case "structural":
      return "Patrón estructural";
    case "behavioral":
      return "Patrón de comportamiento";
  }
}
