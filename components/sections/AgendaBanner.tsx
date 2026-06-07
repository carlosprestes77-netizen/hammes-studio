"use client";

import { motion } from "framer-motion";

export default function AgendaBanner() {
  const currentMonth = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date());
  const month = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return (
    <div className="bg-ink text-paper-100 border-b border-paper-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="text-[10px] tracking-widest uppercase font-light text-paper-300">
            Agenda aberta —{" "}
            <span className="text-paper-100 font-normal">{month}</span>
            {" "}· vagas limitadas
          </span>
        </div>
        <a
          href="#orcamento"
          className="text-[10px] tracking-widest uppercase text-paper-400 hover:text-paper-100 transition-colors duration-300"
        >
          Garantir vaga →
        </a>
      </div>
    </div>
  );
}
