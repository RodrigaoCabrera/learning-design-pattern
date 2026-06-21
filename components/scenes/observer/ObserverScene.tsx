"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDirectorTimeline } from "./useDirectorTimeline";

type Props = {
  /** Active shot id (shot-1 … shot-10). One continuous flow for the viewer. */
  activeShot: string;
  /** Snap instantly to the shot's end state instead of tweening to it. */
  instant?: boolean;
};

const CARD_COUNT = 30;
const COLS = 6;
const ROWS = 5;
const SKIN = ["#ffb27a", "#f0b489", "#e8a06a", "#ffc59e"];
const LEAVING_INDEX = 14;

function memberPos(i: number) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return { x: 410 + col * 84, y: 178 + row * 66 };
}

// Observer — one continuous directed scene. Internally it has two "sets":
// Act 1 (#act1, the problem) and Act 2 (#act2, the solution). The master timeline
// crossfades between them at shot-6. Acts are a coding/structure concept only —
// the viewer sees a single flow. Positioned elements only animate scale/opacity
// (never x/y) to avoid the GSAP/SVG translate-clobbering gotcha.
export function ObserverScene({ activeShot, instant = false }: Props) {
  const counter = useRef<SVGTextElement>(null);

  const scope = useDirectorTimeline(activeShot, (tl) => {
    // ---- Initial state ----
    // Layers: Act 1 visible, Act 2 hidden.
    gsap.set("#act1", { opacity: 1 });
    gsap.set("#act2", { opacity: 0 });

    // Act 1 set
    gsap.set("#cam1", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#clock", { opacity: 0 });
    gsap.set("#counter-group", { opacity: 0 });
    gsap.set(".call-card", { scale: 0, transformOrigin: "center center" });
    gsap.set("#notebook", { opacity: 0, x: 40 });
    gsap.set("#strike", { scaleX: 0, transformOrigin: "left center" });
    gsap.set("#new-contact", { opacity: 0 });
    gsap.set("#burden", { opacity: 0, y: -40 });
    gsap.set("#tense", { opacity: 0 });
    gsap.set("#vignette", { opacity: 0.2 });
    gsap.set("#sweat", { opacity: 0, y: -6 });
    gsap.set("#zzz", { opacity: 0 });
    gsap.set("#phone-glow", { opacity: 0 });
    gsap.set(["#exp-focus", "#exp-tired", "#exp-worried", "#exp-dead"], { opacity: 0 });
    gsap.set("#exp-fresh", { opacity: 1 });
    if (counter.current) counter.current.textContent = "0";

    // Act 2 set
    gsap.set("#cam2", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#dim", { opacity: 0.4 });
    gsap.set("#group-panel", { opacity: 0, scale: 0.92, transformOrigin: "50% 50%" });
    gsap.set("#msg-bubble", { opacity: 0, scale: 0.6, transformOrigin: "0% 100%" });
    gsap.set("#badge", { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" });
    gsap.set("#tea", { opacity: 0 });
    gsap.set(".wave", { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(".mem-ring", { opacity: 0, scale: 0.5, transformOrigin: "center center" });
    gsap.set(".mem-check", { opacity: 0 });
    gsap.set("#member-joining", { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(".robot", { opacity: 0, scale: 0, transformOrigin: "50% 100%" });
    gsap.set("#robot-alarm-flash", { opacity: 0 });

    // ===== SHOT 1 — Establishing =====
    tl.to("#cam1", { scale: 1.05, duration: 1.2, ease: "power2.out" });
    tl.addLabel("shot-1");

    // ===== SHOT 2 — The first call =====
    tl.to("#cam1", { scale: 1.18, x: -60, y: -10, duration: 1, ease: "power2.inOut" });
    tl.to("#exp-fresh", { opacity: 0, duration: 0.3 }, "<");
    tl.to("#exp-focus", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#clock", { opacity: 1, duration: 0.4 }, "<");
    tl.to("#counter-group", { opacity: 1, duration: 0.4 }, "<");
    tl.to("#phone-glow", { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 }, "<");
    tl.add(() => setCounter(counter, 1));
    tl.to(".call-card-first", { scale: 1, duration: 0.3, ease: "back.out(2.5)" });
    tl.addLabel("shot-2");

    // ===== SHOT 3 — Exhaustion (the time-lapse) =====
    tl.to("#cam1", { scale: 1.0, x: 0, y: 0, duration: 0.8, ease: "power2.inOut" });
    tl.to("#exp-focus", { opacity: 0, duration: 0.4 }, "<");
    tl.to("#exp-tired", { opacity: 1, duration: 0.4 }, "<");
    const proxy = { n: 1 };
    tl.to(
      proxy,
      { n: CARD_COUNT, duration: 4, ease: "power1.in", onUpdate: () => setCounter(counter, Math.round(proxy.n)) },
      "<"
    );
    tl.to("#min-hand", { rotation: 360 * 9, transformOrigin: "bottom center", duration: 4, ease: "power1.in" }, "<");
    tl.to("#hour-hand", { rotation: 360 * 1.6, transformOrigin: "bottom center", duration: 4, ease: "power1.in" }, "<");
    tl.to(".call-card-rest", { scale: 1, duration: 0.25, ease: "back.out(2)", stagger: { each: 4 / CARD_COUNT } }, "<");
    tl.to("#prof-body", { rotation: 7, y: 8, transformOrigin: "bottom center", duration: 4, ease: "power2.in" }, "<");
    tl.to("#prof-head", { y: 14, rotation: 9, transformOrigin: "center center", duration: 4, ease: "power2.in" }, "<");
    tl.to("#tense", { opacity: 0.45, duration: 4, ease: "power2.in" }, "<");
    tl.to("#vignette", { opacity: 0.5, duration: 4, ease: "power2.in" }, "<");
    tl.to("#sweat", { opacity: 1, y: 14, duration: 0.7, repeat: 2 }, ">-2");
    tl.to("#cam1-shake", { keyframes: { x: [0, -4, 4, -3, 2, 0], y: [0, 2, -2, 1, -1, 0] }, duration: 0.6, repeat: 3, ease: "none" }, ">-2.5");
    tl.addLabel("shot-3");

    // ===== SHOT 4 — The list, by hand =====
    tl.to("#cam1", { scale: 1.12, x: 120, y: 10, duration: 0.9, ease: "power2.inOut" });
    tl.to("#exp-tired", { opacity: 0, duration: 0.4 }, "<");
    tl.to("#exp-worried", { opacity: 1, duration: 0.4 }, "<");
    tl.to("#notebook", { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "<0.2");
    tl.to("#strike", { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, ">-0.1");
    tl.to("#new-contact", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">0.1");
    tl.addLabel("shot-4");

    // ===== SHOT 5 — The burden =====
    tl.to("#cam1", { scale: 1.0, x: 0, y: 0, duration: 0.7, ease: "power2.inOut" });
    tl.to("#notebook", { opacity: 0, duration: 0.4 }, "<");
    tl.to("#exp-worried", { opacity: 0, duration: 0.4 }, "<");
    tl.to("#exp-dead", { opacity: 1, duration: 0.4 }, "<");
    tl.to("#prof-head", { y: 26, duration: 0.6, ease: "power2.in" }, "<");
    tl.to("#prof-body", { y: 16, duration: 0.6, ease: "power2.in" }, "<");
    tl.to("#burden", { opacity: 1, y: 0, duration: 0.7, ease: "bounce.out" }, "<0.1");
    tl.to("#zzz", { opacity: 0.9, duration: 0.5 }, ">-0.2");
    tl.to("#vignette", { opacity: 0.62, duration: 0.7 }, "<");
    tl.addLabel("shot-5");

    // ===== SHOT 6 — Transition: crossfade to the WhatsApp group, mood brightens =====
    tl.to("#act1", { opacity: 0, duration: 0.7, ease: "power2.inOut" });
    tl.to("#act2", { opacity: 1, duration: 0.7, ease: "power2.inOut" }, "<");
    tl.to("#dim", { opacity: 0, duration: 0.9, ease: "power2.out" }, "<");
    tl.to("#group-panel", { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, "<0.15");
    tl.to("#prof-happy", { opacity: 1, duration: 0.4 }, "<");
    tl.addLabel("shot-6");

    // ===== SHOT 7 — One message → 30 receive, at once =====
    tl.to("#msg-bubble", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" });
    tl.to(".wave", { opacity: 0.5, scale: 1, duration: 0.1 }, ">");
    tl.to(".wave", { scale: 3.2, opacity: 0, duration: 0.9, ease: "power2.out", stagger: 0.12 }, "<");
    tl.fromTo(
      ".mem-ring",
      { opacity: 0.9, scale: 0.5 },
      { opacity: 0, scale: 1.25, duration: 0.7, ease: "power2.out", stagger: { each: 0.012, from: "center" } },
      "<0.25"
    );
    tl.to(".member-face", { scale: 1.14, duration: 0.18, yoyo: true, repeat: 1, transformOrigin: "center center", stagger: { each: 0.012, from: "center" } }, "<");
    tl.to("#badge", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "<0.2");
    tl.addLabel("shot-7");

    // ===== SHOT 8 — Independence: he relaxes; read receipts appear on their own =====
    tl.to("#prof-happy", { opacity: 0, duration: 0.3 });
    tl.to("#prof-relaxed", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#tea", { opacity: 1, duration: 0.4, ease: "power2.out" }, "<");
    tl.to(".mem-check", { opacity: 1, duration: 0.5, stagger: { each: 0.03, from: "start" } }, "<0.1");
    tl.addLabel("shot-8");

    // ===== SHOT 9 — Dynamic membership: one leaves, one joins; he doesn't move =====
    tl.to(`#member-${LEAVING_INDEX}`, { opacity: 0, scale: 0, duration: 0.5, ease: "back.in(1.6)", transformOrigin: "center center" });
    tl.to("#member-joining", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, ">0.2");
    tl.fromTo("#join-ring", { opacity: 0.9, scale: 0.5 }, { opacity: 0, scale: 1.3, duration: 0.6, transformOrigin: "center center" }, "<");
    tl.addLabel("shot-9");

    // ===== SHOT 10 — Extensibility: a Logger and an Alarm subscribe too =====
    tl.to(".robot", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)", stagger: 0.15 });
    tl.to(".wave", { opacity: 0.45, scale: 1, duration: 0.1 }, ">0.1");
    tl.to(".wave", { scale: 3.2, opacity: 0, duration: 0.9, ease: "power2.out", stagger: 0.12 }, "<");
    tl.to(".robot-face", { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, transformOrigin: "center center", stagger: 0.1 }, "<0.2");
    tl.to("#robot-alarm-flash", { opacity: 0.8, duration: 0.25, yoyo: true, repeat: 5 }, "<");
    tl.addLabel("shot-10");
  }, instant);

  // Idle breathing, independent of the master timeline.
  useGSAP(
    () => {
      gsap.to("#prof-breath", { y: -3, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
    },
    { scope }
  );

  return (
    <svg
      ref={scope}
      viewBox="0 0 960 540"
      className="block h-auto w-full"
      role="img"
      aria-label="Observer: del profesor que llama uno por uno al grupo de WhatsApp donde todos reciben a la vez"
    >
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ecd9" />
          <stop offset="1" stopColor="#ecdcc0" />
        </linearGradient>
        <radialGradient id="vig" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="deskg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c89668" />
          <stop offset="1" stopColor="#a9774b" />
        </linearGradient>
        <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9fbf1" />
          <stop offset="1" stopColor="#d4f3e1" />
        </linearGradient>
      </defs>

      {/* ===================== ACT 1 — the problem ===================== */}
      <g id="act1">
        <g id="cam1">
          <g id="cam1-shake">
            <rect x="-220" y="0" width="1400" height="400" fill="url(#wall)" />
            <rect x="-220" y="400" width="1400" height="140" fill="#d8c4a0" />

            <g id="clock" transform="translate(120 110)">
              <circle r="52" fill="#fffdf7" stroke="#3b3a52" strokeWidth="5" />
              <circle r="4" fill="#3b3a52" />
              <line id="hour-hand" x1="0" y1="0" x2="0" y2="-26" stroke="#3b3a52" strokeWidth="6" strokeLinecap="round" />
              <line id="min-hand" x1="0" y1="0" x2="0" y2="-40" stroke="#5b8def" strokeWidth="4" strokeLinecap="round" />
            </g>

            <g id="counter-group" transform="translate(810 108)">
              <rect x="-86" y="-54" width="172" height="108" rx="18" fill="#1f2747" />
              <text ref={counter} x="0" y="12" textAnchor="middle" fontSize="72" fontWeight="800" fill="#ffd36b" fontFamily="var(--font-mono)">
                0
              </text>
              <text x="0" y="42" textAnchor="middle" fontSize="18" fontWeight="700" fill="#9fb0e0">
                / 30 llamados
              </text>
            </g>

            <rect x="250" y="392" width="460" height="120" rx="10" fill="url(#deskg)" />
            <rect x="250" y="392" width="460" height="14" rx="7" fill="#dcae80" />

            <g id="professor" transform="translate(360 250)">
              <g id="prof-body">
                <path d="M-58 150 Q0 70 58 150 Z" fill="#5b8def" />
                <rect x="-58" y="150" width="116" height="30" fill="#5b8def" />
              </g>
              <g id="prof-arm">
                <rect x="34" y="78" width="18" height="64" rx="9" fill="#4a78d8" transform="rotate(28 34 78)" />
              </g>
              <g id="prof-head">
                <g id="prof-breath">
                  <circle cx="0" cy="40" r="38" fill="#f0b489" />
                  <path d="M-38 30 Q0 -16 38 30 Q20 6 0 8 Q-20 6 -38 30 Z" fill="#5a3b2e" />

                  <g id="exp-fresh" stroke="#3b2a22" strokeWidth="3" strokeLinecap="round" fill="none">
                    <path d="M-20 33 q7 -4 13 1" />
                    <path d="M20 33 q-7 -4 -13 1" />
                    <circle cx="-13" cy="42" r="3.5" fill="#3b2a22" stroke="none" />
                    <circle cx="13" cy="42" r="3.5" fill="#3b2a22" stroke="none" />
                    <path d="M-12 57 q12 10 24 0" stroke="#7a4a3a" />
                  </g>
                  <g id="exp-focus" stroke="#3b2a22" strokeWidth="3" strokeLinecap="round" fill="none">
                    <path d="M-20 35 q7 -2 13 0" />
                    <path d="M20 35 q-7 -2 -13 0" />
                    <circle cx="-12" cy="43" r="3" fill="#3b2a22" stroke="none" />
                    <circle cx="14" cy="43" r="3" fill="#3b2a22" stroke="none" />
                    <path d="M-8 59 h18" stroke="#7a4a3a" />
                  </g>
                  <g id="exp-tired" stroke="#3b2a22" strokeWidth="3" strokeLinecap="round" fill="none">
                    <path d="M-20 36 q7 2 13 1" />
                    <path d="M20 36 q-7 2 -13 1" />
                    <path d="M-19 44 q6 4 12 0" />
                    <path d="M7 44 q6 4 12 0" />
                    <ellipse cx="2" cy="60" rx="6" ry="4" fill="#7a4a3a" stroke="none" />
                  </g>
                  <g id="exp-worried" stroke="#3b2a22" strokeWidth="3" strokeLinecap="round" fill="none">
                    <path d="M-21 31 l13 5" />
                    <path d="M21 31 l-13 5" />
                    <circle cx="-13" cy="43" r="3.5" fill="#3b2a22" stroke="none" />
                    <circle cx="13" cy="43" r="3.5" fill="#3b2a22" stroke="none" />
                    <path d="M-11 61 q11 -8 22 0" stroke="#7a4a3a" />
                  </g>
                  <g id="exp-dead" stroke="#3b2a22" strokeWidth="3" strokeLinecap="round" fill="none">
                    <path d="M-19 40 q6 7 12 0" />
                    <path d="M7 40 q6 7 12 0" />
                    <path d="M-12 60 q6 -6 12 0 q6 6 12 0" stroke="#7a4a3a" />
                  </g>

                  <path id="sweat" d="M44 6 q6 8 0 14 q-6 -6 0 -14 Z" fill="#7fd0ff" />
                  <text id="zzz" x="70" y="0" fontSize="24" fontWeight="800" fill="#8a90a6">z z Z</text>
                </g>
              </g>
              <rect x="40" y="36" width="18" height="34" rx="5" fill="#26304d" transform="rotate(18 40 36)" />
              <rect id="phone-glow" x="40" y="36" width="18" height="34" rx="5" fill="#7fd0ff" transform="rotate(18 40 36)" />
            </g>

            <g id="cards" transform="translate(560 250)">
              {Array.from({ length: CARD_COUNT }).map((_, i) => {
                const col = i % 6;
                const row = Math.floor(i / 6);
                return (
                  <g
                    key={i}
                    className={`call-card ${i === 0 ? "call-card-first" : "call-card-rest"}`}
                    transform={`translate(${col * 26} ${-row * 16})`}
                  >
                    <rect x="0" y="0" width="46" height="30" rx="6" fill="#ffffff" stroke="#cdd6ee" strokeWidth="1.5" />
                    <circle cx="11" cy="15" r="6" fill="#2bb673" />
                    <path d="M8 15 l2 3 l5 -6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="22" y="9" width="18" height="4" rx="2" fill="#c7cee0" />
                    <rect x="22" y="17" width="12" height="4" rx="2" fill="#dde2ee" />
                  </g>
                );
              })}
            </g>

            <g transform="translate(610 250)">
              <g id="notebook">
                <rect x="0" y="0" width="230" height="200" rx="12" fill="#fffdf7" stroke="#d9cdb5" strokeWidth="3" />
                <rect x="0" y="0" width="230" height="38" rx="12" fill="#e9b04a" />
                <text x="16" y="26" fontSize="18" fontWeight="800" fill="#fff">Contactos</text>
                {["Ana", "Bruno", "Carla"].map((n, i) => (
                  <g key={n} transform={`translate(20 ${70 + i * 34})`}>
                    <circle cx="6" cy="-5" r="6" fill="#5b8def" />
                    <text x="22" y="0" fontSize="18" fill="#3b3a52">{n}</text>
                  </g>
                ))}
                <line id="strike" x1="20" y1="99" x2="150" y2="99" stroke="#e2574c" strokeWidth="3" strokeLinecap="round" />
                <g id="new-contact" transform="translate(20 172)">
                  <circle cx="6" cy="-5" r="6" fill="#2bb673" />
                  <text x="22" y="0" fontSize="18" fill="#2bb673">Diego ✎</text>
                </g>
              </g>
            </g>

            <g transform="translate(300 296)">
              <g id="burden">
                <rect x="-4" y="86" width="128" height="22" rx="5" fill="#e0a93e" />
                <rect x="4" y="68" width="112" height="20" rx="3" fill="#ffffff" stroke="#d9cdb5" strokeWidth="1.5" transform="rotate(-2 60 78)" />
                <rect x="2" y="50" width="116" height="20" rx="3" fill="#fdeccb" stroke="#e6d4ad" strokeWidth="1.5" transform="rotate(2 60 60)" />
                <rect x="6" y="32" width="108" height="20" rx="3" fill="#ffffff" stroke="#d9cdb5" strokeWidth="1.5" transform="rotate(-3 60 42)" />
                <rect x="0" y="14" width="118" height="20" rx="3" fill="#ffd7d0" stroke="#f0b8ae" strokeWidth="1.5" transform="rotate(3 60 24)" />
                <rect x="8" y="-4" width="104" height="20" rx="3" fill="#ffffff" stroke="#d9cdb5" strokeWidth="1.5" transform="rotate(-1 60 6)" />
                <rect x="16" y="2" width="60" height="3" rx="1.5" fill="#c7cee0" />
                <rect x="16" y="8" width="40" height="3" rx="1.5" fill="#dde2ee" />
                <text x="120" y="-8" fontSize="20" fontWeight="800" fill="#e2574c">!</text>
              </g>
            </g>

            <rect id="tense" x="-220" y="0" width="1400" height="540" fill="#1f2747" style={{ mixBlendMode: "multiply" }} />
            <rect id="vignette" x="-220" y="0" width="1400" height="540" fill="url(#vig)" />
          </g>
        </g>
      </g>

      {/* ===================== ACT 2 — the solution ===================== */}
      <g id="act2">
        <g id="cam2">
          <rect x="0" y="0" width="960" height="540" fill="url(#bg2)" />

          <g transform="translate(150 300)">
            <path d="M-52 130 Q0 64 52 130 Z" fill="#25a06a" />
            <rect x="-52" y="130" width="104" height="26" fill="#25a06a" />
            <rect x="34" y="60" width="20" height="36" rx="5" fill="#0d8a52" />
            <circle cx="0" cy="38" r="34" fill="#f0b489" />
            <path d="M-34 28 Q0 -14 34 28 Q18 6 0 8 Q-18 6 -34 28 Z" fill="#5a3b2e" />
            <g id="prof-happy" stroke="#3b2a22" strokeWidth="3" strokeLinecap="round" fill="none">
              <circle cx="-12" cy="38" r="3.4" fill="#3b2a22" stroke="none" />
              <circle cx="12" cy="38" r="3.4" fill="#3b2a22" stroke="none" />
              <path d="M-12 50 q12 11 24 0" stroke="#7a4a3a" />
            </g>
            <g id="prof-relaxed" opacity="0" stroke="#3b2a22" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M-18 38 q6 4 12 0" />
              <path d="M6 38 q6 4 12 0" />
              <path d="M-10 50 q10 8 20 0" stroke="#7a4a3a" />
            </g>
            <g id="tea" transform="translate(-70 70)">
              <rect x="-12" y="0" width="24" height="18" rx="3" fill="#fff" stroke="#9bb1a6" strokeWidth="2" />
              <path d="M12 4 q10 5 0 10" stroke="#9bb1a6" strokeWidth="2" fill="none" />
              <path d="M-6 -6 q-3 -6 0 -10 M2 -6 q-3 -6 0 -10" stroke="#bcae9a" strokeWidth="2" fill="none" />
            </g>
          </g>

          <g id="msg-bubble" transform="translate(95 165)">
            <rect x="0" y="0" width="200" height="46" rx="12" fill="#25d366" />
            <path d="M40 46 l-10 16 l24 -16 z" fill="#25d366" />
            <text x="14" y="29" fontSize="17" fontWeight="700" fill="#fff">¡Hay tarea! 📚</text>
          </g>

          <g id="group-panel">
            <rect x="330" y="80" width="580" height="400" rx="20" fill="#ffffff" stroke="#bfe9d2" strokeWidth="2" />
            <rect x="330" y="80" width="580" height="56" rx="20" fill="#128c7e" />
            <rect x="330" y="116" width="580" height="20" fill="#128c7e" />
            <text x="356" y="116" fontSize="22" fontWeight="800" fill="#fff">Padres del 3°B</text>
            <text x="884" y="116" textAnchor="end" fontSize="16" fontWeight="700" fill="#cdeee0">30 miembros</text>

            {Array.from({ length: COLS * ROWS }).map((_, i) => {
              const { x, y } = memberPos(i);
              return (
                <g key={i} id={`member-${i}`} transform={`translate(${x} ${y})`}>
                  <circle className="mem-ring" r="24" fill="none" stroke="#25d366" strokeWidth="3" />
                  <g className="member-face">
                    <circle r="18" fill={SKIN[i % SKIN.length]} />
                    <circle cx="-5" cy="-2" r="2" fill="#3b2a22" />
                    <circle cx="5" cy="-2" r="2" fill="#3b2a22" />
                    <path d="M-5 5 q5 4 10 0" stroke="#7a4a3a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                  </g>
                  <g className="mem-check" transform="translate(7 -15)">
                    <path d="M-7 0 l3 3 l7 -8" stroke="#34b7f1" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M-2 0 l3 3 l7 -8" stroke="#34b7f1" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </g>
              );
            })}

            <g id="member-joining" transform={`translate(${memberPos(LEAVING_INDEX).x} ${memberPos(LEAVING_INDEX).y})`}>
              <circle id="join-ring" r="24" fill="none" stroke="#5b8def" strokeWidth="3" />
              <circle r="18" fill="#9ad0ff" />
              <circle cx="-5" cy="-2" r="2" fill="#3b2a22" />
              <circle cx="5" cy="-2" r="2" fill="#3b2a22" />
              <path d="M-5 5 q5 4 10 0" stroke="#7a4a3a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </g>

            <g className="robot" transform="translate(520 452)">
              <g className="robot-face">
                <rect x="-22" y="-20" width="44" height="40" rx="10" fill="#6c7a99" />
                <line x1="0" y1="-20" x2="0" y2="-30" stroke="#6c7a99" strokeWidth="3" />
                <circle cx="0" cy="-30" r="3" fill="#6c7a99" />
                <circle cx="-8" cy="-4" r="4" fill="#cfe8ff" />
                <circle cx="8" cy="-4" r="4" fill="#cfe8ff" />
                <rect x="-9" y="8" width="18" height="4" rx="2" fill="#cfe8ff" />
              </g>
              <text x="0" y="34" textAnchor="middle" fontSize="13" fontWeight="800" fill="#6c7a99">Logger 💾</text>
            </g>
            <g className="robot" transform="translate(700 452)">
              <rect id="robot-alarm-flash" x="-26" y="-24" width="52" height="48" rx="12" fill="#ff5a4d" />
              <g className="robot-face">
                <rect x="-22" y="-20" width="44" height="40" rx="10" fill="#c0506a" />
                <line x1="0" y1="-20" x2="0" y2="-30" stroke="#c0506a" strokeWidth="3" />
                <circle cx="0" cy="-30" r="3" fill="#c0506a" />
                <circle cx="-8" cy="-4" r="4" fill="#ffe1d6" />
                <circle cx="8" cy="-4" r="4" fill="#ffe1d6" />
                <rect x="-9" y="8" width="18" height="4" rx="2" fill="#ffe1d6" />
              </g>
              <text x="0" y="34" textAnchor="middle" fontSize="13" fontWeight="800" fill="#c0506a">Alerta 🚨</text>
            </g>
          </g>

          <g>
            <circle className="wave" cx="300" cy="240" r="40" fill="none" stroke="#25d366" strokeWidth="4" />
            <circle className="wave" cx="300" cy="240" r="40" fill="none" stroke="#25d366" strokeWidth="4" />
            <circle className="wave" cx="300" cy="240" r="40" fill="none" stroke="#25d366" strokeWidth="4" />
          </g>

          <g id="badge" transform="translate(480 56)">
            <rect x="-150" y="-26" width="300" height="44" rx="22" fill="#1f2747" />
            <text x="0" y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#ffd36b">
              1 mensaje → 30 recibidos
            </text>
          </g>

          <rect id="dim" x="0" y="0" width="960" height="540" fill="#1b2440" style={{ mixBlendMode: "multiply" }} />
        </g>
      </g>
    </svg>
  );
}

function setCounter(ref: React.RefObject<SVGTextElement | null>, n: number) {
  if (ref.current) ref.current.textContent = `${n}`;
}
