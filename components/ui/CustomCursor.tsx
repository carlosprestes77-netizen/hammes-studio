"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const machineX = useSpring(x, { damping: 28, stiffness: 400, mass: 0.3 });
  const machineY = useSpring(y, { damping: 28, stiffness: 400, mass: 0.3 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, input, textarea, select, label, [data-cursor='hover']"));
    };
    const downH = () => setDown(true);
    const upH = () => setDown(false);
    const leave = () => { x.set(-200); y.set(-200); };

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
      <motion.div
        style={{ x: machineX, y: machineY }}
        className="absolute left-0 top-0"
        animate={{ scale: down ? 0.88 : 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      >
        {/* Tattoo machine — needle tip is the hotspot at (14, 0) top-center */}
        <motion.svg
          width="44"
          height="72"
          viewBox="0 0 44 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: "translate(-14px, -4px) rotate(-15deg)",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.7))",
            mixBlendMode: "difference",
          }}
          animate={{ rotate: hovering ? -5 : -15 }}
          transition={{ type: "spring", damping: 18, stiffness: 200 }}
        >
          {/* Needle tip */}
          <line x1="14" y1="0" x2="14" y2="10" stroke="#e8e0d0" strokeWidth="1.2" strokeLinecap="round" />

          {/* Needle tube / grip lower */}
          <rect x="10" y="10" width="8" height="22" rx="2" fill="#c8bfb0" />
          <rect x="11.5" y="12" width="5" height="18" rx="1" fill="#d8d0c0" opacity="0.5" />

          {/* Grip bands */}
          <rect x="10" y="14" width="8" height="1.5" rx="0.5" fill="#a09080" />
          <rect x="10" y="18" width="8" height="1.5" rx="0.5" fill="#a09080" />
          <rect x="10" y="22" width="8" height="1.5" rx="0.5" fill="#a09080" />
          <rect x="10" y="26" width="8" height="1.5" rx="0.5" fill="#a09080" />

          {/* Machine body */}
          <rect x="7" y="32" width="14" height="20" rx="3" fill="#b0a898" />
          <rect x="8.5" y="33.5" width="11" height="17" rx="2" fill="#c8bfb0" opacity="0.4" />

          {/* Motor circle */}
          <circle cx="14" cy="42" r="5" fill="#888278" />
          <circle cx="14" cy="42" r="3" fill="#a09888" />
          <circle cx="14" cy="42" r="1.2" fill="#d0c8b8" />

          {/* Top cap */}
          <rect x="9" y="29" width="10" height="4" rx="1.5" fill="#9a9088" />

          {/* Power cord */}
          <path d="M21 38 Q32 36 36 28 Q40 20 38 14" stroke="#888" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="0" />
          <circle cx="38" cy="13" r="2.5" fill="#777" />

          {/* Side screw details */}
          <circle cx="9" cy="36" r="1" fill="#787068" />
          <circle cx="9" cy="48" r="1" fill="#787068" />
          <circle cx="19" cy="36" r="1" fill="#787068" />
          <circle cx="19" cy="48" r="1" fill="#787068" />

          {/* Bottom rubber grip end */}
          <rect x="10.5" y="51" width="7" height="3" rx="1.5" fill="#888" />
        </motion.svg>

        {/* Tiny ink dot at the needle tip — confirms exact click point */}
        <motion.span
          className="absolute rounded-full bg-paper-100"
          style={{ top: 2, left: 12, width: 4, height: 4, marginLeft: -2, marginTop: -2 }}
          animate={{ opacity: hovering ? 0 : 0.8, scale: down ? 1.8 : 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </div>
  );
}
