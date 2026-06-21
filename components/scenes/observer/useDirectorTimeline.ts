"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Builds one master "director" timeline whose labels mark the END state of each
// shot's animation. Moving to a shot plays that shot's segment at its authored
// pace (no duration override), so the motion feels cinematic. Reversing works.
export function useDirectorTimeline(
  activeShot: string,
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
      if (!tl || !activeShot) return;
      if (tl.labels[activeShot] === undefined) return;
      // Play to the shot's label at the timeline's own authored timing.
      tl.tweenTo(activeShot);
    },
    { dependencies: [activeShot], scope }
  );

  return scope;
}
