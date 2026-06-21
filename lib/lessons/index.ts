import type { Pattern } from "../types";
import { observerLesson } from "./observer";

// Registry of fully implemented lessons. Add a pattern here once its data and
// scene exist; the catalog (lib/catalog) drives what is shown vs "próximamente".
const lessons: Record<string, Pattern> = {
  observer: observerLesson,
};

export function getLesson(slug: string): Pattern | undefined {
  return lessons[slug];
}

export function allLessons(): Pattern[] {
  return Object.values(lessons);
}
