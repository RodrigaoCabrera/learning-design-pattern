import type { Pattern } from "../types";

// Strategy: a navigation app that must plot a route from A to B. A rigid planner
// with every transport mode hardwired in one giant if/else is impossible to
// extend without surgery. Pulling the route calculation out into swappable
// strategies lets the app delegate — and lets you change the mode at runtime
// (and add new ones) without touching the app itself.
const source = `interface RouteStrategy {
  calcular(origen: string, destino: string): string;
}

class EnAuto implements RouteStrategy {
  calcular(origen: string, destino: string): string {
    return \`\${origen} → \${destino} en auto: por la autopista, 20 min\`;
  }
}

class EnBici implements RouteStrategy {
  calcular(origen: string, destino: string): string {
    return \`\${origen} → \${destino} en bici: por la ciclovía, 35 min\`;
  }
}

class Navegador {
  constructor(private estrategia: RouteStrategy) {}

  cambiarEstrategia(estrategia: RouteStrategy): void {
    this.estrategia = estrategia;
  }

  trazar(origen: string, destino: string): string {
    return this.estrategia.calcular(origen, destino);
  }
}`;

export const strategyLesson: Pattern = {
  slug: "strategy",
  name: "Strategy",
  category: "behavioral",
  difficulty: 2,
  tagline: "Elegí el algoritmo en tiempo de ejecución.",
  available: true,
  analogy: {
    sceneId: "strategy-cinematic",
    // One continuous flow (acts are internal scene organization only). Captions
    // are the subtitles and the script for future audio. Full script in
    // docs/scripts/strategy.md.
    shots: [
      { id: "shot-1", act: "problem", caption: "Querés ir de un lugar a otro. La pregunta es: ¿cómo llegás?", durationMs: 3800 },
      { id: "shot-2", act: "problem", caption: "Imaginá una sola persona que intenta encargarse de TODAS las formas de viajar a la vez… y se satura.", durationMs: 5000 },
      { id: "shot-3", act: "problem", caption: "Y cada vez que aparece una forma nueva de viajar, hay que rehacerla a ella entera. Un lío.", durationMs: 4800 },
      { id: "shot-4", act: "solution", caption: "¿Y si tuvieras un especialista distinto para cada forma de viajar?", durationMs: 4200 },
      { id: "shot-5", act: "solution", caption: "Elegís al de auto, y te arma la ruta en auto.", durationMs: 4000 },
      { id: "shot-6", act: "solution", caption: "Cambiás al de bici, y te arma otra ruta — para el mismo viaje.", durationMs: 4000 },
      { id: "shot-7", act: "solution", caption: "O al que va a pie, y otra distinta. Vos no cambiaste: cambiaste de especialista.", durationMs: 4500 },
      { id: "shot-8", act: "solution", caption: "¿Aparece una forma nueva de viajar? Sumás un especialista más, sin tocar a los demás.", durationMs: 4800 },
      { id: "shot-9", act: "concept", caption: "El viajero solo pide llegar. Cada especialista sabe una forma de hacerlo. Y podés cambiar de uno a otro cuando quieras: eso es una estrategia.", durationMs: 6500 },
    ],
  },
  code: {
    language: "typescript",
    source,
    tour: [
      {
        id: "c1",
        title: "El slot intercambiable",
        highlightLines: [1, 2, 3],
        explanation:
          "La interfaz define el slot: toda estrategia sabe calcular una ruta. La app pedirá esto sin importar el modo.",
      },
      {
        id: "c2",
        title: "Las estrategias concretas",
        highlightLines: [5, 6, 7, 8, 9, 11, 12, 13, 14, 15],
        explanation:
          "Cada modo es un cartucho con su propio algoritmo: auto va por la autopista, bici por la ciclovía. Agregar 'a pie' o 'transporte público' es sumar otra clase, sin tocar las demás.",
      },
      {
        id: "c3",
        title: "El contexto cambia de estrategia",
        highlightLines: [17, 18, 20, 21, 22],
        explanation:
          "El navegador guarda la estrategia enchufada y puede cambiarla en marcha con cambiarEstrategia() — el swap en runtime de la analogía.",
      },
      {
        id: "c4",
        title: "Delegar, no decidir",
        highlightLines: [24, 25, 26],
        explanation:
          "trazar() no sabe calcular rutas: delega en la estrategia activa. Misma llamada, distinto resultado según el cartucho enchufado.",
      },
    ],
  },
};
