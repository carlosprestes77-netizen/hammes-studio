"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ARTIST } from "@/lib/data";
import ScrambleText from "@/components/ui/ScrambleText";

const HERO_BG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/portfolio/hero.jpg`;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Monolith rotates from nearly-flat to clearly-turned as you scroll
  const rotateYRaw = useTransform(scrollYProgress, [0, 1], [-14, 62]);
  const rotateY = useSpring(rotateYRaw, { damping: 18, stiffness: 40, mass: 1 });

  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [4, -8]);
  const rotateX = useSpring(rotateXRaw, { damping: 18, stiffness: 40, mass: 1 });

  const slabYRaw = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const slabY = useSpring(slabYRaw, { damping: 18, stiffness: 40, mass: 1 });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} id="hero" className="relative" style={{ minHeight: "240vh", background: "#0c0b09" }}>
      <div
        className="sticky top-0 h-screen"
        style={{ perspective: "900px", perspectiveOrigin: "50% 42%" }}
      >

        {/* ── MONOLITH SLAB ─────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
          <motion.div
            style={{
              rotateY,
              rotateX,
              y: slabY,
              // Monolith: very tall, narrow — 1:3 ratio
              width: "clamp(200px, 26vw, 440px)",
              height: "clamp(500px, 88vh, 1050px)",
              position: "relative",
              boxShadow: "0 0 0 1px rgba(255,248,230,0.06), 0 60px 180px rgba(0,0,0,0.98), -60px 0 120px rgba(0,0,0,0.6)",
            }}
          >
            {/* Statue photo — front face */}
            <img
              src={HERO_BG}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 10%" }}
            />

            {/* Dark tint that strengthens on the edges — simulates lighting falloff */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Right edge — dark stone face revealed as slab turns */}
            <div
              style={{
                position: "absolute",
                top: 0, bottom: 0, right: 0,
                width: "40px",
                background: "linear-gradient(90deg, #1c1813 0%, #080604 100%)",
                transformOrigin: "right center",
                transform: "rotateY(90deg)",
              }}
            />

            {/* Left edge — revealed when slab turns toward viewer */}
            <div
              style={{
                position: "absolute",
                top: 0, bottom: 0, left: 0,
                width: "40px",
                background: "linear-gradient(-90deg, #1c1813 0%, #080604 100%)",
                transformOrigin: "left center",
                transform: "rotateY(-90deg)",
              }}
            />

            {/* Subtle rim highlight on top edge */}
            <div
              style={{
                position: "absolute",
                top: 0, left: "10%", right: "10%",
                height: "1px",
                background: "rgba(255,248,230,0.2)",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </div>

        {/* Vignette — darkens corners but keeps center open for the slab */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background: "radial-gradient(ellipse 80% 70% at 50% 48%, transparent 35%, #0c0b09 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background: "linear-gradient(to bottom, #0c0b09 0%, transparent 12%, transparent 80%, #0c0b09 100%)",
          }}
        />

        {/* Ghost VINCIT */}
        <div
          className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-20 pointer-events-none select-none overflow-hidden"
          style={{ zIndex: 4 }}
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

        {/* ── TEXT CONTENT ──────────────────────────────────────── */}
        <motion.div
          style={{ zIndex: 10, y: textY, opacity: textOpacity }}
          className="absolute inset-0 flex items-end pb-20 lg:pb-28"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
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
