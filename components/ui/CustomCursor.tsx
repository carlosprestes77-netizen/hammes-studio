"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Minimal two-part cursor: a fast solid dot and a soft lagging ring.
// Only activates on fine-pointer devices (mouse/trackpad) and leaves the
// native cursor untouched if JS never runs — pure progressive enhancement.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { damping: 45, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(y, { damping: 45, stiffness: 900, mass: 0.2 });
  const ringX = useSpring(x, { damping: 30, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(y, { damping: 30, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(
        !!t?.closest("a, button, input, textarea, select, label, [data-cursor='hover']"),
      );
    };
    const downH = () => setDown(true);
    const upH = () => setDown(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", downH);
    window.addEventListener("mouseup", upH);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", downH);
      window.removeEventListener("mouseup", upH);
      document.removeEventListener("mouseleave", leave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {/* Lagging ring */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.span
          className="block rounded-full border border-paper-100"
          style={{ mixBlendMode: "difference" }}
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            x: hovering ? -28 : -16,
            y: hovering ? -28 : -16,
            opacity: down ? 0.4 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.4 }}
        />
      </motion.div>

      {/* Fast dot */}
      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <motion.span
          className="block rounded-full bg-paper-100"
          style={{ mixBlendMode: "difference" }}
          animate={{
            width: hovering ? 0 : 5,
            height: hovering ? 0 : 5,
            x: hovering ? 0 : -2.5,
            y: hovering ? 0 : -2.5,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 500 }}
        />
      </motion.div>
    </div>
  );
}
