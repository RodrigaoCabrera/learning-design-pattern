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

/** A single narrated beat of the analogy animation. */
export type Step = {
  id: string;
  /** Step-by-step narration text (Spanish). */
  narration: string;
  /** GSAP timeline label this step advances the scene to. */
  sceneState: string;
  /** Optional duration used by auto-play to pace the linear mode. */
  durationMs?: number;
};

/** Phase 1: the analogy. */
export type Phase = {
  /** Which SVG scene component to render. */
  sceneId: string;
  steps: Step[];
};

/** A single narrated beat of the code walkthrough. */
export type CodeStep = {
  id: string;
  narration: string;
  /** 1-based line numbers to highlight in the source. */
  highlightLines: number[];
  /** The bridge: id of the SVG element to light up in the analogy scene. */
  analogyAnchor?: string;
};

/** Phase 2: the code. */
export type CodePhase = {
  language: "typescript";
  /** The full snippet shown to the learner. */
  source: string;
  steps: CodeStep[];
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
  analogy: Phase;
  code: CodePhase;
};
