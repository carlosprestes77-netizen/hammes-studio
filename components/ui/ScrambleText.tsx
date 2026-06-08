"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·×÷+=/—§∆";

// Decrypts a string left-to-right: each character cycles through random
// glyphs before settling on its final value. Length is preserved on every
// frame, so there is no layout jitter. The real text is exposed to
// assistive tech via aria-label; the animation is purely decorative.
export default function ScrambleText({
  text,
  className,
  delay = 0,
  duration = 900,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number>(0);

  useEffect(() => {
    const start = performance.now() + delay;
    const settleSpread = duration * 0.55; // window over which chars lock in

    const tick = (now: number) => {
      const elapsed = now - start;

      if (elapsed < 0) {
        frame.current = requestAnimationFrame(tick);
        return;
      }

      let done = true;
      const out = text
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === " ") return ch;
          const settleAt = (i / text.length) * settleSpread;
          if (elapsed >= settleAt + duration * 0.45) return ch;
          done = false;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(out);

      if (!done) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [text, delay, duration]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
