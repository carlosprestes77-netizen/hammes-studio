"use client";

import { motion } from "framer-motion";
import { ARTIST } from "@/lib/data";

const lines = [
  { t: "Não tatuo desenhos.", big: true },
  { t: "Tatuo decisões.", big: true, gold: true },
];

const body =
  "Cada traço que cravo na pele é irreversível — e é exatamente por isso que ele precisa ser verdadeiro. Trabalho no encontro entre o clássico e o sagrado, entre a razão e a fé, porque acredito que a pele guarda aquilo que as palavras esquecem.";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-paper-950 py-28 lg:py-44"
    >
      {/* Ghost word, echoing the hero */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-start pl-4 select-none lg:pl-12"
        aria-hidden
      >
        <p
          className="font-serif leading-none text-paper-100"
          style={{ fontSize: "clamp(7rem, 20vw, 22rem)", opacity: 0.035 }}
        >
          CREDO
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-[10px] uppercase tracking-[0.5em] text-paper-600"
        >
          Manifesto
        </motion.p>

        <h2
          className="font-serif font-light leading-[1.02] tracking-tight text-paper-100"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
        >
          {lines.map((l, i) => (
            <motion.span
              key={l.t}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${l.gold ? "italic text-gold-pale" : ""}`}
            >
              {l.t}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="my-12 h-px w-20 origin-left bg-gold"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="max-w-2xl font-serif text-lg font-light italic leading-relaxed text-paper-400 lg:text-xl"
        >
          {body}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-12 font-serif text-xl text-paper-200 lg:text-2xl"
        >
          Uma tatuagem não embeleza o corpo.
          <br />
          <span className="text-paper-500">Ela o transforma em testemunho.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 text-[10px] uppercase tracking-[0.4em] text-paper-600"
        >
          — {ARTIST.name}, {ARTIST.city}
        </motion.p>
      </div>
    </section>
  );
}
