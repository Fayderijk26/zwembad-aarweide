"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/site";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Fotomuur met een volledig-scherm weergave (pijltjestoetsen, Escape, vegen). */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const show = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [step]);

  const cur = index === null ? null : photos[index];
  const closeOnBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <ul className="m-0 list-none columns-1 gap-4 p-0 min-[600px]:columns-2 min-[1000px]:columns-3">
        {photos.map((p, i) => (
          <li key={p.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => show(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[22px] border-0 bg-bg-alt p-0"
              aria-label={`${p.caption}: vergroot`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={base + p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[rgba(4,24,42,.75)] to-transparent px-5 pt-10 pb-4 text-left text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {p.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Foto vergroot"
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-[rgba(2,14,26,.92)]"
        onClick={closeOnBackdrop}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {cur && (
          <div className="grid h-full grid-rows-[1fr_auto] p-[max(16px,3vw)]" onClick={closeOnBackdrop}>
            <div className="grid min-h-0 place-items-center" onClick={closeOnBackdrop}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={base + cur.src} alt={cur.alt} className="max-h-full max-w-full rounded-[18px] object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 pt-4">
              <p className="m-0">
                <b>{cur.caption}</b>
                <span className="ml-3 text-sm text-white/60 tabular-nums">
                  {index! + 1} / {photos.length}
                </span>
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} className="lb-btn" aria-label="Vorige foto">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} className="lb-btn" aria-label="Volgende foto">
                  →
                </button>
                <button type="button" onClick={close} className="lb-btn" aria-label="Sluiten" autoFocus>
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
