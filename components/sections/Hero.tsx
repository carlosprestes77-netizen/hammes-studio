"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ARTIST } from "@/lib/data";
import ScrambleText from "@/components/ui/ScrambleText";

const HERO_BG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/portfolio/hero.jpg`;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Monolith slab — Y rotation makes the 3D turning visible because the slab has defined dimensions
  const rotateYRaw = useTransform(scrollYProgress, [0, 1], [0, 78]);
  const rotateY = useSpring(rotateYRaw, { damping: 22, stiffness: 55 });

  // Slight X tilt for spatial depth
  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [4, -10]);
  const rotateX = useSpring(rotateXRaw, { damping: 22, stiffness: 55 });

  // Slab drifts up as it rotates — feels like it's rising/turning
  const slabYRaw = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const slabY = useSpring(slabYRaw, { damping: 22, stiffness: 55 });

  // Text content floats up and fades
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.48], [1, 0]);

  return (
    // 220vh gives the monolith plenty of room to spin before the next section appears
    <section ref={ref} id="hero" className="relative bg-paper-950" style={{ minHeight: "220vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Pure dark background base */}
        <div className="absolute inset-0 z-0 bg-paper-950" />

        {/* === ROTATING MONOLITH SLAB === */}
        {/* The slab has defined dimensions so rotateY creates real 3D turning, not just a warp */}
        <div
          className="absolute inset-0 z-[1] flex items-center justify-end pr-4 lg:pr-12"
          style={{ perspective: "1000px", perspectiveOrigin: "60% 48%" }}
        >
          <motion.div
            style={{
              rotateY,
              rotateX,
              y: slabY,
              transformStyle: "preserve-3d",
              width: "clamp(260px, 38vw, 620px)",
              height: "clamp(400px, 80vh, 900px)",
              flexShrink: 0,
              boxShadow: "0 60px 160px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.05), 40px 0 120px rgba(0,0,0,0.7)",
            }}
          >
            {/* Front face */}
            <img
              src={HERO_BG}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 15%", backfaceVisibility: "hidden" }}
            />
            {/* Back face — dark stone slab */}
            <div
              className="absolute inset-0 bg-paper-900"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            />
            {/* Left edge — narrow dark strip to sell the slab thickness */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-paper-800"
              style={{ width: "18px", transform: "rotateY(-90deg) translateZ(-9px)", transformOrigin: "left center" }}
            />
          </motion.div>
        </div>

        {/* Atmospheric gradients — keep text on left readable */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-paper-950 via-paper-950/85 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-paper-950/90 via-transparent to-paper-950/60 pointer-events-none" />

        {/* Ghost VINCIT */}
        <div
          className="absolute inset-0 z-[3] flex items-center justify-end pr-8 lg:pr-20 pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <p
            className="font-serif text-paper-100 leading-none"
            style={{
              fontSize: "clamp(6rem, 18vw, 18rem)",
              opacity: 0.03,
              letterSpacing: "0.06em",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            VINCIT
          </p>
        </div>

        {/* Content — left side, fades as monolith takes over the scene */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 z-10 flex items-end pb-20 lg:pb-28"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
            <div className="max-w-[520px]">
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
                <ScrambleText
                  text="gravada"
                  delay={750}
                  className="block font-light italic text-paper-300"
                />
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
                <a href="#simulador" className="btn-primary">
                  Simulador Virtual
                </a>
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
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-20">
          <div className="w-px h-12 bg-paper-700" />
          <p
            className="text-paper-700 text-[8px] tracking-[0.4em] uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            {ARTIST.handle}
          </p>
          <div className="w-px h-12 bg-paper-700" />
        </div>
      </div>
    </section>
  );
}
