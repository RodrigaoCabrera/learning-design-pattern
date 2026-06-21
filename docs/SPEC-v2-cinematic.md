# Spec v2: Lecciones cinematográficas + recorrido de código

Extiende y **reemplaza partes** de [SPEC.md](./SPEC.md). Itera sobre el MVP para
subir la calidad de la analogía (animación dirigida, no "PowerPoint") y separar el
código en un recorrido guiado. Alcance de esta iteración: **solo Observer**, como
nuevo molde. Guión base: [scripts/observer.md](./scripts/observer.md).

## Objective

Dos cambios de experiencia:

1. **Analogía cinematográfica, problem-first.** La analogía deja de ser pasos con
   flechas y pasa a una **escena dirigida**: planos (shots) agrupados en 3 actos
   (problema → solución → concepto), con cámara, profundidad, personajes con vida
   y transiciones. Siempre arranca explicando **qué problema resuelve el patrón**.

2. **Código separado de la animación.** Un **recorrido guiado** (tipo onboarding
   tour): el código a un lado y, fragmento por fragmento, una explicación mapeada a
   la analogía (ej: `private members: Observer[] = []` → "el grupo de padres
   suscriptos, pendientes del próximo mensaje"). Sin escena SVG en esta fase.

Éxito = el usuario entiende el problema antes que la solución, y la escena se siente
como un video explicativo dirigido, no una secuencia de diapositivas.

## Tech Stack

Sin cambios de dependencias. **GSAP** elevado con "dirección de escena": cámara
(pan/zoom vía grupo transformable), profundidad/parallax, motion paths
(MotionPathPlugin, incluido en gsap), micro-animación de personajes, transiciones
entre planos. Rive/Lottie/3D quedan como opción futura (requieren autoría externa).

## Model Changes (breaking — solo afecta a Observer, único existente)

### Analogía: de `steps` a `shots`
```ts
type Act = "problem" | "solution" | "concept";

type Shot = {
  id: string;          // el "director" de la escena conoce este id
  act: Act;
  caption: string;     // narración del beat
  durationMs?: number; // para auto-play
};

type AnalogyPhase = {
  sceneId: string;
  shots: Shot[];
};
```

### Código: recorrido guiado
```ts
type CodeFragment = {
  id: string;
  title: string;            // p.ej. "La lista de suscriptos"
  highlightLines: number[];
  explanation: string;      // texto mapeado a la analogía
};

type CodePhase = {
  language: "typescript";
  source: string;
  tour: CodeFragment[];
};
```

### Escena = "director"
El componente de escena recibe el `shot.id` activo y reproduce su sub-timeline GSAP
(con estado de cámara y personajes). El manifiesto de escena declara los shots que
el director conoce; el validador valida contra eso:
```ts
type SceneManifest = { id: string; shots: string[] };
```
(Se elimina `anchors`: el puente que iluminaba el SVG se reemplaza por el mapeo
textual del recorrido de código).

## Project Structure (añadidos)
```
components/scenes/
  SceneDirector.tsx     → registro escena por sceneId (reemplaza index.tsx)
  ObserverScene.tsx     → escena dirigida (11 planos, cámara, personajes)
  shots/                → sub-componentes/timelines por plano si crece (<800 líneas)
components/player/
  CodeTour.tsx          → recorrido guiado de código (reusa PhasePlayer)
docs/scripts/observer.md → guión fuente
```
Se reutilizan: `useLessonPlayer`, `PhasePlayer`, `Controls`, `ProgressBar`,
`NarrationPanel`, `CodeBlock`.

## Code Style
Igual que SPEC.md (TS estricto, inmutable, archivos chicos, comentarios en inglés).
La escena puede crecer: si pasa ~600 líneas, extraer planos a `scenes/shots/`.

## Testing Strategy
- **Unit:** validador actualizado (shots válidos contra manifiesto, acts válidos,
  fragmentos con líneas en rango, ids únicos, textos no vacíos).
- **Integration:** `CodeTour` avanza fragmentos y resalta líneas correctas; la
  analogía recorre los 11 shots vía `PhasePlayer`.
- **Lo cinematográfico es visual** → su gate es **revisión manual** (no test
  automático). Por eso se ofrece validar primero un **plano piloto**.
- Cobertura ≥80% en `lib/` y `components/player/` (la escena queda fuera del umbral
  por ser visual).

## Boundaries
- **Always:** problem-first en toda analogía; reusar el motor existente; mantener
  el contrato de tipos; lint+test antes de commit.
- **Ask first:** sumar dependencias (incl. plugins/partículas); pasar a Rive/Lottie;
  superar ~800 líneas en un archivo de escena.
- **Never:** volver a acoplar código y animación; “PowerPoint” de flechas;
  hardcodear contenido en el motor.

## Success Criteria
- [ ] La analogía de Observer reproduce **11 planos en 3 actos**, empezando por el
      problema (Acto 1 = "problem").
- [ ] Cada plano muestra su `caption`; el player avanza/retrocede y tiene auto-play.
- [ ] La escena es **dirigida**: hay cámara (encuadre cambia entre planos),
      personajes con micro-animación y transiciones — no solo opacidad/posición.
      (Gate: revisión visual).
- [ ] El **recorrido de código** recorre los fragmentos: resalta las líneas del
      fragmento activo y muestra su explicación mapeada a la analogía. Sin escena.
- [ ] `validateLesson` pasa para el nuevo Observer (shots + tour).
- [ ] Tests verdes, lint limpio, build OK.

## Resolved Decisions
1. **Plano piloto primero:** se construye el Plano 3 (time-lapse de las 30 llamadas)
   a calidad final en una página de preview, para validar el nivel visual antes de
   animar los 11 planos y migrar el modelo de datos.
2. **Recorrido de código por clicks** (consistente con el player de la analogía).
