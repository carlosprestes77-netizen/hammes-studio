"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ARTIST } from "@/lib/data";

const HERO_BG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/portfolio/dante.jpg`;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-end pb-20 lg:pb-28 overflow-hidden bg-paper-900"
    >
      {/* Background image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url('${HERO_BG}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper-950/95 via-paper-950/55 to-paper-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper-950/70 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative Latin — large ghost text */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-end pr-8 lg:pr-20 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <p
          className="font-serif text-paper-100 leading-none"
          style={{
            fontSize: "clamp(6rem, 18vw, 18rem)",
            opacity: 0.04,
            letterSpacing: "0.06em",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          VINCIT
        </p>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16"
      >
        <div className="max-w-3xl">
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
            Arte
            <br />
            <span className="font-light italic text-paper-300" style={{ fontWeight: 300 }}>
              gravada
            </span>
            <br />
            para sempre.
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
      </motion.div>

      {/* Right vertical label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-12 bg-paper-700" />
        <p
          className="text-paper-700 text-[8px] tracking-[0.4em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          {ARTIST.handle}
        </p>
        <div className="w-px h-12 bg-paper-700" />
      </div>
    </section>
  );
}
