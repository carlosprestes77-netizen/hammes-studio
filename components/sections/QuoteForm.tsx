"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ARTIST } from "@/lib/data";
import { trackWhatsAppClick } from "@/lib/analytics";

interface FormData {
  name: string; whatsapp: string; description: string;
  placement: string; size: string; references: File[]; selectedFlash: string;
}

function Field({ label, name, type = "text", value, onChange, placeholder }: {
  label: string; name: string; type?: string;
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const up = focused || value.length > 0;
  return (
    <div className="relative pt-5">
      <label className={cn("absolute left-0 pointer-events-none transition-all duration-300",
        up ? "top-0 text-[9px] tracking-widest uppercase text-gold" : "top-5 text-sm text-ink-faint")}>
        {label}
      </label>
      <input type={type} name={name} value={value}
        placeholder={focused ? placeholder : ""}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b border-paper-400 focus:border-ink outline-none text-ink text-sm py-2 transition-colors duration-300 placeholder-paper-400" />
    </div>
  );
}

function Textarea({ label, name, value, onChange }: {
  label: string; name: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const up = focused || value.length > 0;
  return (
    <div className="relative pt-5">
      <label className={cn("absolute left-0 pointer-events-none transition-all duration-300",
        up ? "top-0 text-[9px] tracking-widest uppercase text-gold" : "top-5 text-sm text-ink-faint")}>
        {label}
      </label>
      <textarea name={name} value={value} rows={4}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b border-paper-400 focus:border-ink outline-none text-ink text-sm py-2 transition-colors duration-300 resize-none" />
    </div>
  );
}

function buildMessage(f: FormData) {
  return [
    `Olá ${ARTIST.name}! Vim pelo site e quero um orçamento. 🖤`,
    ``, `*Nome:* ${f.name}`,
    f.whatsapp ? `*WhatsApp:* ${f.whatsapp}` : "",
    f.selectedFlash ? `*Flash:* ${f.selectedFlash}` : "",
    f.placement ? `*Local:* ${f.placement}` : "",
    f.size ? `*Tamanho:* ${f.size}` : "",
    ``, `*Ideia:*`, f.description || "(sem descrição)",
  ].filter(Boolean).join("\n");
}

const placements = ["Antebraço", "Braço", "Ombro", "Costela", "Perna", "Tornozelo", "Pé", "Pescoço", "Costas", "Outro"];
const sizes = ["Pequeno (até 5cm)", "Médio (5–10cm)", "Grande (10–20cm)", "Full piece (+20cm)"];

export default function QuoteForm() {
  const [form, setForm] = useState<FormData>({ name: "", whatsapp: "", description: "", placement: "", size: "", references: [], selectedFlash: "" });
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const applyFlash = () => {
      const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
      const flash = params.get("flash");
      if (!flash) return;
      setForm(p => ({
        ...p,
        selectedFlash: flash,
        description: p.description.trim() === "" || p.description.startsWith("Quero a tatuagem")
          ? `Quero a tatuagem "${flash}" que vi no simulador. `
          : p.description,
      }));
      requestAnimationFrame(() => {
        document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    applyFlash();
    window.addEventListener("hashchange", applyFlash);
    return () => window.removeEventListener("hashchange", applyFlash);
  }, []);

  const set = (f: keyof FormData) => (v: string) => setForm(p => ({ ...p, [f]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick({
      source: "quote_form",
      flash_name: form.selectedFlash || undefined,
      placement: form.placement || undefined,
    });
    window.open(`https://wa.me/${ARTIST.whatsapp}?text=${encodeURIComponent(buildMessage(form))}`, "_blank", "noopener");
    setSubmitted(true);
  };

  return (
    <section id="orcamento" className="py-24 lg:py-36 bg-paper-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="label-section mb-4">08 — Orçamento</p>
              <h2 className="font-serif font-light leading-[0.95] tracking-tight text-ink"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Vamos
                <br />
                Criar Algo
                <br />
                Único
              </h2>
              <div className="divider mt-6" />
            </div>

            <p className="text-ink-muted text-sm leading-relaxed">
              Preencha os dados e clique em enviar. O WhatsApp abre com a mensagem já formatada.
            </p>

            <div className="space-y-3">
              {["Projetos com identidade própria têm prioridade", "Orçamento sem compromisso", "Briefing gratuito", "Retoques nos primeiros 60 dias"].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="w-px h-4 bg-paper-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-ink-muted">{t}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-paper-300">
              <p className="label-section mb-3">Fale direto</p>
              <a
                href={`https://wa.me/${ARTIST.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ source: "direct_link" })}
                className="inline-flex items-center gap-2.5 py-3 px-5 bg-[#25D366] text-white text-[10px] tracking-widest uppercase hover:bg-[#1da85a] transition-colors duration-300"
              >
                <MessageCircle size={13} /> Abrir WhatsApp
              </a>
            </div>

            <p className="font-serif text-xl text-ink-muted italic leading-snug pt-4 border-t border-paper-300">
              "Tatuagens não são sobre o tatuador.<br />São sobre quem as carrega."
            </p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-6 py-24">
                <div className="w-14 h-14 border border-paper-400 flex items-center justify-center">
                  <CheckCircle className="text-ink" size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-ink mb-2">WhatsApp Aberto!</h3>
                  <p className="text-ink-muted text-sm max-w-xs mx-auto">A mensagem já está formatada. Só enviar e aguardar.</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="text-[9px] tracking-widest uppercase text-ink-faint hover:text-ink transition-colors">
                  Preencher novamente
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                {form.selectedFlash && (
                  <div className="py-2.5 px-4 bg-paper-200 border border-paper-300 flex items-center gap-3">
                    <div className="w-px h-4 bg-ink-muted flex-shrink-0" />
                    <p className="text-xs text-ink-muted">
                      Flash do Simulador: <strong className="text-ink">{form.selectedFlash}</strong>
                    </p>
                  </div>
                )}

                <Field label="Seu nome" name="name" value={form.name} onChange={set("name")} />
                <Field label="Seu WhatsApp" name="whatsapp" type="tel" value={form.whatsapp} onChange={set("whatsapp")} placeholder="(45) 99999-9999" />
                <Textarea label="Descreva sua ideia" name="description" value={form.description} onChange={set("description")} />

                {/* Placement */}
                <div className="space-y-3">
                  <label className="text-[9px] tracking-widest uppercase text-ink-muted">Local do corpo</label>
                  <div className="flex flex-wrap gap-2">
                    {placements.map((p) => (
                      <button key={p} type="button" onClick={() => set("placement")(p)}
                        className={cn("text-[9px] tracking-wider uppercase px-3 py-1.5 border transition-all duration-200",
                          form.placement === p ? "border-ink bg-ink text-paper-100" : "border-paper-300 text-ink-muted hover:border-paper-500")}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-3">
                  <label className="text-[9px] tracking-widest uppercase text-ink-muted">Tamanho aproximado</label>
                  <div className="grid grid-cols-2 gap-2">
                    {sizes.map((s) => (
                      <button key={s} type="button" onClick={() => set("size")(s)}
                        className={cn("text-[9px] tracking-wider text-left px-3 py-2.5 border transition-all duration-200",
                          form.size === s ? "border-ink bg-ink text-paper-100" : "border-paper-300 text-ink-muted hover:border-paper-500")}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* References */}
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-ink-muted">Referências visuais <span className="normal-case tracking-normal">(opcional)</span></label>
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="w-full flex items-center gap-2 py-3.5 border border-dashed border-paper-400 text-ink-faint hover:border-ink hover:text-ink transition-all duration-300 text-[9px] tracking-widest uppercase px-4">
                    <Upload size={12} />
                    {form.references.length > 0 ? `${form.references.length} arquivo(s)` : "Selecionar imagens"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                    if (e.target.files) setForm(p => ({ ...p, references: Array.from(e.target.files!) }));
                  }} />
                </div>

                <button type="submit" disabled={!form.name.trim()}
                  className="btn-primary w-full justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed">
                  <MessageCircle size={13} /> Enviar via WhatsApp
                </button>
                <p className="text-[9px] text-ink-faint text-center">O WhatsApp abre com sua mensagem formatada.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
