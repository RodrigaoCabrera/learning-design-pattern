"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDirectorTimeline } from "../observer/useDirectorTimeline";

type Props = {
  /** Active shot id (shot-1 … shot-8). One continuous flow for the viewer. */
  activeShot: string;
  /** Snap instantly to the shot's end state instead of tweening to it. */
  instant?: boolean;
};

// Singleton — one continuous directed scene. Internally it has two "sets":
// Act 1 (#act1, the problem: many doors, many contradicting directors) and
// Act 2 (#act2, the solution: one door, one director, created once). Acts are
// a coding/structure concept only — the viewer sees a single flow. Positioned
// elements only animate scale/opacity (never x/y) to avoid the GSAP/SVG
// translate-clobbering gotcha.
export function SingletonScene({ activeShot, instant = false }: Props) {
  const scope = useDirectorTimeline(activeShot, (tl) => {
    // ---- Initial state ----
    gsap.set("#act1", { opacity: 1 });
    gsap.set("#act2", { opacity: 0 });

    // Act 1 set
    gsap.set("#cam1", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#principal1", { opacity: 0, scale: 0.6, transformOrigin: "50% 100%" });
    gsap.set("#bubble1", { opacity: 0, scale: 0.6, transformOrigin: "0% 100%" });
    gsap.set("#principal2", { opacity: 0, scale: 0.6, transformOrigin: "50% 100%" });
    gsap.set("#bubble2", { opacity: 0, scale: 0.6, transformOrigin: "0% 100%" });
    gsap.set("#chaos", { opacity: 0 });
    gsap.set("#tense", { opacity: 0 });
    gsap.set("#vignette", { opacity: 0.2 });

    // Act 2 set
    gsap.set("#cam2", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#dim", { opacity: 0 });
    gsap.set("#staffA-knock", { opacity: 0 });
    gsap.set("#staffB-knock", { opacity: 0 });
    gsap.set("#principal-solo", { opacity: 0, scale: 0.5, transformOrigin: "50% 100%" });
    gsap.set("#created-ring", { opacity: 0, scale: 0.5, transformOrigin: "center center" });
    gsap.set("#exists-badge", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set(["#ask-bubble-a", "#ask-bubble-b"], { opacity: 0, scale: 0.6, transformOrigin: "0% 100%" });
    gsap.set("#answer-stamp", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });

    // Act 3 set (naming the concept, shot-8)
    gsap.set(["#act3-door-label", "#act3-ctor-label", "#act3-keyword"], { opacity: 0 });
    gsap.set([".act3-line"], { opacity: 0 });
    gsap.set("#act3-keyword", { scale: 0.85, transformOrigin: "50% 50%" });
    gsap.set("#lock-room", { opacity: 0 });

    // ===== SHOT 1 — Establishing =====
    tl.to("#cam1", { scale: 1.05, duration: 1.1, ease: "power2.out" });
    tl.addLabel("shot-1");

    // ===== SHOT 2 — First door, first director =====
    tl.to("#cam1", { scale: 1.2, x: 550, y: 10, duration: 1, ease: "power2.inOut" });
    tl.to("#door1-leaf", { scaleX: 0.2, duration: 0.4, ease: "power2.in" }, "<0.1");
    tl.to("#principal1", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, ">-0.1");
    tl.to("#bubble1", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.05");
    tl.addLabel("shot-2");

    // ===== SHOT 3 — Second door, contradicting director =====
    tl.to("#cam1", { scale: 1.2, x: -550, y: 10, duration: 0.9, ease: "power2.inOut" });
    tl.to("#door2-leaf", { scaleX: 0.2, duration: 0.4, ease: "power2.in" }, "<0.1");
    tl.to("#principal2", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, ">-0.1");
    tl.to("#bubble2", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.05");
    tl.addLabel("shot-3");

    // ===== SHOT 4 — The chaos =====
    tl.to("#cam1", { scale: 1, x: 0, y: 0, duration: 0.8, ease: "power2.inOut" });
    tl.to("#chaos", { opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.1");
    tl.to("#tense", { opacity: 0.4, duration: 0.8, ease: "power2.in" }, "<");
    tl.to("#vignette", { opacity: 0.55, duration: 0.8, ease: "power2.in" }, "<");
    tl.addLabel("shot-4");

    // ===== SHOT 5 — Transition to the single door =====
    tl.to("#act1", { opacity: 0, duration: 0.7, ease: "power2.inOut" });
    tl.to("#act2", { opacity: 1, duration: 0.7, ease: "power2.inOut" }, "<");
    tl.addLabel("shot-5");

    // ===== SHOT 6 — Created only the first time =====
    tl.to("#staffA-knock", { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 });
    tl.to("#principal-solo", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, ">-0.1");
    tl.fromTo(
      "#created-ring",
      { opacity: 0.9, scale: 0.5 },
      { opacity: 0, scale: 1.4, duration: 0.6, ease: "power2.out" },
      "<"
    );
    tl.addLabel("shot-6");

    // ===== SHOT 7 — Always the same instance =====
    tl.to("#staffA-knock", { opacity: 0, duration: 0.3 });
    tl.to("#staffB-knock", { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 }, "<");
    tl.to("#exists-badge", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.1");
    tl.addLabel("shot-7");

    // ===== SHOT 8 — The director actually decides, same way every time =====
    tl.to("#staffB-knock", { opacity: 0, duration: 0.3 });
    tl.to("#staffA-knock", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#ask-bubble-a", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.05");
    tl.to("#answer-stamp", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.2");
    tl.to(["#ask-bubble-a", "#answer-stamp"], { opacity: 0, duration: 0.3 }, ">0.6");
    tl.to("#staffA-knock", { opacity: 0, duration: 0.3 }, "<");
    tl.to("#staffB-knock", { opacity: 1, duration: 0.3 }, ">0.05");
    tl.to("#ask-bubble-b", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.05");
    tl.to("#answer-stamp", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.2");
    tl.addLabel("shot-8");

    // ===== SHOT 9 — Naming the concept: freeze + labels =====
    tl.to(["#exists-badge", "#ask-bubble-b", "#answer-stamp", "#staffB-knock"], { opacity: 0, duration: 0.3 });
    tl.to("#dim", { opacity: 0.15, duration: 0.4 }, ">0.05");
    tl.to("#lock-room", { opacity: 1, duration: 0.4 }, "<");
    tl.to("#act3-door-label", { opacity: 1, duration: 0.4 }, ">0.1");
    tl.to(".act3-line-door", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-ctor-label", { opacity: 1, duration: 0.4 }, ">0.15");
    tl.to(".act3-line-ctor", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-keyword", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, ">0.3");
    tl.addLabel("shot-9");
  }, instant);

  // Idle breathing, independent of the master timeline.
  useGSAP(
    () => {
      gsap.to("#principal-solo-breath", { y: -2, duration: 1.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
    },
    { scope }
  );

  return (
    <svg
      ref={scope}
      viewBox="0 0 960 540"
      className="block h-auto w-full"
      role="img"
      aria-label="Singleton: del pasillo con tres puertas que crean un director distinto cada vez, a una sola puerta con un único director, creado una sola vez"
    >
      <defs>
        <linearGradient id="corridor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef0f6" />
          <stop offset="1" stopColor="#dde1ee" />
        </linearGradient>
        <linearGradient id="office" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6e3" />
          <stop offset="1" stopColor="#fbe7c2" />
        </linearGradient>
        <radialGradient id="vig2" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* ===================== ACT 1 — the problem ===================== */}
      <g id="act1">
        <g id="cam1">
          <rect x="-900" y="0" width="2580" height="400" fill="url(#corridor)" />
          <rect x="-900" y="400" width="2580" height="140" fill="#c7ccdc" />

          {/* Door 1 */}
          <g id="door1" transform="translate(190 250)">
            <rect x="-70" y="-150" width="140" height="280" rx="6" fill="#3b3a52" />
            <g id="door1-leaf" transform="translate(-60 -140)" style={{ transformOrigin: "0% 50%" }}>
              <rect x="0" y="0" width="120" height="260" rx="4" fill="#7c8fd6" />
              <circle cx="104" cy="130" r="5" fill="#ffd36b" />
            </g>
            <g id="principal1" transform="translate(0 30)">
              <path d="M-34 90 Q0 36 34 90 Z" fill="#e2574c" />
              <circle cx="0" cy="20" r="30" fill="#f0b489" />
              <path d="M-30 12 Q0 -22 30 12 Q16 -4 0 -2 Q-16 -4 -30 12 Z" fill="#3b2a22" />
              <circle cx="-10" cy="24" r="3" fill="#3b2a22" />
              <circle cx="10" cy="24" r="3" fill="#3b2a22" />
              <path d="M-9 38 q9 7 18 0" stroke="#7a4a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
            <g id="bubble1" transform="translate(60 -10)">
              <rect x="0" y="0" width="160" height="44" rx="12" fill="#2bb673" />
              <path d="M14 44 l-10 14 l20 -14 z" fill="#2bb673" />
              <text x="12" y="27" fontSize="15" fontWeight="700" fill="#fff">¡Sí, hay clase!</text>
            </g>
          </g>

          {/* Door 2 */}
          <g id="door2" transform="translate(770 250)">
            <rect x="-70" y="-150" width="140" height="280" rx="6" fill="#3b3a52" />
            <g id="door2-leaf" transform="translate(-60 -140)" style={{ transformOrigin: "0% 50%" }}>
              <rect x="0" y="0" width="120" height="260" rx="4" fill="#d68a5e" />
              <circle cx="104" cy="130" r="5" fill="#ffd36b" />
            </g>
            <g id="principal2" transform="translate(0 30)">
              <path d="M-34 90 Q0 36 34 90 Z" fill="#5b8def" />
              <circle cx="0" cy="20" r="30" fill="#e8a06a" />
              <path d="M-30 10 Q0 -24 30 10 Q16 -6 0 -4 Q-16 -6 -30 10 Z" fill="#1f1f1f" />
              <rect x="-22" y="14" width="44" height="10" rx="4" fill="#1f1f1f" opacity="0.7" />
              <circle cx="-10" cy="24" r="3" fill="#3b2a22" />
              <circle cx="10" cy="24" r="3" fill="#3b2a22" />
              <path d="M-9 40 q9 -6 18 0" stroke="#7a4a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
            <g id="bubble2" transform="translate(-160 -10)">
              <rect x="0" y="0" width="160" height="44" rx="12" fill="#c0506a" />
              <path d="M146 44 l10 14 l-20 -14 z" fill="#c0506a" />
              <text x="14" y="27" fontSize="14" fontWeight="700" fill="#fff">¡No hay clase!</text>
            </g>
          </g>

          {/* Door 3 — closed throughout, reinforces "many doors" */}
          <g transform="translate(480 250)">
            <rect x="-70" y="-150" width="140" height="280" rx="6" fill="#3b3a52" />
            <rect x="-60" y="-140" width="120" height="260" rx="4" fill="#9fb0e0" />
            <circle cx="44" cy="-10" r="5" fill="#ffd36b" />
          </g>

          <g id="chaos">
            <rect x="60" y="40" width="150" height="60" rx="4" fill="#fff" stroke="#e2574c" strokeWidth="2" transform="rotate(-6 135 70)" />
            <text x="80" y="78" fontSize="14" fontWeight="700" fill="#e2574c" transform="rotate(-6 135 70)">¿Hay clase?!</text>
            <rect x="720" y="50" width="170" height="60" rx="4" fill="#fff" stroke="#c0506a" strokeWidth="2" transform="rotate(5 805 80)" />
            <text x="740" y="88" fontSize="14" fontWeight="700" fill="#c0506a" transform="rotate(5 805 80)">¡Contradicción!</text>
          </g>

          <rect id="tense" x="-900" y="0" width="2580" height="540" fill="#1f2747" style={{ mixBlendMode: "multiply" }} />
          <rect id="vignette" x="-900" y="0" width="2580" height="540" fill="url(#vig2)" />
        </g>
      </g>

      {/* ===================== ACT 2 — the solution ===================== */}
      <g id="act2">
        <g id="cam2">
          <rect x="0" y="0" width="960" height="540" fill="url(#office)" />

          <g id="lock-room" transform="translate(700 150)">
            <rect x="-90" y="-60" width="180" height="160" rx="10" fill="#3b3a52" opacity="0.85" />
            <circle r="22" fill="#1f2747" />
            <rect x="-8" y="-2" width="16" height="20" rx="3" fill="#1f2747" />
          </g>

          <g id="staffA-knock" transform="translate(280 300)">
            <circle r="22" fill="#ffd36b" />
            <text x="0" y="6" textAnchor="middle" fontSize="20">✋</text>
          </g>
          <g id="staffB-knock" transform="translate(280 300)">
            <circle r="22" fill="#7fd0ff" />
            <text x="0" y="6" textAnchor="middle" fontSize="20">✋</text>
          </g>

          <g transform="translate(480 300)">
            <rect x="-90" y="-150" width="180" height="300" rx="8" fill="#3b3a52" />
            <rect x="-76" y="-140" width="152" height="280" rx="4" fill="#e9b04a" />
            <circle cx="60" cy="0" r="6" fill="#fff3d4" />

            <circle id="created-ring" r="50" fill="none" stroke="#2bb673" strokeWidth="4" />

            <g id="principal-solo" transform="translate(0 40)">
              <path d="M-36 96 Q0 38 36 96 Z" fill="#2bb673" />
              <g id="principal-solo-breath">
                <circle cx="0" cy="20" r="32" fill="#f0b489" />
                <path d="M-32 12 Q0 -24 32 12 Q17 -5 0 -3 Q-17 -5 -32 12 Z" fill="#5a3b2e" />
                <circle cx="-11" cy="24" r="3.2" fill="#3b2a22" />
                <circle cx="11" cy="24" r="3.2" fill="#3b2a22" />
                <path d="M-10 39 q10 8 20 0" stroke="#7a4a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            </g>

            <g id="exists-badge" transform="translate(0 -160)">
              <rect x="-66" y="-20" width="132" height="40" rx="20" fill="#1f2747" />
              <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffd36b">✓ ya existe</text>
            </g>
          </g>

          {/* Shot 8 — the director actually deciding, same way every time */}
          <g id="ask-bubble-a" transform="translate(150 235)">
            <rect x="0" y="0" width="170" height="44" rx="12" fill="#fff" stroke="#1f2747" strokeWidth="2" />
            <path d="M150 44 l10 14 l-20 -14 z" fill="#fff" stroke="#1f2747" strokeWidth="2" />
            <text x="14" y="27" fontSize="14" fontWeight="700" fill="#1f2747">¿Hay reunión?</text>
          </g>
          <g id="ask-bubble-b" transform="translate(150 235)">
            <rect x="0" y="0" width="170" height="44" rx="12" fill="#fff" stroke="#1f2747" strokeWidth="2" />
            <path d="M150 44 l10 14 l-20 -14 z" fill="#fff" stroke="#1f2747" strokeWidth="2" />
            <text x="14" y="27" fontSize="14" fontWeight="700" fill="#1f2747">¿Puedo salir?</text>
          </g>
          <g id="answer-stamp" transform="translate(480 60)">
            <rect x="-95" y="-22" width="190" height="44" rx="22" fill="#2bb673" />
            <text x="0" y="6" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">¡Autorizado!</text>
          </g>

          <rect id="dim" x="0" y="0" width="960" height="540" fill="#1b2440" style={{ mixBlendMode: "multiply" }} />

          {/* ===== Act 3 — naming the concept (shot-9) ===== */}
          <g id="act3-labels">
            <line className="act3-line act3-line-door" x1="480" y1="150" x2="270" y2="60" stroke="#1f2747" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-door-label" transform="translate(220 50)">
              <rect x="-110" y="-22" width="220" height="44" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1f2747">Punto de acceso único</text>
            </g>

            <line className="act3-line act3-line-ctor" x1="700" y1="150" x2="780" y2="480" stroke="#1f2747" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-ctor-label" transform="translate(780 500)">
              <rect x="-95" y="-20" width="190" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1f2747">Constructor privado</text>
            </g>

            <g id="act3-keyword" transform="translate(480 500)">
              <rect x="-140" y="-24" width="280" height="48" rx="24" fill="#1f2747" />
              <text x="0" y="6" textAnchor="middle" fontSize="22" fontWeight="800" fill="#ffd36b">Instancia única</text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
