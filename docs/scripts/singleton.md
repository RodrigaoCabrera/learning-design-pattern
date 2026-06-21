# Guión de escena — Singleton

> Fuente pedagógica: analogía de la oficina del director de la escuela.
> Regla de oro: **empezar siempre por el problema**, después la solución, después
> nombrar el concepto. La animación se construye a partir de este guión.

Estructura: 3 actos, 9 planos. Cada plano = un beat narrado + dirección de escena.

---

## 🎬 ACTO 1 — EL PROBLEMA (sin Singleton)

### Plano 1 · Establecimiento
- **Caption:** "En la escuela, cada decisión necesita al director."
- **Dirección:** pasillo con tres puertas cerradas. Dos empleados esperando.
  Cámara entra suave (push-in). Tono neutro, todavía sin tensión.

### Plano 2 · Primera puerta, primer director
- **Caption:** "Alguien entra por una puerta… y aparece un director."
- **Dirección:** el primer empleado abre la puerta 1. Adentro, aparece un
  director (con globo de diálogo: "¡Sí, hay clase!"). Cámara en esa puerta.

### Plano 3 · Otra puerta, otro director
- **Caption:** "Otro entra por otra puerta… y aparece OTRO director, con otra respuesta."
- **Dirección:** pan a la puerta 2. El segundo empleado abre esa puerta.
  Aparece un director distinto (otro color/anteojos) con globo contradictorio:
  "¡No, no hay clase!".

### Plano 4 · El caos
- **Caption:** "Tantas puertas, tantos directores. Nadie sabe a quién creerle."
- **Dirección:** zoom out al pasillo completo. Memos contradictorios se pegan
  en la pared, líneas de confusión. Vignette/tensión suben. Cierre del acto.

---

## 🎬 ACTO 2 — LA SOLUCIÓN (una sola puerta, un solo director)

### Plano 5 · Transición
- **Caption:** "¿Y si hubiera una sola puerta… y un solo director?"
- **Dirección:** crossfade a una oficina única, paleta más clara y calma.
  Una sola puerta, oficina vacía detrás (todavía sin director).

### Plano 6 · Se crea recién ahora
- **Caption:** "La primera vez que alguien llama, recién ahí se crea el director. No antes."
- **Dirección:** el primer empleado golpea la puerta. La oficina, vacía, se
  revela y el director aparece (pop-in) en ese momento — no antes.

### Plano 7 · Siempre el mismo
- **Caption:** "La próxima vez, el director ya existe. Siempre es el mismo."
- **Dirección:** el segundo empleado golpea la misma puerta. Se abre y
  muestra al MISMO director (misma cara). Aparece un check "✓ ya existe".

### Plano 8 · Cómo funciona: siempre la misma respuesta
- **Caption:** "Y cuando alguien necesita una decisión, responde siempre la misma persona — con el mismo criterio, sea quien sea quien pregunte."
- **Dirección:** un empleado le hace una pregunta al director ("¿Hay reunión?")
  y recibe una respuesta ("¡Autorizado!"). Otro empleado, con otra pregunta
  ("¿Puedo salir?"), recibe la misma clase de respuesta del mismo director —
  demuestra que el Singleton no solo se crea una vez, también **funciona** como
  punto único de decisión (`decidir()`).

---

## 🎬 ACTO 3 — EL CONCEPTO (nombrar las partes)

### Plano 9 · Etiquetado
- **Caption:** "La puerta es el punto de acceso único. Nadie crea directores por su cuenta: el constructor es privado. Siempre hay una única instancia."
- **Dirección:** se congela la escena y aparecen rótulos: la puerta →
  **Punto de acceso único** (`getInstance()`); el cuarto de atrás cerrado con
  candado → **Constructor privado**; el director → **Instancia única**.
  Líneas de conexión sutiles. Cierre con la palabra clave: **Instancia única**.

---

## Notas de dirección (transversales)
- **Cámara:** pan/zoom para dirigir la atención; nunca todo estático.
- **Vida:** micro-animación constante (respiración, parpadeo) para que no se
  sienta un PowerPoint.
- **Timing:** Acto 1 con ritmo tenso (contradicción); Acto 2 calmo y resuelto.
- **Paleta:** Acto 1 vira a frío/tenso; Acto 2 cálido/claro (contraste emocional).
- **Transiciones:** cross-fade entre actos, no cortes secos.
