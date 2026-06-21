// Core data model for a design-pattern lesson.
// A lesson is pure data; the LessonPlayer engine renders it.
// Adding a pattern means adding data + an SVG scene, never touching the engine.

export type PatternCategory = "creational" | "structural" | "behavioral";

// --- Cinematic analogy model (v2) ---
// An analogy is a sequence of directed shots grouped into acts. Each shot carries
// a subtitle (caption) that disambiguates the animation, and is audio-ready.

export type Act = "problem" | "solution" | "concept";

export type Shot = {
  id: string;
  act: Act;
  /** Subtitle shown in sync with the shot; also the script for future TTS audio. */
  caption: string;
  /** Used by auto-play to pace the shot; ideally near the shot's animation length. */
  durationMs?: number;
  /** Optional pre-recorded / TTS narration, played when the shot becomes active. */
  audioUrl?: string;
};

/** Phase 1: the analogy. The director (scene component) plays each shot. */
export type AnalogyPhase = {
  /** Which directed scene component to render. */
  sceneId: string;
  shots: Shot[];
};

/** A single beat of the guided code walkthrough, mapped to the analogy. */
export type CodeFragment = {
  id: string;
  /** Short heading, e.g. "La lista de suscriptos". */
  title: string;
  /** 1-based line numbers to highlight in the source. */
  highlightLines: number[];
  /** Explanation text mapped back to the analogy (no SVG bridge). */
  explanation: string;
};

/** Phase 2: the code. */
export type CodePhase = {
  language: "typescript";
  /** The full snippet shown to the learner. */
  source: string;
  tour: CodeFragment[];
};

/** A complete lesson for one design pattern. */
export type Pattern = {
  slug: string;
  name: string;
  category: PatternCategory;
  difficulty: 1 | 2 | 3;
  /** Hook line shown on the catalog card. */
  tagline: string;
  /** Whether the lesson is implemented (false = "próximamente"). */
  available: boolean;
  analogy: AnalogyPhase;
  code: CodePhase;
};
