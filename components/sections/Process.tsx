"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data";

export default function Process() {
  return (
    <section id="processo" className="py-24 lg:py-36 bg-ink text-paper-200">
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
            <p className="text-[10px] tracking-[0.5em] uppercase font-light text-paper-500 mb-4">
              04 — Como Funciona
            </p>
            <h2
              className="font-serif leading-[0.92] tracking-tight text-paper-100"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700 }}
            >
              Da ideia
              <br />
              <span className="font-light italic" style={{ fontWeight: 300 }}>à pele —</span>
              <br />
              cada passo.
            </h2>
          </div>
          <p className="text-paper-400 text-sm font-light leading-relaxed max-w-xs">
            Um processo pensado para você se sentir seguro do primeiro contato à cicatrização completa.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper-800">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-ink p-8 lg:p-9 flex flex-col gap-5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-paper-700 text-4xl group-hover:text-gold-light transition-colors duration-500">
                  {step.n}
                </span>
                <span className="w-8 h-px bg-paper-700 group-hover:bg-gold-light group-hover:w-12 transition-all duration-500" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-paper-100 mb-3">{step.title}</h3>
                <p className="text-paper-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a href="#orcamento" className="btn-primary bg-paper-100 text-ink hover:bg-paper-300">
            Começar meu projeto
          </a>
          <p className="text-paper-500 text-xs">Resposta em até 24h · Briefing gratuito</p>
        </motion.div>
      </div>
    </section>
  );
}
