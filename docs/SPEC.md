# Spec: PatternLab — Aprendizaje didáctico de patrones de diseño

## Objective

Web app educativa para aprender patrones de diseño de software de forma simple y
entretenida. La hipótesis pedagógica central: los conceptos abstractos se anclan
mejor en **dos pasadas**:

1. **Analogía** — una situación cotidiana animada (ej: un árbitro = Singleton).
2. **Código** — un fragmento simple que formaliza el mismo concepto.

El diferencial es el **puente analogía↔código**: cuando se resalta una línea de
código, se ilumina el elemento equivalente de la analogía. Eso convierte la app de
"linda" a "didácticamente potente".

### Usuario
Estudiantes de programación / desarrolladores junior que conocen lo básico de POO
pero encuentran los patrones abstractos y difíciles de retener.

### Qué es éxito
- El usuario completa una lección y puede explicar el patrón con la analogía.
- El flujo es fluido: animación guiada a "velocidad justa" + narración paso a paso.
- Agregar un patrón nuevo = agregar **datos + una escena SVG**, sin tocar el motor.

### Alcance
- **6 patrones objetivo:** Singleton, Observer, Strategy, Decorator, Factory Method, Adapter.
- **MVP:** 1 patrón completo de punta a punta (Observer) como molde validado.
- Los otros 5 se agregan después reutilizando la misma arquitectura.

### Analogías por patrón (borrador, a refinar en cada lección)
| Patrón | Analogía |
|---|---|
| Singleton | El árbitro: único que decide en el partido |
| Observer | Grupo de WhatsApp: todos pendientes de los mensajes del admin |
| Strategy | Elegir medio de transporte según contexto (auto/bici/subte) |
| Decorator | Café: base + extras (leche, crema, caramelo) que envuelven |
| Factory Method | Cocina de restaurante: pedís un plato, la cocina decide cómo prepararlo |
| Adapter | Adaptador de enchufe de viaje entre estándares de países |

## Tech Stack

- **Next.js** (App Router) + **TypeScript**
- **GSAP** (timeline para coreografía sincronizada a la narración)
- **Tailwind CSS** (estilos)
- Escenas en **SVG** (personajes/situaciones vectoriales)
- Sin backend al inicio: contenido como **datos estáticos tipados** en el repo.
- Narración: **textual** paso a paso. Audio/voz = mejora futura (fuera de MVP).

## Commands

```
Dev:    npm run dev
Build:  npm run build
Start:  npm run start
Lint:   npm run lint
Test:   npm test
```

## Project Structure

```
app/                        → Next.js App Router (rutas, layouts)
  page.tsx                  → Home: catálogo de patrones
  patterns/[slug]/page.tsx  → Página de lección por patrón
components/
  player/                   → Motor de reproducción (LessonPlayer, controles, progreso)
  scenes/                   → Escenas SVG por patrón (ObserverScene, ...)
  ui/                       → Componentes UI reutilizables
lib/
  lessons/                  → Datos de lecciones (tipados) — una por patrón
  types.ts                  → Tipos del modelo de lección
tests/                      → Tests unitarios e integración
docs/
  SPEC.md                   → Este documento
```

## Data Model (núcleo de la arquitectura)

```ts
// lib/types.ts
type Pattern = {
  slug: string;                 // "observer"
  name: string;                 // "Observer"
  category: "creational" | "structural" | "behavioral";
  difficulty: 1 | 2 | 3;
  tagline: string;              // frase gancho
  analogy: Phase;               // Fase 1
  code: CodePhase;              // Fase 2
};

type Phase = {
  sceneId: string;              // qué escena SVG renderizar
  steps: Step[];
};

type Step = {
  id: string;
  narration: string;            // texto paso a paso
  sceneState: string;           // label del timeline GSAP al que avanzar
  durationMs?: number;          // para modo lineal "velocidad justa"
};

type CodePhase = {
  language: "typescript";
  source: string;               // fragmento simple
  steps: CodeStep[];
};

type CodeStep = {
  id: string;
  narration: string;
  highlightLines: number[];     // líneas a resaltar
  analogyAnchor?: string;       // id del elemento SVG equivalente (el puente)
};
```

El motor `LessonPlayer` consume esta estructura. Agregar un patrón = nuevo archivo
en `lib/lessons/` + una escena en `components/scenes/`.

## UX Flow

1. **Home** → catálogo con las 6 tarjetas de patrones (las no-MVP marcadas "próximamente").
2. **Lección** → dos fases secuenciales:
   - **Fase Analogía:** escena SVG animada + narración paso a paso. Controles:
     play/pausa, anterior/siguiente paso, barra de progreso. Modo lineal a
     "velocidad justa" (avance automático por `durationMs`) o manual (usuario avanza).
   - **Fase Código:** fragmento resaltado paso a paso. Al resaltar líneas con
     `analogyAnchor`, se muestra/ilumina el elemento equivalente de la analogía.
3. **Cierre** → resumen del patrón + link al siguiente.

## Code Style

```ts
// Inmutable, funciones pequeñas, datos como configuración.
// Comentarios en inglés.
export const observerLesson: Pattern = {
  slug: "observer",
  name: "Observer",
  category: "behavioral",
  difficulty: 2,
  tagline: "One change, many notified.",
  analogy: {
    sceneId: "whatsapp-group",
    steps: [
      { id: "s1", narration: "Hay un grupo de WhatsApp.", sceneState: "idle" },
      // ...
    ],
  },
  code: { /* ... */ },
};
```

Convenciones: TypeScript estricto, componentes funcionales, sin mutación, archivos
chicos (200–400 líneas), nombres descriptivos, comentarios en inglés.

## Testing Strategy

- **Framework:** Vitest + React Testing Library.
- **Unit:** validación del modelo de lección (lecciones bien formadas: steps con
  `sceneState`/`highlightLines` válidos), utilidades del player.
- **Integration:** `LessonPlayer` avanza pasos, sincroniza narración, dispara el
  puente analogía↔código.
- **E2E (post-MVP):** flujo completo de una lección (Playwright).
- **Cobertura objetivo:** 80% en `lib/` y `components/player/`.

## Boundaries

- **Always:** TypeScript estricto; patrones inmutables; validar que cada lección
  esté bien formada; correr lint+test antes de commit; comentarios en inglés.
- **Ask first:** agregar dependencias nuevas; introducir backend/DB; cambiar el
  modelo de datos de lección; pasar a Three.js para alguna escena.
- **Never:** hardcodear contenido de lección dentro del motor; commitear secretos;
  romper el contrato de tipos del modelo.

## Success Criteria

- [ ] El proyecto Next.js levanta con `npm run dev` sin errores.
- [ ] La lección **Observer** se reproduce completa: analogía animada + código.
- [ ] El puente analogía↔código funciona en al menos 2 pasos de la fase código.
- [ ] El player soporta: play/pausa, avance manual por paso, barra de progreso.
- [ ] Agregar un 2.º patrón no requiere modificar `components/player/`.
- [ ] Tests del modelo y del player pasan con ≥80% de cobertura en `lib/`.

## Resolved Decisions

1. **Modo de avance:** Manual por defecto (usuario clickea "siguiente"), con botón
   "auto-play" opcional que reproduce a velocidad justa por `durationMs`.
2. **Estilo visual:** Flat minimalista (tipo unDraw/Humaaans): figuras planas,
   geométricas, paleta limitada. Rápido de producir y animar.
3. **Idioma:** UI y narración en **español**. Código y comentarios en inglés.
4. **Escenas SVG:** Dibujadas en código como componentes React, con `id` explícitos
   por elemento — necesarios para el puente analogía↔código (`analogyAnchor`).
```
