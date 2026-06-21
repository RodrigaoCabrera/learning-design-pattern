import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, allLessons } from "@/lib/lessons";
import { LessonView } from "@/components/LessonView";

export function generateStaticParams() {
  return allLessons().map((lesson) => ({ slug: lesson.slug }));
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  if (!lesson) {
    notFound();
  }

  return (
    <main>
      <nav className="mx-auto max-w-5xl px-4 pt-6">
        <Link href="/" className="text-sm font-medium text-accent hover:underline">
          ← Volver al catálogo
        </Link>
      </nav>
      <LessonView pattern={lesson} />
    </main>
  );
}
