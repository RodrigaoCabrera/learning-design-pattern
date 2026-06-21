import { describe, it, expect } from "vitest";
import { observerLesson } from "@/lib/lessons/observer";
import { validateLesson } from "@/lib/validateLesson";
import { sceneManifests } from "@/lib/scenes";

describe("observerLesson", () => {
  it("is well-formed against its scene", () => {
    expect(validateLesson(observerLesson, sceneManifests)).toEqual([]);
  });

  it("starts the analogy with the problem act", () => {
    expect(observerLesson.analogy.shots[0].act).toBe("problem");
  });

  it("plays all 11 directed shots", () => {
    expect(observerLesson.analogy.shots).toHaveLength(11);
  });

  it("maps every code fragment to an explanation", () => {
    expect(observerLesson.code.tour.every((f) => f.explanation.trim().length > 0)).toBe(true);
  });
});
