"use client";

import { useMemo, useState } from "react";
import type { Sponsor } from "@/content/sponsoren";

/** Alle sponsoren, per plaats, met een zoekvak. */
export function SponsorList({ sponsors }: { sponsors: Sponsor[] }) {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = term
      ? sponsors.filter((s) => `${s.name} ${s.place ?? ""}`.toLowerCase().includes(term))
      : sponsors;
    const map = new Map<string, Sponsor[]>();
    for (const s of list) {
      const p = s.place ?? "Overig";
      map.set(p, [...(map.get(p) ?? []), s]);
    }
    return [...map.entries()]
      .map(([place, items]) => [place, items.sort((a, b) => a.name.localeCompare(b.name, "nl"))] as const)
      .sort((a, b) => (a[0] === "Overig" ? 1 : b[0] === "Overig" ? -1 : b[1].length - a[1].length || a[0].localeCompare(b[0])));
  }, [q, sponsors]);
  const count = groups.reduce((n, [, items]) => n + items.length, 0);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <label className="relative block w-full max-w-[420px]">
          <span className="sr-only">Zoek een sponsor of plaats</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Zoek een sponsor of plaats"
            className="w-full rounded-full border-2 border-line bg-surface px-5 py-3 text-md text-fg outline-none placeholder:text-muted focus:border-pool"
          />
        </label>
        <span className="text-sm text-muted" aria-live="polite">
          {count} {count === 1 ? "sponsor" : "sponsoren"}
        </span>
      </div>

      <div className="mt-10 grid gap-10">
        {groups.map(([place, items]) => (
          <section key={place} aria-labelledby={`p-${place}`}>
            <h3 id={`p-${place}`} className="mb-3 flex items-baseline gap-3 border-b-2 border-fg pb-2 text-lg font-bold">
              {place}
              <span className="text-sm font-medium text-muted">{items.length}</span>
            </h3>
            <ul className="m-0 grid list-none gap-x-8 p-0 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3">
              {items.map((s) => (
                <li key={s.name} className="border-b border-line py-3">
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener" className="group inline-flex items-center gap-1.5 font-semibold text-fg no-underline hover:underline">
                      {s.name}
                      <span aria-hidden="true" className="text-xs text-muted transition-transform group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-semibold">{s.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
        {count === 0 && <p className="text-muted">Geen sponsor gevonden met &ldquo;{q}&rdquo;.</p>}
      </div>
    </>
  );
}
