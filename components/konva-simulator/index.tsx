"use client";

import dynamic from "next/dynamic";

/**
 * Wrapper de carregamento do simulador.
 *
 * O Konva depende de `window`/`canvas`, então NÃO pode ser renderizado no
 * servidor. Em Next.js (App Router + static export) importamos o componente
 * dinamicamente com `ssr: false` para que ele só seja avaliado no browser.
 *
 * Use sempre este export — nunca importe `TattooSimulator` diretamente em
 * páginas/Server Components.
 */
const TattooSimulator = dynamic(() => import("./TattooSimulator"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-xl mx-auto aspect-[3/4] rounded-lg border border-neutral-300 bg-neutral-100 animate-pulse" />
  ),
});

export default TattooSimulator;
