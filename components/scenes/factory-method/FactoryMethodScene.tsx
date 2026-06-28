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

// Factory Method — one continuous, friendly (no-code) directed scene. A delivery
// company. Act 1 (#act1, the problem): the shipping line is identical everywhere
// but the vehicle is hardwired (moped only); a far order needing a truck jams the
// whole line. Act 2 (#act2, the solution): same shared line, but the "create the
// vehicle" step is left for each branch to decide — city makes a moped, regional
// a truck, overseas a ship; receive/pack/deliver never change. A new branch just
// defines its own create step. Acts are a coding/structure concept only — the
// viewer sees a single flow. Positioned elements animate only scale/opacity
// (never x/y) to avoid the GSAP/SVG translate-clobbering gotcha; only the camera
// groups (#cam1/#cam2) pan with x.
export function FactoryMethodScene({ activeShot, instant = false }: Props) {
  const scope = useDirectorTimeline(activeShot, (tl) => {
    // ---- Initial state ----
    gsap.set("#act1", { opacity: 1 });
    gsap.set("#act2", { opacity: 0 });

    // Act 1 set
    gsap.set("#cam1", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#lock1", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set("#order-far", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set("#jam", { opacity: 0 });
    gsap.set("#tense", { opacity: 0 });
    gsap.set("#vignette", { opacity: 0.2 });

    // Act 2 set
    gsap.set("#cam2", { transformOrigin: "50% 50%", scale: 1, x: 0, y: 0 });
    gsap.set("#dim", { opacity: 0 });
    gsap.set("#slot-empty", { opacity: 0 });
    gsap.set(["#veh-moto", "#veh-camion", "#veh-barco", "#veh-aerea"], {
      opacity: 0,
      scale: 0.6,
      transformOrigin: "50% 100%",
    });
    gsap.set(["#branch-ciudad", "#branch-regional", "#branch-ultramar", "#branch-aerea"], { opacity: 0 });
    gsap.set("#same-process", { opacity: 0 });
    gsap.set("#new-branch-note", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });

    // Act 3 set (naming the concept, shot-9)
    gsap.set(["#act3-process-label", "#act3-step-label", "#act3-keyword"], { opacity: 0 });
    gsap.set([".act3-line"], { opacity: 0 });
    gsap.set("#act3-keyword", { scale: 0.85, transformOrigin: "50% 50%" });

    // ===== SHOT 1 — Establishing: the shared shipping process =====
    tl.to("#cam1", { scale: 1.06, duration: 1.1, ease: "power2.out" });
    tl.addLabel("shot-1");

    // ===== SHOT 2 — The vehicle is hardwired: moped only =====
    tl.to("#cam1", { scale: 1.18, x: -120, y: -10, duration: 1, ease: "power2.inOut" });
    tl.to("#lock1", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, ">-0.05");
    tl.addLabel("shot-2");

    // ===== SHOT 3 — A far order needs a truck; the line jams =====
    tl.to("#cam1", { scale: 1, x: 0, y: 0, duration: 0.8, ease: "power2.inOut" });
    tl.to("#order-far", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, "<0.2");
    tl.to("#jam", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">0.05");
    tl.to("#tense", { opacity: 0.4, duration: 0.8, ease: "power2.in" }, "<");
    tl.to("#vignette", { opacity: 0.55, duration: 0.8, ease: "power2.in" }, "<");
    tl.addLabel("shot-3");

    // ===== SHOT 4 — Transition: the create step is left to each branch =====
    tl.to("#act1", { opacity: 0, duration: 0.7, ease: "power2.inOut" });
    tl.to("#act2", { opacity: 1, duration: 0.7, ease: "power2.inOut" }, "<");
    tl.to("#slot-empty", { opacity: 1, duration: 0.4, ease: "power2.out" }, ">-0.15");
    tl.addLabel("shot-4");

    // ===== SHOT 5 — City branch creates a moped =====
    tl.to("#slot-empty", { opacity: 0, duration: 0.25 });
    tl.to("#veh-moto", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, "<0.05");
    tl.to("#branch-ciudad", { opacity: 1, duration: 0.35 }, "<0.1");
    tl.addLabel("shot-5");

    // ===== SHOT 6 — Regional branch, same line, creates a truck =====
    tl.to(["#veh-moto", "#branch-ciudad"], { opacity: 0, duration: 0.3 });
    tl.to("#veh-camion", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, ">0.05");
    tl.to("#branch-regional", { opacity: 1, duration: 0.35 }, "<0.1");
    tl.addLabel("shot-6");

    // ===== SHOT 7 — Overseas branch creates a ship; the rest never changes =====
    tl.to(["#veh-camion", "#branch-regional"], { opacity: 0, duration: 0.3 });
    tl.to("#veh-barco", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, ">0.05");
    tl.to("#branch-ultramar", { opacity: 1, duration: 0.35 }, "<0.1");
    tl.to("#same-process", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">0.05");
    tl.addLabel("shot-7");

    // ===== SHOT 8 — A new branch defines its own create step, no rework =====
    tl.to(["#veh-barco", "#branch-ultramar", "#same-process"], { opacity: 0, duration: 0.3 });
    tl.to("#veh-aerea", { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, ">0.05");
    tl.to("#branch-aerea", { opacity: 1, duration: 0.35 }, "<0.1");
    tl.to("#new-branch-note", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, ">0.05");
    tl.addLabel("shot-8");

    // ===== SHOT 9 — Naming the concept: freeze + labels =====
    tl.to("#dim", { opacity: 0.15, duration: 0.4 });
    tl.to("#act3-process-label", { opacity: 1, duration: 0.4 }, ">0.1");
    tl.to(".act3-line-process", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-step-label", { opacity: 1, duration: 0.4 }, ">0.12");
    tl.to(".act3-line-step", { opacity: 1, duration: 0.3 }, "<");
    tl.to("#act3-keyword", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, ">0.25");
    tl.addLabel("shot-9");
  }, instant);

  // Idle life, independent of the master timeline: the parcel bobbing on the belt.
  useGSAP(
    () => {
      gsap.to("#parcel-idle", { y: -4, duration: 1.3, yoyo: true, repeat: -1, ease: "sine.inOut" });
    },
    { scope }
  );

  // A reusable process strip (shared between both acts for visual continuity).
  // `variant` swaps only what differs: the vehicle station's contents.
  const Strip = ({ variant }: { variant: "fixed" | "slot" }) => (
    <g>
      {/* belt */}
      <rect x="70" y="300" width="820" height="20" rx="10" fill="#9aa3bd" />
      {/* Recibir */}
      <g transform="translate(160 250)">
        <rect x="-70" y="-50" width="140" height="100" rx="12" fill="#fff" stroke="#2a2f45" strokeWidth="3" />
        <text x="0" y="-6" textAnchor="middle" fontSize="30">📥</text>
        <text x="0" y="32" textAnchor="middle" fontSize="14" fontWeight="800" fill="#2a2f45">Recibir</text>
      </g>
      <text x="245" y="256" textAnchor="middle" fontSize="26" fontWeight="800" fill="#8a93ad">→</text>
      {/* Empacar */}
      <g transform="translate(350 250)">
        <rect x="-70" y="-50" width="140" height="100" rx="12" fill="#fff" stroke="#2a2f45" strokeWidth="3" />
        <g id={variant === "fixed" ? "parcel-idle" : undefined}>
          <text x="0" y="-6" textAnchor="middle" fontSize="30">📦</text>
        </g>
        <text x="0" y="32" textAnchor="middle" fontSize="14" fontWeight="800" fill="#2a2f45">Empacar</text>
      </g>
      <text x="448" y="256" textAnchor="middle" fontSize="26" fontWeight="800" fill="#8a93ad">→</text>
      {/* Crear vehículo (the variable station) */}
      <g transform="translate(565 250)">
        <rect
          x="-80"
          y="-58"
          width="160"
          height="116"
          rx="12"
          fill={variant === "slot" ? "#fff7e6" : "#fff"}
          stroke={variant === "slot" ? "#e8a23a" : "#2a2f45"}
          strokeWidth="3"
        />
        <text x="0" y="44" textAnchor="middle" fontSize="13" fontWeight="800" fill={variant === "slot" ? "#a9701f" : "#2a2f45"}>
          {variant === "slot" ? "crear vehículo" : "vehículo"}
        </text>
        {variant === "fixed" ? (
          <text x="0" y="2" textAnchor="middle" fontSize="40">🛵</text>
        ) : null}
      </g>
      <text x="678" y="256" textAnchor="middle" fontSize="26" fontWeight="800" fill="#8a93ad">→</text>
      {/* Entregar */}
      <g transform="translate(795 250)">
        <rect x="-70" y="-50" width="140" height="100" rx="12" fill="#fff" stroke="#2a2f45" strokeWidth="3" />
        <text x="0" y="-6" textAnchor="middle" fontSize="30">🏁</text>
        <text x="0" y="32" textAnchor="middle" fontSize="14" fontWeight="800" fill="#2a2f45">Entregar</text>
      </g>
    </g>
  );

  return (
    <svg
      ref={scope}
      viewBox="0 0 960 540"
      className="block h-auto w-full"
      role="img"
      aria-label="Factory Method: de una línea de envíos con el vehículo clavado en moto que se traba ante otro pedido, a una línea compartida donde cada sucursal decide qué vehículo crear (moto, camión, barco)"
    >
      <defs>
        <linearGradient id="warehouseCold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7ebf5" />
          <stop offset="1" stopColor="#d4d9ea" />
        </linearGradient>
        <linearGradient id="warehouseWarm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7e9" />
          <stop offset="1" stopColor="#f6e3c0" />
        </linearGradient>
        <radialGradient id="vigF" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* ===================== ACT 1 — the problem ===================== */}
      <g id="act1">
        <g id="cam1">
          <rect x="-400" y="0" width="1760" height="540" fill="url(#warehouseCold)" />
          <rect x="-400" y="360" width="1760" height="180" fill="#c7ccdc" />

          <text x="480" y="130" textAnchor="middle" fontSize="19" fontWeight="800" fill="#4a5575">Empresa de envíos · una sola línea</text>

          <Strip variant="fixed" />

          {/* hardwired badge on the vehicle station */}
          <g id="lock1" transform="translate(632 196)">
            <rect x="-44" y="-18" width="120" height="36" rx="10" fill="#1f2747" />
            <text x="16" y="6" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffd36b">🔒 clavado</text>
          </g>

          {/* a far order that needs a different vehicle */}
          <g id="order-far" transform="translate(565 110)">
            <rect x="-150" y="-30" width="300" height="56" rx="14" fill="#fff" stroke="#e2574c" strokeWidth="3" />
            <text x="0" y="-4" textAnchor="middle" fontSize="14" fontWeight="800" fill="#e2574c">Pedido a región lejana</text>
            <text x="0" y="16" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e2574c">necesita 🚚 camión</text>
          </g>

          {/* the line jams */}
          <g id="jam" transform="translate(565 250)">
            <text x="0" y="6" textAnchor="middle" fontSize="46" fontWeight="800" fill="#e2574c">✗</text>
            <text x="0" y="92" textAnchor="middle" fontSize="15" fontWeight="800" fill="#e2574c">la línea se traba</text>
          </g>

          <rect id="tense" x="-400" y="0" width="1760" height="540" fill="#1f2747" style={{ mixBlendMode: "multiply" }} />
          <rect id="vignette" x="-400" y="0" width="1760" height="540" fill="url(#vigF)" />
        </g>
      </g>

      {/* ===================== ACT 2 — the solution ===================== */}
      <g id="act2">
        <g id="cam2">
          <rect x="-200" y="0" width="1360" height="540" fill="url(#warehouseWarm)" />
          <rect x="-200" y="360" width="1360" height="180" fill="#e6cf9c" />

          <text x="480" y="130" textAnchor="middle" fontSize="19" fontWeight="800" fill="#8a6a2e">La misma línea · cada sucursal decide su vehículo</text>

          {/* "esto no cambia" highlight around the shared steps (shot 7) */}
          <g id="same-process">
            <rect x="86" y="188" width="316" height="124" rx="14" fill="none" stroke="#2bb673" strokeWidth="3" strokeDasharray="7 5" />
            <rect x="722" y="188" width="148" height="124" rx="14" fill="none" stroke="#2bb673" strokeWidth="3" strokeDasharray="7 5" />
            <g transform="translate(244 172)">
              <rect x="-78" y="-17" width="156" height="32" rx="10" fill="#2bb673" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">esto no cambia</text>
            </g>
          </g>

          <Strip variant="slot" />

          {/* empty slot prompt (shot 4) */}
          <g id="slot-empty" transform="translate(565 244)">
            <text x="0" y="6" textAnchor="middle" fontSize="34" fontWeight="800" fill="#d8ab57">?</text>
          </g>

          {/* the vehicle each branch creates (toggled) */}
          <g id="veh-moto" transform="translate(565 252)">
            <text x="0" y="6" textAnchor="middle" fontSize="44">🛵</text>
          </g>
          <g id="veh-camion" transform="translate(565 252)">
            <text x="0" y="6" textAnchor="middle" fontSize="44">🚚</text>
          </g>
          <g id="veh-barco" transform="translate(565 252)">
            <text x="0" y="6" textAnchor="middle" fontSize="44">🚢</text>
          </g>
          <g id="veh-aerea" transform="translate(565 252)">
            <text x="0" y="6" textAnchor="middle" fontSize="44">✈️</text>
          </g>

          {/* the active branch (toggled) */}
          <g id="branch-ciudad" transform="translate(565 392)">
            <rect x="-120" y="-22" width="240" height="44" rx="22" fill="#1f6feb" />
            <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">Sucursal Ciudad</text>
          </g>
          <g id="branch-regional" transform="translate(565 392)">
            <rect x="-120" y="-22" width="240" height="44" rx="22" fill="#cf8526" />
            <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">Sucursal Regional</text>
          </g>
          <g id="branch-ultramar" transform="translate(565 392)">
            <rect x="-120" y="-22" width="240" height="44" rx="22" fill="#8a5cf6" />
            <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">Sucursal Ultramar</text>
          </g>
          <g id="branch-aerea" transform="translate(565 392)">
            <rect x="-120" y="-22" width="240" height="44" rx="22" fill="#2bb673" />
            <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">Sucursal Aérea</text>
          </g>

          {/* new-branch note (shot 8) */}
          <g id="new-branch-note" transform="translate(820 150)">
            <rect x="-104" y="-26" width="208" height="52" rx="14" fill="#fff" stroke="#2bb673" strokeWidth="3" />
            <text x="0" y="-4" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1f8a52">sucursal nueva ✓</text>
            <text x="0" y="14" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1f8a52">sin tocar la línea</text>
          </g>

          <rect id="dim" x="-200" y="0" width="1360" height="540" fill="#1b2440" style={{ mixBlendMode: "multiply" }} />

          {/* ===== Act 3 — naming the concept (shot-9) ===== */}
          <g id="act3-labels">
            <line className="act3-line act3-line-process" x1="350" y1="200" x2="350" y2="92" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-process-label" transform="translate(350 72)">
              <rect x="-118" y="-20" width="236" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1f2747">El proceso compartido</text>
            </g>

            <line className="act3-line act3-line-step" x1="565" y1="308" x2="565" y2="430" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
            <g id="act3-step-label" transform="translate(565 452)">
              <rect x="-150" y="-20" width="300" height="40" rx="10" fill="#fff" stroke="#1f2747" strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1f2747">El paso que cada sucursal decide</text>
            </g>

            <g id="act3-keyword" transform="translate(480 504)">
              <rect x="-165" y="-24" width="330" height="48" rx="24" fill="#1f2747" />
              <text x="0" y="6" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffd36b">Cada sucursal crea lo suyo</text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
