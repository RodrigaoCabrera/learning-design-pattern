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

  if (pattern.analogy.steps.length === 0) {
    errors.push("Analogy phase has no steps.");
  }

  const stepIds = new Set<string>();
  pattern.analogy.steps.forEach((step, i) => {
    if (stepIds.has(step.id)) {
      errors.push(`Duplicate analogy step id "${step.id}".`);
    }
    stepIds.add(step.id);

    if (!step.narration.trim()) {
      errors.push(`Analogy step ${i} ("${step.id}") has empty narration.`);
    }
    if (scene && !scene.labels.includes(step.sceneState)) {
      errors.push(
        `Analogy step "${step.id}" targets sceneState "${step.sceneState}" not declared by scene "${scene.id}".`
      );
    }
    if (step.durationMs !== undefined && step.durationMs <= 0) {
      errors.push(`Analogy step "${step.id}" has non-positive durationMs.`);
    }
  });

  // --- Code phase ---
  const lineCount = pattern.code.source.split("\n").length;
  if (!pattern.code.source.trim()) {
    errors.push("Code phase source is empty.");
  }
  if (pattern.code.steps.length === 0) {
    errors.push("Code phase has no steps.");
  }

  const codeStepIds = new Set<string>();
  pattern.code.steps.forEach((step, i) => {
    if (codeStepIds.has(step.id)) {
      errors.push(`Duplicate code step id "${step.id}".`);
    }
    codeStepIds.add(step.id);

    if (!step.narration.trim()) {
      errors.push(`Code step ${i} ("${step.id}") has empty narration.`);
    }
    step.highlightLines.forEach((line) => {
      if (line < 1 || line > lineCount) {
        errors.push(
          `Code step "${step.id}" highlights line ${line}, out of range 1..${lineCount}.`
        );
      }
    });
    if (step.analogyAnchor && scene && !scene.anchors.includes(step.analogyAnchor)) {
      errors.push(
        `Code step "${step.id}" anchors to "${step.analogyAnchor}" not declared by scene "${scene.id}".`
      );
    }
  });

  return errors;
}
