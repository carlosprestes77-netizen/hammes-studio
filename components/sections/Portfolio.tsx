"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioItems, ARTIST } from "@/lib/data";

const filters = ["Todos", "Neo-Geométrico", "Collage", "Neo-Clássico"];

type PortfolioItem = (typeof portfolioItems)[0];

function Card({ item, index }: { item: PortfolioItem; index: number }) {
  return (
    <div
      data-cursor="hover"
      className="group relative h-full w-[78vw] flex-shrink-0 overflow-hidden sm:w-[56vw] lg:w-[34vw] xl:w-[30vw]"
    >
      <img
        src={item.src}
        alt={item.alt}
        loading={index < 3 ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[900ms] ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-paper-950/85 via-paper-950/15 to-transparent" />

      <div className="absolute right-5 top-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="bg-paper-950/60 px-2 py-1 text-[8px] uppercase tracking-widest text-paper-300 backdrop-blur-sm">
          {item.style}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="mb-1 text-[8px] uppercase tracking-[0.4em] text-paper-500">
          {item.style} · {item.placement}
        </p>
        <p className="font-serif text-lg font-semibold tracking-wider text-paper-100">
          {item.label}
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Todos");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const filtered: PortfolioItem[] =
    active === "Todos"
      ? portfolioItems
      : portfolioItems.filter((i) => i.style === active);

  // Measure how far the track overruns the viewport so vertical scroll can be
  // mapped 1:1 onto a horizontal translate. Re-measures on resize and whenever
  // the active filter changes the number of cards.
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setDistance(isDesktop ? Math.max(track.scrollWidth - window.innerWidth, 0) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filtered.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(xRaw, { damping: 40, stiffness: 220, mass: 0.5 });

  const pinned = distance > 0;

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="bg-paper-200"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-12" : "py-24 lg:py-36"
        }
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="label-section mb-4">01 — Portfólio</p>
              <h2
                className="font-serif font-light leading-[0.95] tracking-tight text-ink"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Trabalhos
                <br />
                Selecionados
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`border px-4 py-2 text-[9px] font-light uppercase tracking-widest transition-all duration-200 ${
                    active === f
                      ? "border-ink bg-ink text-paper-100"
                      : "border-paper-400 text-ink-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Horizontal reel — pinned scroll on desktop, native swipe on mobile */}
        {pinned ? (
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-[60vh] gap-5 pl-6 pr-[12vw] lg:pl-16"
          >
            {filtered.map((item, i) => (
              <Card key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        ) : (
          <div
            ref={trackRef}
            className="flex h-[62vh] snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filtered.map((item, i) => (
              <div key={item.id} className="snap-center">
                <Card item={item} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="mt-10 flex items-center justify-between border-t border-paper-300 pt-8 lg:mt-14">
            <p className="text-xs font-light text-ink-faint">
              {pinned ? "Role para percorrer ·" : "Arraste para o lado ·"} +1000 trabalhos realizados
            </p>
            <a
              href={ARTIST.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              Ver Instagram →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
