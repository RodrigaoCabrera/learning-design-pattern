import type { Pattern } from "./types";
import type { SceneManifestRegistry } from "./sceneManifest";

// Validates that a lesson is well-formed and internally consistent against the
// scene it references. Returns a list of human-readable errors (empty = valid).

export function validateLesson(
  pattern: Pattern,
  scenes: SceneManifestRegistry
): string[] {
  const errors: string[] = [];

  // --- Analogy phase ---
  const scene = scenes[pattern.analogy.sceneId];
  if (!scene) {
    errors.push(
      `Scene "${pattern.analogy.sceneId}" is not registered in the scene manifest.`
    );
  }

  if (pattern.analogy.shots.length === 0) {
    errors.push("Analogy phase has no shots.");
  }

  const shotIds = new Set<string>();
  pattern.analogy.shots.forEach((shot, i) => {
    if (shotIds.has(shot.id)) {
      errors.push(`Duplicate analogy shot id "${shot.id}".`);
    }
    shotIds.add(shot.id);

    if (!shot.caption.trim()) {
      errors.push(`Analogy shot ${i} ("${shot.id}") has empty caption.`);
    }
    if (scene && !scene.shots.includes(shot.id)) {
      errors.push(
        `Analogy shot "${shot.id}" is not declared by scene "${scene.id}".`
      );
    }
    if (shot.durationMs !== undefined && shot.durationMs <= 0) {
      errors.push(`Analogy shot "${shot.id}" has non-positive durationMs.`);
    }
  });

  // --- Code phase ---
  const lineCount = pattern.code.source.split("\n").length;
  if (!pattern.code.source.trim()) {
    errors.push("Code phase source is empty.");
  }
  if (pattern.code.tour.length === 0) {
    errors.push("Code phase has no tour fragments.");
  }

  const fragmentIds = new Set<string>();
  pattern.code.tour.forEach((fragment, i) => {
    if (fragmentIds.has(fragment.id)) {
      errors.push(`Duplicate code fragment id "${fragment.id}".`);
    }
    fragmentIds.add(fragment.id);

    if (!fragment.title.trim()) {
      errors.push(`Code fragment ${i} ("${fragment.id}") has empty title.`);
    }
    if (!fragment.explanation.trim()) {
      errors.push(`Code fragment ${i} ("${fragment.id}") has empty explanation.`);
    }
    fragment.highlightLines.forEach((line) => {
      if (line < 1 || line > lineCount) {
        errors.push(
          `Code fragment "${fragment.id}" highlights line ${line}, out of range 1..${lineCount}.`
        );
      }
    });
  });

  return errors;
}
