"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="bg-paper-200 border-y border-paper-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center lg:text-left lg:border-l lg:border-paper-300 lg:pl-6 first:lg:border-l-0 first:lg:pl-0"
            >
              <p
                className="font-serif text-ink leading-none"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)", fontWeight: 700 }}
              >
                {s.value}
              </p>
              <p className="text-[9px] lg:text-[10px] tracking-[0.25em] uppercase text-ink-muted mt-3">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
