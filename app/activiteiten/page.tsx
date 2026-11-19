import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "@/components/ExternalLink";
import { Reveal } from "@/components/Reveal";
import { Dots, NextSteps, Notice, PageHeader, activiteitenNav, asset } from "@/components/ui";
import { activities, season } from "@/content/site";

export const metadata: Metadata = {
  title: "Activiteiten",
  description: "Aqua fit, zwem4daagse, kampeernacht, triathlon en de hondenplons bij Zwembad Aarweide.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        kicker={`Programma ${season.year}`}
        title="Meer dan een duik"
        intro="Lessen, sportieve avonden en een afsluiting met bodypainting en honden in het water. Data voor het nieuwe seizoen verschijnen hier zodra ze bekend zijn."
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
            <Image
              src={asset("/images/galerij/ondiepe-bad-1.webp")}
              alt="Het recreatiebad met de rode glijbaan"
              fill
              priority
              sizes="(min-width: 900px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        }
        sub={activiteitenNav}
      >
        <nav aria-label="Spring naar" className="flex flex-wrap gap-2">
          {activities.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-board-fg no-underline hover:bg-white/20">
              {a.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="section-pad">
        <div className="wrap grid gap-5">
          {activities.map((a, i) => (
            <Reveal key={a.id}>
              <article
                id={a.id}
                className={`grid scroll-mt-28 gap-x-10 gap-y-5 rounded-[28px] border p-[clamp(22px,4vw,44px)] min-[860px]:grid-cols-[5fr_7fr] ${
                  i % 3 === 0 ? "border-transparent bg-bg-alt" : "border-line bg-surface"
                }`}
              >
                <div>
                  <p className="kicker">{a.when}</p>
                  <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.02em]">{a.name}</h2>
                  {a.price && (
                    <span className="mt-4 inline-flex rounded-full bg-sun px-4 py-1.5 font-display text-sm font-bold text-ink">
                      {a.price}
                    </span>
                  )}
                </div>
                <div className="grid gap-4">
                  {a.note && <Notice>{a.note}</Notice>}
                  <p className="text-md">{a.text}</p>
                  {a.points && <Dots items={a.points} className="text-muted" />}
                  {a.link && (
                    <p>
                      <ExternalLink className="btn btn-line btn-sm" href={a.link.href}>
                        {a.link.label}
                      </ExternalLink>
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <NextSteps
        items={[
          { href: "/zwemlessen/", label: "Zwemlessen", text: "Diploma A, B en C." },
          { href: "/nieuws/", label: "Nieuws", text: "Aankondigingen en wijzigingen." },
          { href: "/fotos/", label: "Foto's", text: "Een indruk van het zwembad." },
        ]}
      />
    </>
  );
}
