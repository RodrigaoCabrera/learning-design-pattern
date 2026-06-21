"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Builds one master "director" timeline whose labels mark the END state of each
// shot's animation. During auto-play, moving to a shot plays that shot's segment
// at its authored pace (no duration override), so the motion feels cinematic.
// Manual jumps (Anterior/Siguiente/dots/restart) instead snap straight to the
// target shot's end state — no waiting, and no rewinding back through the
// whole timeline when jumping to an earlier shot.
export function useDirectorTimeline(
  activeShot: string,
  build: (tl: gsap.core.Timeline) => void,
  instant = false
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
      if (instant) {
        tl.seek(activeShot);
      } else {
        tl.tweenTo(activeShot);
      }
    },
    { dependencies: [activeShot, instant], scope }
  );

  return scope;
}
