import { describe, it, expect } from "vitest";
import { observerLesson } from "@/lib/lessons/observer";
import { validateLesson } from "@/lib/validateLesson";
import { sceneManifests } from "@/lib/scenes";

describe("observerLesson", () => {
  it("is well-formed against its scene", () => {
    expect(validateLesson(observerLesson, sceneManifests)).toEqual([]);
  });

  it("uses the bridge in at least two code steps", () => {
    const anchored = observerLesson.code.steps.filter((s) => s.analogyAnchor);
    expect(anchored.length).toBeGreaterThanOrEqual(2);
  });
});
