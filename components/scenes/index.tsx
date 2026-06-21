"use client";

import type { ComponentType } from "react";
import { ObserverScene } from "./ObserverScene";

export type SceneProps = {
  activeState: string;
  highlightAnchor?: string;
};

// Maps a lesson's sceneId to its component. Adding a pattern registers its scene
// here; the engine stays untouched.
const registry: Record<string, ComponentType<SceneProps>> = {
  "whatsapp-group": ObserverScene,
};

export function SceneRenderer({
  sceneId,
  ...props
}: { sceneId: string } & SceneProps) {
  const Scene = registry[sceneId];
  if (!Scene) return null;
  return <Scene {...props} />;
}
