"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Real Three.js 3D monolith: BoxGeometry with statue photo on front face,
// dark stone on sides. Scroll drives Y-axis rotation via lerp.
export default function StatueMonolith() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    let W = window.innerWidth;
    let H = window.innerHeight;

    // ── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    Object.assign(renderer.domElement.style, {
      position: "absolute", top: "0", left: "0",
      width: "100%", height: "100%",
    });
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // ── Monolith geometry: thin tall slab 2 × 5.5 × 0.12 ─────
    const geo = new THREE.BoxGeometry(2, 5.5, 0.12);

    const stone = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0d0b08),
      roughness: 0.92,
      metalness: 0.04,
    });
    const frontMat = new THREE.MeshStandardMaterial({
      roughness: 0.60,
      metalness: 0.10,
    });
    const backMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x070503),
      roughness: 0.96,
    });

    // BoxGeometry material order: +x, -x, +y, -y, +z (front), -z (back)
    const mesh = new THREE.Mesh(geo, [stone, stone, stone, stone, frontMat, backMat]);
    mesh.position.set(0.55, 0, 0); // slightly right of center, text on left
    scene.add(mesh);

    // ── Lighting ──────────────────────────────────────────────
    // Warm key light from top-left front — illuminates the statue face
    const key = new THREE.PointLight(0xffe8d0, 5.5, 40);
    key.position.set(-5, 4, 9);
    scene.add(key);

    // Cool dim fill from bottom-right — adds depth/separation
    const fill = new THREE.PointLight(0xb0c8f0, 1.6, 25);
    fill.position.set(5, -3, 3);
    scene.add(fill);

    // Minimal ambient so sides aren't pure black
    scene.add(new THREE.AmbientLight(0xffffff, 0.07));

    // ── Texture: statue photo on the front face ───────────────
    new THREE.TextureLoader().load(`${BASE}/portfolio/hero.jpg`, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      frontMat.map = tex;
      frontMat.needsUpdate = true;
    });

    // ── Animation loop ────────────────────────────────────────
    let raf: number;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Scroll progress: complete rotation over 2.5 screen heights
      const progress = Math.min(1, window.scrollY / (window.innerHeight * 2.5));

      // Lerp toward scroll-driven Y rotation (0 → ~200°)
      mesh.rotation.y += (progress * Math.PI * 1.1 - mesh.rotation.y) * 0.05;

      // Subtle idle animation so it never feels completely static
      mesh.rotation.x = Math.sin(t * 0.18) * 0.028;
      mesh.position.y = Math.sin(t * 0.14) * 0.07;

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      frontMat.map?.dispose();
      frontMat.dispose();
      stone.dispose();
      backMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="absolute inset-0 z-[1]" />;
}
