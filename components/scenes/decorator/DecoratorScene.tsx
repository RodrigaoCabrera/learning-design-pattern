"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDirectorTimeline } from "../observer/useDirectorTimeline";

type Props = {
  /** Active shot id (shot-1 … shot-9). One continuous flow for the viewer. */
  activeShot: string;
  /** Snap instantly to the shot's end state instead of tweening to it. */
  instant?: boolean;
};

// Decorator — one continuous, friendly (no-code) directed scene. A coffee shop.
// Act 1 (#act1, the problem): pre-baking every combo as its own fixed product
// makes the menu explode; one new add-on means redoing the whole menu. Act 2
// (#act2, the solution): start with a plain coffee and WRAP it with one add-on at
// a time — each layer wraps the previous one and adds its bit to the price (the
// growing ticket); it is still a coffee you can drink; a new add-on is just one
// more wrapper. Acts are a coding/structure concept only — the viewer sees a
// single flow. Positioned elements animate only scale/opacity (never x/y) to
// avoid the GSAP/SVG translate-clobbering gotcha; only #cam1/#cam2 pan with x.
export function DecoratorScene({ activeShot, instant = false }: Props) {
  const scope = useDirectorTimeline(activeShot, (tl) => {
    // ---- Initial state ----
    gsap.set("#act1", { opacity: 1 });
    gsap.set("#act2", { opacity: 0 });

    // Act 1 set
    gsap.set("#cam1", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#menu", { opacity: 0, scale: 0.92, transformOrigin: "50% 50%" });
    gsap.set(".combo", { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" });
    gsap.set("#flood", { opacity: 0 });
    gsap.set("#menu-overflow", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set("#cracks", { opacity: 0 });
    gsap.set("#tense", { opacity: 0 });
    gsap.set("#vignette", { opacity: 0.2 });

    // Act 2 set
    gsap.set("#cam2", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#dim", { opacity: 0 });
    gsap.set(["#wrap-leche", "#wrap-caramelo", "#wrap-crema", "#wrap-canela"], {
      opacity: 0,
      scale: 0.82,
      transformOrigin: "50% 50%",
    });
    gsap.set(["#line-cafe", "#line-leche", "#line-caramelo", "#line-crema", "#line-canela"], { opacity: 0 });
    gsap.set(["#total-a", "#total-b", "#total-c", "#total-d", "#total-e"], { opacity: 0 });
    gsap.set("#still-coffee", { opacity: 0, scale: 0.6, transformOrigin: "50% 100%" });

    // Act 3 set (naming the concept, shot-9)
    gsap.set(["#act3-base-label", "#act3-layer-label", "#act3-keyword"], { opacity: 0 });
    gsap.set([".act3-line"], { opacity: 0 });
    gsap.set("#act3-keyword", { scale: 0.85, transformOrigin: "50% 50%" });

    // ===== SHOT 1 — Establishing: you want a coffee, with your add-ons =====
    tl.to("#cam1", { scale: 1.06, duration: 1.1, ease: "power2.out" });
    tl.addLabel("shot-1");

    // ===== SHOT 2 — The menu explodes: one product per combo =====
    tl.to("#cam1", { scale: 1.12, x: -190, y: 0, duration: 1, ease: "power2.inOut" });
    tl.to("#menu", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, ">-0.1");
    tl.to(".combo", { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, ">0.05");
    tl.addLabel("shot-2");

    // ===== SHOT 3 — One new add-on means redoing the whole menu =====
    tl.to("#flood", { opacity: 1, duration: 0.5, ease: "power2.out" });
    tl.to("#menu-overflow", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.05");
    tl.to("#cracks", { opacity: 1, duration: 0.4, ease: "power2.out" }, "<");
    tl.to("#tense", { opacity: 0.4, duration: 0.8, ease: "power2.in" }, "<");
    tl.to("#vignette", { opacity: 0.55, duration: 0.8, ease: "power2.in" }, "<");
    tl.addLabel("shot-3");

    // ===== SHOT 4 — Transition: start simple, just a coffee =====
    tl.to("#act1", { opacity: 0, duration: 0.7, ease: "power2.inOut" });
    tl.to("#act2", { opacity: 1, duration: 0.7, ease: "power2.inOut" }, "<");
    tl.to("#line-cafe", { opacity: 1, duration: 0.4 }, ">-0.1");
    tl.to("#total-a", { opacity: 1, duration: 0.4 }, "<");
    tl.addLabel("shot-4");

    // ===== SHOT 5 — Wrap with milk: adds its bit =====
    tl.to("#wrap-leche", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" });
    tl.to("#line-leche", { opacity: 1, duration: 0.35 }, ">-0.1");
    tl.to("#total-a", { opacity: 0, duration: 0.2 }, "<");
    tl.to("#total-b", { opacity: 1, duration: 0.35 }, "<0.05");
    tl.addLabel("shot-5");

    // ===== SHOT 6 — Wrap with caramel: another layer =====
    tl.to("#wrap-caramelo", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" });
    tl.to("#line-caramelo", { opacity: 1, duration: 0.35 }, ">-0.1");
    tl.to("#total-b", { opacity: 0, duration: 0.2 }, "<");
    tl.to("#total-c", { opacity: 1, duration: 0.35 }, "<0.05");
    tl.addLabel("shot-6");

    // ===== SHOT 7 — Wrap with cream: still a coffee you can drink =====
    tl.to("#wrap-crema", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" });
    tl.to("#line-crema", { opacity: 1, duration: 0.35 }, ">-0.1");
    tl.to("#total-c", { opacity: 0, duration: 0.2 }, "<");
    tl.to("#total-d", { opacity: 1, duration: 0.35 }, "<0.05");
    tl.to("#still-coffee", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.1");
    tl.addLabel("shot-7");

    // ===== SHOT 8 — A new add-on is just one more wrapper =====
    tl.to("#still-coffee", { opacity: 0, duration: 0.25 });
    tl.to("#wrap-canela", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)" }, ">0.05");
    tl.to("#line-canela", { opacity: 1, duration: 0.35 }, ">-0.1");
    tl.to("#total-d", { opacity: 0, duration: 0.2 }, "<");
    tl.to("#total-e", { opacity: 1, duration: 0.35 }, "<0.05");
    tl.addLabel("shot-8");

    // ===== SHOT 9 — Naming the concept: freeze + labels =====
    tl.to("#dim", { opacity: 0.15, duration: 0.4 });
    tl.to("#act3-base-label", { opacity: 1, duration: 0.4 }, ">0.1");
    tl.to(".act3-line-base", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-layer-label", { opacity: 1, duration: 0.4 }, ">0.12");
    tl.to(".act3-line-layer", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-keyword", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, ">0.25");
    tl.addLabel("shot-9");
  }, instant);

  // Idle life, independent of the master timeline: steam rising from the cup.
  useGSAP(
    () => {
      gsap.to("#steam", { y: -4, opacity: 0.5, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
    },
    { scope }
  );

  return (
    <svg
      ref={scope}
      viewBox="0 0 960 540"
      className="block h-auto w-full"
      role="img"
      aria-label="Decorator: de un menú de cafetería que explota al tener cada combinación como producto fijo, a un café simple que se envuelve con un agregado a la vez, apilando capas que suman"
    >
      <defs>
        <linearGradient id="shopCold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7ebf5" />
          <stop offset="1" stopColor="#d4d9ea" />
        </linearGradient>
        <linearGradient id="shopWarm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7e9" />
          <stop offset="1" stopColor="#f6e3c0" />
        </linearGradient>
        <radialGradient id="vigD" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* ===================== ACT 1 — the problem ===================== */}
      <g id="act1">
        <g id="cam1">
          <rect x="-400" y="0" width="1760" height="540" fill="url(#shopCold)" />
          <rect x="-400" y="446" width="1760" height="94" fill="#c7ccdc" />

          {/* You, wanting a coffee with your own add-ons */}
          <g transform="translate(215 300)">
            <path d="M-36 -28 L36 -28 L30 52 L-30 52 Z" fill="#fff" stroke="#2a2f45" strokeWidth="3" />
            <path d="M34 -14 q30 6 0 40" fill="none" stroke="#2a2f45" strokeWidth="6" />
            <ellipse cx="0" cy="-28" rx="36" ry="9" fill="#6f4a32" />
            <text x="0" y="84" textAnchor="middle" fontSize="16" fontWeight="800" fill="#2a2f45">un café…</text>
            {/* thought bubble of add-ons */}
            <g transform="translate(70 -86)">
              <rect x="-58" y="-30" width="150" height="56" rx="16" fill="#fff" stroke="#9fb0c8" strokeWidth="2" />
              <text x="16" y="6" textAnchor="middle" fontSize="22">🥛 🍮 🍦</text>
              <circle cx="-58" cy="38" r="7" fill="#fff" stroke="#9fb0c8" strokeWidth="2" />
              <circle cx="-74" cy="56" r="4" fill="#fff" stroke="#9fb0c8" strokeWidth="2" />
            </g>
          </g>

          {/* The exploding menu: one fixed product per combo */}
          <g id="menu" transform="translate(690 270)">
            <rect x="-210" y="-170" width="420" height="340" rx="14" fill="#1d2233" />
            <text x="0" y="-138" textAnchor="middle" fontSize="16" fontWeight="800" fill="#9fb3d8">Menú · un producto por cada combo</text>

            <g className="combo" transform="translate(-104 -86)">
              <rect x="-92" y="-18" width="184" height="34" rx="8" fill="#2b3650" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#cfe0ff">café</text>
            </g>
            <g className="combo" transform="translate(104 -86)">
              <rect x="-92" y="-18" width="184" height="34" rx="8" fill="#2b3650" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#cfe0ff">café + leche</text>
            </g>
            <g className="combo" transform="translate(-104 -40)">
              <rect x="-92" y="-18" width="184" height="34" rx="8" fill="#2b3650" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#cfe0ff">café + caramelo</text>
            </g>
            <g className="combo" transform="translate(104 -40)">
              <rect x="-92" y="-18" width="184" height="34" rx="8" fill="#2b3650" />
              <text x="0" y="5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#cfe0ff">café + leche + caramelo</text>
            </g>
            <g className="combo" transform="translate(-104 6)">
              <rect x="-92" y="-18" width="184" height="34" rx="8" fill="#2b3650" />
              <text x="0" y="5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#cfe0ff">café + leche + crema</text>
            </g>
            <g className="combo" transform="translate(104 6)">
              <rect x="-92" y="-18" width="184" height="34" rx="8" fill="#2b3650" />
              <text x="0" y="5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#cfe0ff">café + caramelo + crema</text>
            </g>

            {/* shot 3 — the explosion when a new add-on appears */}
            <g id="flood">
              {[-150, -90, -30, 30, 90, 150].map((dx) =>
                [56, 92, 128].map((dy) => (
                  <rect
                    key={`${dx}-${dy}`}
                    x={dx - 28}
                    y={dy - 11}
                    width="56"
                    height="22"
                    rx="5"
                    fill="#2b3650"
                    stroke="#e2574c"
                    strokeWidth="1"
                  />
                ))
              )}
            </g>
            <g id="cracks" stroke="#e2574c" strokeWidth="2.5" fill="none" opacity="0.9">
              <path d="M-150 -110 l50 40 l-36 30 l60 44" />
              <path d="M150 -110 l-44 44 l34 30 l-50 36" />
            </g>
            <g id="menu-overflow" transform="translate(0 150)">
              <rect x="-120" y="-22" width="240" height="44" rx="22" fill="#e2574c" />
              <text x="0" y="6" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">✗ ¡el menú no entra!</text>
            </g>
          </g>

          <rect id="tense" x="-400" y="0" width="1760" height="540" fill="#1f2747" style={{ mixBlendMode: "multiply" }} />
          <rect id="vignette" x="-400" y="0" width="1760" height="540" fill="url(#vigD)" />
        </g>
      </g>

      {/* ===================== ACT 2 — the solution ===================== */}
      <g id="act2">
        <g id="cam2">
          <rect x="-200" y="0" width="1360" height="540" fill="url(#shopWarm)" />
          <rect x="-200" y="446" width="1360" height="94" fill="#e6cf9c" />

          {/* The nested wraps (drawn outer-first so inner layers sit on top) */}
          <g id="wrap-canela">
            <rect x="149" y="132" width="302" height="316" rx="20" fill="#8a5cf6" fillOpacity="0.1" stroke="#8a5cf6" strokeWidth="3" />
            <g transform="translate(176 132)">
              <rect x="-44" y="-15" width="88" height="30" rx="8" fill="#8a5cf6" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">+ canela</text>
            </g>
          </g>
          <g id="wrap-crema">
            <rect x="173" y="154" width="254" height="272" rx="18" fill="#e89bbf" fillOpacity="0.14" stroke="#d6699a" strokeWidth="3" />
            <g transform="translate(200 154)">
              <rect x="-42" y="-15" width="84" height="30" rx="8" fill="#d6699a" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">+ crema</text>
            </g>
          </g>
          <g id="wrap-caramelo">
            <rect x="197" y="176" width="206" height="228" rx="16" fill="#e8a23a" fillOpacity="0.16" stroke="#cf8526" strokeWidth="3" />
            <g transform="translate(224 176)">
              <rect x="-52" y="-15" width="104" height="30" rx="8" fill="#cf8526" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">+ caramelo</text>
            </g>
          </g>
          <g id="wrap-leche">
            <rect x="221" y="198" width="158" height="184" rx="14" fill="#7fb6f0" fillOpacity="0.18" stroke="#3f8fd6" strokeWidth="3" />
            <g transform="translate(248 198)">
              <rect x="-40" y="-15" width="80" height="30" rx="8" fill="#3f8fd6" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">+ leche</text>
            </g>
          </g>

          {/* The base coffee (the component) — always inside */}
          <g transform="translate(300 290)">
            <g id="steam" opacity="0.7">
              <path d="M-12 -54 q8 -10 0 -22" stroke="#caa" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M12 -54 q-8 -10 0 -22" stroke="#caa" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
            <path d="M-34 -30 L34 -30 L28 48 L-28 48 Z" fill="#fff" stroke="#2a2f45" strokeWidth="3" />
            <path d="M32 -16 q28 6 0 38" fill="none" stroke="#2a2f45" strokeWidth="6" />
            <ellipse cx="0" cy="-30" rx="34" ry="8" fill="#6f4a32" />
            <text x="0" y="70" textAnchor="middle" fontSize="15" fontWeight="800" fill="#2a2f45">café</text>
          </g>

          {/* still-a-coffee badge (shot 7) */}
          <g id="still-coffee" transform="translate(300 392)">
            <rect x="-92" y="-20" width="184" height="40" rx="20" fill="#2bb673" />
            <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">☕ sigue siendo un café</text>
          </g>

          {/* The growing ticket — each wrap adds a line and bumps the total */}
          <g transform="translate(740 110)">
            <rect x="-110" y="0" width="220" height="320" rx="12" fill="#fffdf7" stroke="#d9c9a3" strokeWidth="2" />
            <text x="0" y="34" textAnchor="middle" fontSize="17" fontWeight="800" fill="#7a5b2c">Ticket</text>
            <line x1="-92" y1="48" x2="92" y2="48" stroke="#e3d6b6" strokeWidth="2" />

            <g id="line-cafe">
              <text x="-92" y="86" fontSize="15" fontWeight="700" fill="#2a2f45">café</text>
              <text x="92" y="86" textAnchor="end" fontSize="15" fontWeight="700" fill="#2a2f45">$2</text>
            </g>
            <g id="line-leche">
              <text x="-92" y="120" fontSize="15" fontWeight="700" fill="#3f8fd6">+ leche</text>
              <text x="92" y="120" textAnchor="end" fontSize="15" fontWeight="700" fill="#3f8fd6">$1</text>
            </g>
            <g id="line-caramelo">
              <text x="-92" y="154" fontSize="15" fontWeight="700" fill="#cf8526">+ caramelo</text>
              <text x="92" y="154" textAnchor="end" fontSize="15" fontWeight="700" fill="#cf8526">$1.5</text>
            </g>
            <g id="line-crema">
              <text x="-92" y="188" fontSize="15" fontWeight="700" fill="#d6699a">+ crema</text>
              <text x="92" y="188" textAnchor="end" fontSize="15" fontWeight="700" fill="#d6699a">$1</text>
            </g>
            <g id="line-canela">
              <text x="-92" y="222" fontSize="15" fontWeight="700" fill="#8a5cf6">+ canela</text>
              <text x="92" y="222" textAnchor="end" fontSize="15" fontWeight="700" fill="#8a5cf6">$1</text>
            </g>

            <line x1="-92" y1="250" x2="92" y2="250" stroke="#e3d6b6" strokeWidth="2" />
            <text x="-92" y="284" fontSize="16" fontWeight="800" fill="#2a2f45">Total</text>
            <text id="total-a" x="92" y="284" textAnchor="end" fontSize="18" fontWeight="800" fill="#2a2f45">$2</text>
            <text id="total-b" x="92" y="284" textAnchor="end" fontSize="18" fontWeight="800" fill="#2a2f45">$3</text>
            <text id="total-c" x="92" y="284" textAnchor="end" fontSize="18" fontWeight="800" fill="#2a2f45">$4.5</text>
            <text id="total-d" x="92" y="284" textAnchor="end" fontSize="18" fontWeight="800" fill="#2a2f45">$5.5</text>
            <text id="total-e" x="92" y="284" textAnchor="end" fontSize="18" fontWeight="800" fill="#2a2f45">$6.5</text>
          </g>

          <rect id="dim" x="-200" y="0" width="1360" height="540" fill="#1b2440" style={{ mixBlendMode: "multiply" }} />

          {/* ===== Act 3 — naming the concept (shot-9) ===== */}
          <g id="act3-labels">
            <line className="act3-line act3-line-base" x1="300" y1="290" x2="120" y2="300" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-base-label" transform="translate(96 300)">
              <rect x="-78" y="-20" width="156" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1f2747">El café base</text>
            </g>

            <line className="act3-line act3-line-layer" x1="300" y1="132" x2="300" y2="64" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-layer-label" transform="translate(300 44)">
              <rect x="-128" y="-20" width="256" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1f2747">Cada capa envuelve y suma</text>
            </g>

            <g id="act3-keyword" transform="translate(480 502)">
              <rect x="-150" y="-24" width="300" height="48" rx="24" fill="#1f2747" />
              <text x="0" y="6" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffd36b">Envolver para sumar</text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
