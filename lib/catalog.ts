import type { PatternCategory } from "./types";

// Lightweight metadata for the home catalog. Cards render from this; only
// patterns with available=true link to a playable lesson.
export type PatternMeta = {
  slug: string;
  name: string;
  category: PatternCategory;
  difficulty: 1 | 2 | 3;
  tagline: string;
  available: boolean;
};

export const catalog: PatternMeta[] = [
  {
    slug: "observer",
    name: "Observer",
    category: "behavioral",
    difficulty: 2,
    tagline: "Un cambio, muchos notificados.",
    available: true,
  },
  {
    slug: "singleton",
    name: "Singleton",
    category: "creational",
    difficulty: 1,
    tagline: "Una sola instancia para todos.",
    available: true,
  },
  {
    slug: "strategy",
    name: "Strategy",
    category: "behavioral",
    difficulty: 2,
    tagline: "Elegí el algoritmo en tiempo de ejecución.",
    available: true,
  },
  {
    slug: "decorator",
    name: "Decorator",
    category: "structural",
    difficulty: 2,
    tagline: "Agregá funcionalidad envolviendo.",
    available: true,
  },
  {
    slug: "factory-method",
    name: "Factory Method",
    category: "creational",
    difficulty: 2,
    tagline: "La subclase decide qué crear.",
    available: true,
  },
  {
    slug: "adapter",
    name: "Adapter",
    category: "structural",
    difficulty: 1,
    tagline: "Conectá interfaces incompatibles.",
    available: false,
  },
];
