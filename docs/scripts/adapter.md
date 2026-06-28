# Guión de escena — Adapter

> Fuente pedagógica: analogía del **adaptador de enchufe de viaje**.
> Regla de oro: **empezar siempre por el problema**, después la solución, después
> nombrar el concepto. La animación se construye a partir de este guión.
>
> ⚠️ La analogía es para público general / alguien que recién aprende: **nada de
> código en la escena** (eso vive en la pestaña de Código). Historia humana y amigable.

Estructura: 3 actos, 9 planos. Cada plano = un beat narrado + dirección de escena.

Mapeo al patrón (no se nombra en la escena salvo el cierre): el plug plano que tu
cargador espera es la **interfaz objetivo** (`EnchufePlano`); la toma redonda de la
pared es el **adaptee** existente e incompatible (`TomaRedonda`); el adaptador es el
**Adapter** (`Adaptador`), que se presenta como un `EnchufePlano` y por dentro traduce
las llamadas a la toma redonda. Ni el cargador ni la pared cambian.

---

## 🎬 ACTO 1 — EL PROBLEMA (no encaja)

### Plano 1 · Establecimiento
- **Caption:** "Viajaste a otro país y tu teléfono está sin batería. Querés cargarlo."
- **Dirección:** un teléfono con la batería vacía (parpadea), un cargador con su plug,
  y una pared con un tomacorriente. Cámara entra suave (push-in). Tono neutro.

### Plano 2 · Formas distintas
- **Caption:** "Pero el plug de tu cargador tiene una forma… y el tomacorriente de la pared, otra distinta."
- **Dirección:** se rotulan las dos formas: "plug plano" ≠ "toma redonda". Se ve el
  contraste de formas (láminas planas vs. agujeros redondos).

### Plano 3 · No encaja y no podés cambiar nada
- **Caption:** "No encajan. Y no vas a cortar tu cargador ni la pared. Quedás trabado."
- **Dirección:** intento de conexión → "✗ no encaja". Vignette/tensión suben. Cierre del acto.

---

## 🎬 ACTO 2 — LA SOLUCIÓN (una pieza en el medio)

### Plano 4 · Transición
- **Caption:** "¿Y si pusieras una pieza en el medio? Un adaptador de viaje."
- **Dirección:** crossfade; aparece (pop-in) un adaptador en el hueco entre el cargador
  y la pared. De un lado tiene prongs redondos; del otro, ranuras planas.

### Plano 5 · Un lado encaja en la pared
- **Caption:** "De un lado, encaja perfecto en el tomacorriente de la pared."
- **Dirección:** se ilumina la unión adaptador↔pared con un check "encaja en la pared".

### Plano 6 · El otro lado acepta tu cargador
- **Caption:** "Del otro, acepta el plug de tu cargador tal como es."
- **Dirección:** se ilumina la unión cargador↔adaptador "acepta tu cargador".

### Plano 7 · La corriente fluye
- **Caption:** "Y la corriente fluye: tu teléfono carga. Ni el cargador ni la pared cambiaron."
- **Dirección:** ⚡ recorre de la pared al teléfono; la batería se llena de verde,
  aparece "✓ carga". El cargador y la pared siguen idénticos.

### Plano 8 · El mismo adaptador, reutilizable
- **Caption:** "Otro aparato con el mismo plug también funciona: el adaptador es el traductor entre las dos formas."
- **Dirección:** una nota muestra que otro aparato con el mismo plug también carga a
  través del adaptador — el adaptador traduce entre las dos formas, no es de un solo uso.

---

## 🎬 ACTO 3 — EL CONCEPTO (nombrar las partes)

### Plano 9 · Etiquetado
- **Caption:** "Tu cargador espera una forma. La pared tiene otra. El adaptador traduce entre las dos, sin cambiar a ninguna."
- **Dirección:** se congela la escena y aparecen rótulos con líneas líder: el plug del
  cargador → **Lo que tenés (un plug plano)**; la pared → **Lo que hay (otra forma)**;
  el adaptador → **El traductor en el medio**. Cierre con la palabra clave:
  **Traducir para conectar**.

---

## Notas de dirección (transversales)
- **Cámara:** pan/zoom para dirigir la atención; nunca todo estático. Si un `#cam` se
  desplaza con `x`, ensanchar los rects de fondo para no revelar borde vacío.
- **Vida:** micro-animación constante (la batería vacía que parpadea) para que no se
  sienta un PowerPoint.
- **Timing:** Acto 1 con ritmo tenso (no encaja); Acto 2 calmo y resuelto.
- **Paleta:** Acto 1 vira a frío/tenso; Acto 2 cálido/claro (contraste emocional).
- **Transiciones:** cross-fade entre actos, no cortes secos.
- **Gotcha GSAP+SVG:** nunca setear la posición base con `transform="translate()"` en
  un elemento que además animás con `x`/`y`. Las piezas se animan con `scale`/`opacity`;
  el llenado de batería con `scaleX` (origen izquierdo) sobre un rect sin translate base.
- **Sin código en la analogía:** la escena no muestra clases, interfaces ni sintaxis —
  eso es exclusivo de la pestaña de Código.
