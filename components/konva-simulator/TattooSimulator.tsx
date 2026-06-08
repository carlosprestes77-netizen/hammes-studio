"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import type Konva from "konva";
import { Download, Camera, ImageIcon, Upload } from "lucide-react";
import { flashItems } from "@/lib/data";
import DraggableTattoo from "./DraggableTattoo";
import CameraCapture from "./CameraCapture";

/* ─── Tipos ──────────────────────────────────────────────────────── */
interface StageSize {
  width: number;
  height: number;
}

const DEFAULT_ASPECT = 3 / 4;
const OPACITY_MIN = 0.4;
const OPACITY_MAX = 1.0;

/* ─── Remove o fundo (papel/branco) do PNG da tatuagem ───────────
   Keying ADAPTATIVO: em vez de assumir branco puro (245), amostra
   os 4 cantos da imagem para descobrir a luminância real do fundo
   (papel off-white, cinza, fotografado com sombra etc.) e usa esse
   valor como ponto de corte. Assim a "folha" some de verdade.     */
function extractTattoo(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const MAX = 1000;
        const ratio = Math.min(1, MAX / Math.max(img.width, img.height));
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);

        const cv = document.createElement("canvas");
        cv.width = w;
        cv.height = h;
        const ctx = cv.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);

        const id = ctx.getImageData(0, 0, w, h);
        const px = id.data;

        // --- Detecta a luminância do fundo pelos 4 cantos ---
        const patch = Math.max(4, Math.round(Math.min(w, h) * 0.06));
        const sampleLum: number[] = [];
        const sampleCorner = (x0: number, y0: number) => {
          for (let y = y0; y < y0 + patch && y < h; y++) {
            for (let x = x0; x < x0 + patch && x < w; x++) {
              const i = (y * w + x) * 4;
              if (px[i + 3] < 8) continue;
              sampleLum.push(0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]);
            }
          }
        };
        sampleCorner(0, 0);
        sampleCorner(w - patch, 0);
        sampleCorner(0, h - patch);
        sampleCorner(w - patch, h - patch);
        sampleLum.sort((a, b) => a - b);
        // Mediana dos cantos = cor do papel; fallback 245 se vazio
        const bgLum = sampleLum.length
          ? sampleLum[Math.floor(sampleLum.length * 0.5)]
          : 245;

        // Ponto branco logo abaixo do fundo → papel zera por completo.
        // Ponto de tinta bem mais escuro → só traço sobrevive.
        const BG = Math.max(60, bgLum - 12);
        const INK = Math.max(20, BG - 80);

        for (let i = 0; i < px.length; i += 4) {
          const a = px[i + 3];
          if (a < 10) { px[i + 3] = 0; continue; }

          const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
          let t = (BG - lum) / (BG - INK);
          t = Math.max(0, Math.min(1, t));
          t = t * t * (3 - 2 * t); // S-curve para bordas suaves

          // Cutoff alto mata a névoa de papel que sobrava antes
          if (t <= 0.02) { px[i + 3] = 0; continue; }

          // Dessatura levemente para a tinta integrar à pele (não fica colorida)
          const avg = (px[i] + px[i + 1] + px[i + 2]) / 3;
          const DS = 0.9;
          px[i]     = Math.round((px[i]     * (1 - DS) + avg * DS) * 0.85);
          px[i + 1] = Math.round((px[i + 1] * (1 - DS) + avg * DS) * 0.9);
          px[i + 2] = Math.round((px[i + 2] * (1 - DS) + avg * DS) * 0.98);
          px[i + 3] = Math.round(t * a);
        }

        ctx.putImageData(id, 0, 0);
        resolve(cv.toDataURL("image/png"));
      } catch {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

/* ─── Foto do corpo: cobre o Stage (object-fit: cover) ───────────── */
function BodyPhoto({ src, size }: { src: string; size: StageSize }) {
  const [image] = useImage(src, "anonymous");
  if (!image) return null;

  const scale = Math.max(size.width / image.width, size.height / image.height);
  const w = image.width * scale;
  const h = image.height * scale;

  return (
    <KonvaImage
      image={image}
      width={w}
      height={h}
      x={(size.width - w) / 2}
      y={(size.height - h) / 2}
      listening={false}
    />
  );
}

/* ─── Componente principal ───────────────────────────────────────── */
export default function TattooSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const bodyFileRef = useRef<HTMLInputElement>(null);

  const [bodySrc, setBodySrc] = useState<string | null>(null);
  const [processedTattooSrc, setProcessedTattooSrc] = useState<string | null>(null);
  const [selectedFlashId, setSelectedFlashId] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(0.85);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const [bodyImage] = useImage(bodySrc ?? "", "anonymous");

  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 });

  /* ─── Responsividade do Stage (ResizeObserver) ──────────────────── */
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.clientWidth;
      const aspect =
        bodyImage && bodyImage.width > 0
          ? bodyImage.width / bodyImage.height
          : DEFAULT_ASPECT;
      setStageSize({ width, height: width / aspect });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [bodyImage]);

  /* ─── Define a foto do corpo (de upload OU câmera) ──────────────── */
  const applyBodyPhoto = useCallback((url: string) => {
    setBodySrc((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);

  const handleBodyUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      applyBodyPhoto(URL.createObjectURL(file));
    },
    [applyBodyPhoto],
  );

  /* ─── Processa qualquer arte (flash do site ou upload) → remove fundo ─ */
  const processTattoo = useCallback((src: string, revoke = false) => {
    setIsProcessing(true);
    setProcessedTattooSrc(null);
    extractTattoo(src).then((dataUrl) => {
      if (revoke) URL.revokeObjectURL(src);
      setProcessedTattooSrc(dataUrl);
      setIsSelected(true);
      setIsProcessing(false);
    });
  }, []);

  /* ─── Seleciona um flash pronto da galeria ──────────────────────── */
  const handleSelectFlash = useCallback(
    (flash: (typeof flashItems)[0]) => {
      setSelectedFlashId(flash.id);
      processTattoo(flash.simSrc);
    },
    [processTattoo],
  );

  /* ─── Upload de PNG próprio ─────────────────────────────────────── */
  const handleTattooUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setSelectedFlashId(null); // arte própria → nenhum flash destacado
      processTattoo(URL.createObjectURL(file), true);
    },
    [processTattoo],
  );

  /* ─── Desseleção ao tocar no palco vazio ────────────────────────── */
  const handleStagePointerDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target === e.target.getStage()) setIsSelected(false);
    },
    [],
  );

  /* ─── Download (export do Stage) ────────────────────────────────
     stage.toDataURL() do Konva é SÍNCRONO e devolve a string — não
     usa callback (esse era o bug). Desselecionamos para esconder as
     alças do Transformer, esperamos 2 frames para o Konva redesenhar
     sem elas, e então exportamos em 2× e disparamos o download.     */
  const handleDownload = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || isExporting) return;

    setIsExporting(true);
    setIsSelected(false);

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        try {
          const dataUrl = stage.toDataURL({
            mimeType: "image/png",
            pixelRatio: 2,
          });
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "tatuagem-simulada.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch {
          alert("Não foi possível gerar a imagem. Tente novamente.");
        } finally {
          setIsExporting(false);
        }
      }),
    );
  }, [isExporting]);

  const canDownload = !!(bodySrc && processedTattooSrc);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">

      {/* ═══ Coluna esquerda: escolha da arte + foto + controles ═══ */}
      <div className="flex flex-col gap-6">

        {/* ─── Galeria de desenhos disponíveis ─────────────────── */}
        <div className="flex flex-col gap-2">
          <span className="text-[9px] tracking-widest uppercase text-ink-faint">
            Desenhos Disponíveis
          </span>
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
            {flashItems.map((f) => (
              <button
                key={f.id}
                onClick={() => handleSelectFlash(f)}
                title={f.name}
                className={`relative aspect-square bg-white border overflow-hidden transition-all duration-200 ${
                  selectedFlashId === f.id
                    ? "border-ink ring-1 ring-ink"
                    : "border-paper-300 hover:border-paper-500"
                }`}
              >
                <img
                  src={f.src}
                  alt={f.name}
                  className="w-full h-full object-contain p-1.5"
                  draggable={false}
                />
                {selectedFlashId === f.id && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-ink" />
                )}
              </button>
            ))}
          </div>

          {/* Upload de arte própria */}
          <label className="mt-1 flex items-center justify-center gap-2 py-2.5 border border-dashed border-paper-400 text-ink-muted hover:border-ink hover:text-ink transition-all duration-300 text-[9px] tracking-widest uppercase cursor-pointer">
            <Upload size={12} />
            Ou carregar PNG próprio
            <input type="file" accept="image/png,image/*" onChange={handleTattooUpload} className="hidden" />
          </label>

          {isProcessing && (
            <span className="text-[9px] text-ink-faint animate-pulse">Processando arte…</span>
          )}
        </div>

        {/* ─── Foto do corpo ───────────────────────────────────── */}
        <div className="flex flex-col gap-2 pt-5 border-t border-paper-300">
          <span className="text-[9px] tracking-widest uppercase text-ink-faint">Foto do corpo</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowCamera(true)}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Camera size={13} /> Tirar foto
            </button>
            <button
              onClick={() => bodyFileRef.current?.click()}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <ImageIcon size={13} /> Galeria
            </button>
          </div>
          <input ref={bodyFileRef} type="file" accept="image/*" onChange={handleBodyUpload} className="hidden" />
        </div>

        {/* ─── Slider de opacidade ─────────────────────────────── */}
        <label className="flex items-center gap-3 text-[9px] tracking-widest uppercase text-ink-faint">
          <span className="whitespace-nowrap">Opacidade</span>
          <input
            type="range"
            min={OPACITY_MIN}
            max={OPACITY_MAX}
            step={0.01}
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            disabled={!processedTattooSrc}
            className="flex-1 accent-neutral-900 disabled:opacity-40"
          />
          <span className="w-10 text-right tabular-nums text-ink-muted">
            {Math.round(opacity * 100)}%
          </span>
        </label>
      </div>

      {/* ═══ Coluna direita: canvas + download ════════════════════ */}
      <div className="flex flex-col gap-3">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden border border-paper-300 bg-paper-50 touch-none"
          style={{ aspectRatio: String(stageSize.width / (stageSize.height || 1) || DEFAULT_ASPECT) }}
        >
          {stageSize.width > 0 && (
            <Stage
              ref={stageRef}
              width={stageSize.width}
              height={stageSize.height}
              onMouseDown={handleStagePointerDown}
              onTouchStart={handleStagePointerDown}
            >
              {/* Uma única Layer: multiply funde tinta na pele apenas quando
                  ambas as imagens estão no mesmo canvas Konva. */}
              <Layer>
                {bodySrc && <BodyPhoto src={bodySrc} size={stageSize} />}
                {processedTattooSrc && (
                  <DraggableTattoo
                    src={processedTattooSrc}
                    opacity={opacity}
                    isSelected={isSelected}
                    onSelect={() => setIsSelected(true)}
                    stageWidth={stageSize.width}
                    stageHeight={stageSize.height}
                  />
                )}
              </Layer>
            </Stage>
          )}

          {!bodySrc && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none px-8 text-center">
              <p className="text-[10px] uppercase tracking-widest text-ink-faint">
                {processedTattooSrc
                  ? "Tire uma foto ou escolha da galeria"
                  : "Escolha um desenho ao lado e adicione sua foto"}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={!canDownload || isExporting}
          className="btn-primary w-full justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download size={13} />
          {isExporting ? "Gerando…" : "Baixar foto"}
        </button>

        <p className="text-[9px] text-ink-faint leading-relaxed">
          Toque na arte para girar e redimensionar. Toque fora para concluir.
          Nada é enviado a servidores — 100% local.
        </p>
      </div>

      {/* ─── Modal da câmera ─────────────────────────────────────── */}
      {showCamera && (
        <CameraCapture
          onCapture={(dataUrl) => {
            applyBodyPhoto(dataUrl);
            setShowCamera(false);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
