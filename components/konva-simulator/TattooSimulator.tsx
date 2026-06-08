"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import type Konva from "konva";
import DraggableTattoo from "./DraggableTattoo";

/* ─── Tipos ──────────────────────────────────────────────────────── */
interface StageSize {
  width: number;
  height: number;
}

/** Proporção padrão do palco enquanto não há foto de corpo carregada (retrato). */
const DEFAULT_ASPECT = 3 / 4; // largura / altura
const OPACITY_MIN = 0.4;
const OPACITY_MAX = 1.0;

/* ─── Camada de fundo: a foto do corpo, fixa, cobrindo o Stage ───── */
function BodyPhoto({ src, size }: { src: string; size: StageSize }) {
  const [image] = useImage(src, "anonymous");
  if (!image) return null;

  // Emula `object-fit: cover` dentro do Konva: escala pela maior dimensão
  // e centraliza, para a foto preencher todo o palco sem distorcer.
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
      listening={false} // o fundo não captura eventos → clicar nele desseleciona
    />
  );
}

/* ─── Componente principal ───────────────────────────────────────── */
export default function TattooSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const [bodySrc, setBodySrc] = useState<string | null>(null);
  const [tattooSrc, setTattooSrc] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(0.85);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  // Dimensões reais do Stage, recalculadas conforme o container muda de tamanho.
  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 });

  // Aspect ratio dirigido pela foto de corpo; cai no padrão antes do upload.
  const [bodyImage] = useImage(bodySrc ?? "", "anonymous");

  /* ─── Responsividade do Stage (mobile-first) ──────────────────────
     O Konva precisa de width/height numéricos — não aceita "100%". Então
     medimos a largura real do container com um ResizeObserver e derivamos a
     altura a partir do aspect ratio da foto carregada. Assim o palco
     acompanha o layout fluido sem distorcer a imagem. */
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.clientWidth;
      const aspect =
        bodyImage && bodyImage.width > 0
          ? bodyImage.width / bodyImage.height
          : DEFAULT_ASPECT;
      const height = width / aspect;
      setStageSize({ width, height });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [bodyImage]);

  /* ─── Limpeza dos Object URLs para evitar vazamento de memória ───── */
  useEffect(() => {
    return () => {
      if (bodySrc) URL.revokeObjectURL(bodySrc);
      if (tattooSrc) URL.revokeObjectURL(tattooSrc);
    };
  }, [bodySrc, tattooSrc]);

  /* ─── Uploads → Object URLs que alimentam o canvas ───────────────── */
  const handleBodyUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBodySrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  const handleTattooUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTattooSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setIsSelected(true); // já entra selecionada para o usuário posicionar
  }, []);

  /* ─── Desseleção: clicar/tocar no palco vazio ou na foto de fundo ──
     O Transformer some quando o alvo do evento for o próprio Stage
     (área vazia) — a foto de fundo tem listening={false}, então cliques
     nela "atravessam" e também caem aqui. */
  const handleStagePointerDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target === e.target.getStage()) {
        setIsSelected(false);
      }
    },
    [],
  );

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      {/* ─── Controles de upload ─────────────────────────────────── */}
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
          <input
            type="file"
            accept="image/png,image/*"
            onChange={handleTattooUpload}
            className="text-xs file:mr-2 file:py-1.5 file:px-3 file:border-0 file:bg-neutral-900 file:text-white file:cursor-pointer cursor-pointer rounded border border-neutral-300 p-1"
          />
        </label>
      </div>

      {/* ─── Palco (canvas) ──────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100 touch-none"
        style={{ aspectRatio: String(stageSize.width / (stageSize.height || 1) || DEFAULT_ASPECT) }}
      >
        {stageSize.width > 0 && (
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            // Desseleção tanto no mouse quanto no toque
            onMouseDown={handleStagePointerDown}
            onTouchStart={handleStagePointerDown}
          >
            {/* Camada do fundo (foto da pele), fixa */}
            <Layer listening={false}>
              {bodySrc && <BodyPhoto src={bodySrc} size={stageSize} />}
            </Layer>

            {/* Camada da tatuagem (arrastável + Transformer) */}
            <Layer>
              {tattooSrc && (
                <DraggableTattoo
                  src={tattooSrc}
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

        {/* Placeholder enquanto não há foto */}
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
          disabled={!tattooSrc}
          className="flex-1 accent-neutral-900 disabled:opacity-40"
        />
        <span className="w-10 text-right tabular-nums text-neutral-500">
          {Math.round(opacity * 100)}%
        </span>
      </label>

      <p className="text-[11px] leading-relaxed text-neutral-400">
        Toque na arte para girar e redimensionar. Toque fora para concluir.
        Tudo é processado localmente — nada é enviado a servidores.
      </p>
    </div>
  );
}
