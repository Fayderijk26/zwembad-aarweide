import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Block, NextSteps, PageHeader, overNav } from "@/components/ui";
import { contact, stichting } from "@/content/site";

export const metadata: Metadata = {
  title: "Stichting",
  description: "Stichting tot behoud zwembad Aarweide: doel, bestuur en gegevens.",
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export default function Page() {
  const details: [string, React.ReactNode][] = [
    ["Naam", stichting.name],
    ["Postadres", `${contact.post.street}, ${contact.post.city}`],
    ["E-mail", <a href={`mailto:${contact.email}`}>{contact.email}</a>],
    ["Facturen", <a href={`mailto:${contact.facturen}`}>{contact.facturen}</a>],
    ["Telefoon", `${contact.phone} (alleen tijdens openingstijden)`],
    ["KvK", stichting.kvk],
    ["Bankrekening", stichting.bank],
  ];
  return (
    <>
      <PageHeader
        kicker="Over ons"
        title="Stichting tot behoud zwembad Aarweide"
        intro={stichting.goal}
        crumbs={[{ href: "/stichting/", label: "Over ons" }]}
        sub={overNav}
      />

      <Block kicker="Bestuur" title="Wie het zwembad besturen">
        <ul className="m-0 grid list-none gap-3 p-0 min-[600px]:grid-cols-2">
          {stichting.board.map((b) => (
            <li key={b.name} className="flex items-center gap-4 rounded-[20px] border border-line bg-surface p-5">
              <span
                aria-hidden="true"
                className="grid size-12 flex-none place-items-center rounded-full bg-bg-alt font-display text-sm font-bold text-fg"
              >
                {initials(b.name)}
              </span>
              <span>
                <b className="block">{b.name}</b>
                <span className="text-sm text-muted">{b.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <section className="section-pad bg-bg-alt">
        <div className="wrap">
          <p className="kicker">Geschiedenis</p>
          <h2 className="h2">Mijlpalen</h2>
          <Reveal as="ul" className="mt-10 grid list-none p-0 min-[800px]:grid-cols-4" delay={0.08}>
            {stichting.history.map((h) => (
              <li key={h.year} className="relative border-t-2 border-fg pt-6 pr-6 pb-6">
                <span aria-hidden="true" className="absolute -top-[9px] left-0 size-4 rounded-full bg-sun ring-4 ring-bg-alt" />
                <b className="font-display text-xl font-black tracking-[-0.02em]">{h.year}</b>
                <p className="mt-2 text-sm text-muted">{h.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Block kicker="Gegevens" title="Voor de administratie">
        <dl className="m-0 grid gap-x-8 border-t-2 border-fg min-[600px]:grid-cols-[12rem_1fr]">
          {details.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="pt-3.5 font-semibold min-[600px]:border-b min-[600px]:border-line min-[600px]:py-4">{k}</dt>
              <dd className="m-0 border-b border-line pb-3.5 text-muted min-[600px]:py-4">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <NextSteps
        items={[
          { href: "/vrijwilligers/", label: "Vrijwilligers", text: "Help mee aan het zwembad." },
          { href: "/sponsoren/", label: "Sponsoren", text: "Wie ons steunen." },
          { href: "/privacy/", label: "Privacy en disclaimer", text: "Hoe we met gegevens omgaan." },
        ]}
      />
    </>
  );
}
