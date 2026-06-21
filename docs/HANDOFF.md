# Hand-off — PatternLab

> Última actualización: 2026-06-22. Documento para retomar en una nueva sesión.

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

## Mejoras pendientes de este piloto (feedback del usuario)

### A. Bugs visuales de la escena
1. **Burbuja "¡Hay tarea!" (shot-7):** está muy lejos del profesor y el texto se
   corta. Acercarla al profesor y ensanchar la burbuja / achicar el texto+emoji.
   (`ObserverScene.tsx`, `#msg-bubble` en `translate(220 200)`, rect width 150).
2. **Badge "1 mensaje → 30 recibidos" (shot-7):** el texto sobresale del contenedor.
   Ensanchar el rect del `#badge` o reducir el `fontSize`. (rect x=-110 w=220).
3. **Shot-4 (lista a mano):** queda un espacio vacío a la izquierda por el paneo de
   cámara `#cam1 {x:120}`. Reencuadrar para que no se vea el borde / vacío.

### B. Comportamiento del Auto-play (`components/player/`)
- El auto-play **no debe deshabilitarse al llegar al final**.
- Al clickearlo debe **empezar desde 0** (reset + play).
- **Excepción:** si ya está en ejecución, ahí sí el botón debe estar deshabilitado.
- Impacto: `useLessonPlayer.ts` (auto-play actualmente se detiene en `atEnd` y el
  botón se deshabilita con `atEnd && !isPlaying`) y `Controls.tsx`. Conviene separar
  el botón "Auto-play" del play/pause, o redefinir su lógica.

### C. Navegación / stepper
- Mover los **dots/steps a ARRIBA, estilo Instagram stories** (barras segmentadas).
- En **mobile**, agregar **zonas clickeables a izquierda/derecha** de la escena para
  retroceder/avanzar de plano.
- Impacto: `ProgressBar.tsx` (reposicionar/estilizar) + `ObserverPreview.tsx`
  (overlay de zonas táctiles). Usar Tailwind responsive.

## Qué falta (roadmap)
1. Aplicar las **mejoras del piloto** (A, B, C de arriba).
2. **Acto 3 — Plano 11** (nombrar las partes: Sujeto, Observadores, Desacoplamiento).
3. **Migrar el modelo v2**: pasar `Pattern.analogy` de `steps` a `shots`, mover los
   shots inline a `lib/lessons/observer.ts`, actualizar `lib/types.ts` (reemplazar
   v1), `validateLesson` y el manifiesto a `shots`. Actualizar tests.
4. **Recorrido de código (CodeTour)**: nuevo componente fase 2 (código sticky +
   tarjeta de explicación que avanza por fragmento). Ver SPEC-v2 §Model Changes.
5. **Cablear la lección en vivo** (`LessonView` / `app/patterns/[slug]`) a la escena
   cinematográfica + CodeTour, y retirar la preview.
6. Repetir el molde para los otros 5 patrones (Singleton, Strategy, Decorator,
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
