import TattooSimulatorClient from "@/components/konva-simulator";

export default function SimuladorKonva() {
  return (
    <section id="simulador" className="py-24 lg:py-36 bg-paper-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="label-section mb-4">03 — Simulador Virtual</p>
            <h2
              className="font-serif font-light leading-[0.95] tracking-tight text-ink"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Veja na
              <br />
              Sua Pele
            </h2>
          </div>
          <p className="text-ink-muted text-sm font-light leading-relaxed max-w-xs">
            Tire uma foto do corpo ou escolha da galeria, carregue a arte e
            posicione como quiser. Tudo processado localmente — nada sai do
            seu dispositivo.
          </p>
        </div>

        {/* Simulador */}
        <TattooSimulatorClient />

      </div>
    </section>
  );
}
