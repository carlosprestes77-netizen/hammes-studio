"use client";

import { motion } from "framer-motion";
import { ARTIST } from "@/lib/data";

const values = [
  { n: "I", title: "Microrealismo + Geometria", desc: "Cada composição une realismo fotográfico com geometria sagrada — proporções matemáticas, órbitas, constelações. Uma linguagem única." },
  { n: "II", title: "Narrativa Visual", desc: "Figuras greco-romanas, latim clássico, símbolos maçônicos. Conceito contado através de uma narrativa visual construída para durar." },
  { n: "III", title: "Vínculo Permanente", desc: "Acompanhamento completo na cicatrização. Retoques inclusos nos primeiros 60 dias. A relação não termina quando a agulha para." },
];

export default function Studio() {
  return (
    <section id="estudio" className="py-24 lg:py-36 bg-paper-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: image editorial */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-paper-300">
              <img
                src={ARTIST.portrait}
                alt={`${ARTIST.name} no estúdio`}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Offset label card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-ink text-paper-100 p-6"
            >
              <p className="font-serif text-3xl text-paper-100 font-bold">+1000</p>
              <p className="text-[9px] tracking-widest text-paper-500 uppercase mt-1">Peças realizadas</p>
            </motion.div>
          </motion.div>

          {/* Right: content */}
          <div className="pt-4 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="label-section mb-4">05 — O Artista</p>
              <h2
                className="font-serif leading-[0.92] tracking-tight text-ink"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700 }}
              >
                Onde Cada
                <br />
                <span className="font-light italic" style={{ fontWeight: 300 }}>Linha Tem</span>
                <br />
                Intenção.
              </h2>
              <div className="divider mt-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-3"
            >
              <p className="text-ink-muted text-sm leading-relaxed">
                {ARTIST.name} é especialista em microrealismo com geometria — figuras greco-romanas, latim clássico e estruturas matemáticas que transformam a pele em composição permanente.
              </p>
              <p className="text-ink-faint text-xs tracking-wider uppercase">{ARTIST.city}</p>
            </motion.div>

            <div className="space-y-7">
              {values.map((v, i) => (
                <motion.div
                  key={v.n}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-6 pb-7 border-b border-paper-300 last:border-0 last:pb-0"
                >
                  <span className="font-serif text-xs text-ink-faint mt-0.5 flex-shrink-0 w-4">{v.n}</span>
                  <div>
                    <h4 className="font-serif text-lg text-ink mb-1">{v.title}</h4>
                    <p className="text-ink-muted text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-lg text-ink-muted italic leading-snug pt-4 border-t border-paper-300"
            >
              "Algumas decisões na vida são como um código — você analisa, calcula, mas em algum momento precisa confiar no instinto."
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
