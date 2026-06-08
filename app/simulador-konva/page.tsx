import type { Metadata } from "next";
import TattooSimulator from "@/components/konva-simulator";

export const metadata: Metadata = {
  title: "Simulador de Tatuagem",
  description: "Veja como a tatuagem fica na sua pele antes de fazer.",
};

export default function SimuladorKonvaPage() {
  return (
    <main className="min-h-screen bg-paper-200 py-12 px-4">
      <div className="max-w-xl mx-auto mb-8 text-center">
        <p className="text-[9px] tracking-[0.5em] uppercase text-ink-faint mb-3">
          Simulador 2D
        </p>
        <h1
          className="font-serif font-light leading-tight tracking-tight text-ink"
          style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}
        >
          Veja na Sua Pele
        </h1>
        <p className="text-ink-muted text-sm mt-3 leading-relaxed">
          Tire uma foto do corpo, carregue a arte e posicione como quiser.
          Tudo processado localmente — nada sai do seu dispositivo.
        </p>
      </div>

      <TattooSimulator />

      <div className="max-w-xl mx-auto mt-8 text-center">
        <a
          href="/hammes-studio"
          className="text-[9px] tracking-widest uppercase text-ink-faint hover:text-ink transition-colors"
        >
          ← Voltar ao site
        </a>
      </div>
    </main>
  );
}
