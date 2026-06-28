import { describe, it, expect } from "vitest";
import { decoratorLesson } from "@/lib/lessons/decorator";
import { validateLesson } from "@/lib/validateLesson";
import { sceneManifests } from "@/lib/scenes";

describe("decoratorLesson", () => {
  it("is well-formed against its scene", () => {
    expect(validateLesson(decoratorLesson, sceneManifests)).toEqual([]);
  });

  it("starts the analogy with the problem act", () => {
    expect(decoratorLesson.analogy.shots[0].act).toBe("problem");
  });

  it("plays all 9 directed shots", () => {
    expect(decoratorLesson.analogy.shots).toHaveLength(9);
  });

  it("maps every code fragment to an explanation", () => {
    expect(decoratorLesson.code.tour.every((f) => f.explanation.trim().length > 0)).toBe(true);
  });
});
