# Guión de escena — Strategy

> Fuente pedagógica: analogía del **viajero** que quiere ir de un lugar a otro.
> Regla de oro: **empezar siempre por el problema**, después la solución, después
> nombrar el concepto. La animación se construye a partir de este guión.
>
> ⚠️ La analogía es para público general / alguien que recién aprende: **nada de
> código en la escena** (eso vive en la pestaña de Código). Historia humana y amigable.

Estructura: 3 actos, 9 planos. Cada plano = un beat narrado + dirección de escena.

Mapeo al patrón (no se nombra en la escena salvo el cierre): el viajero es el
**Contexto** (`Navegador`), que solo pide llegar y delega; cada especialista es una
**estrategia concreta** (auto, bici, a pie); elegir/cambiar de especialista es cambiar
la **estrategia** en runtime.

---

## 🎬 ACTO 1 — EL PROBLEMA (una sola persona para todo)

### Plano 1 · Establecimiento
- **Caption:** "Querés ir de un lugar a otro. La pregunta es: ¿cómo llegás?"
- **Dirección:** un cartel/mapa simple con un punto A y un punto B, y una línea
  punteada dubitativa entre ambos. Cámara entra suave (push-in). Tono neutro.

### Plano 2 · Una sola persona sabelotodo, saturada
- **Caption:** "Imaginá una sola persona que intenta encargarse de TODAS las formas de viajar a la vez… y se satura."
- **Dirección:** aparece un único personaje con cara de agobio, haciendo malabares
  con los íconos de auto, bici y a pie alrededor de la cabeza. Gotas de sudor.

### Plano 3 · Una forma nueva la desborda
- **Caption:** "Y cada vez que aparece una forma nueva de viajar, hay que rehacerla a ella entera. Un lío."
- **Dirección:** cae un ícono más (transporte público / bus). El personaje se
  sobrecarga: "?!", líneas de confusión. Vignette/tensión suben. Cierre del acto.

---

## 🎬 ACTO 2 — LA SOLUCIÓN (un especialista por forma de viajar)

### Plano 4 · Transición
- **Caption:** "¿Y si tuvieras un especialista distinto para cada forma de viajar?"
- **Dirección:** crossfade a una vista clara y calma: el mapa del viajero a un lado;
  al otro, un equipo de tres especialistas (auto, bici, a pie), cada uno con su ícono.

### Plano 5 · Elegís al de auto
- **Caption:** "Elegís al de auto, y te arma la ruta en auto."
- **Dirección:** el especialista de auto se ilumina (halo) y en el mapa se dibuja la
  ruta de auto (línea por la avenida).

### Plano 6 · Cambiás al de bici
- **Caption:** "Cambiás al de bici, y te arma otra ruta — para el mismo viaje."
- **Dirección:** se apaga el de auto, se ilumina el de bici. En el mapa se **redibuja**
  la ruta (otro trazado). El viajero/mapa no cambió.

### Plano 7 · O al que va a pie — el beat de comportamiento
- **Caption:** "O al que va a pie, y otra distinta. Vos no cambiaste: cambiaste de especialista."
- **Dirección:** se ilumina el de a pie, ruta peatonal nueva. Se enfatiza que **el
  viajero es el mismo**; lo único que cambió es a quién le pediste la ruta.

### Plano 8 · Sumar una forma nueva, sin tocar el resto
- **Caption:** "¿Aparece una forma nueva de viajar? Sumás un especialista más, sin tocar a los demás."
- **Dirección:** aparece un especialista nuevo (transporte público) que se suma al
  equipo sin esfuerzo y también puede elegirse; su ruta se dibuja (contraste directo
  con el Plano 3: antes desbordaba; ahora solo se agrega).

---

## 🎬 ACTO 3 — EL CONCEPTO (nombrar las partes)

### Plano 9 · Etiquetado
- **Caption:** "El viajero solo pide llegar. Cada especialista sabe una forma de hacerlo. Y podés cambiar de uno a otro cuando quieras: eso es una estrategia."
- **Dirección:** se congela la escena y aparecen rótulos amigables con líneas líder:
  el mapa/viajero → **El viajero**; el equipo → **Cada forma de viajar**; el iluminado →
  **El que elegís ahora**. Cierre con la palabra clave: **Estrategia intercambiable**.

---

## Notas de dirección (transversales)
- **Cámara:** pan/zoom para dirigir la atención; nunca todo estático. Si un `#cam` se
  desplaza con `x`, ensanchar los rects de fondo para no revelar borde vacío.
- **Vida:** micro-animación constante (pin de destino que late) para que no se sienta
  un PowerPoint.
- **Timing:** Acto 1 con ritmo tenso (agobio); Acto 2 calmo y resuelto.
- **Paleta:** Acto 1 vira a frío/tenso; Acto 2 cálido/claro (contraste emocional).
- **Transiciones:** cross-fade entre actos, no cortes secos.
- **Gotcha GSAP+SVG:** nunca setear la posición base con `transform="translate()"` en
  un elemento que además animás con `x`/`y`. Usar grupo contenedor para la base y
  animar `scale`/`opacity` en el grupo interno.
- **Sin código en la analogía:** la escena no muestra clases, if/else ni sintaxis —
  eso es exclusivo de la pestaña de Código.
