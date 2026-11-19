"use client";

import { temps } from "@/content/site";
import { useOpeningStatus } from "./useOpeningStatus";

const dot = {
  open: "bg-[#4fe08a] shadow-[0_0_0_5px_rgba(79,224,138,.25)]",
  later: "bg-sun shadow-[0_0_0_5px_rgba(255,184,28,.25)]",
  closed: "bg-board-muted shadow-[0_0_0_5px_rgba(159,195,216,.2)]",
};

export function StatusStrip() {
  const status = useOpeningStatus();
  const state = status?.state ?? "closed";

  return (
    <section aria-label="Status en watertemperatuur" className="bg-board text-board-fg">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-3.5 py-5">
        <div className="flex items-center gap-3.5" aria-live="polite">
          <span className={`size-3.5 flex-none rounded-full ${dot[state]}`} aria-hidden="true" />
          <div>
            <strong className="block text-md">{status?.main ?? "Zie de openingstijden hieronder"}</strong>
            <span className="text-sm text-board-muted">{status?.sub}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {temps.map((t) => (
            <div key={t.label} className="flex items-baseline gap-2.5">
              <span className="font-display text-[1.6rem] font-bold tabular-nums">{t.value}</span>
              <span className="text-sm text-board-muted">{t.label}</span>
            </div>
          ))}
          <small className="text-xs text-board-muted">Richtwaarde in het seizoen</small>
        </div>
      </div>
    </section>
  );
}
