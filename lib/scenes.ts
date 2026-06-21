import type { SceneManifestRegistry } from "./sceneManifest";

// Single source of truth for what each scene supports. Lessons are validated
// against this; the component registry (components/scenes) renders matching ids.
export const sceneManifests: SceneManifestRegistry = {
  "whatsapp-group": {
    id: "whatsapp-group",
    labels: ["idle", "subscribe", "publish", "notify", "reacted"],
    anchors: ["admin", "members", "message", "subscription"],
  },
};
