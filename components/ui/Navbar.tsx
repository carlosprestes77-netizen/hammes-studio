"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ARTIST } from "@/lib/data";

const links = [
  { label: "Portfólio", href: "#portfolio" },
  { label: "Flashes", href: "#flashes" },
  { label: "Simulador", href: "#simulador" },
  { label: "Processo", href: "#processo" },
  { label: "Artista", href: "#estudio" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-paper border-b border-paper-300"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="group flex flex-col leading-none">
            <span className="font-serif text-lg lg:text-xl font-light text-ink tracking-[0.12em] group-hover:text-gold transition-colors duration-300">
              {ARTIST.name.toUpperCase()}
            </span>
            <span className="text-[8px] tracking-[0.45em] text-ink-muted uppercase font-light mt-0.5">
              Tattoo
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-9">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-widest uppercase text-ink-muted hover:text-ink transition-colors duration-300 relative group font-light whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href="#orcamento" className="hidden lg:inline-flex btn-outline text-[9px] py-2.5 px-5">
            Agendar
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-ink hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 glass-paper border-b border-paper-300 lg:hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs tracking-widest uppercase text-ink-muted hover:text-ink transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a href="#orcamento" onClick={() => setMobileOpen(false)} className="btn-outline text-[9px] py-2.5 w-fit">
                Agendar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
