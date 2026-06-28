import { describe, it, expect } from "vitest";
import { strategyLesson } from "@/lib/lessons/strategy";
import { validateLesson } from "@/lib/validateLesson";
import { sceneManifests } from "@/lib/scenes";

describe("strategyLesson", () => {
  it("is well-formed against its scene", () => {
    expect(validateLesson(strategyLesson, sceneManifests)).toEqual([]);
  });

  it("starts the analogy with the problem act", () => {
    expect(strategyLesson.analogy.shots[0].act).toBe("problem");
  });

  it("plays all 9 directed shots", () => {
    expect(strategyLesson.analogy.shots).toHaveLength(9);
  });

  it("maps every code fragment to an explanation", () => {
    expect(strategyLesson.code.tour.every((f) => f.explanation.trim().length > 0)).toBe(true);
  });
});
