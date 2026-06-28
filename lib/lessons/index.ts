import type { Pattern } from "../types";
import { observerLesson } from "./observer";
import { singletonLesson } from "./singleton";
import { strategyLesson } from "./strategy";
import { decoratorLesson } from "./decorator";

// Registry of fully implemented lessons. Add a pattern here once its data and
// scene exist; the catalog (lib/catalog) drives what is shown vs "próximamente".
const lessons: Record<string, Pattern> = {
  observer: observerLesson,
  singleton: singletonLesson,
  strategy: strategyLesson,
  decorator: decoratorLesson,
};

export function getLesson(slug: string): Pattern | undefined {
  return lessons[slug];
}

export function allLessons(): Pattern[] {
  return Object.values(lessons);
}
