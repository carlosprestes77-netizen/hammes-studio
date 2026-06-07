"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { ARTIST } from "@/lib/data";

const PRESET = encodeURIComponent(
  `Olá ${ARTIST.name}! Vim pelo site e gostaria de tirar uma dúvida / fazer um orçamento. 🖤`
);

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setBubble(true), 1200);
    const t2 = setTimeout(() => setBubble(false), 8000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 lg:bottom-8 lg:right-8 z-50 flex items-end gap-3"
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.9 }}
                className="mb-1.5 max-w-[210px] bg-paper-50 border border-paper-300 shadow-lg shadow-paper-950/10 p-3.5 pr-7 relative"
              >
                <button
                  onClick={() => setBubble(false)}
                  className="absolute top-1.5 right-1.5 text-ink-faint hover:text-ink transition-colors"
                  aria-label="Fechar"
                >
                  <X size={11} />
                </button>
                <p className="text-[11px] text-ink leading-snug">
                  Tem uma ideia em mente? <span className="text-gold">Me chama no WhatsApp</span> — respondo pessoalmente.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={`https://wa.me/${ARTIST.whatsapp}?text=${PRESET}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/20 transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-0" />
            <MessageCircle size={24} className="relative" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
