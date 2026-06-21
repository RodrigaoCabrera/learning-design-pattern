import { catalog } from "@/lib/catalog";
import { PatternCard } from "@/components/ui/PatternCard";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">PatternLab</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Aprendé patrones de diseño de software en dos pasos: primero con una
          analogía animada, luego con código simple.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((pattern) => (
          <PatternCard key={pattern.slug} pattern={pattern} />
        ))}
      </section>
    </main>
  );
}
