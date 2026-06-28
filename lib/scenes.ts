import type { SceneManifestRegistry } from "./sceneManifest";

// Single source of truth for what each scene supports. Lessons are validated
// against this; the component registry (components/scenes) renders matching ids.
export const sceneManifests: SceneManifestRegistry = {
  "observer-cinematic": {
    id: "observer-cinematic",
    shots: [
      "shot-1",
      "shot-2",
      "shot-3",
      "shot-4",
      "shot-5",
      "shot-6",
      "shot-7",
      "shot-8",
      "shot-9",
      "shot-10",
      "shot-11",
    ],
  },
  "singleton-cinematic": {
    id: "singleton-cinematic",
    shots: ["shot-1", "shot-2", "shot-3", "shot-4", "shot-5", "shot-6", "shot-7", "shot-8", "shot-9"],
  },
  "strategy-cinematic": {
    id: "strategy-cinematic",
    shots: ["shot-1", "shot-2", "shot-3", "shot-4", "shot-5", "shot-6", "shot-7", "shot-8", "shot-9"],
  },
};
