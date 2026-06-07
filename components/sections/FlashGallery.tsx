"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { flashItems } from "@/lib/data";

function FlashImage({ src, name, style }: { src: string; name: string; style: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-paper-100 p-8">
        <p className="font-serif text-2xl text-ink font-bold text-center leading-tight">{name}</p>
        <div className="w-8 h-px bg-paper-400" />
        <p className="text-[9px] tracking-widest uppercase text-ink-faint">{style}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setErrored(true)}
      className="w-full h-full object-contain p-6 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
      draggable={false}
    />
  );
}

export default function FlashGallery() {
  if (flashItems.length === 0) {
    return (
      <section id="flashes" className="py-24 lg:py-36 bg-paper-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-section mb-4">02 — Flashes Disponíveis</p>
            <h2
              className="font-serif leading-[0.92] tracking-tight text-ink"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700 }}
            >
              Designs
              <br />
              <span className="font-light italic" style={{ fontWeight: 300 }}>prontos para</span>
              <br />
              tatuar.
            </h2>
            <p className="text-ink-muted text-sm mt-6">Em breve — flashes disponíveis.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="flashes" className="py-24 lg:py-36 bg-paper-100">
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
            <p className="label-section mb-4">02 — Flashes Disponíveis</p>
            <h2
              className="font-serif leading-[0.92] tracking-tight text-ink"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700 }}
            >
              Designs
              <br />
              <span className="font-light italic" style={{ fontWeight: 300 }}>prontos para</span>
              <br />
              tatuar.
            </h2>
          </div>
          <p className="text-ink-muted text-sm font-light leading-relaxed max-w-xs">
            Cada flash é um original. Arte desenvolvida especificamente para marcar a pele — geometria, realismo e intenção em cada linha.
          </p>
        </motion.div>

        {/* Flash grid — big cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-300">
          {flashItems.map((flash, i) => (
            <motion.div
              key={flash.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-paper-50 flex flex-col"
            >
              {/* Image */}
              <div className="relative bg-white overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <FlashImage src={flash.src} name={flash.name} style={flash.style} />
                <div className="absolute top-4 left-4">
                  <span className="text-[8px] tracking-widest uppercase bg-ink text-paper-100 px-2.5 py-1">
                    {flash.style}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-3 flex-1 border-t border-paper-300">
                <div>
                  <h3 className="font-serif text-xl text-ink font-semibold">{flash.name}</h3>
                  <p className="text-ink-muted text-xs leading-relaxed mt-1.5">{flash.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-paper-200">
                  <a
                    href={`#orcamento?flash=${encodeURIComponent(flash.name)}`}
                    className="inline-flex items-center gap-2 text-[9px] tracking-widest uppercase text-ink hover:text-gold-light transition-colors duration-300"
                  >
                    Quero este flash <ArrowRight size={10} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 pt-8 border-t border-paper-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <p className="text-[10px] text-ink-faint leading-relaxed max-w-sm">
            Cada design é vendido uma única vez — após tatuado, é retirado da lista. Arte que não se repete.
          </p>
          <a href="#simulador" className="text-[9px] tracking-widest uppercase text-ink-muted hover:text-ink transition-colors">
            Testar no simulador →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
