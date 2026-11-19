import Link from "next/link";
import { formatDate, posts } from "@/content/nieuws";
import { Reveal } from "../Reveal";
import { SectionHeader } from "./SectionHeader";

/** Laatste drie berichten op de homepage. */
export function Nieuws() {
  const [first, ...rest] = posts.slice(0, 3);
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader kicker="Nieuws" title="Het laatste van het zwembad" />
          <Link href="/nieuws/" className="btn btn-line">
            Alle berichten
          </Link>
        </div>
        <Reveal className="mt-10 grid gap-5 min-[900px]:grid-cols-[7fr_5fr]" delay={0.08}>
          <Link
            href={`/nieuws/${first.slug}/`}
            className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[28px] bg-board p-[clamp(24px,4vw,40px)] text-board-fg no-underline"
          >
            <span aria-hidden="true" className="news-ripple" />
            <span className="relative mb-auto inline-flex w-fit rounded-full bg-sun px-3 py-1 text-xs font-bold tracking-[0.08em] text-ink uppercase">
              {first.tag}
            </span>
            <time dateTime={first.date} className="relative mt-10 text-sm text-board-muted">
              {formatDate(first.date)}
            </time>
            <h3 className="relative mt-2 max-w-[20ch] text-[clamp(1.6rem,3vw,2.3rem)] font-bold tracking-[-0.02em] group-hover:underline group-hover:decoration-sun group-hover:decoration-[3px]">
              {first.title}
            </h3>
            <p className="relative mt-3 max-w-[48ch] text-board-muted">{first.summary}</p>
          </Link>
          <ul className="m-0 grid list-none gap-5 p-0">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/nieuws/${p.slug}/`}
                  className="group block h-full rounded-[22px] border border-line bg-surface p-6 no-underline transition hover:-translate-y-1 hover:shadow-[0_14px_40px_-18px_rgba(11,44,71,.45)]"
                >
                  <span className="text-sm text-muted">
                    <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-[-0.01em] text-fg group-hover:underline group-hover:decoration-sun group-hover:decoration-[3px]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
