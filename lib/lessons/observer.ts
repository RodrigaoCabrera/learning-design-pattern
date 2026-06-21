import type { Pattern } from "../types";

// Observer: a WhatsApp group. The admin (Subject) publishes a message and every
// subscribed member (Observer) is notified automatically.
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
    sceneId: "whatsapp-group",
    steps: [
      {
        id: "a1",
        narration: "Tenemos un grupo de WhatsApp con un administrador.",
        sceneState: "idle",
        durationMs: 4000,
      },
      {
        id: "a2",
        narration:
          "Algunas personas se unen al grupo: quedan pendientes de los avisos.",
        sceneState: "subscribe",
        durationMs: 4000,
      },
      {
        id: "a3",
        narration: "El admin escribe un mensaje importante.",
        sceneState: "publish",
        durationMs: 4000,
      },
      {
        id: "a4",
        narration: "El mensaje llega automáticamente a todos los miembros.",
        sceneState: "notify",
        durationMs: 4000,
      },
      {
        id: "a5",
        narration:
          "Cada miembro lo recibe y reacciona, sin que el admin avise uno por uno.",
        sceneState: "reacted",
        durationMs: 4500,
      },
    ],
  },
  code: {
    language: "typescript",
    source,
    steps: [
      {
        id: "c1",
        narration:
          "Cada miembro sabe cómo recibir un aviso: eso es la interfaz Observer.",
        highlightLines: [1, 2, 3],
        analogyAnchor: "members",
      },
      {
        id: "c2",
        narration:
          "El grupo (el Subject) mantiene la lista de miembros suscriptos.",
        highlightLines: [5, 6],
        analogyAnchor: "admin",
      },
      {
        id: "c3",
        narration:
          "Cuando alguien se une, queda suscripto a las novedades del grupo.",
        highlightLines: [8, 9, 10],
        analogyAnchor: "subscription",
      },
      {
        id: "c4",
        narration: "Publicar un mensaje desencadena la notificación.",
        highlightLines: [12],
        analogyAnchor: "message",
      },
      {
        id: "c5",
        narration:
          "El grupo recorre a todos y notifica a cada miembro, uno por uno.",
        highlightLines: [13, 14, 15],
        analogyAnchor: "members",
      },
    ],
  },
};
