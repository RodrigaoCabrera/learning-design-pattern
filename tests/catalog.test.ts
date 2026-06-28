import { describe, it, expect } from "vitest";
import { catalog } from "@/lib/catalog";
import { getLesson, allLessons } from "@/lib/lessons";

describe("catalog", () => {
  it("lists the six target patterns", () => {
    expect(catalog).toHaveLength(6);
    expect(catalog.map((p) => p.slug)).toEqual(
      expect.arrayContaining([
        "observer",
        "singleton",
        "strategy",
        "decorator",
        "factory-method",
        "adapter",
      ])
    );
  });

  it("marks only implemented patterns as available", () => {
    const available = catalog.filter((p) => p.available).map((p) => p.slug);
    expect(available).toEqual(["observer", "singleton", "strategy"]);
  });
});

describe("lessons registry", () => {
  it("resolves an implemented lesson", () => {
    expect(getLesson("observer")?.name).toBe("Observer");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getLesson("nope")).toBeUndefined();
  });

  it("exposes all implemented lessons", () => {
    expect(allLessons().map((l) => l.slug)).toEqual(["observer", "singleton", "strategy"]);
  });
});
