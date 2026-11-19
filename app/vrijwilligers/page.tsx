import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { Block, Dots, NextSteps, PageHeader, overNav } from "@/components/ui";
import { contact, links, vrijwilligers } from "@/content/site";

export const metadata: Metadata = {
  title: "Vrijwilligers",
  description: "Word vrijwilliger bij Zwembad Aarweide. Zonder vrijwilligers kan het zwembad niet draaien.",
};

export default function Page() {
  const steps = [
    <>
      Download het <ExternalLink href={links.vrijwilligersFormulier}>invulformulier (Word)</ExternalLink>.
    </>,
    <>
      Mail het ingevulde formulier naar <a href={`mailto:${contact.vrijwilligers}`}>{contact.vrijwilligers}</a>, of geef
      het af aan de kassa.
    </>,
    <>Je hoort daarna wanneer en waar je kunt beginnen.</>,
  ];
  return (
    <>
      <PageHeader
        kicker="Over ons"
        title="Zonder vrijwilligers geen zwembad"
        intro="Op het badpersoneel na draait Aarweide volledig op vrijwilligers. Hoeveel tijd je geeft, bepaal je zelf."
        crumbs={[{ href: "/stichting/", label: "Over ons" }]}
        sub={overNav}
      >
        <a className="btn btn-sun" href={`mailto:${contact.vrijwilligers}?subject=Ik wil vrijwilliger worden`}>
          Meld je aan
        </a>
      </PageHeader>

      <section className="section-pad">
        <div className="wrap">
          <ul className="m-0 grid list-none gap-4 p-0 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-4">
            {vrijwilligers.points.map((p, i) => (
              <li
                key={p.title}
                className={`rounded-[24px] p-6 ${i === 0 ? "bg-sun text-ink" : "border border-line bg-surface"}`}
              >
                <b className="block font-display text-lg">{p.title}</b>
                <span className={`mt-2 block ${i === 0 ? "" : "text-muted"}`}>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Block
        tone="alt"
        kicker="Waar je kunt helpen"
        title="Er is altijd iets te doen"
        intro="Op warme dagen is het druk en zoekt het bestuur extra handen, bijvoorbeeld bij het parkeren."
      >
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {vrijwilligers.teams.map((t) => (
            <li key={t} className="rounded-full border-2 border-fg px-5 py-2.5 font-semibold">
              {t}
            </li>
          ))}
        </ul>
      </Block>

      <Block kicker="Aanmelden" title="Zo meld je je aan">
        <ol className="m-0 grid list-none gap-4 p-0">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-4 rounded-[20px] border border-line bg-surface p-5">
              <span className="grid size-9 flex-none place-items-center rounded-full bg-sun font-display font-black text-ink">
                {i + 1}
              </span>
              <span className="pt-1.5">{s}</span>
            </li>
          ))}
        </ol>
        <h3 className="mt-10 mb-3 text-lg font-bold">Verzekerd</h3>
        <p className="mb-4 text-muted">
          Vrijwilligerswerk is op eigen risico, maar de stichting heeft een collectieve ongevallenverzekering voor
          ongevallen tijdens het werk:
        </p>
        <Dots items={vrijwilligers.insurance} className="text-muted" />
      </Block>

      <NextSteps
        items={[
          { href: "/vacatures/", label: "Vacatures", text: "Betaald werk aan het bad." },
          { href: "/sponsoren/", label: "Sponsoren", text: "Steun het zwembad als bedrijf." },
          { href: "/stichting/", label: "Stichting", text: "Bestuur en gegevens." },
        ]}
      />
    </>
  );
}
