"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { faqs, ARTIST } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-36 bg-paper-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">

          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-28 self-start"
          >
            <p className="label-section mb-4">07 — Dúvidas Frequentes</p>
            <h2
              className="font-serif leading-[0.92] tracking-tight text-ink"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700 }}
            >
              Tudo o que
              <br />
              <span className="font-light italic" style={{ fontWeight: 300 }}>você precisa</span>
              <br />
              saber.
            </h2>
            <div className="divider mt-6 mb-8" />
            <p className="text-ink-muted text-sm leading-relaxed mb-6">
              Não encontrou sua resposta? Fale comigo direto — respondo pessoalmente cada mensagem.
            </p>
            <a
              href={`https://wa.me/${ARTIST.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 py-3 px-5 bg-[#25D366] text-white text-[10px] tracking-widest uppercase hover:bg-[#1da85a] transition-colors duration-300"
            >
              <MessageCircle size={13} /> Tirar dúvida
            </a>
          </motion.div>

          {/* Right: accordion */}
          <div className="divide-y divide-paper-300 border-t border-paper-300">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-serif text-lg lg:text-xl transition-colors duration-300 ${isOpen ? "text-ink" : "text-ink-muted group-hover:text-ink"}`}>
                      {item.q}
                    </span>
                    <span className={`flex-shrink-0 transition-transform duration-300 text-ink-muted group-hover:text-ink ${isOpen ? "rotate-45" : ""}`}>
                      <Plus size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-ink-muted text-sm leading-relaxed pb-6 pr-10 max-w-2xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
