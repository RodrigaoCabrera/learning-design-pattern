"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  text: string;
  /** Shot index, used to re-trigger the fade when the caption changes. */
  stepKey: number;
};

// Video-style subtitle in its OWN safe zone (a band below the scene), so it never
// covers the animation. The caption disambiguates the scene and is the script for
// future audio. Re-fades on every shot change; fixed min-height avoids layout shift.
export function SubtitleBar({ text, stepKey }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    },
    { dependencies: [stepKey] }
  );

  return (
    <div className="flex min-h-[4.5rem] items-center justify-center bg-black px-5 py-4">
      <p
        ref={ref}
        aria-live="polite"
        className="max-w-2xl text-center text-base font-medium leading-snug text-white sm:text-lg"
      >
        {text}
      </p>
    </div>
  );
}
