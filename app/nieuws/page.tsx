import type { Metadata } from "next";
import Link from "next/link";
import { NewsList } from "@/components/NewsList";
import { PageHeader } from "@/components/ui";
import { formatDate, posts } from "@/content/nieuws";

export const metadata: Metadata = {
  title: "Nieuws",
  description: "Nieuws van Zwembad Aarweide: het seizoen, activiteiten en de stichting.",
};

export default function Page() {
  const latest = posts[0];
  return (
    <>
      <PageHeader
        kicker="Nieuws"
        title="Het laatste van het zwembad"
        intro="Openingen, afgelastingen, activiteiten en nieuws van de stichting. Op volgorde, nieuwste eerst."
        aside={
          <Link
            href={`/nieuws/${latest.slug}/`}
            className="group relative block overflow-hidden rounded-[24px] border border-white/15 bg-white/[.06] p-6 text-board-fg no-underline"
          >
            <span aria-hidden="true" className="news-ripple" />
            <span className="relative text-xs font-bold tracking-[0.12em] text-sun uppercase">Nieuwste bericht</span>
            <span className="relative mt-3 block text-sm text-board-muted">{formatDate(latest.date)}</span>
            <span className="relative mt-1 block font-display text-xl font-bold group-hover:underline group-hover:decoration-sun">
              {latest.title}
            </span>
            <span className="relative mt-2 block text-sm text-board-muted">{latest.summary}</span>
          </Link>
        }
      />
      <section className="section-pad">
        <div className="wrap">
          <NewsList />
        </div>
      </section>
    </>
  );
}
