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

// Adapter — one continuous, friendly (no-code) directed scene. A travel power
// plug. Act 1 (#act1, the problem): your charger's flat plug doesn't fit the
// country's round wall socket, and you can change neither. Act 2 (#act2, the
// solution): a travel adapter sits in between — one side matches the wall, the
// other accepts your charger — translating between the two shapes so the power
// flows; the charger and wall stay untouched. Acts are a coding/structure concept
// only — the viewer sees a single flow. Positioned elements animate only
// scale/opacity (and the battery fill's scaleX) — never x/y — to avoid the
// GSAP/SVG translate-clobbering gotcha; only the camera groups pan with x.
export function AdapterScene({ activeShot, instant = false }: Props) {
  const scope = useDirectorTimeline(activeShot, (tl) => {
    // ---- Initial state ----
    gsap.set("#act1", { opacity: 1 });
    gsap.set("#act2", { opacity: 0 });

    // Act 1 set
    gsap.set("#cam1", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#mismatch", { opacity: 0 });
    gsap.set("#nofit", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set("#tense", { opacity: 0 });
    gsap.set("#vignette", { opacity: 0.2 });

    // Act 2 set
    gsap.set("#cam2", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#dim", { opacity: 0 });
    gsap.set("#adapter", { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" });
    gsap.set("#junction-wall", { opacity: 0 });
    gsap.set("#junction-charger", { opacity: 0 });
    gsap.set("#flow", { opacity: 0 });
    gsap.set("#charged-badge", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set("#batt-fill", { scaleX: 0, transformOrigin: "0% 50%" });
    gsap.set("#second-device", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });

    // Act 3 set (naming the concept, shot-9)
    gsap.set(["#act3-have-label", "#act3-wall-label", "#act3-adapter-label", "#act3-keyword"], { opacity: 0 });
    gsap.set([".act3-line"], { opacity: 0 });
    gsap.set("#act3-keyword", { scale: 0.85, transformOrigin: "50% 50%" });

    // ===== SHOT 1 — Establishing: phone out of battery, want to charge =====
    tl.to("#cam1", { scale: 1.06, duration: 1.1, ease: "power2.out" });
    tl.addLabel("shot-1");

    // ===== SHOT 2 — The shapes don't match =====
    tl.to("#cam1", { scale: 1.16, x: -40, y: 0, duration: 1, ease: "power2.inOut" });
    tl.to("#mismatch", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">-0.1");
    tl.addLabel("shot-2");

    // ===== SHOT 3 — They don't fit, and you can change neither =====
    tl.to("#mismatch", { opacity: 0, duration: 0.3 });
    tl.to("#nofit", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, "<0.05");
    tl.to("#tense", { opacity: 0.4, duration: 0.8, ease: "power2.in" }, "<");
    tl.to("#vignette", { opacity: 0.55, duration: 0.8, ease: "power2.in" }, "<");
    tl.addLabel("shot-3");

    // ===== SHOT 4 — Transition: put a piece in between, a travel adapter =====
    tl.to("#act1", { opacity: 0, duration: 0.7, ease: "power2.inOut" });
    tl.to("#act2", { opacity: 1, duration: 0.7, ease: "power2.inOut" }, "<");
    tl.to("#adapter", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, ">-0.15");
    tl.addLabel("shot-4");

    // ===== SHOT 5 — One side fits the wall =====
    tl.to("#junction-wall", { opacity: 1, duration: 0.4, ease: "power2.out" });
    tl.addLabel("shot-5");

    // ===== SHOT 6 — The other side accepts your charger =====
    tl.to("#junction-charger", { opacity: 1, duration: 0.4, ease: "power2.out" });
    tl.addLabel("shot-6");

    // ===== SHOT 7 — Power flows, the phone charges =====
    tl.to("#flow", { opacity: 1, duration: 0.4, ease: "power2.out" });
    tl.to("#batt-fill", { scaleX: 1, duration: 1, ease: "power1.inOut" }, "<");
    tl.to("#charged-badge", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">-0.2");
    tl.addLabel("shot-7");

    // ===== SHOT 8 — Another device with the same plug also works =====
    tl.to("#second-device", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" });
    tl.addLabel("shot-8");

    // ===== SHOT 9 — Naming the concept: clean up the solution overlays, freeze + labels =====
    tl.to(["#second-device", "#junction-wall", "#junction-charger", "#flow", "#charged-badge"], { opacity: 0, duration: 0.3 });
    tl.to("#dim", { opacity: 0.15, duration: 0.4 }, "<");
    tl.to("#act3-have-label", { opacity: 1, duration: 0.4 }, ">0.05");
    tl.to(".act3-line-have", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-wall-label", { opacity: 1, duration: 0.4 }, ">0.1");
    tl.to(".act3-line-wall", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-adapter-label", { opacity: 1, duration: 0.4 }, ">0.1");
    tl.to(".act3-line-adapter", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-keyword", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, ">0.2");
    tl.addLabel("shot-9");
  }, instant);

  // Idle life, independent of the master timeline: the empty battery blinking.
  useGSAP(
    () => {
      gsap.to("#batt-low", { opacity: 0.3, duration: 0.7, yoyo: true, repeat: -1, ease: "sine.inOut" });
    },
    { scope }
  );

  return (
    <svg
      ref={scope}
      viewBox="0 0 960 540"
      className="block h-auto w-full"
      role="img"
      aria-label="Adapter: el plug plano de tu cargador no encaja en el tomacorriente redondo de la pared; un adaptador de viaje en el medio traduce entre las dos formas y la corriente fluye"
    >
      <defs>
        <linearGradient id="roomCold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7ebf5" />
          <stop offset="1" stopColor="#d4d9ea" />
        </linearGradient>
        <linearGradient id="roomWarm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7e9" />
          <stop offset="1" stopColor="#f6e3c0" />
        </linearGradient>
        <radialGradient id="vigA" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* ===================== ACT 1 — the problem ===================== */}
      <g id="act1">
        <g id="cam1">
          <rect x="-400" y="0" width="1760" height="540" fill="url(#roomCold)" />
          <rect x="-400" y="430" width="1760" height="110" fill="#c7ccdc" />

          {/* Phone with an empty battery */}
          <g transform="translate(150 270)">
            <rect x="-55" y="-95" width="110" height="190" rx="18" fill="#2a2f45" />
            <rect x="-43" y="-80" width="86" height="160" rx="8" fill="#eaf3ff" />
            {/* empty battery icon */}
            <g id="batt-low">
              <rect x="-26" y="-20" width="52" height="26" rx="4" fill="none" stroke="#e2574c" strokeWidth="3" />
              <rect x="26" y="-13" width="5" height="12" rx="2" fill="#e2574c" />
              <rect x="-22" y="-16" width="10" height="18" rx="2" fill="#e2574c" />
            </g>
            <text x="0" y="46" textAnchor="middle" fontSize="13" fontWeight="800" fill="#2a2f45">0%</text>
          </g>

          {/* Charger cable + flat plug (shape A), blades pointing right */}
          <path d="M205 280 q120 40 175 0" fill="none" stroke="#2a2f45" strokeWidth="6" />
          <g transform="translate(395 280)">
            <rect x="-34" y="-30" width="56" height="60" rx="10" fill="#5566aa" />
            <rect x="22" y="-16" width="22" height="7" rx="2" fill="#cfd6ee" />
            <rect x="22" y="9" width="22" height="7" rx="2" fill="#cfd6ee" />
          </g>

          {/* Wall + round socket (shape B), holes facing left */}
          <g transform="translate(700 270)">
            <rect x="-40" y="-150" width="180" height="300" rx="10" fill="#cdd3e4" />
            <circle cx="20" cy="0" r="64" fill="#eef1f8" stroke="#9aa3bd" strokeWidth="4" />
            <circle cx="-2" cy="-18" r="11" fill="#2a2f45" />
            <circle cx="-2" cy="18" r="11" fill="#2a2f45" />
          </g>

          {/* shapes don't match (shot 2) */}
          <g id="mismatch">
            <g transform="translate(395 360)">
              <rect x="-58" y="-18" width="116" height="36" rx="10" fill="#fff" stroke="#5566aa" strokeWidth="2" />
              <text x="0" y="6" textAnchor="middle" fontSize="13" fontWeight="800" fill="#5566aa">plug plano</text>
            </g>
            <text x="555" y="370" textAnchor="middle" fontSize="34" fontWeight="800" fill="#e2574c">≠</text>
            <g transform="translate(710 360)">
              <rect x="-62" y="-18" width="124" height="36" rx="10" fill="#fff" stroke="#9aa3bd" strokeWidth="2" />
              <text x="0" y="6" textAnchor="middle" fontSize="13" fontWeight="800" fill="#4a5575">toma redonda</text>
            </g>
          </g>

          {/* doesn't fit (shot 3) */}
          <g id="nofit" transform="translate(555 250)">
            <text x="0" y="0" textAnchor="middle" fontSize="50" fontWeight="800" fill="#e2574c">✗</text>
            <g transform="translate(0 70)">
              <rect x="-78" y="-22" width="156" height="44" rx="22" fill="#e2574c" />
              <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">no encaja</text>
            </g>
          </g>

          <rect id="tense" x="-400" y="0" width="1760" height="540" fill="#1f2747" style={{ mixBlendMode: "multiply" }} />
          <rect id="vignette" x="-400" y="0" width="1760" height="540" fill="url(#vigA)" />
        </g>
      </g>

      {/* ===================== ACT 2 — the solution ===================== */}
      <g id="act2">
        <g id="cam2">
          <rect x="-200" y="0" width="1360" height="540" fill="url(#roomWarm)" />
          <rect x="-200" y="430" width="1360" height="110" fill="#e6cf9c" />

          {/* Phone with a filling battery */}
          <g transform="translate(150 270)">
            <rect x="-55" y="-95" width="110" height="190" rx="18" fill="#2a2f45" />
            <rect x="-43" y="-80" width="86" height="160" rx="8" fill="#eaf3ff" />
            <rect x="-26" y="-20" width="52" height="26" rx="4" fill="none" stroke="#2bb673" strokeWidth="3" />
            <rect x="26" y="-13" width="5" height="12" rx="2" fill="#2bb673" />
            <rect id="batt-fill" x="-22" y="-16" width="44" height="18" rx="2" fill="#2bb673" />
            <text x="0" y="46" textAnchor="middle" fontSize="13" fontWeight="800" fill="#2a2f45">⚡</text>
          </g>

          {/* Charger cable + flat plug */}
          <path d="M205 280 q90 36 150 0" fill="none" stroke="#2a2f45" strokeWidth="6" />
          <g transform="translate(370 280)">
            <rect x="-34" y="-30" width="56" height="60" rx="10" fill="#5566aa" />
            <rect x="22" y="-16" width="20" height="7" rx="2" fill="#cfd6ee" />
            <rect x="22" y="9" width="20" height="7" rx="2" fill="#cfd6ee" />
          </g>

          {/* Wall + round socket */}
          <g transform="translate(720 270)">
            <rect x="-40" y="-150" width="180" height="300" rx="10" fill="#e0d3ad" />
            <circle cx="20" cy="0" r="60" fill="#fff7e6" stroke="#c7a86a" strokeWidth="4" />
            <circle cx="-4" cy="-16" r="10" fill="#2a2f45" />
            <circle cx="-4" cy="16" r="10" fill="#2a2f45" />
          </g>

          {/* The travel adapter in between: round prongs (right) + flat slots (left) */}
          <g id="adapter" transform="translate(520 280)">
            <rect x="-52" y="-52" width="104" height="104" rx="16" fill="#ffd36b" stroke="#cf9a1f" strokeWidth="3" />
            {/* flat slots accept the charger (left face) */}
            <rect x="-58" y="-18" width="12" height="8" rx="2" fill="#3b3a52" />
            <rect x="-58" y="10" width="12" height="8" rx="2" fill="#3b3a52" />
            {/* round prongs enter the wall (right face) */}
            <circle cx="64" cy="-16" r="8" fill="#9aa3bd" />
            <circle cx="64" cy="16" r="8" fill="#9aa3bd" />
            <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#7a5b14">adaptador</text>
          </g>

          {/* junctions light up as each side connects */}
          <g id="junction-wall">
            <circle cx="612" cy="264" r="26" fill="#2bb673" fillOpacity="0.25" />
            <g transform="translate(640 200)">
              <rect x="-70" y="-17" width="140" height="32" rx="10" fill="#2bb673" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">encaja en la pared</text>
            </g>
          </g>
          <g id="junction-charger">
            <circle cx="430" cy="280" r="24" fill="#2bb673" fillOpacity="0.25" />
            <g transform="translate(430 200)">
              <rect x="-74" y="-17" width="148" height="32" rx="10" fill="#2bb673" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">acepta tu cargador</text>
            </g>
          </g>

          {/* power flowing from wall to phone */}
          <g id="flow">
            <text x="612" y="320" textAnchor="middle" fontSize="22">⚡</text>
            <text x="470" y="330" textAnchor="middle" fontSize="20">⚡</text>
            <text x="300" y="328" textAnchor="middle" fontSize="18">⚡</text>
          </g>
          <g id="charged-badge" transform="translate(150 150)">
            <rect x="-66" y="-22" width="132" height="44" rx="22" fill="#2bb673" />
            <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">✓ carga</text>
          </g>

          {/* shot 8 — another device with the same plug also works */}
          <g id="second-device" transform="translate(360 410)">
            <rect x="-150" y="-30" width="300" height="58" rx="14" fill="#fff" stroke="#2bb673" strokeWidth="3" />
            <text x="0" y="-4" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1f8a52">otro aparato, mismo plug</text>
            <text x="0" y="15" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1f8a52">también funciona con el adaptador</text>
          </g>

          <rect id="dim" x="-200" y="0" width="1360" height="540" fill="#1b2440" style={{ mixBlendMode: "multiply" }} />

          {/* ===== Act 3 — naming the concept (shot-9) ===== */}
          <g id="act3-labels">
            <line className="act3-line act3-line-have" x1="370" y1="280" x2="370" y2="120" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-have-label" transform="translate(370 100)">
              <rect x="-104" y="-20" width="208" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1f2747">Lo que tenés (un plug plano)</text>
            </g>

            <line className="act3-line act3-line-wall" x1="740" y1="270" x2="820" y2="130" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-wall-label" transform="translate(810 110)">
              <rect x="-110" y="-20" width="220" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1f2747">Lo que hay (otra forma)</text>
            </g>

            <line className="act3-line act3-line-adapter" x1="520" y1="332" x2="520" y2="430" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-adapter-label" transform="translate(520 452)">
              <rect x="-120" y="-20" width="240" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1f2747">El traductor en el medio</text>
            </g>

            <g id="act3-keyword" transform="translate(480 502)">
              <rect x="-160" y="-24" width="320" height="48" rx="24" fill="#1f2747" />
              <text x="0" y="6" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffd36b">Traducir para conectar</text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
