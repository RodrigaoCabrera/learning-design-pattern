import { describe, it, expect } from "vitest";
import { singletonLesson } from "@/lib/lessons/singleton";
import { validateLesson } from "@/lib/validateLesson";
import { sceneManifests } from "@/lib/scenes";

describe("singletonLesson", () => {
  it("is well-formed against its scene", () => {
    expect(validateLesson(singletonLesson, sceneManifests)).toEqual([]);
  });

  it("starts the analogy with the problem act", () => {
    expect(singletonLesson.analogy.shots[0].act).toBe("problem");
  });

  it("plays all 9 directed shots", () => {
    expect(singletonLesson.analogy.shots).toHaveLength(9);
  });

  it("maps every code fragment to an explanation", () => {
    expect(singletonLesson.code.tour.every((f) => f.explanation.trim().length > 0)).toBe(true);
  });
});
