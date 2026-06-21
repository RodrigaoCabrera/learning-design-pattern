# Tasks: PatternLab MVP (Observer)

Tareas ordenadas por dependencia. Cada una con criterio de aceptación y verificación.
Ref: [SPEC.md](./SPEC.md).

## Fase A — Fundación

- [ ] **A1: Scaffold Next.js + Tailwind + GSAP + Vitest**
  - Acceptance: proyecto Next.js (App Router, TS estricto) levanta; Tailwind aplica
    estilos; GSAP instalado; Vitest+RTL corren un test trivial verde.
  - Verify: `npm run dev` sirve la home; `npm test` pasa; `npm run lint` limpio.
  - Files: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `app/layout.tsx`,
    `app/page.tsx`, `vitest.config.ts`, `app/globals.css`.

- [ ] **A2: Estructura de carpetas + estilo base**
  - Acceptance: existen `components/{player,scenes,ui}`, `lib/{lessons}`; paleta y
    tipografía base definidas en Tailwind; layout español (`lang="es"`).
  - Verify: build OK; carpetas presentes.
  - Files: `tailwind.config.ts`, `app/layout.tsx`, dirs.

## Fase B — Modelo de datos (el contrato)

- [ ] **B1: Tipos del modelo de lección**
  - Acceptance: `lib/types.ts` define `Pattern`, `Phase`, `Step`, `CodePhase`,
    `CodeStep` según SPEC; compila en modo estricto.
  - Verify: `tsc --noEmit` sin errores.
  - Files: `lib/types.ts`.

- [ ] **B2: Validador de lección bien formada**
  - Acceptance: `validateLesson(pattern)` verifica que cada `Step.sceneState` y cada
    `CodeStep.highlightLines`/`analogyAnchor` sean coherentes; devuelve errores claros.
  - Verify: tests unitarios cubren caso válido + 3 inválidos; pasan.
  - Files: `lib/validateLesson.ts`, `tests/validateLesson.test.ts`.

## Fase C — Motor del player (independiente del contenido)

- [ ] **C1: Hook de máquina de pasos**
  - Acceptance: `useLessonPlayer(steps)` expone `current`, `index`, `next`, `prev`,
    `play`, `pause`, `isPlaying`; auto-play avanza por `durationMs` y se detiene al final.
  - Verify: tests de integración del hook (avance manual, auto-play, límites); pasan.
  - Files: `components/player/useLessonPlayer.ts`, `tests/useLessonPlayer.test.tsx`.

- [ ] **C2: UI del player (controles + narración + progreso)**
  - Acceptance: `LessonPlayer` renderiza panel de narración del paso activo, controles
    (play/pausa, anterior/siguiente) y barra de progreso; funciona con lección mock.
  - Verify: test RTL: click "siguiente" cambia narración; barra refleja progreso.
  - Files: `components/player/LessonPlayer.tsx`, `components/player/Controls.tsx`,
    `components/player/ProgressBar.tsx`, `components/player/NarrationPanel.tsx`.

## Fase D — Escena Observer

- [ ] **D1: Escena SVG `whatsapp-group` (flat) con ids**
  - Acceptance: componente SVG con elementos identificables por `id` (admin, members,
    message, bubbles); estilo flat minimalista; acepta prop del `sceneState` activo.
  - Verify: render visual en `npm run dev`; cada `id` presente en el DOM.
  - Files: `components/scenes/ObserverScene.tsx`.

- [ ] **D2: Timeline GSAP sincronizado a los pasos**
  - Acceptance: timeline con `labels` que matchean los `sceneState`; al cambiar el paso
    activo, la escena anima hasta ese label; cleanup correcto (sin leaks).
  - Verify: avanzar pasos mueve la animación; sin warnings de GSAP en consola.
  - Files: `components/scenes/ObserverScene.tsx`, `components/scenes/useSceneTimeline.ts`.

## Fase E — Fase Código + puente

- [ ] **E1: Bloque de código con resaltado por paso**
  - Acceptance: `CodeBlock` muestra `source` y resalta `highlightLines` del `CodeStep`
    activo; legible y con números de línea.
  - Verify: test RTL: cambiar de code-step cambia las líneas resaltadas.
  - Files: `components/player/CodeBlock.tsx`.

- [ ] **E2: Puente analogía↔código**
  - Acceptance: cuando el `CodeStep` activo tiene `analogyAnchor`, el elemento SVG con
    ese `id` se ilumina/resalta; al cambiar de paso, se limpia.
  - Verify: test de integración: activar code-step con anchor agrega el highlight al
    elemento SVG correcto. (Success criteria central del MVP).
  - Files: `components/player/AnalogyBridge.ts` (o lógica en LessonPlayer), tests.

## Fase F — Contenido + páginas

- [ ] **F1: Lección Observer (datos)**
  - Acceptance: `lib/lessons/observer.ts` define la lección completa (analogía + código)
    y pasa `validateLesson`.
  - Verify: test: `validateLesson(observerLesson)` sin errores.
  - Files: `lib/lessons/observer.ts`, `lib/lessons/index.ts`.

- [ ] **F2: Home (catálogo) + página de lección**
  - Acceptance: home lista 6 patrones (5 "próximamente"); `/patterns/observer` arma la
    lección desde datos y reproduce ambas fases.
  - Verify: navegar home → Observer reproduce analogía y código end-to-end.
  - Files: `app/page.tsx`, `app/patterns/[slug]/page.tsx`, `components/ui/PatternCard.tsx`.

## Fase G — Calidad

- [ ] **G1: Cobertura y verificación final**
  - Acceptance: tests del modelo y player ≥80% cobertura en `lib/`; lint limpio; build OK.
  - Verify: `npm test -- --coverage`, `npm run lint`, `npm run build`.
  - Files: tests varios.

## Definición de Done del MVP
Todos los Success Criteria de SPEC.md tildados; navegación home→Observer fluida;
el puente analogía↔código visible en ≥2 pasos de la fase código.
