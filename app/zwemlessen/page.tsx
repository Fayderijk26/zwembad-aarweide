import type { Metadata } from "next";
import Link from "next/link";
import { Block, Dots, NextSteps, Notice, PageHeader, activiteitenNav } from "@/components/ui";
import { contact, season, zwemlessen } from "@/content/site";

export const metadata: Metadata = {
  title: "Zwemlessen",
  description: "Zwemles voor diploma A, B en C bij Zwembad Aarweide, volgens de ENVOZ-methode.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        kicker={`Seizoen ${season.year}`}
        title="Zwemlessen"
        intro="Lessen voor het A-, B- en C-diploma, buiten in het zwembad. Plezier en veiligheid staan voorop."
        crumbs={[{ href: "/activiteiten/", label: "Activiteiten" }]}
        sub={activiteitenNav}
      >
        <a className="btn btn-sun" href={`mailto:${contact.zwemles}?subject=Aanmelding zwemles`}>
          Mail voor aanmelden
        </a>
      </PageHeader>

      <section className="section-pad">
        <div className="wrap">
          <dl className="m-0 grid gap-4 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-4">
            {zwemlessen.facts.map((f) => (
              <div key={f.label} className="rounded-[24px] border border-line bg-surface p-6">
                <dt className="text-xs font-bold tracking-[0.1em] text-muted uppercase">{f.label}</dt>
                <dd className="m-0 mt-2 font-display text-xl font-bold tracking-[-0.01em]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Block
        tone="alt"
        kicker="Hoe het werkt"
        title="Wat je moet weten"
        intro={
          <>
            Aanmelden en vragen gaan per mail naar <a href={`mailto:${contact.zwemles}`}>{contact.zwemles}</a>. Vol is vol, dus
            wie snel is, heeft de meeste kans.
          </>
        }
      >
        <div className="grid gap-6">
          <Notice>{zwemlessen.status}</Notice>
          <Dots items={zwemlessen.points} className="text-md" />
          <p className="text-muted">
            Een abonnement op naam koop je via de <Link href="/abonnementen/">abonnementenpagina</Link>.
          </p>
        </div>
      </Block>

      <NextSteps
        items={[
          { href: "/abonnementen/", label: "Abonnementen", text: "Verplicht bij zwemles." },
          { href: "/activiteiten/", label: "Activiteiten", text: "Aqua fit en de zwem4daagse." },
          { href: "/huisregels/", label: "Huisregels", text: "Diploma's en het diepe bad." },
        ]}
      />
    </>
  );
}
