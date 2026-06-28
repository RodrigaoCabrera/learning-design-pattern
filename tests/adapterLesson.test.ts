import { describe, it, expect } from "vitest";
import { adapterLesson } from "@/lib/lessons/adapter";
import { validateLesson } from "@/lib/validateLesson";
import { sceneManifests } from "@/lib/scenes";

describe("adapterLesson", () => {
  it("is well-formed against its scene", () => {
    expect(validateLesson(adapterLesson, sceneManifests)).toEqual([]);
  });

  it("starts the analogy with the problem act", () => {
    expect(adapterLesson.analogy.shots[0].act).toBe("problem");
  });

  it("plays all 9 directed shots", () => {
    expect(adapterLesson.analogy.shots).toHaveLength(9);
  });

  it("maps every code fragment to an explanation", () => {
    expect(adapterLesson.code.tour.every((f) => f.explanation.trim().length > 0)).toBe(true);
  });
});
