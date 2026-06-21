import { ObserverPreview } from "@/components/scenes/observer/ObserverPreview";

// Preview page for the cinematic Observer analogy — one continuous flow
// (problem → solution). Used to review before migrating the live lesson.
export default function ObserverPreviewPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-6">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Piloto · Observer
        </p>
        <h1 className="text-2xl font-bold">El profesor y los 30 padres</h1>
        <p className="mt-1 text-muted">
          Recorré la historia con los controles. El subtítulo acompaña cada plano,
          en su propia banda (y será la base del audio a futuro).
        </p>
      </header>

      <ObserverPreview />
    </main>
  );
}
