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
import { Download } from "lucide-react";
import DraggableTattoo from "./DraggableTattoo";

/* ─── Tipos ──────────────────────────────────────────────────────── */
interface StageSize {
  width: number;
  height: number;
}

const DEFAULT_ASPECT = 3 / 4;
const OPACITY_MIN = 0.4;
const OPACITY_MAX = 1.0;

/* ─── Remove o fundo branco/claro do PNG da tatuagem ─────────────
   Converte pixels claros em transparentes usando a mesma curva
   sigmoid do simulador principal. Retorna um data URL com fundo
   limpo que o Konva pode usar sem mostrar "papel" ao redor.       */
function extractTattoo(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const MAX = 900;
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
        const BG = 245;
        const INK = 92;

        for (let i = 0; i < px.length; i += 4) {
          const a = px[i + 3];
          if (a < 16) { px[i + 3] = 0; continue; }

          const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
          let t = (BG - lum) / (BG - INK);
          t = Math.max(0, Math.min(1, t));
          // Suavização S-curve para bordas naturais
          t = t * t * (3 - 2 * t);

          if (t <= 0.004) { px[i + 3] = 0; continue; }

          const avg = (px[i] + px[i + 1] + px[i + 2]) / 3;
          const DS = 0.88;
          px[i]     = Math.round((px[i]     * (1 - DS) + avg * DS) * 0.87);
          px[i + 1] = Math.round((px[i + 1] * (1 - DS) + avg * DS) * 0.93);
          px[i + 2] = Math.round((px[i + 2] * (1 - DS) + avg * DS) * 1.0);
          px[i + 3] = Math.round(t * a * 0.95);
        }

        ctx.putImageData(id, 0, 0);
        resolve(cv.toDataURL("image/png"));
      } catch {
        resolve(src); // fallback: usa src original se o processamento falhar
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

/* ─── Camada de fundo: foto do corpo, cobre o Stage (object-fit cover) ─ */
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

  const [bodySrc, setBodySrc] = useState<string | null>(null);
  const [tattooSrc, setTattooSrc] = useState<string | null>(null);
  // processedTattooSrc: data URL com fundo removido, pronto para o canvas
  const [processedTattooSrc, setProcessedTattooSrc] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(0.85);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [bodyImage] = useImage(bodySrc ?? "", "anonymous");

  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 });

  /* ─── Responsividade: Stage tem dimensões numéricas ──────────────
     Medimos o container via ResizeObserver e derivamos a altura a
     partir do aspect ratio da foto carregada (ou 3/4 padrão).     */
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

  /* ─── Upload: foto do corpo ──────────────────────────────────── */
  const handleBodyUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBodySrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  /* ─── Upload: arte da tatuagem → remove fundo branco ────────────
     Criamos o Object URL, passamos para extractTattoo que devolve
     um data URL limpo (fundo transparente). O Object URL original
     pode ser revogado logo após — só o data URL é mantido.        */
  const handleTattooUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProcessedTattooSrc(null);

    const objectUrl = URL.createObjectURL(file);
    setTattooSrc(objectUrl);

    extractTattoo(objectUrl).then((dataUrl) => {
      URL.revokeObjectURL(objectUrl);
      setProcessedTattooSrc(dataUrl);
      setIsSelected(true); // já entra selecionada para posicionar
      setIsProcessing(false);
    });
  }, []);

  /* ─── Desseleção ao clicar no palco vazio ────────────────────── */
  const handleStagePointerDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target === e.target.getStage()) {
        setIsSelected(false);
      }
    },
    [],
  );

  /* ─── Download ───────────────────────────────────────────────────
     1. Esconde as alças do Transformer desselecionando
     2. Aguarda um frame para Konva redesenhar sem as alças
     3. Exporta o Stage inteiro como PNG 2× (maior qualidade)
     4. Dispara o download via <a> temporário                      */
  const handleDownload = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || isExporting) return;

    setIsExporting(true);
    setIsSelected(false); // remove alças do Transformer do export

    requestAnimationFrame(() => {
      stage.toDataURL({
        mimeType: "image/png",
        pixelRatio: 2,
        callback(dataUrl: string) {
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "tatuagem-simulada.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setIsExporting(false);
        },
      });
    });
  }, [isExporting]);

  const canDownload = !!(bodySrc && processedTattooSrc);
  const activeSrc = processedTattooSrc; // usa sempre a versão processada

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">

      {/* ─── Uploads ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 text-xs font-medium text-neutral-700">
          Foto do corpo
          <input
            type="file"
            accept="image/*"
            onChange={handleBodyUpload}
            className="text-xs file:mr-2 file:py-1.5 file:px-3 file:border-0 file:bg-neutral-900 file:text-white file:cursor-pointer cursor-pointer rounded border border-neutral-300 p-1"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-medium text-neutral-700">
          Arte (PNG)
          {isProcessing && (
            <span className="text-[10px] text-neutral-400 animate-pulse">
              Processando…
            </span>
          )}
          <input
            type="file"
            accept="image/png,image/*"
            onChange={handleTattooUpload}
            className="text-xs file:mr-2 file:py-1.5 file:px-3 file:border-0 file:bg-neutral-900 file:text-white file:cursor-pointer cursor-pointer rounded border border-neutral-300 p-1"
          />
        </label>
      </div>

      {/* ─── Canvas ──────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100 touch-none"
        style={{
          aspectRatio: String(
            stageSize.width / (stageSize.height || 1) || DEFAULT_ASPECT,
          ),
        }}
      >
        {stageSize.width > 0 && (
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={handleStagePointerDown}
            onTouchStart={handleStagePointerDown}
          >
            {/*
             * Uma única Layer com ambas as imagens.
             *
             * Por que uma Layer só?
             * O `globalCompositeOperation="multiply"` no Konva compõe o pixel
             * da tatuagem contra o que já está NO CANVAS DESSA LAYER.
             * Se a tatuagem estivesse numa Layer separada, ela seria
             * desenhada contra o canvas vazio (transparente) da própria Layer
             * — e `branco × transparente = transparente/preto`, não skin.
             * Com fundo e tatuagem na mesma Layer, o multiply age exatamente
             * como `mix-blend-mode: multiply` no CSS: tinta escura × skin.
             */}
            <Layer>
              {bodySrc && <BodyPhoto src={bodySrc} size={stageSize} />}

              {activeSrc && (
                <DraggableTattoo
                  src={activeSrc}
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
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-xs uppercase tracking-widest text-neutral-400">
              Envie uma foto do corpo
            </p>
          </div>
        )}
      </div>

      {/* ─── Slider de opacidade ─────────────────────────────────── */}
      <label className="flex items-center gap-3 text-xs font-medium text-neutral-700">
        <span className="whitespace-nowrap">Opacidade</span>
        <input
          type="range"
          min={OPACITY_MIN}
          max={OPACITY_MAX}
          step={0.01}
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          disabled={!activeSrc}
          className="flex-1 accent-neutral-900 disabled:opacity-40"
        />
        <span className="w-10 text-right tabular-nums text-neutral-500">
          {Math.round(opacity * 100)}%
        </span>
      </label>

      {/* ─── Download ────────────────────────────────────────────── */}
      <button
        onClick={handleDownload}
        disabled={!canDownload || isExporting}
        className="flex items-center justify-center gap-2 w-full py-3 border border-neutral-900 bg-neutral-900 text-white text-xs tracking-widest uppercase transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-neutral-700"
      >
        <Download size={13} />
        {isExporting ? "Gerando…" : "Baixar foto"}
      </button>

      <p className="text-[11px] leading-relaxed text-neutral-400">
        Toque na arte para girar e redimensionar. Toque fora para concluir.
        Nada é enviado a servidores — 100% local.
      </p>
    </div>
  );
}
