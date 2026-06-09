"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ARTIST } from "@/lib/data";
import ScrambleText from "@/components/ui/ScrambleText";
import StatueMonolith from "@/components/ui/StatueMonolith";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Text fades as you scroll — the monolith takes over
  const textOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    // 300vh: the monolith rotates for 3 full screens before next section appears
    <section ref={ref} id="hero" className="relative" style={{ minHeight: "300vh", background: "#0b0a08" }}>
      <div className="sticky top-0 h-screen">

        {/* Real Three.js 3D monolith — fills the sticky viewport */}
        <StatueMonolith />

        {/* Dark gradients to keep text readable over the 3D scene */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to right, #0b0a08 0%, rgba(11,10,8,0.75) 42%, rgba(11,10,8,0.1) 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to top, #0b0a08 0%, rgba(11,10,8,0.6) 20%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to bottom, #0b0a08 0%, transparent 15%)",
          }}
        />

        {/* Ghost VINCIT */}
        <div
          className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-20 pointer-events-none select-none overflow-hidden"
          style={{ zIndex: 3 }}
          aria-hidden
        >
          <p
            className="font-serif text-paper-100 leading-none"
            style={{
              fontSize: "clamp(6rem, 18vw, 18rem)",
              opacity: 0.025,
              letterSpacing: "0.06em",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            VINCIT
          </p>
        </div>

        {/* Text content — left side, fades as monolith takes focus */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 flex items-end pb-20 lg:pb-28"
          aria-label="Hero content"
          role="region"
          // @ts-ignore — zIndex via style
          // eslint-disable-next-line react/no-unknown-property
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16" style={{ position: "relative", zIndex: 10 }}>
            <div className="max-w-[460px]">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-[9px] tracking-[0.5em] uppercase font-sans font-light text-paper-500 mb-6"
              >
                Microrealismo · Geometria Sagrada · Foz do Iguaçu
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif leading-[0.88] tracking-tight text-paper-100"
                style={{ fontSize: "clamp(3.8rem, 10vw, 9rem)", fontWeight: 700 }}
              >
                <ScrambleText text="Arte" delay={500} className="block" />
                <ScrambleText text="gravada" delay={750} className="block font-light italic text-paper-300" />
                <ScrambleText text="para sempre." delay={1000} className="block" />
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                className="origin-left w-16 h-px bg-paper-600 mt-8 mb-7"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-paper-400 text-sm font-light leading-relaxed max-w-sm mb-3 font-serif italic"
              >
                "Entre o sagrado e a razão — um diálogo entre fé, tempo e memória."
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.25 }}
                className="text-paper-600 text-[10px] tracking-widest uppercase mb-10"
              >
                {ARTIST.name}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.3 }}
                className="flex flex-wrap gap-3"
              >
                <a href="#simulador" className="btn-primary">Simulador Virtual</a>
                <a
                  href="#portfolio"
                  className="relative inline-flex items-center gap-2 px-8 py-3.5 border border-paper-700 text-paper-300 font-sans font-medium tracking-widest text-[10px] uppercase transition-all duration-300 hover:border-paper-400 hover:text-paper-100"
                >
                  Ver Portfólio
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right vertical label */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3" style={{ zIndex: 10 }}>
          <div className="w-px h-12 bg-paper-700" />
          <p className="text-paper-700 text-[8px] tracking-[0.4em] uppercase" style={{ writingMode: "vertical-rl" }}>
            {ARTIST.handle}
          </p>
          <div className="w-px h-12 bg-paper-700" />
        </div>
      </div>
    </section>
  );
}
