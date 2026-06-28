import type { Pattern } from "../types";

// Adapter: a travel power plug. Your charger's plug has one shape; the wall
// socket in this country has another. They don't fit, and you can change neither
// the charger nor the wall. A travel adapter sits in between: one side matches
// the wall, the other accepts your charger, and it translates between the two so
// the power flows. The charger and the wall stay exactly as they are.
const source = `interface EnchufePlano {
  conectarPlano(): string;
}

class TomaRedonda {
  darCorrienteRedonda(): string {
    return "⚡ corriente (toma redonda)";
  }
}

class Adaptador implements EnchufePlano {
  constructor(private toma: TomaRedonda) {}

  conectarPlano(): string {
    return this.toma.darCorrienteRedonda();
  }
}`;

export const adapterLesson: Pattern = {
  slug: "adapter",
  name: "Adapter",
  category: "structural",
  difficulty: 1,
  tagline: "Conectá interfaces incompatibles.",
  available: true,
  analogy: {
    sceneId: "adapter-cinematic",
    // One continuous flow (acts are internal scene organization only). Captions
    // are the subtitles and the script for future audio. Full script in
    // docs/scripts/adapter.md.
    shots: [
      { id: "shot-1", act: "problem", caption: "Viajaste a otro país y tu teléfono está sin batería. Querés cargarlo.", durationMs: 4200 },
      { id: "shot-2", act: "problem", caption: "Pero el plug de tu cargador tiene una forma… y el tomacorriente de la pared, otra distinta.", durationMs: 4800 },
      { id: "shot-3", act: "problem", caption: "No encajan. Y no vas a cortar tu cargador ni la pared. Quedás trabado.", durationMs: 4500 },
      { id: "shot-4", act: "solution", caption: "¿Y si pusieras una pieza en el medio? Un adaptador de viaje.", durationMs: 4200 },
      { id: "shot-5", act: "solution", caption: "De un lado, encaja perfecto en el tomacorriente de la pared.", durationMs: 4200 },
      { id: "shot-6", act: "solution", caption: "Del otro, acepta el plug de tu cargador tal como es.", durationMs: 4200 },
      { id: "shot-7", act: "solution", caption: "Y la corriente fluye: tu teléfono carga. Ni el cargador ni la pared cambiaron.", durationMs: 4800 },
      { id: "shot-8", act: "solution", caption: "Otro aparato con el mismo plug también funciona: el adaptador es el traductor entre las dos formas.", durationMs: 5000 },
      { id: "shot-9", act: "concept", caption: "Tu cargador espera una forma. La pared tiene otra. El adaptador traduce entre las dos, sin cambiar a ninguna.", durationMs: 6000 },
    ],
  },
  code: {
    language: "typescript",
    source,
    tour: [
      {
        id: "c1",
        title: "La forma que tu cargador espera",
        highlightLines: [1, 2, 3],
        explanation:
          "Tu cargador solo sabe enchufarse de una forma: un plug plano. Esto es lo que el cliente espera encontrar.",
      },
      {
        id: "c2",
        title: "La toma que hay en la pared",
        highlightLines: [5, 6, 7, 8, 9],
        explanation:
          "La pared ofrece corriente, pero de otra forma y con otro nombre (toma redonda). No la podés cambiar: es la que hay.",
      },
      {
        id: "c3",
        title: "El adaptador en el medio",
        highlightLines: [11, 12],
        explanation:
          "El adaptador se presenta como lo que tu cargador espera (un plug plano), y por dentro guarda la toma redonda real.",
      },
      {
        id: "c4",
        title: "La traducción",
        highlightLines: [14, 15, 16],
        explanation:
          "Cuando tu cargador se conecta, el adaptador traduce: por dentro le pide corriente a la toma redonda. Tu cargador ni se entera de la diferencia.",
      },
    ],
  },
};
