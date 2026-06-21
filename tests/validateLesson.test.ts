import { describe, it, expect } from "vitest";
import { validateLesson } from "@/lib/validateLesson";
import type { Pattern } from "@/lib/types";
import type { SceneManifestRegistry } from "@/lib/sceneManifest";

const scenes: SceneManifestRegistry = {
  "demo-scene": {
    id: "demo-scene",
    shots: ["shot-1", "shot-2"],
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
      shots: [
        { id: "shot-1", act: "problem", caption: "Start." },
        { id: "shot-2", act: "solution", caption: "Go.", durationMs: 1000 },
      ],
    },
    code: {
      language: "typescript",
      source: "const a = 1;\nconst b = 2;\nconst c = a + b;",
      tour: [
        { id: "c1", title: "Declare", highlightLines: [1], explanation: "Declare." },
        { id: "c2", title: "Sum", highlightLines: [3], explanation: "Sum." },
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

  it("rejects a shot id the scene does not declare", () => {
    const lesson = validLesson();
    lesson.analogy.shots[0].id = "nope";
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes('shot "nope"'))).toBe(true);
  });

  it("rejects a highlightLine out of range", () => {
    const lesson = validLesson();
    lesson.code.tour[0].highlightLines = [99];
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes("out of range"))).toBe(true);
  });

  it("rejects an empty fragment explanation", () => {
    const lesson = validLesson();
    lesson.code.tour[1].explanation = "  ";
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes("empty explanation"))).toBe(true);
  });

  it("rejects duplicate shot ids", () => {
    const lesson = validLesson();
    lesson.analogy.shots[1].id = "shot-1";
    const errors = validateLesson(lesson, scenes);
    expect(errors.some((e) => e.includes("Duplicate analogy shot"))).toBe(true);
  });
});
