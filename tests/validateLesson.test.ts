import { describe, it, expect } from "vitest";
import { validateLesson } from "@/lib/validateLesson";
import type { Pattern } from "@/lib/types";
import type { SceneManifestRegistry } from "@/lib/sceneManifest";

const scenes: SceneManifestRegistry = {
  "demo-scene": {
    id: "demo-scene",
    labels: ["idle", "active"],
    anchors: ["box", "arrow"],
  },
};

function validLesson(): Pattern {
  return {
    slug: "demo",
    name: "Demo",
    category: "behavioral",
    difficulty: 1,
    tagline: "A demo.",
    available: true,
    analogy: {
      sceneId: "demo-scene",
      steps: [
        { id: "a1", narration: "Start.", sceneState: "idle" },
        { id: "a2", narration: "Go.", sceneState: "active", durationMs: 1000 },
      ],
    },
    code: {
      language: "typescript",
      source: "const a = 1;\nconst b = 2;\nconst c = a + b;",
      steps: [
        { id: "c1", narration: "Declare.", highlightLines: [1] },
        { id: "c2", narration: "Sum.", highlightLines: [3], analogyAnchor: "box" },
      ],
    },
  };
}

describe("validateLesson", () => {
  it("accepts a well-formed lesson", () => {
    expect(validateLesson(validLesson(), scenes)).toEqual([]);
  });

  it("rejects an unregistered scene", () => {
    const lesson = validLesson();
    lesson.analogy.sceneId = "missing";
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes("not registered"))).toBe(true);
  });

  it("rejects a sceneState the scene does not declare", () => {
    const lesson = validLesson();
    lesson.analogy.steps[0].sceneState = "nope";
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes('sceneState "nope"'))).toBe(true);
  });

  it("rejects a highlightLine out of range", () => {
    const lesson = validLesson();
    lesson.code.steps[0].highlightLines = [99];
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes("out of range"))).toBe(true);
  });

  it("rejects an analogyAnchor the scene does not declare", () => {
    const lesson = validLesson();
    lesson.code.steps[1].analogyAnchor = "ghost";
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes('anchors to "ghost"'))).toBe(true);
  });

  it("rejects duplicate step ids", () => {
    const lesson = validLesson();
    lesson.analogy.steps[1].id = "a1";
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes("Duplicate analogy step"))).toBe(true);
  });
});
