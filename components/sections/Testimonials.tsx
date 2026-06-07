"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials, ARTIST } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 lg:py-36 bg-paper-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <p className="label-section mb-4">06 — Depoimentos</p>
            <h2
              className="font-serif leading-[0.92] tracking-tight text-ink"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700 }}
            >
              Marcas que
              <br />
              <span className="font-light italic" style={{ fontWeight: 300 }}>contam</span>
              <br />
              histórias.
            </h2>
          </div>
          <div className="flex flex-col gap-2 lg:items-end">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-gold-light text-gold-light" />
              ))}
            </div>
            <p className="text-ink-muted text-sm font-light">
              <span className="text-ink font-medium">5,0</span> · centenas de clientes satisfeitos
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="bg-paper-50 border border-paper-300 p-7 flex flex-col gap-5 hover:border-paper-500 transition-colors duration-300"
            >
              <Quote size={22} className="text-gold-light/60" />
              <blockquote className="text-ink-muted text-sm leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="pt-4 border-t border-paper-300">
                <p className="font-serif text-ink text-base">{t.name}</p>
                <p className="text-[9px] tracking-widest uppercase text-ink-faint mt-1">{t.work}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-paper-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <p className="text-xs text-ink-faint font-light">
            Veja mais avaliações e trabalhos no Instagram.
          </p>
          <a
            href={ARTIST.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-widest uppercase text-ink-muted hover:text-ink transition-colors duration-300"
          >
            {ARTIST.handle} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
