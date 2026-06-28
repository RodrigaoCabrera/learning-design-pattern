# Guión de escena — Factory Method

> Fuente pedagógica: analogía de la **empresa de envíos** (la línea es la misma; cada
> sucursal decide qué vehículo crear).
> Regla de oro: **empezar siempre por el problema**, después la solución, después
> nombrar el concepto. La animación se construye a partir de este guión.
>
> ⚠️ La analogía es para público general / alguien que recién aprende: **nada de
> código en la escena** (eso vive en la pestaña de Código). Historia humana y amigable.

Estructura: 3 actos, 9 planos. Cada plano = un beat narrado + dirección de escena.

Mapeo al patrón (no se nombra en la escena salvo el cierre): la línea
recibir→empacar→entregar es el **proceso compartido** (`despachar()` en `Sucursal`);
el paso "crear vehículo" es el **factory method** (`crearVehiculo()`, que la base deja
abstracto); cada sucursal concreta (`SucursalCiudad`, `SucursalRegional`) decide qué
**producto** crear (`Moto`, `Camion`).

---

## 🎬 ACTO 1 — EL PROBLEMA (el vehículo clavado en la línea)

### Plano 1 · Establecimiento
- **Caption:** "Una empresa de envíos: el proceso es siempre el mismo — recibir, empacar, entregar."
- **Dirección:** una línea/cinta con tres estaciones (Recibir → Empacar → … → Entregar)
  y un vehículo al final. Cámara entra suave (push-in). Tono neutro.

### Plano 2 · El vehículo está clavado
- **Caption:** "Pero el vehículo está clavado: la línea solo sabe hacer entregas en moto."
- **Dirección:** zoom a la estación de vehículo; aparece un candado "🔒 clavado": la
  línea solo produce motos.

### Plano 3 · Un pedido distinto traba la línea
- **Caption:** "Llega un pedido lejano que necesita un camión… y hay que rehacer toda la línea. Se traba."
- **Dirección:** aparece un pedido "región lejana → necesita 🚚"; la estación muestra
  "✗ la línea se traba". Vignette/tensión suben. Cierre del acto.

---

## 🎬 ACTO 2 — LA SOLUCIÓN (cada sucursal decide su vehículo)

### Plano 4 · Transición
- **Caption:** "¿Y si la línea fuera la misma, y solo el paso de 'crear el vehículo' lo decidiera cada sucursal?"
- **Dirección:** crossfade a la misma línea, pero la estación del vehículo es ahora un
  paso "crear vehículo" vacío (con un "?"), listo para que cada sucursal lo defina.

### Plano 5 · Sucursal de ciudad → moto
- **Caption:** "La sucursal de ciudad crea una moto, y el pedido sale en moto."
- **Dirección:** se marca "Sucursal Ciudad"; en la estación de creación aparece 🛵.

### Plano 6 · Sucursal regional → camión
- **Caption:** "La sucursal regional, con la misma línea, crea un camión."
- **Dirección:** misma línea; cambia el rótulo a "Sucursal Regional" y la estación crea 🚚.

### Plano 7 · Sucursal de ultramar → barco (lo demás no cambia)
- **Caption:** "La de ultramar, un barco. Recibir, empacar y entregar no cambian: solo cambia lo que se crea."
- **Dirección:** la estación crea 🚢. Se resalta con un marco "esto no cambia" sobre
  Recibir/Empacar/Entregar: el proceso alrededor es idéntico.

### Plano 8 · Una sucursal nueva, sin tocar la línea
- **Caption:** "¿Una sucursal nueva? Define su propio paso de creación, sin tocar la línea de las demás."
- **Dirección:** aparece "Sucursal Aérea" con ✈️ y una nota "sucursal nueva ✓ sin tocar
  la línea" (contraste directo con el Plano 3: antes se trababa; ahora solo se agrega).

---

## 🎬 ACTO 3 — EL CONCEPTO (nombrar las partes)

### Plano 9 · Etiquetado
- **Caption:** "El proceso es compartido. El paso de crear lo decide cada sucursal. Cada una crea lo suyo."
- **Dirección:** se congela la escena y aparecen rótulos con líneas líder: la línea →
  **El proceso compartido**; la estación de creación → **El paso que cada sucursal
  decide**. Cierre con la palabra clave: **Cada sucursal crea lo suyo**.

---

## Notas de dirección (transversales)
- **Cámara:** pan/zoom para dirigir la atención; nunca todo estático. Si un `#cam` se
  desplaza con `x`, ensanchar los rects de fondo para no revelar borde vacío.
- **Vida:** micro-animación constante (el paquete que respira en la cinta) para que no
  se sienta un PowerPoint.
- **Timing:** Acto 1 con ritmo tenso (la traba); Acto 2 calmo y resuelto.
- **Paleta:** Acto 1 vira a frío/tenso; Acto 2 cálido/claro (contraste emocional).
- **Transiciones:** cross-fade entre actos, no cortes secos.
- **Continuidad:** la misma "tira de proceso" se dibuja en ambos actos (componente
  `Strip`); entre actos solo cambia la estación del vehículo (clavada vs. decidida).
- **Gotcha GSAP+SVG:** nunca setear la posición base con `transform="translate()"` en
  un elemento que además animás con `x`/`y`. Vehículos/rótulos se animan con `scale`/`opacity`.
- **Sin código en la analogía:** la escena no muestra clases, herencia ni sintaxis —
  eso es exclusivo de la pestaña de Código.
