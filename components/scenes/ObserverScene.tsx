"use client";

import gsap from "gsap";
import { useSceneTimeline } from "./useSceneTimeline";

type Props = {
  /** Current timeline label to animate to. */
  activeState: string;
  /** Bridge: id of the element to highlight from the code phase. */
  highlightAnchor?: string;
};

const MEMBERS = [
  { id: "member-1", cx: 90 },
  { id: "member-2", cx: 200 },
  { id: "member-3", cx: 310 },
];

// Observer analogy: a WhatsApp-style group. The admin (Subject) publishes a
// message that propagates to every member (Observer), who then react.
export function ObserverScene({ activeState, highlightAnchor }: Props) {
  const scope = useSceneTimeline(activeState, (tl) => {
    // Initial state.
    gsap.set("#message", { opacity: 0, y: 0 });
    gsap.set(["#member-1", "#member-2", "#member-3"], {
      scale: 0,
      transformOrigin: "center center",
    });
    gsap.set(["#reaction-1", "#reaction-2", "#reaction-3"], {
      scale: 0,
      transformOrigin: "center center",
    });
    gsap.set("#subscription", { opacity: 0 });

    tl.addLabel("idle");
    tl.to("#admin", {
      scale: 1.06,
      transformOrigin: "center center",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });

    tl.addLabel("subscribe");
    tl.to(["#member-1", "#member-2", "#member-3"], {
      scale: 1,
      stagger: 0.15,
      duration: 0.4,
      ease: "back.out(2)",
    });
    tl.to("#subscription", { opacity: 1, duration: 0.3 }, "<");

    tl.addLabel("publish");
    tl.to("#message", { opacity: 1, duration: 0.3, ease: "power2.out" });

    tl.addLabel("notify");
    tl.to("#message", { y: 150, duration: 0.7, ease: "power2.in" });

    tl.addLabel("reacted");
    tl.to("#message", { opacity: 0, duration: 0.2 });
    tl.to(
      ["#reaction-1", "#reaction-2", "#reaction-3"],
      { scale: 1, stagger: 0.12, duration: 0.35, ease: "back.out(2)" },
      "<"
    );
  });

  const glow = (id: string) =>
    highlightAnchor === id ? "anchor-glow" : undefined;

  return (
    <svg
      ref={scope}
      viewBox="0 0 400 320"
      className="h-auto w-full"
      role="img"
      aria-label="Grupo de WhatsApp: el admin envía un mensaje y los miembros lo reciben"
    >
      <rect x="0" y="0" width="400" height="320" fill="#eef1f8" />

      {/* Subscription links (admin ↔ members) */}
      <g id="subscription" className={glow("subscription")} stroke="#b9c4e6" strokeWidth="2" strokeDasharray="4 5">
        {MEMBERS.map((m) => (
          <line key={m.id} x1="200" y1="78" x2={m.cx} y2="230" />
        ))}
      </g>

      {/* Admin = Subject */}
      <g id="admin" className={glow("admin")}>
        <circle cx="200" cy="52" r="26" fill="#5b8def" />
        <circle cx="200" cy="44" r="9" fill="#fff" />
        <path d="M182 70 a18 14 0 0 1 36 0 z" fill="#fff" />
        <text x="200" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e2233">
          Admin
        </text>
      </g>

      {/* Message bubble = notification payload */}
      <g id="message" className={glow("message")}>
        <rect x="168" y="108" width="64" height="34" rx="10" fill="#2bb673" />
        <path d="M178 142 l-8 12 l16 -6 z" fill="#2bb673" />
        <circle cx="186" cy="125" r="3" fill="#fff" />
        <circle cx="200" cy="125" r="3" fill="#fff" />
        <circle cx="214" cy="125" r="3" fill="#fff" />
      </g>

      {/* Members = Observers */}
      <g id="members" className={glow("members")}>
        {MEMBERS.map((m, i) => (
          <g key={m.id} id={m.id}>
            <circle cx={m.cx} cy="230" r="24" fill="#ffb27a" />
            <circle cx={m.cx} cy="223" r="8" fill="#fff" />
            <path d={`M${m.cx - 16} 247 a16 12 0 0 1 32 0 z`} fill="#fff" />
            {/* Reaction (delivered/seen check) */}
            <g id={`reaction-${i + 1}`}>
              <circle cx={m.cx + 18} cy="208" r="11" fill="#2bb673" />
              <path
                d={`M${m.cx + 13} 208 l3 4 l7 -8`}
                stroke="#fff"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
