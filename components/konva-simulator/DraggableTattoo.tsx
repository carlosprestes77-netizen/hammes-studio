"use client";

import { useEffect, useRef } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";
import type Konva from "konva";

export interface DraggableTattooProps {
  /** Object URL da arte (PNG transparente) */
  src: string;
  /** Opacidade controlada pelo slider externo (0.4 – 1.0) */
  opacity: number;
  /** Esta camada está selecionada? Controla a exibição do Transformer */
  isSelected: boolean;
  /** Dispara quando o usuário toca/clica na arte para selecioná-la */
  onSelect: () => void;
  /** Largura do Stage — usada para posicionar a arte centralizada na 1ª render */
  stageWidth: number;
  stageHeight: number;
}

/**
 * Camada de tatuagem: imagem arrastável + Transformer (rotacionar/redimensionar).
 *
 * O Transformer do Konva NÃO envolve o nó como um filho — ele é um nó irmão que
 * recebe, via `transformer.nodes([...])`, a referência do nó que deve manipular.
 * Por isso mantemos dois refs (imageRef e trRef) e os conectamos num useEffect
 * sempre que a seleção muda.
 */
export default function DraggableTattoo({
  src,
  opacity,
  isSelected,
  onSelect,
  stageWidth,
  stageHeight,
}: DraggableTattooProps) {
  const [image] = useImage(src, "anonymous");

  const imageRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  // Garante que a arte só seja centralizada uma vez (na primeira vez que carrega)
  const didInit = useRef(false);

  /* ─── Conecta o Transformer ao nó da imagem quando selecionado ─────── */
  useEffect(() => {
    if (isSelected && trRef.current && imageRef.current) {
      // Aponta o Transformer para o nó da tatuagem...
      trRef.current.nodes([imageRef.current]);
      // ...e força o redesenho da layer para as âncoras aparecerem na hora.
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, image]);

  /* ─── Posiciona a arte centralizada e numa escala agradável ao carregar ─ */
  useEffect(() => {
    const node = imageRef.current;
    if (!node || !image || didInit.current) return;

    // Escala inicial: a arte ocupa no máx. ~55% da largura do Stage,
    // preservando o aspect ratio do PNG.
    const targetW = stageWidth * 0.55;
    const scale = Math.min(1, targetW / image.width);

    node.position({
      x: stageWidth / 2 - (image.width * scale) / 2,
      y: stageHeight / 2 - (image.height * scale) / 2,
    });
    node.scale({ x: scale, y: scale });
    node.getLayer()?.batchDraw();
    didInit.current = true;
  }, [image, stageWidth, stageHeight]);

  if (!image) return null;

  return (
    <>
      <KonvaImage
        ref={imageRef}
        image={image}
        opacity={opacity}
        draggable
        // Seleciona tanto no clique (desktop) quanto no toque (mobile)
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={onSelect}
        // Realismo: pigmentos escuros se fundem com a textura da pele.
        // O "multiply" escurece o fundo onde a tinta é escura e some no branco.
        globalCompositeOperation="multiply"
      />

      {/* O Transformer só é renderizado quando esta camada está selecionada.
          Clicar/tocar fora (tratado no Stage) limpa a seleção e ele desmonta. */}
      {isSelected && (
        <Transformer
          ref={trRef}
          // Âncoras de rotação + cantos para redimensionar mantendo o toque fácil
          rotateEnabled
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          // Alvos de toque maiores → ergonomia mobile
          anchorSize={14}
          anchorCornerRadius={7}
          anchorStrokeWidth={1.5}
          borderStrokeWidth={1.5}
          rotationSnaps={[0, 90, 180, 270]}
          // Impede que a arte seja reduzida a um tamanho impossível de tocar
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 24 || Math.abs(newBox.height) < 24) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}
