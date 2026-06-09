"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ARTIST } from "@/lib/data";
import ScrambleText from "@/components/ui/ScrambleText";

const HERO_BG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/portfolio/hero.jpg`;

// Monolith depth in px — the physical thickness of the slab
const DEPTH = 36;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Y-axis rotation: the monolith slowly turns as you scroll
  const rotateYRaw = useTransform(scrollYProgress, [0, 1], [-8, 55]);
  const rotateY = useSpring(rotateYRaw, { damping: 20, stiffness: 45, mass: 0.8 });

  // Subtle X tilt for extra depth illusion
  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [3, -6]);
  const rotateX = useSpring(rotateXRaw, { damping: 20, stiffness: 45, mass: 0.8 });

  // Monolith rises slightly as it turns
  const slabYRaw = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const slabY = useSpring(slabYRaw, { damping: 20, stiffness: 45, mass: 0.8 });

  // Text fades, monolith stays
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    // 230vh: sticky scene stays for more than 2 full screens of scrolling
    <section ref={ref} id="hero" className="relative bg-[#080808]" style={{ minHeight: "230vh" }}>
      <div className="sticky top-0 h-screen" style={{ perspective: "1100px", perspectiveOrigin: "52% 44%" }}>

        {/* ── MONOLITH ─────────────────────────────────────────────── */}
        {/*
          A genuine CSS 3D cuboid. Front face = statue photo.
          Left / right faces = near-black strips that become visible
          as the slab rotates — this is what makes it feel 3D.
        */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
          <motion.div
            style={{
              rotateY,
              rotateX,
              y: slabY,
              transformStyle: "preserve-3d",
              // Monolith proportions: narrow & very tall (roughly 1 : 2.8)
              width: "clamp(180px, 24vw, 400px)",
              height: "clamp(440px, 82vh, 980px)",
              position: "relative",
            }}
          >
            {/* FRONT FACE — statue photo */}
            <img
              src={HERO_BG}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: "center 12%",
                transform: `translateZ(${DEPTH / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            />

            {/* RIGHT FACE — dark stone edge, visible when turning left */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: `${DEPTH}px`,
                height: "100%",
                background: "linear-gradient(to right, #1a1710, #0a0906)",
                transform: `rotateY(90deg) translateZ(0px)`,
                transformOrigin: "right center",
                backfaceVisibility: "hidden",
              }}
            />

            {/* LEFT FACE — dark stone edge, visible when turning right */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${DEPTH}px`,
                height: "100%",
                background: "linear-gradient(to left, #1a1710, #0a0906)",
                transform: `rotateY(-90deg) translateZ(0px)`,
                transformOrigin: "left center",
                backfaceVisibility: "hidden",
              }}
            />

            {/* BACK FACE — pure dark if it ever comes into view */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#060504",
                transform: `rotateY(180deg) translateZ(${DEPTH / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            />

            {/* Faint rim light on the slab — top edge glow */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "rgba(255,248,235,0.18)",
                transform: `translateZ(${DEPTH / 2 + 1}px)`,
              }}
            />
          </motion.div>
        </div>

        {/* Atmospheric vignette — pools of darkness around the monolith */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background: "radial-gradient(ellipse 70% 60% at 52% 48%, transparent 30%, #080808 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background: "linear-gradient(to bottom, #080808 0%, transparent 15%, transparent 75%, #080808 100%)",
          }}
        />
        {/* Left gradient keeps text legible on mobile */}
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            zIndex: 3,
            background: "linear-gradient(to bottom, rgba(8,8,8,0.7) 60%, transparent)",
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
              opacity: 0.025,
              letterSpacing: "0.06em",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            VINCIT
          </p>
        </div>

        {/* ── TEXT CONTENT ─────────────────────────────────────────── */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 flex items-end pb-20 lg:pb-28"
          aria-label="Hero content"
          role="region"
        >
          <div
            className="w-full max-w-7xl mx-auto px-6 lg:px-16"
            style={{ position: "relative", zIndex: 10 }}
          >
            <div className="max-w-[480px]">
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
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
          style={{ zIndex: 10 }}
        >
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
