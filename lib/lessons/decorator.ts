import type { Pattern } from "../types";

// Decorator: a coffee shop. Pre-baking every possible combo as its own fixed
// product makes the menu explode. Instead, start with a plain coffee and WRAP it
// with one add-on at a time — each wrapper adds its bit to the price and the
// description, the result is still "a coffee", and you can stack as many as you
// want. A new add-on is just one more wrapper, available to everything.
const source = `interface Cafe {
  costo(): number;
  descripcion(): string;
}

class CafeSimple implements Cafe {
  costo(): number {
    return 2;
  }
  descripcion(): string {
    return "café";
  }
}

abstract class Agregado implements Cafe {
  constructor(protected base: Cafe) {}
  abstract costo(): number;
  abstract descripcion(): string;
}

class ConLeche extends Agregado {
  costo(): number {
    return this.base.costo() + 1;
  }
  descripcion(): string {
    return \`\${this.base.descripcion()} + leche\`;
  }
}

class ConCaramelo extends Agregado {
  costo(): number {
    return this.base.costo() + 1.5;
  }
  descripcion(): string {
    return \`\${this.base.descripcion()} + caramelo\`;
  }
}`;

export const decoratorLesson: Pattern = {
  slug: "decorator",
  name: "Decorator",
  category: "structural",
  difficulty: 2,
  tagline: "Agregá funcionalidad envolviendo.",
  available: true,
  analogy: {
    sceneId: "decorator-cinematic",
    // One continuous flow (acts are internal scene organization only). Captions
    // are the subtitles and the script for future audio. Full script in
    // docs/scripts/decorator.md.
    shots: [
      { id: "shot-1", act: "problem", caption: "Querés un café. Pero no uno cualquiera: con tus agregados.", durationMs: 3800 },
      { id: "shot-2", act: "problem", caption: "La cafetería intenta tener cada combinación como un producto distinto… y el menú se dispara.", durationMs: 5000 },
      { id: "shot-3", act: "problem", caption: "Y con un solo agregado nuevo, hay que rehacer TODO el menú otra vez. Inmanejable.", durationMs: 4800 },
      { id: "shot-4", act: "solution", caption: "¿Y si empezaras simple? Solo un café.", durationMs: 3800 },
      { id: "shot-5", act: "solution", caption: "Lo envolvés con leche: suma su parte al precio y a la descripción.", durationMs: 4200 },
      { id: "shot-6", act: "solution", caption: "Lo volvés a envolver con caramelo. Otra capa, otro poco más.", durationMs: 4200 },
      { id: "shot-7", act: "solution", caption: "Y con crema. Apilás las que quieras — y sigue siendo un café que podés tomar.", durationMs: 4800 },
      { id: "shot-8", act: "solution", caption: "¿Un agregado nuevo? Es una envoltura más, lista para cualquier café. Sin rehacer el menú.", durationMs: 4800 },
      { id: "shot-9", act: "concept", caption: "Adentro hay un café base. Cada capa lo envuelve y le suma algo, sin cambiar lo de adentro. Envolver para sumar.", durationMs: 6500 },
    ],
  },
  code: {
    language: "typescript",
    source,
    tour: [
      {
        id: "c1",
        title: "La misma interfaz para todos",
        highlightLines: [1, 2, 3, 4],
        explanation:
          "Café simple o café con mil agregados: todos prometen lo mismo (un costo y una descripción). Por eso una capa puede envolver a otra sin que se note la diferencia.",
      },
      {
        id: "c2",
        title: "El café base",
        highlightLines: [6, 7, 8, 9, 10, 11, 12, 13],
        explanation:
          "El punto de partida: un café simple, lo que va adentro de todo. Es lo que las capas van a envolver.",
      },
      {
        id: "c3",
        title: "La envoltura",
        highlightLines: [15, 16, 17, 18, 19],
        explanation:
          "Una envoltura guarda el café que envuelve y promete la misma interfaz. No reemplaza lo de adentro: lo recubre.",
      },
      {
        id: "c4",
        title: "Una capa concreta suma su parte",
        highlightLines: [21, 22, 23, 24, 25, 26, 27, 28],
        explanation:
          "Con leche le pide al envuelto su costo y su descripción, y les suma lo suyo. Como cada capa hace lo mismo, se pueden apilar: leche envuelta en caramelo envuelta en crema.",
      },
    ],
  },
};
