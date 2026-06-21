import type { Pattern } from "../types";

// Singleton: a school where every staff member who needs the principal's
// authorization opens a different door and gets a DIFFERENT principal, with
// contradicting answers. A single door with a single principal — created only
// once, on first knock — fixes it.
const source = `class Director {
  private static instance: Director;

  private constructor(private nombre: string) {}

  static getInstance(): Director {
    if (!Director.instance) {
      Director.instance = new Director("Director Pérez");
    }
    return Director.instance;
  }

  decidir(consulta: string): string {
    return \`\${this.nombre} dice: autorizado — \${consulta}\`;
  }
}`;

export const singletonLesson: Pattern = {
  slug: "singleton",
  name: "Singleton",
  category: "creational",
  difficulty: 1,
  tagline: "Una sola instancia para todos.",
  available: true,
  analogy: {
    sceneId: "singleton-cinematic",
    // One continuous flow (acts are internal scene organization only). Captions
    // are the subtitles and the script for future audio. Full script in
    // docs/scripts/singleton.md.
    shots: [
      { id: "shot-1", act: "problem", caption: "En la escuela, cada decisión necesita al director.", durationMs: 3500 },
      { id: "shot-2", act: "problem", caption: "Alguien entra por una puerta… y aparece un director.", durationMs: 4000 },
      { id: "shot-3", act: "problem", caption: "Otro entra por otra puerta… y aparece OTRO director, con otra respuesta.", durationMs: 4200 },
      { id: "shot-4", act: "problem", caption: "Tantas puertas, tantos directores. Nadie sabe a quién creerle.", durationMs: 4000 },
      { id: "shot-5", act: "solution", caption: "¿Y si hubiera una sola puerta… y un solo director?", durationMs: 3500 },
      { id: "shot-6", act: "solution", caption: "La primera vez que alguien llama, recién ahí se crea el director. No antes.", durationMs: 4500 },
      { id: "shot-7", act: "solution", caption: "La próxima vez, el director ya existe. Siempre es el mismo.", durationMs: 4000 },
      { id: "shot-8", act: "solution", caption: "Y cuando alguien necesita una decisión, responde siempre la misma persona — con el mismo criterio, sea quien sea quien pregunte.", durationMs: 5000 },
      { id: "shot-9", act: "concept", caption: "La puerta es el punto de acceso único. Nadie crea directores por su cuenta: el constructor es privado. Siempre hay una única instancia.", durationMs: 6000 },
    ],
  },
  code: {
    language: "typescript",
    source,
    tour: [
      {
        id: "c1",
        title: "El lugar para la única instancia",
        highlightLines: [1, 2],
        explanation:
          "La clase reserva un único lugar para guardar al director — nunca más de uno.",
      },
      {
        id: "c2",
        title: "Constructor privado",
        highlightLines: [4],
        explanation:
          "Nadie de afuera puede crear un director por su cuenta: la única entrada es por la puerta de getInstance().",
      },
      {
        id: "c3",
        title: "Punto de acceso único",
        highlightLines: [6, 7, 8, 9, 10],
        explanation:
          "La primera vez que alguien pide al director, se crea. Las siguientes veces, se devuelve siempre el mismo.",
      },
      {
        id: "c4",
        title: "Siempre el mismo director",
        highlightLines: [13, 14, 15],
        explanation:
          "Cualquier consulta la resuelve el mismo director — sin contradicciones entre puertas.",
      },
    ],
  },
};
