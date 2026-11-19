"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDate, newsTags, posts, type NewsTag } from "@/content/nieuws";

/** Alle berichten per jaar, te filteren op onderwerp. */
export function NewsList() {
  const [tag, setTag] = useState<NewsTag | "Alles">("Alles");
  const years = useMemo(() => {
    const list = tag === "Alles" ? posts : posts.filter((p) => p.tag === tag);
    const map = new Map<string, typeof posts>();
    for (const p of list) {
      const y = p.date.slice(0, 4);
      map.set(y, [...(map.get(y) ?? []), p]);
    }
    return [...map.entries()];
  }, [tag]);

  return (
    <>
      <div role="group" aria-label="Filter op onderwerp" className="flex flex-wrap gap-2">
        {(["Alles", ...newsTags] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition ${
              tag === t ? "border-fg bg-fg text-bg" : "border-line bg-surface text-fg hover:border-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-12">
        {years.map(([year, list]) => (
          <section key={year} aria-labelledby={`j-${year}`} className="grid gap-x-10 gap-y-4 min-[900px]:grid-cols-[10rem_1fr]">
            <h2 id={`j-${year}`} className="font-display text-[clamp(2rem,4vw,2.6rem)] font-black whitespace-nowrap tracking-[-0.03em] text-fg/25 min-[900px]:sticky min-[900px]:top-28 min-[900px]:self-start">
              {year}
            </h2>
            <ul className="m-0 list-none border-t-2 border-fg p-0">
              {list.map((p) => (
                <li key={p.slug} className="border-b border-line">
                  <Link href={`/nieuws/${p.slug}/`} className="group grid gap-x-6 gap-y-1 py-5 no-underline min-[640px]:grid-cols-[9.5rem_1fr_auto]">
                    <time dateTime={p.date} className="text-sm text-muted tabular-nums">
                      {formatDate(p.date)}
                    </time>
                    <span>
                      <span className="block text-lg font-bold tracking-[-0.01em] text-fg group-hover:underline group-hover:decoration-sun group-hover:decoration-[3px]">
                        {p.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{p.summary}</span>
                    </span>
                    <span className="self-start text-xs font-bold tracking-[0.08em] text-muted uppercase min-[640px]:mt-1">{p.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
