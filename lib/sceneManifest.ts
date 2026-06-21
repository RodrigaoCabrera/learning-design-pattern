// A scene declares which timeline labels and which anchor ids it supports.
// Lessons are validated against these manifests so they can never reference
// a sceneState or analogyAnchor the scene doesn't actually provide.

export type SceneManifest = {
  id: string;
  /** Valid GSAP timeline labels a Step may target. */
  labels: string[];
  /** Valid element ids a CodeStep may light up via analogyAnchor. */
  anchors: string[];
};

export type SceneManifestRegistry = Record<string, SceneManifest>;
