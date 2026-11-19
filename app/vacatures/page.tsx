import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { Block, NextSteps, PageHeader, overNav } from "@/components/ui";
import { contact, season, vacatures } from "@/content/site";

export const metadata: Metadata = {
  title: "Vacatures",
  description: "Werken bij Zwembad Aarweide: toezichthouders en leidinggevenden gezocht.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        kicker="Werken bij Aarweide"
        title="Een zomer aan het water"
        intro={`Voor het zwemseizoen ${season.year} zocht het zwembad toezichthouders en leidinggevenden. Het seizoen loopt van eind april tot half september.`}
        crumbs={[{ href: "/stichting/", label: "Over ons" }]}
        sub={overNav}
      >
        <a className="btn btn-sun" href={`mailto:${contact.badpersoneel}?subject=Sollicitatie`}>
          Solliciteer per mail
        </a>
      </PageHeader>

      <section className="section-pad">
        <div className="wrap grid gap-4 min-[800px]:grid-cols-2">
          {vacatures.map((v) => (
            <article key={v.title} className="flex flex-col rounded-[28px] border border-line bg-surface p-8">
              <p className="kicker">Vacature</p>
              <h2 className="text-2xl font-bold tracking-[-0.02em]">{v.title}</h2>
              <p className="mt-3 mb-8 text-muted">{v.text}</p>
              <ExternalLink className="btn btn-line mt-auto self-start" href={v.href}>
                Lees de vacature (pdf)
              </ExternalLink>
            </article>
          ))}
        </div>
      </section>

      <Block tone="alt" kicker="Solliciteren" title="Zo reageer je">
        <div className="grid gap-5 text-md">
          <p>
            Stuur je sollicitatie naar de badmanager via{" "}
            <a href={`mailto:${contact.badpersoneel}`}>{contact.badpersoneel}</a>.
          </p>
          <p className="text-muted">Geen vacature open? Mail toch, dan denken we aan je voor het volgende seizoen.</p>
          <p className="text-muted">
            Liever in de kiosk werken? Mail naar <a href={`mailto:${contact.kiosk}`}>{contact.kiosk}</a>.
          </p>
        </div>
      </Block>

      <NextSteps
        items={[
          { href: "/vrijwilligers/", label: "Vrijwilligers", text: "Meehelpen zonder contract." },
          { href: "/stichting/", label: "Stichting", text: "Wie we zijn." },
          { href: "/contact/", label: "Contact", text: "Andere vragen." },
        ]}
      />
    </>
  );
}
