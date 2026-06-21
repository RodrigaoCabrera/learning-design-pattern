import type { Pattern } from "../types";

// Observer: a teacher (Subject) has to tell 30 parents about homework. A
// WhatsApp group (the subscriber list) lets them join/leave freely and all get
// notified at once, without the teacher tracking anyone individually.
const source = `interface Observer {
  update(message: string): void;
}

class Group {
  private members: Observer[] = [];

  subscribe(member: Observer) {
    this.members.push(member);
  }

  publish(message: string) {
    for (const m of this.members) {
      m.update(message);
    }
  }
}`;

export const observerLesson: Pattern = {
  slug: "observer",
  name: "Observer",
  category: "behavioral",
  difficulty: 2,
  tagline: "Un cambio, muchos notificados.",
  available: true,
  analogy: {
    sceneId: "observer-cinematic",
    // One continuous flow (acts are internal scene organization only). Captions
    // are the subtitles and the script for future audio. Full script in
    // docs/scripts/observer.md.
    shots: [
      { id: "shot-1", act: "problem", caption: "Sos un profesor. Tenés que avisarles a 30 padres que hay tarea.", durationMs: 4000 },
      { id: "shot-2", act: "problem", caption: "Sin un sistema, llamás a cada padre, uno por uno.", durationMs: 4000 },
      { id: "shot-3", act: "problem", caption: "Marcar, esperar, avisar, colgar… 30 veces. Lento y agotador.", durationMs: 5500 },
      { id: "shot-4", act: "problem", caption: "Y si entra o sale un padre, vos tenés que mantener la lista a mano.", durationMs: 4500 },
      { id: "shot-5", act: "problem", caption: "Todo el trabajo recae en vos, el que avisa.", durationMs: 3500 },
      { id: "shot-6", act: "solution", caption: "Con un grupo de WhatsApp, todo cambia.", durationMs: 3500 },
      { id: "shot-7", act: "solution", caption: "Escribís el mensaje una sola vez. Los 30 lo reciben al mismo tiempo.", durationMs: 4500 },
      { id: "shot-8", act: "solution", caption: "No te importa quién lo leyó ni cuántos hay. Solo mandás el mensaje.", durationMs: 4500 },
      { id: "shot-9", act: "solution", caption: "Si uno se va, deja de recibir. Si uno entra, recibe todo. Vos no hacés nada extra.", durationMs: 5000 },
      { id: "shot-10", act: "solution", caption: "¿Necesitás una nueva reacción —un log, una alerta—? Sumás un escuchador más, sin tocar al profesor ni a los demás.", durationMs: 5500 },
      { id: "shot-11", act: "concept", caption: "El que avisa es el Sujeto. Los que escuchan son los Observadores. Entran y salen sin que el Sujeto lo note: están desacoplados.", durationMs: 6000 },
    ],
  },
  code: {
    language: "typescript",
    source,
    tour: [
      {
        id: "c1",
        title: "El contrato del Observador",
        highlightLines: [1, 2, 3],
        explanation:
          "Cada miembro del grupo sabe cómo recibir un aviso: eso es la interfaz Observer.",
      },
      {
        id: "c2",
        title: "El Sujeto",
        highlightLines: [5, 6],
        explanation:
          "El grupo (el Sujeto) mantiene la lista de miembros suscriptos — la lista de WhatsApp.",
      },
      {
        id: "c3",
        title: "Suscripción",
        highlightLines: [8, 9, 10],
        explanation:
          "Cuando alguien se une al grupo, queda suscripto a las novedades — sin que el profesor haga nada extra.",
      },
      {
        id: "c4",
        title: "Publicar",
        highlightLines: [12],
        explanation: "Publicar un mensaje desencadena la notificación a todos.",
      },
      {
        id: "c5",
        title: "Notificación desacoplada",
        highlightLines: [13, 14, 15],
        explanation:
          "El grupo recorre a todos y notifica a cada miembro, uno por uno, sin que el Sujeto conozca los detalles de cada Observador.",
      },
    ],
  },
};
