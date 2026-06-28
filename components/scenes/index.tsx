"use client";

import type { ComponentType } from "react";
import { ObserverScene } from "./observer/ObserverScene";
import { SingletonScene } from "./singleton/SingletonScene";
import { StrategyScene } from "./strategy/StrategyScene";
import { DecoratorScene } from "./decorator/DecoratorScene";
import { FactoryMethodScene } from "./factory-method/FactoryMethodScene";
import { AdapterScene } from "./adapter/AdapterScene";

export type DirectedSceneProps = {
  activeShot: string;
  instant?: boolean;
};

// Maps a lesson's sceneId to its directed scene component. Adding a pattern
// registers its scene here; the engine stays untouched.
const registry: Record<string, ComponentType<DirectedSceneProps>> = {
  "observer-cinematic": ObserverScene,
  "singleton-cinematic": SingletonScene,
  "strategy-cinematic": StrategyScene,
  "decorator-cinematic": DecoratorScene,
  "factory-method-cinematic": FactoryMethodScene,
  "adapter-cinematic": AdapterScene,
};

export function SceneRenderer({
  sceneId,
  ...props
}: { sceneId: string } & DirectedSceneProps) {
  const Scene = registry[sceneId];
  if (!Scene) return null;
  return <Scene {...props} />;
}
