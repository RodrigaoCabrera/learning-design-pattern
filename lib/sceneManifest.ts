// A scene declares which shot ids its director timeline knows how to play.
// Lessons are validated against these manifests so they can never reference a
// shot the scene doesn't actually provide.

export type SceneManifest = {
  id: string;
  /** Valid shot ids a Shot may target (the director's GSAP timeline labels). */
  shots: string[];
};

export type SceneManifestRegistry = Record<string, SceneManifest>;
