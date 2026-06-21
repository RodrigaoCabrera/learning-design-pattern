"use client";

import { useState } from "react";
import type { Pattern } from "@/lib/types";
import { PhasePlayer } from "./player/PhasePlayer";
import { CodeBlock } from "./player/CodeBlock";
import { SceneRenderer } from "./scenes";

type PhaseKey = "analogy" | "code";

// Composes the two learning phases for a pattern. The code phase keeps the
// scene on screen so the analogy↔code bridge can light up the matching element.
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
        <PhasePlayer
          steps={pattern.analogy.steps}
          getNarration={(s) => s.narration}
          renderStage={({ current }) => (
            <SceneRenderer
              sceneId={pattern.analogy.sceneId}
              activeState={current?.sceneState ?? "idle"}
            />
          )}
        />
      ) : (
        <PhasePlayer
          steps={pattern.code.steps}
          getNarration={(s) => s.narration}
          renderStage={({ current }) => (
            <div className="grid gap-4 p-4 md:grid-cols-2">
              <CodeBlock
                source={pattern.code.source}
                highlightLines={current?.highlightLines ?? []}
              />
              <div className="self-center">
                <SceneRenderer
                  sceneId={pattern.analogy.sceneId}
                  activeState="reacted"
                  highlightAnchor={current?.analogyAnchor}
                />
              </div>
            </div>
          )}
        />
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
