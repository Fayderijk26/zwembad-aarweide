"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { links } from "@/content/site";
import { createDiveScene, type DiveScene } from "@/lib/diveScene";
import { ExternalLink } from "./ExternalLink";

const rise = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<DiveScene | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;
    const scene = createDiveScene(canvasRef.current, {
      observeEl: sectionRef.current,
      onReadyChange: setReady,
    });
    sceneRef.current = scene;
    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  const dive = () => sceneRef.current?.dive();

  return (
    <section ref={sectionRef} id="top" className="relative isolate overflow-hidden bg-sky">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onClick={dive}
        className="absolute inset-0 z-0 block h-full w-full cursor-pointer"
      />
      <div className="wrap pointer-events-none relative z-[1] pt-[clamp(36px,6vw,72px)] pb-[clamp(300px,36vw,440px)] min-[900px]:pb-[230px]">
        <motion.p
          {...rise(0)}
          className="mb-3.5 inline-flex items-center gap-2.5 text-sm font-bold tracking-[0.08em] uppercase before:h-[3px] before:w-7 before:rounded-sm before:bg-sun before:content-['']"
        >
          Zwembad Aarweide · Nieuwveen
        </motion.p>
        {/* De kop is het LCP-element: alleen bewegen, nooit onzichtbaar starten. */}
        <motion.h1
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-[18px] text-hero font-black tracking-[-0.03em]">
          Bommetje.
        </motion.h1>
        <motion.p {...rise(2)} className="mb-[26px] max-w-[34ch] text-lead">
          Openluchtzwembad met drie baden, een grote glijbaan en een zonneweide. Midden in het Groene Hart.
        </motion.p>
        <motion.div {...rise(3)} className="flex flex-wrap gap-3">
          <ExternalLink className="btn btn-sun pointer-events-auto" href={links.tickets}>
            Koop kaartjes
          </ExternalLink>
          <a className="btn btn-line pointer-events-auto" href="#tijden">
            Openingstijden
          </a>
        </motion.div>
      </div>
      <button
        type="button"
        onClick={dive}
        aria-disabled={!ready}
        className="absolute bottom-[18px] left-[max(16px,4vw)] z-[2] inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-4 py-[11px] text-sm leading-none font-bold text-fg shadow-[0_2px_10px_rgba(4,30,52,.25)] transition hover:-translate-y-0.5 aria-disabled:cursor-default aria-disabled:opacity-55 aria-disabled:hover:translate-y-0"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M13.5 8A5.5 5.5 0 1 1 11.9 4.1M13.5 2v3h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Nog een bommetje
      </button>
    </section>
  );
}
