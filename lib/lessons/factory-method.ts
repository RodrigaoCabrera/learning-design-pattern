import type { Pattern } from "../types";

// Factory Method: a delivery company whose shipping process is identical
// everywhere (receive → pack → deliver). The only thing that changes is the
// vehicle — and each branch decides its own: the city branch creates a moped,
// the regional branch a truck, the overseas branch a ship. The shared process
// never picks the vehicle; it just calls a "create your vehicle" step that each
// branch fills in. Adding a new branch is defining that one step, not rebuilding
// the line.
const source = `interface Vehiculo {
  entregar(): string;
}

class Moto implements Vehiculo {
  entregar(): string {
    return "entrega en moto";
  }
}

class Camion implements Vehiculo {
  entregar(): string {
    return "entrega en camión";
  }
}

abstract class Sucursal {
  abstract crearVehiculo(): Vehiculo;

  despachar(): string {
    const vehiculo = this.crearVehiculo();
    return \`Pedido listo → \${vehiculo.entregar()}\`;
  }
}

class SucursalCiudad extends Sucursal {
  crearVehiculo(): Vehiculo {
    return new Moto();
  }
}

class SucursalRegional extends Sucursal {
  crearVehiculo(): Vehiculo {
    return new Camion();
  }
}`;

export const factoryMethodLesson: Pattern = {
  slug: "factory-method",
  name: "Factory Method",
  category: "creational",
  difficulty: 2,
  tagline: "La subclase decide qué crear.",
  available: true,
  analogy: {
    sceneId: "factory-method-cinematic",
    // One continuous flow (acts are internal scene organization only). Captions
    // are the subtitles and the script for future audio. Full script in
    // docs/scripts/factory-method.md.
    shots: [
      { id: "shot-1", act: "problem", caption: "Una empresa de envíos: el proceso es siempre el mismo — recibir, empacar, entregar.", durationMs: 4200 },
      { id: "shot-2", act: "problem", caption: "Pero el vehículo está clavado: la línea solo sabe hacer entregas en moto.", durationMs: 4500 },
      { id: "shot-3", act: "problem", caption: "Llega un pedido lejano que necesita un camión… y hay que rehacer toda la línea. Se traba.", durationMs: 4800 },
      { id: "shot-4", act: "solution", caption: "¿Y si la línea fuera la misma, y solo el paso de 'crear el vehículo' lo decidiera cada sucursal?", durationMs: 5000 },
      { id: "shot-5", act: "solution", caption: "La sucursal de ciudad crea una moto, y el pedido sale en moto.", durationMs: 4200 },
      { id: "shot-6", act: "solution", caption: "La sucursal regional, con la misma línea, crea un camión.", durationMs: 4200 },
      { id: "shot-7", act: "solution", caption: "La de ultramar, un barco. Recibir, empacar y entregar no cambian: solo cambia lo que se crea.", durationMs: 5000 },
      { id: "shot-8", act: "solution", caption: "¿Una sucursal nueva? Define su propio paso de creación, sin tocar la línea de las demás.", durationMs: 4800 },
      { id: "shot-9", act: "concept", caption: "El proceso es compartido. El paso de crear lo decide cada sucursal. Cada una crea lo suyo.", durationMs: 6000 },
    ],
  },
  code: {
    language: "typescript",
    source,
    tour: [
      {
        id: "c1",
        title: "Lo que la línea necesita",
        highlightLines: [1, 2, 3],
        explanation:
          "A la línea solo le importa que el vehículo sepa entregar. Moto, camión o barco: todos cumplen lo mismo, así que el proceso los usa igual.",
      },
      {
        id: "c2",
        title: "El proceso compartido",
        highlightLines: [20, 21, 22, 23],
        explanation:
          "despachar() es la línea común a todas las sucursales. Pide crear el vehículo y lo usa, sin saber cuál será — esa parte no la decide acá.",
      },
      {
        id: "c3",
        title: "El paso que cada sucursal decide",
        highlightLines: [17, 18],
        explanation:
          "crearVehiculo() es el hueco: la sucursal base no lo resuelve, lo deja para que cada sucursal concreta lo rellene. Ese es el factory method.",
      },
      {
        id: "c4",
        title: "Cada sucursal crea lo suyo",
        highlightLines: [26, 27, 28, 29, 30, 32, 33, 34, 35, 36],
        explanation:
          "La sucursal de ciudad decide crear una Moto; la regional, un Camión. Mismo proceso heredado, distinto producto creado — y sumar una sucursal nueva no toca a las demás.",
      },
    ],
  },
};
