"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Builds a paused GSAP timeline once, then animates the playhead to whichever
// label matches the active scene state. Reversing (prev) works automatically.
export function useSceneTimeline(
  activeState: string,
  build: (tl: gsap.core.Timeline) => void
) {
  const scope = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      build(tl);
      tlRef.current = tl;
    },
    { scope }
  );

  useGSAP(
    () => {
      const tl = tlRef.current;
      if (!tl || !activeState) return;
      // Guard: only seek to labels the timeline actually has.
      if (tl.labels[activeState] === undefined) return;
      tl.tweenTo(activeState, { duration: 0.6, ease: "power2.inOut" });
    },
    { dependencies: [activeState], scope }
  );

  return scope;
}
