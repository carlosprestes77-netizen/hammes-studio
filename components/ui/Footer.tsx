"use client";

import { Instagram, MapPin, Phone, Clock, ShieldCheck, ArrowUp } from "lucide-react";
import { ARTIST } from "@/lib/data";

const nav = [
  ["Portfólio", "#portfolio"],
  ["Flashes", "#flashes"],
  ["Simulador", "#simulador"],
  ["Processo", "#processo"],
  ["O Artista", "#estudio"],
  ["Depoimentos", "#depoimentos"],
  ["Dúvidas", "#faq"],
  ["Orçamento", "#orcamento"],
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">

        {/* Top CTA strip */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-14 border-b border-paper-800">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-paper-600 mb-4">Pronto para começar?</p>
            <h3 className="font-serif text-paper-100 leading-[0.95]" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700 }}>
              Sua próxima<br />
              <span className="font-light italic" style={{ fontWeight: 300 }}>tatuagem começa aqui.</span>
            </h3>
          </div>
          <a
            href={`https://wa.me/${ARTIST.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 py-4 px-7 bg-[#25D366] text-white text-[10px] tracking-widest uppercase hover:bg-[#1da85a] transition-colors duration-300 w-fit"
          >
            <Phone size={14} /> Falar no WhatsApp
          </a>
        </div>

        {/* Columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          <div className="space-y-4">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-light text-paper-100 tracking-wider">{ARTIST.name.toUpperCase()}</span>
              <span className="text-[8px] tracking-[0.45em] text-paper-500 uppercase font-light mt-0.5">Tattoo</span>
            </div>
            <p className="text-paper-500 text-xs leading-relaxed max-w-xs">
              Microrealismo, geometria sagrada e arte clássica na pele. Projetos autorais de alto padrão.
            </p>
            <div className="flex items-center gap-2 text-paper-600 text-[10px] tracking-wider pt-1">
              <ShieldCheck size={13} /> Biossegurança · Material descartável
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] tracking-widest uppercase text-paper-600">Navegação</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {nav.map(([l, h]) => (
                <a key={h} href={h} className="block text-xs text-paper-500 hover:text-paper-200 transition-colors duration-300">{l}</a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] tracking-widest uppercase text-paper-600">Horários</p>
            <div className="space-y-2.5">
              {ARTIST.hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-paper-500 flex items-center gap-2">
                    <Clock size={12} className="text-paper-700" /> {h.day}
                  </span>
                  <span className="text-paper-400">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[9px] tracking-widest uppercase text-paper-600">Contato</p>
            <div className="space-y-3">
              <a href={ARTIST.instagram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-paper-500 hover:text-paper-200 transition-colors duration-300">
                <Instagram size={13} /> {ARTIST.handle}
              </a>
              <a href={`https://wa.me/${ARTIST.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-paper-500 hover:text-paper-200 transition-colors duration-300">
                <Phone size={13} /> WhatsApp
              </a>
              <div className="flex items-center gap-2.5 text-xs text-paper-600">
                <MapPin size={13} /> {ARTIST.city}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-paper-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] text-paper-700 tracking-wider">
            © {new Date().getFullYear()} {ARTIST.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[9px] text-paper-800 tracking-wider italic font-serif hidden sm:block">
              Arte não se copia. Arte se cria.
            </p>
            <a href="#hero" className="flex items-center gap-1.5 text-[9px] tracking-widest uppercase text-paper-600 hover:text-paper-200 transition-colors duration-300">
              Topo <ArrowUp size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
