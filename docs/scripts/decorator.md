# Guión de escena — Decorator

> Fuente pedagógica: analogía de la **cafetería** (un café que se envuelve con agregados).
> Regla de oro: **empezar siempre por el problema**, después la solución, después
> nombrar el concepto. La animación se construye a partir de este guión.
>
> ⚠️ La analogía es para público general / alguien que recién aprende: **nada de
> código en la escena** (eso vive en la pestaña de Código). Historia humana y amigable.

Estructura: 3 actos, 9 planos. Cada plano = un beat narrado + dirección de escena.

Mapeo al patrón (no se nombra en la escena salvo el cierre): el café simple es el
**componente** (`CafeSimple`); cada envoltura es un **decorador** (`ConLeche`,
`ConCaramelo`…) que conserva la misma interfaz (sigue teniendo costo y descripción) y
le suma su parte; se pueden **apilar**.

---

## 🎬 ACTO 1 — EL PROBLEMA (un producto por combinación)

### Plano 1 · Establecimiento
- **Caption:** "Querés un café. Pero no uno cualquiera: con tus agregados."
- **Dirección:** una taza simple y una nube de pensamiento con íconos de agregados
  (leche, caramelo, crema). Cámara entra suave (push-in). Tono neutro.

### Plano 2 · El menú se dispara
- **Caption:** "La cafetería intenta tener cada combinación como un producto distinto… y el menú se dispara."
- **Dirección:** pan a un menú con un producto fijo por combo: "café", "café + leche",
  "café + leche + caramelo"… ya se ve cargado.

### Plano 3 · Un agregado nuevo rehace todo
- **Caption:** "Y con un solo agregado nuevo, hay que rehacer TODO el menú otra vez. Inmanejable."
- **Dirección:** aparece un agregado nuevo y el menú se inunda de combinaciones
  (se multiplican), "✗ ¡no entra!", grietas. Vignette/tensión suben. Cierre del acto.

---

## 🎬 ACTO 2 — LA SOLUCIÓN (envolver un café simple)

### Plano 4 · Transición
- **Caption:** "¿Y si empezaras simple? Solo un café."
- **Dirección:** crossfade a una vista clara: una sola taza de café simple en el centro
  y un ticket que arranca con "café $2".

### Plano 5 · Envolver con leche
- **Caption:** "Lo envolvés con leche: suma su parte al precio y a la descripción."
- **Dirección:** una capa (envoltura) aparece rodeando la taza, con su etiqueta
  "+ leche". En el ticket se agrega la línea y el total sube.

### Plano 6 · Envolver con caramelo
- **Caption:** "Lo volvés a envolver con caramelo. Otra capa, otro poco más."
- **Dirección:** una segunda capa envuelve a la primera. Otra línea en el ticket, total sube.

### Plano 7 · Envolver con crema — sigue siendo un café
- **Caption:** "Y con crema. Apilás las que quieras — y sigue siendo un café que podés tomar."
- **Dirección:** tercera capa. Aparece un sello "☕ sigue siendo un café": por fuera
  cambia, pero por dentro sigue siendo lo mismo y se usa igual (misma interfaz).

### Plano 8 · Un agregado nuevo es una envoltura más
- **Caption:** "¿Un agregado nuevo? Es una envoltura más, lista para cualquier café. Sin rehacer el menú."
- **Dirección:** aparece una capa nueva (canela) que envuelve sin esfuerzo; línea nueva
  en el ticket (contraste directo con el Plano 3: antes explotaba; ahora solo se suma).

---

## 🎬 ACTO 3 — EL CONCEPTO (nombrar las partes)

### Plano 9 · Etiquetado
- **Caption:** "Adentro hay un café base. Cada capa lo envuelve y le suma algo, sin cambiar lo de adentro. Envolver para sumar."
- **Dirección:** se congela la escena y aparecen rótulos con líneas líder: la taza del
  centro → **El café base**; las capas → **Cada capa envuelve y suma**. Cierre con la
  palabra clave: **Envolver para sumar**.

---

## Notas de dirección (transversales)
- **Cámara:** pan/zoom para dirigir la atención; nunca todo estático. Si un `#cam` se
  desplaza con `x`, ensanchar los rects de fondo para no revelar borde vacío.
- **Vida:** micro-animación constante (vapor de la taza) para que no se sienta un PowerPoint.
- **Timing:** Acto 1 con ritmo tenso (explosión del menú); Acto 2 calmo y resuelto.
- **Paleta:** Acto 1 vira a frío/tenso; Acto 2 cálido/claro (contraste emocional).
- **Transiciones:** cross-fade entre actos, no cortes secos.
- **Gotcha GSAP+SVG:** nunca setear la posición base con `transform="translate()"` en
  un elemento que además animás con `x`/`y`. Las capas se animan solo con `scale`/`opacity`.
- **Sin código en la analogía:** la escena no muestra clases, interfaces ni sintaxis —
  eso es exclusivo de la pestaña de Código.
