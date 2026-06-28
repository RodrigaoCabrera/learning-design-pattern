import { describe, it, expect } from "vitest";
import { factoryMethodLesson } from "@/lib/lessons/factory-method";
import { validateLesson } from "@/lib/validateLesson";
import { sceneManifests } from "@/lib/scenes";

describe("factoryMethodLesson", () => {
  it("is well-formed against its scene", () => {
    expect(validateLesson(factoryMethodLesson, sceneManifests)).toEqual([]);
  });

  it("starts the analogy with the problem act", () => {
    expect(factoryMethodLesson.analogy.shots[0].act).toBe("problem");
  });

  it("plays all 9 directed shots", () => {
    expect(factoryMethodLesson.analogy.shots).toHaveLength(9);
  });

  it("maps every code fragment to an explanation", () => {
    expect(factoryMethodLesson.code.tour.every((f) => f.explanation.trim().length > 0)).toBe(true);
  });
});
