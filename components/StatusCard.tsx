"use client";

import { temps } from "@/content/site";
import { useOpeningStatus } from "./useOpeningStatus";

const dot = {
  open: "bg-[#4fe08a] shadow-[0_0_0_6px_rgba(79,224,138,.25)]",
  later: "bg-sun shadow-[0_0_0_6px_rgba(255,184,28,.25)]",
  closed: "bg-board-muted shadow-[0_0_0_6px_rgba(159,195,216,.2)]",
};

/** Live open/dicht in Amsterdamse tijd, met watertemperaturen. Voor in een paginakop. */
export function StatusCard() {
  const status = useOpeningStatus();
  const state = status?.state ?? "closed";
  return (
    <div className="rounded-[24px] border border-white/15 bg-white/[.06] p-6 backdrop-blur-sm" aria-live="polite">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className={`size-3.5 flex-none rounded-full ${dot[state]}`} />
        <div>
          <strong className="block font-display text-lg">{status?.main ?? "Status laden"}</strong>
          <span className="text-sm text-board-muted">{status?.sub ?? " "}</span>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-5">
        {temps.map((t) => (
          <div key={t.label}>
            <span className="block font-display text-xl font-bold whitespace-nowrap tabular-nums">{t.value}</span>
            <span className="text-sm text-board-muted">{t.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-board-muted">Richtwaarden in het seizoen.</p>
    </div>
  );
}
