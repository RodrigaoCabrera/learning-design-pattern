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

// Strategy — one continuous, friendly (no-code) directed scene. A traveler wants
// to get from one place to another. Act 1 (#act1, the problem): a single
// know-it-all planner tries to handle EVERY way of travelling at once and gets
// overwhelmed — and each new way means rebuilding that same person. Act 2 (#act2,
// the solution): instead, there is a specialist per way of travelling; you pick
// one and they plot that route, you swap specialists at runtime and the route
// redraws, and adding a new way is just adding a new specialist. Acts are a
// coding/structure concept only — the viewer sees a single flow. Positioned
// elements animate only scale/opacity (never x/y) to avoid the GSAP/SVG
// translate-clobbering gotcha; only the camera groups (#cam1/#cam2) pan with x.
export function StrategyScene({ activeShot, instant = false }: Props) {
  const scope = useDirectorTimeline(activeShot, (tl) => {
    // ---- Initial state ----
    gsap.set("#act1", { opacity: 1 });
    gsap.set("#act2", { opacity: 0 });

    // Act 1 set
    gsap.set("#cam1", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#planner", { opacity: 0, scale: 0.9, transformOrigin: "50% 100%" });
    gsap.set(["#juggle-auto", "#juggle-bici", "#juggle-pie"], { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" });
    gsap.set("#juggle-transit", { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" });
    gsap.set("#overwhelm", { opacity: 0 });
    gsap.set("#tense", { opacity: 0 });
    gsap.set("#vignette", { opacity: 0.2 });

    // Act 2 set
    gsap.set("#cam2", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#dim", { opacity: 0 });
    gsap.set(["#helper-auto", "#helper-bici", "#helper-pie"], { opacity: 0, scale: 0.7, transformOrigin: "50% 100%" });
    gsap.set("#helper-transit", { opacity: 0, scale: 0.7, transformOrigin: "50% 100%" });
    gsap.set(["#glow-auto", "#glow-bici", "#glow-pie", "#glow-transit"], { opacity: 0 });
    gsap.set(["#route-auto", "#route-bici", "#route-pie", "#route-transit"], { opacity: 0 });

    // Act 3 set (naming the concept, shot-9)
    gsap.set(["#act3-ctx-label", "#act3-pick-label", "#act3-each-label", "#act3-keyword"], { opacity: 0 });
    gsap.set([".act3-line"], { opacity: 0 });
    gsap.set("#act3-keyword", { scale: 0.85, transformOrigin: "50% 50%" });

    // ===== SHOT 1 — Establishing: a traveler, a trip from A to B =====
    tl.to("#cam1", { scale: 1.06, duration: 1.1, ease: "power2.out" });
    tl.addLabel("shot-1");

    // ===== SHOT 2 — One know-it-all planner, overwhelmed by every mode =====
    tl.to("#cam1", { scale: 1.14, x: -200, y: 0, duration: 1, ease: "power2.inOut" });
    tl.to("#planner", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, ">-0.1");
    tl.to("#juggle-auto", { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, ">0.05");
    tl.to("#juggle-bici", { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, ">0.08");
    tl.to("#juggle-pie", { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, ">0.08");
    tl.addLabel("shot-2");

    // ===== SHOT 3 — A new mode arrives; the planner is overloaded =====
    tl.to("#juggle-transit", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" });
    tl.to("#overwhelm", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">0.05");
    tl.to("#tense", { opacity: 0.4, duration: 0.8, ease: "power2.in" }, "<");
    tl.to("#vignette", { opacity: 0.55, duration: 0.8, ease: "power2.in" }, "<");
    tl.addLabel("shot-3");

    // ===== SHOT 4 — Transition: a specialist per way of travelling =====
    tl.to("#act1", { opacity: 0, duration: 0.7, ease: "power2.inOut" });
    tl.to("#act2", { opacity: 1, duration: 0.7, ease: "power2.inOut" }, "<");
    tl.to("#helper-auto", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, ">-0.2");
    tl.to("#helper-bici", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, ">0.05");
    tl.to("#helper-pie", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, ">0.05");
    tl.addLabel("shot-4");

    // ===== SHOT 5 — Pick the car specialist → the car route =====
    tl.to("#glow-auto", { opacity: 1, duration: 0.35, ease: "power2.out" });
    tl.to("#route-auto", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">0.05");
    tl.addLabel("shot-5");

    // ===== SHOT 6 — Swap to the bike specialist: same trip, new route =====
    tl.to(["#glow-auto", "#route-auto"], { opacity: 0, duration: 0.3 });
    tl.to("#glow-bici", { opacity: 1, duration: 0.35, ease: "power2.out" }, ">0.05");
    tl.to("#route-bici", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">0.05");
    tl.addLabel("shot-6");

    // ===== SHOT 7 — Swap to the walking specialist: the behavioral beat =====
    tl.to(["#glow-bici", "#route-bici"], { opacity: 0, duration: 0.3 });
    tl.to("#glow-pie", { opacity: 1, duration: 0.35, ease: "power2.out" }, ">0.05");
    tl.to("#route-pie", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">0.05");
    tl.addLabel("shot-7");

    // ===== SHOT 8 — A new specialist joins the team, no rework =====
    tl.to(["#glow-pie", "#route-pie"], { opacity: 0, duration: 0.3 });
    tl.to("#helper-transit", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, ">0.05");
    tl.to("#glow-transit", { opacity: 1, duration: 0.35, ease: "power2.out" }, ">0.1");
    tl.to("#route-transit", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">0.05");
    tl.addLabel("shot-8");

    // ===== SHOT 9 — Naming the concept: freeze + labels =====
    tl.to("#dim", { opacity: 0.15, duration: 0.4 });
    tl.to("#act3-ctx-label", { opacity: 1, duration: 0.4 }, ">0.1");
    tl.to(".act3-line-ctx", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-each-label", { opacity: 1, duration: 0.4 }, ">0.12");
    tl.to(".act3-line-each", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-pick-label", { opacity: 1, duration: 0.4 }, ">0.12");
    tl.to(".act3-line-pick", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-keyword", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, ">0.25");
    tl.addLabel("shot-9");
  }, instant);

  // Idle life, independent of the master timeline: destination pin pulse.
  useGSAP(
    () => {
      gsap.to("#dest-pulse", {
        scale: 1.5,
        opacity: 0,
        duration: 1.4,
        repeat: -1,
        ease: "power1.out",
        transformOrigin: "50% 50%",
      });
    },
    { scope }
  );

  return (
    <svg
      ref={scope}
      viewBox="0 0 960 540"
      className="block h-auto w-full"
      role="img"
      aria-label="Strategy: de una sola persona que intenta encargarse de todas las formas de viajar y se satura, a un especialista por cada forma de viajar que podés elegir y cambiar cuando quieras"
    >
      <defs>
        <linearGradient id="cityCold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7ebf5" />
          <stop offset="1" stopColor="#d4d9ea" />
        </linearGradient>
        <linearGradient id="cityWarm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7e9" />
          <stop offset="1" stopColor="#fce8c6" />
        </linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eaf3ff" />
          <stop offset="1" stopColor="#d3e6ff" />
        </linearGradient>
        <radialGradient id="vigS" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* ===================== ACT 1 — the problem ===================== */}
      <g id="act1">
        <g id="cam1">
          <rect x="-400" y="0" width="1760" height="540" fill="url(#cityCold)" />
          <rect x="-400" y="430" width="1760" height="110" fill="#c7ccdc" />

          {/* The traveler with a simple map sign: from one place to another */}
          <g transform="translate(240 280)">
            <rect x="-120" y="-150" width="240" height="210" rx="16" fill="#fff" stroke="#2a2f45" strokeWidth="3" />
            <text x="0" y="-118" textAnchor="middle" fontSize="16" fontWeight="800" fill="#2a2f45">¿Cómo llego?</text>
            {/* start */}
            <g transform="translate(-78 -70)">
              <circle r="13" fill="#1f6feb" />
              <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">A</text>
            </g>
            {/* dashed wandering path */}
            <path d="M-66 -64 q60 10 70 50 q-50 20 -10 50" stroke="#9fb0c8" strokeWidth="4" fill="none" strokeDasharray="5 7" />
            {/* destination */}
            <g transform="translate(70 38)">
              <circle r="13" fill="#e2574c" />
              <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">B</text>
            </g>
          </g>

          {/* The single know-it-all planner, overwhelmed by every mode at once */}
          <g id="planner" transform="translate(700 300)">
            <path d="M-58 150 Q0 60 58 150 Z" fill="#5566aa" />
            <circle cx="0" cy="34" r="44" fill="#f0b489" />
            <path d="M-44 22 Q0 -30 44 22 Q22 -2 0 2 Q-22 -2 -44 22 Z" fill="#3b2a22" />
            <circle cx="-16" cy="38" r="4.5" fill="#3b2a22" />
            <circle cx="16" cy="38" r="4.5" fill="#3b2a22" />
            {/* worried mouth */}
            <path d="M-14 62 q14 -10 28 0" stroke="#7a4a3a" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* sweat drops */}
            <path d="M40 4 q6 10 0 16 q-6 -6 0 -16" fill="#7fd0ff" />
            <path d="M-44 6 q6 10 0 16 q-6 -6 0 -16" fill="#7fd0ff" />

            {/* every mode juggled around the head at once */}
            <g id="juggle-auto" transform="translate(-78 -52)">
              <circle r="26" fill="#fff" stroke="#1f6feb" strokeWidth="3" />
              <text x="0" y="8" textAnchor="middle" fontSize="24">🚗</text>
            </g>
            <g id="juggle-bici" transform="translate(0 -94)">
              <circle r="26" fill="#fff" stroke="#2bb673" strokeWidth="3" />
              <text x="0" y="8" textAnchor="middle" fontSize="24">🚲</text>
            </g>
            <g id="juggle-pie" transform="translate(78 -52)">
              <circle r="26" fill="#fff" stroke="#e8a23a" strokeWidth="3" />
              <text x="0" y="8" textAnchor="middle" fontSize="24">🚶</text>
            </g>
            {/* the new mode that tips them over the edge */}
            <g id="juggle-transit" transform="translate(96 6)">
              <circle r="26" fill="#fff" stroke="#8a5cf6" strokeWidth="3" />
              <text x="0" y="8" textAnchor="middle" fontSize="24">🚌</text>
            </g>
            {/* overload marks */}
            <g id="overwhelm">
              <text x="-96" y="-96" fontSize="30" fontWeight="800" fill="#e2574c">?!</text>
              <text x="96" y="-96" fontSize="30" fontWeight="800" fill="#e2574c">!?</text>
              <path d="M-30 -118 q30 -16 60 0" stroke="#e2574c" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          </g>

          <rect id="tense" x="-400" y="0" width="1760" height="540" fill="#1f2747" style={{ mixBlendMode: "multiply" }} />
          <rect id="vignette" x="-400" y="0" width="1760" height="540" fill="url(#vigS)" />
        </g>
      </g>

      {/* ===================== ACT 2 — the solution ===================== */}
      <g id="act2">
        <g id="cam2">
          <rect x="-200" y="0" width="1360" height="540" fill="url(#cityWarm)" />
          <rect x="-200" y="430" width="1360" height="110" fill="#eccf97" />

          {/* The traveler's map (the context): shows whatever route the picked specialist plots */}
          <g transform="translate(70 110)">
            <rect x="0" y="0" width="320" height="300" rx="16" fill="#2a2f45" />
            <rect x="16" y="16" width="288" height="268" rx="8" fill="url(#screen)" />
            {/* map roads */}
            <path d="M40 150 L280 150 M120 40 L120 260 M210 40 L210 260" stroke="#bcd2ee" strokeWidth="6" fill="none" />
            {/* route layers (toggled per chosen specialist) */}
            <polyline id="route-auto" points="70,80 210,80 210,210 250,210" fill="none" stroke="#1f6feb" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
            <polyline id="route-bici" points="70,80 120,160 210,190 250,210" fill="none" stroke="#2bb673" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
            <polyline id="route-pie" points="70,80 95,140 150,160 185,210 250,210" fill="none" stroke="#e8a23a" strokeWidth="7" strokeDasharray="3 9" strokeLinejoin="round" strokeLinecap="round" />
            <polyline id="route-transit" points="70,80 150,130 210,170 250,210" fill="none" stroke="#8a5cf6" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
            {/* origin A */}
            <g transform="translate(70 80)">
              <circle r="12" fill="#1f6feb" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">A</text>
            </g>
            {/* destination B + idle pulse */}
            <g transform="translate(250 210)">
              <circle id="dest-pulse" r="12" fill="#e2574c" opacity="0.5" />
              <circle r="12" fill="#e2574c" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">B</text>
            </g>
          </g>

          {/* The team of specialists — pick one, they plot that route */}
          <g transform="translate(450 60)">
            <text x="230" y="20" textAnchor="middle" fontSize="15" fontWeight="800" fill="#9a7b3c">un especialista por cada forma de viajar</text>

            {/* Car specialist */}
            <g id="helper-auto" transform="translate(80 250)">
              <circle id="glow-auto" r="62" fill="#1f6feb" opacity="0.18" />
              <path d="M-40 96 Q0 36 40 96 Z" fill="#1f6feb" />
              <circle cx="0" cy="18" r="30" fill="#f0b489" />
              <path d="M-30 8 Q0 -28 30 8 Q16 -8 0 -4 Q-16 -8 -30 8 Z" fill="#3b2a22" />
              <circle cx="-10" cy="22" r="3.2" fill="#3b2a22" />
              <circle cx="10" cy="22" r="3.2" fill="#3b2a22" />
              <g transform="translate(0 -52)">
                <circle r="22" fill="#fff" stroke="#1f6feb" strokeWidth="3" />
                <text x="0" y="7" textAnchor="middle" fontSize="20">🚗</text>
              </g>
            </g>

            {/* Bike specialist */}
            <g id="helper-bici" transform="translate(230 250)">
              <circle id="glow-bici" r="62" fill="#2bb673" opacity="0.18" />
              <path d="M-40 96 Q0 36 40 96 Z" fill="#2bb673" />
              <circle cx="0" cy="18" r="30" fill="#e8a06a" />
              <path d="M-30 6 Q0 -30 30 6 Q16 -10 0 -6 Q-16 -10 -30 6 Z" fill="#5a3b2e" />
              <circle cx="-10" cy="22" r="3.2" fill="#3b2a22" />
              <circle cx="10" cy="22" r="3.2" fill="#3b2a22" />
              <g transform="translate(0 -52)">
                <circle r="22" fill="#fff" stroke="#2bb673" strokeWidth="3" />
                <text x="0" y="7" textAnchor="middle" fontSize="20">🚲</text>
              </g>
            </g>

            {/* Walking specialist */}
            <g id="helper-pie" transform="translate(380 250)">
              <circle id="glow-pie" r="62" fill="#e8a23a" opacity="0.2" />
              <path d="M-40 96 Q0 36 40 96 Z" fill="#e8a23a" />
              <circle cx="0" cy="18" r="30" fill="#f0b489" />
              <path d="M-30 10 Q0 -26 30 10 Q16 -6 0 -2 Q-16 -6 -30 10 Z" fill="#2b2b2b" />
              <circle cx="-10" cy="22" r="3.2" fill="#3b2a22" />
              <circle cx="10" cy="22" r="3.2" fill="#3b2a22" />
              <g transform="translate(0 -52)">
                <circle r="22" fill="#fff" stroke="#e8a23a" strokeWidth="3" />
                <text x="0" y="7" textAnchor="middle" fontSize="20">🚶</text>
              </g>
            </g>

            {/* Transit specialist — joins the team only in shot 8 */}
            <g id="helper-transit" transform="translate(380 80)">
              <circle id="glow-transit" r="62" fill="#8a5cf6" opacity="0.2" />
              <path d="M-40 96 Q0 36 40 96 Z" fill="#8a5cf6" />
              <circle cx="0" cy="18" r="30" fill="#e8a06a" />
              <path d="M-30 8 Q0 -28 30 8 Q16 -8 0 -4 Q-16 -8 -30 8 Z" fill="#3b2a22" />
              <circle cx="-10" cy="22" r="3.2" fill="#3b2a22" />
              <circle cx="10" cy="22" r="3.2" fill="#3b2a22" />
              <g transform="translate(0 -52)">
                <circle r="22" fill="#fff" stroke="#8a5cf6" strokeWidth="3" />
                <text x="0" y="7" textAnchor="middle" fontSize="20">🚌</text>
              </g>
            </g>
          </g>

          <rect id="dim" x="-200" y="0" width="1360" height="540" fill="#1b2440" style={{ mixBlendMode: "multiply" }} />

          {/* ===== Act 3 — naming the concept (shot-9) ===== */}
          <g id="act3-labels">
            <line className="act3-line act3-line-ctx" x1="230" y1="150" x2="230" y2="60" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-ctx-label" transform="translate(230 40)">
              <rect x="-72" y="-20" width="144" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1f2747">El viajero</text>
            </g>

            <line className="act3-line act3-line-each" x1="530" y1="310" x2="530" y2="430" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-each-label" transform="translate(530 452)">
              <rect x="-110" y="-20" width="220" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1f2747">Cada forma de viajar</text>
            </g>

            <line className="act3-line act3-line-pick" x1="830" y1="310" x2="880" y2="370" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-pick-label" transform="translate(810 392)">
              <rect x="-120" y="-20" width="240" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1f2747">El que elegís ahora</text>
            </g>

            <g id="act3-keyword" transform="translate(480 502)">
              <rect x="-175" y="-24" width="350" height="48" rx="24" fill="#1f2747" />
              <text x="0" y="6" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffd36b">Estrategia intercambiable</text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
