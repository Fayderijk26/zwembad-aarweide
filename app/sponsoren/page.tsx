import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { Reveal } from "@/components/Reveal";
import { SponsorList } from "@/components/SponsorList";
import { Block, Dots, PageHeader, overNav } from "@/components/ui";
import { contact, links } from "@/content/site";
import { funders, packages, sponsors } from "@/content/sponsoren";

export const metadata: Metadata = {
  title: "Sponsoren",
  description: "De bedrijven en fondsen die Zwembad Aarweide steunen, en hoe je zelf sponsor wordt.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        kicker="Over ons"
        title="Dankzij hen blijft het water blauw"
        intro={`${sponsors.length} bedrijven uit de buurt steunen het zwembad. Samen met fondsen en inwoners maakten zij ook de grote renovatie mogelijk.`}
        crumbs={[{ href: "/stichting/", label: "Over ons" }]}
        sub={overNav}
      >
        <a className="btn btn-sun" href="#sponsor-worden">
          Word sponsor
        </a>
      </PageHeader>

      <section className="section-pad">
        <div className="wrap">
          <p className="kicker">Sponsoren</p>
          <h2 className="h2">Onze sponsoren</h2>
          <div className="mt-8">
            <SponsorList sponsors={sponsors} />
          </div>
        </div>
      </section>

      <Block
        tone="alt"
        kicker="Renovatie 2005 – 2006"
        title="Zonder hen geen zwembad meer"
        intro="De grote renovatie was er niet gekomen zonder deze subsidies en bijdragen. Leader+ en Europa waren de grootste."
      >
        <Dots items={funders} className="text-md" />
      </Block>

      <section id="sponsor-worden" className="section-pad scroll-mt-20">
        <div className="wrap">
          <p className="kicker">Sponsor worden</p>
          <h2 className="h2 max-w-[18ch]">Zet je bedrijf aan het water</h2>
          <p className="mt-4 max-w-[52ch] text-muted">Prijzen per jaar, exclusief btw. Je kiest zelf of je naam op de website komt.</p>
          <Reveal as="ul" className="mt-10 grid list-none gap-4 p-0 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1200px]:grid-cols-5" delay={0.08}>
            {packages.map((p, i) => (
              <li
                key={p.title}
                className={`flex flex-col rounded-[24px] p-6 ${i === 0 ? "bg-sun text-ink" : "border border-line bg-surface"}`}
              >
                <span className="font-display text-2xl font-black whitespace-nowrap tabular-nums">{p.price}</span>
                <b className="mt-4 block">{p.title}</b>
                <span className={`mt-1 text-sm ${i === 0 ? "" : "text-muted"}`}>{p.text}</span>
              </li>
            ))}
          </Reveal>
          <div className="mt-10 grid gap-6 rounded-[28px] bg-board p-[clamp(24px,4vw,40px)] text-board-fg min-[900px]:grid-cols-[1fr_auto] min-[900px]:items-center">
            <div>
              <h3 className="font-display text-xl font-bold">Aanmelden</h3>
              <p className="mt-2 max-w-[60ch] text-board-muted">
                Vul het aanmeldformulier in en stuur het naar {contact.post.street}, {contact.post.city}, t.a.v. de
                Stichting tot behoud zwembad Aarweide. Of mail naar{" "}
                <a className="text-board-fg" href={`mailto:${contact.email}?subject=Sponsoring`}>
                  {contact.email}
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ExternalLink className="btn btn-sun" href={links.sponsorFormulier}>
                Aanmeldformulier (pdf)
              </ExternalLink>
              <a className="btn btn-ghost" href={`mailto:${contact.email}?subject=Sponsoring`}>
                Mail ons
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
