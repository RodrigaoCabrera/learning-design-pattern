# Hand-off — PatternLab

> Última actualización: 2026-06-21. Documento para retomar en una nueva sesión.

## Qué es

Web app didáctica para aprender patrones de diseño en **dos pasos**: (1) una
**analogía animada** (cinematográfica, dirigida) y (2) un **recorrido de código**
con explicación mapeada a la analogía. Empezar siempre por **el problema** que el
patrón resuelve.

Specs: [SPEC.md](./SPEC.md) (MVP v1) y [SPEC-v2-cinematic.md](./SPEC-v2-cinematic.md)
(rediseño cinematográfico). Guión: [scripts/observer.md](./scripts/observer.md).

## Stack

Next.js 15 (App Router) + TypeScript estricto + GSAP (`@gsap/react` useGSAP) +
Tailwind + Vitest/RTL. Sin backend (contenido como datos tipados).

Comandos: `npm run dev` · `npm run build` · `npm test` · `npm run lint`.
⚠️ No mezclar `build` y `dev` sobre el mismo `.next`; si se corrompe: parar dev,
`Remove-Item -Recurse -Force .next`, `npm run dev`. Evitar dejar `node` huérfanos.

## Estado actual

### Hecho y en vivo (MVP v1)
- Motor agnóstico del contenido: `components/player/useLessonPlayer.ts`,
  `PhasePlayer.tsx`, `Controls.tsx`, `ProgressBar.tsx`, `NarrationPanel.tsx`,
  `CodeBlock.tsx`.
- Modelo de datos v1 (`lib/types.ts`: `Step`/`CodeStep`) + validador
  (`lib/validateLesson.ts`) contra manifiesto de escena (`lib/sceneManifest.ts`,
  `lib/scenes.ts`).
- Lección Observer v1 (`lib/lessons/observer.ts`), catálogo (`lib/catalog.ts`),
  páginas `app/page.tsx` y `app/patterns/[slug]/page.tsx` (SSG).
- 25 tests verdes, cobertura ~96% global. Commit inicial: `d709284`.

### En progreso — rediseño cinematográfico (en página de PREVIEW, NO migrado a la lección en vivo)
- **`app/preview/observer/page.tsx`** → renderiza `ObserverPreview`.
- **`components/scenes/observer/ObserverScene.tsx`** — UNA escena continua con dos
  "sets" internos en capas `#act1` (problema) y `#act2` (solución), un timeline
  maestro de **10 planos** (shot-1…shot-10) con **cross-fade** en la transición
  (shot-5 → shot-6). Cámaras `#cam1`/`#cam2`. Profesor con 5 expresiones faciales.
- **`components/scenes/observer/ObserverPreview.tsx`** — reproductor único con los
  10 planos (subtítulos + controles + dots). Captions = subtítulo y guión de audio.
- **`components/scenes/observer/useDirectorTimeline.ts`** — hook: timeline pausado
  cuyos labels marcan el FIN de cada plano; `tweenTo(label)` reproduce a ritmo
  autorado (cine). Reversa funciona.
- **`components/player/SubtitleBar.tsx`** — subtítulo en banda dedicada DEBAJO de la
  escena (zona segura, no overlay).
- El modelo v2 (`Shot`/`Act`) ya existe en `lib/types.ts` (aditivo) pero los shots
  de la preview están definidos **inline** en `ObserverPreview.tsx`, todavía no en
  `lib/lessons/`.

### Decisiones tomadas
- Animación: **GSAP elevado** (no Rive/Lottie/3D por ahora; requieren autoría externa).
- Avance: manual + auto-play. Estilo visual: flat minimalista. Idioma UI/narración: ES.
- Código (fase 2): recorrido guiado por **clicks**, separado de la animación, con
  mapeo textual a la analogía (reemplaza el "puente que ilumina el SVG" del v1).
- Construcción **acto por acto** para mantener calidad; los actos son solo
  organización de código — el usuario ve **un flujo continuo**.

## Mejoras del piloto (feedback del usuario) — HECHO 2026-06-21

### A. Bugs visuales de la escena — resuelto
1. Burbuja "¡Hay tarea!" (shot-7): acercada al profesor (`translate(95 165)`),
   ensanchada a 200px, `fontSize` 17.
2. Badge "1 mensaje → 30 recibidos" (shot-7): rect ensanchado a 300px, `fontSize` 18.
3. Shot-4 (paneo de cámara): fondo (`wall`/floor) y overlays `#tense`/`#vignette`
   extendidos a `x=-220 width=1400` para que el paneo `x:120` no revele un borde
   vacío sin oscurecer.

### B. Auto-play — resuelto
- `useLessonPlayer.ts`: nuevo `autoPlay()` que siempre reinicia desde el índice 0.
- El botón ya **no se deshabilita al llegar al final**; solo se deshabilita
  mientras está corriendo (muestra "❚❚ Reproduciendo…").
- **Bug encontrado y corregido al verificar:** al hacer auto-play desde el final,
  `tl.tweenTo()` animaba en reversa por TODA la línea de tiempo (se veía como un
  rebobinado largo). Fix: se distingue salto manual (Anterior/Siguiente/dots/
  restart de auto-play) de tick automático vía `lastAction`/`instant` en
  `useLessonPlayer.ts` → `useDirectorTimeline.ts` usa `tl.seek()` (instantáneo) para
  saltos manuales y `tl.tweenTo()` (cinematográfico) solo para los ticks del
  auto-play en curso. Esto también resolvió que Siguiente/Anterior rápido se
  sintiera lento (esperaba la animación completa de cada paso).

### C. Navegación / stepper — resuelto
- Dots movidos a overlay arriba de la escena, estilo Instagram stories
  (`ProgressBar.tsx` con `variant="overlay"`, barras finas blancas/translúcidas).
- Zonas táctiles izquierda/derecha en mobile (`sm:hidden`) en `ObserverPreview.tsx`.

## Acto 3 — Plano 11 (nombrar las partes) — HECHO 2026-06-21
Implementado en `ObserverScene.tsx` (grupo `#act3-labels`, dentro de `#cam2`,
después de `#dim`) + label `shot-11` en el timeline maestro:
- Se desvanecen `#msg-bubble` y `#badge` (limpieza visual) y se atenúa `#dim`.
- 3 rótulos con línea líder punteada: **Emisor (Sujeto)** → profesor,
  **Observadores** → grilla de miembros, **Lista de suscripción** → header del
  panel.
- Cierre con keyword **"Desacoplamiento"** (banner dorado, reusa la posición que
  dejó libre el badge).
- Caption + entrada `shot-11` agregados en `ObserverPreview.tsx` (`SHOTS`, ahora 11
  planos). Verificado visualmente con Playwright.

## Qué falta (roadmap)
1. **Migrar el modelo v2**: pasar `Pattern.analogy` de `steps` a `shots`, mover los
   shots inline de `ObserverPreview.tsx` a `lib/lessons/observer.ts`, actualizar
   `lib/types.ts` (reemplazar v1), `validateLesson` y el manifiesto a `shots`.
   Actualizar tests.
2. **Recorrido de código (CodeTour)**: nuevo componente fase 2 (código sticky +
   tarjeta de explicación que avanza por fragmento). Ver SPEC-v2 §Model Changes.
3. **Cablear la lección en vivo** (`LessonView` / `app/patterns/[slug]`) a la escena
   cinematográfica + CodeTour, y retirar la preview.
4. Repetir el molde para los otros 5 patrones (Singleton, Strategy, Decorator,
   Factory Method, Adapter).

## Notas técnicas clave
- **Gotcha GSAP+SVG:** nunca setear la posición base con `transform="translate()"`
  en un elemento que además animás con `x`/`y` (GSAP pisa el translate y el
  elemento "vuela"). Usar un grupo contenedor para la base y animar `scale`/`opacity`
  o `x/y` desde 0 en el grupo interno. Ver `gsap-svg-translate-gotcha` en memoria.
- Respiración idle del profesor: tween infinito separado del timeline maestro
  (`#prof-breath`), para que el seek no lo rompa.
- Convención: en elementos posicionados, animar solo `scale`/`opacity` cuando se
  pueda, para esquivar el gotcha.

## Cómo verificar
```powershell
cd D:\inside-projects\learning-design-pattern
npm run dev   # http://localhost:3000/preview/observer  (piloto cinematográfico)
```
Lección v1 en vivo: `http://localhost:3000/patterns/observer`.
