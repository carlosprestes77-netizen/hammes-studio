"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, RefreshCw } from "lucide-react";

interface CameraCaptureProps {
  /** Recebe a foto capturada como data URL (JPEG) */
  onCapture: (dataUrl: string) => void;
  /** Fecha o modal sem capturar */
  onClose: () => void;
}

/**
 * Modal de câmera ao vivo (getUserMedia).
 *
 * - `facingMode: "environment"` abre a câmera traseira por padrão (ideal para
 *   fotografar o braço/perna); o botão de virar alterna para a frontal.
 * - O preview da câmera frontal é espelhado (como uma selfie), mas a captura
 *   é "desespelhada" no canvas para a foto sair na orientação natural.
 * - Os tracks do stream são parados no cleanup para liberar a câmera.
 *
 * Requer contexto seguro (HTTPS ou localhost) — o que um PWA sempre tem.
 */
export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  /* ─── Liga a câmera (e religa ao trocar de lente) ──────────────── */
  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      setError(null);
      setReady(false);
      try {
        // Encerra qualquer stream anterior antes de pedir outro
        streamRef.current?.getTracks().forEach((t) => t.stop());

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch {
        if (!cancelled)
          setError(
            "Não foi possível acessar a câmera. Verifique as permissões do navegador.",
          );
      }
    };

    start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [facing]);

  /* ─── Dispara: desenha o frame atual do vídeo num canvas → data URL ─ */
  const shoot = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const w = video.videoWidth;
    const h = video.videoHeight;
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const ctx = cv.getContext("2d")!;

    // Desespelha a frontal para a foto sair na orientação real
    if (facing === "user") {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    onCapture(cv.toDataURL("image/jpeg", 0.92));
  }, [facing, onCapture]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Topo */}
      <div className="flex items-center justify-between p-4 text-white">
        <button onClick={onClose} aria-label="Fechar" className="p-1">
          <X size={22} />
        </button>
        <span className="text-xs uppercase tracking-widest">Tirar foto</span>
        <button
          onClick={() => setFacing((f) => (f === "environment" ? "user" : "environment"))}
          aria-label="Virar câmera"
          className="p-1"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Preview */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {error ? (
          <p className="text-white/80 text-sm px-8 text-center leading-relaxed">
            {error}
          </p>
        ) : (
          <video
            ref={videoRef}
            playsInline
            muted
            className={`max-h-full max-w-full ${facing === "user" ? "scale-x-[-1]" : ""}`}
          />
        )}
      </div>

      {/* Disparo */}
      <div className="p-6 flex items-center justify-center">
        <button
          onClick={shoot}
          disabled={!ready}
          aria-label="Capturar"
          className="w-16 h-16 rounded-full border-4 border-white bg-white/25 disabled:opacity-40 active:scale-95 transition-transform"
        />
      </div>
    </div>
  );
}
