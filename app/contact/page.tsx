import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { Block, PageHeader, bezoekNav } from "@/components/ui";
import { contact, links, social } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact en route",
  description: "Zwembad Aarweide, Schilkerweg 21, 2441 EX Nieuwveen. Mail info@zwembadaarweide.nl.",
};

const mailbox = [
  { label: "Algemene vragen", email: contact.email },
  { label: "Zwemlessen", email: contact.zwemles },
  { label: "Vrijwilligers", email: contact.vrijwilligers },
  { label: "Solliciteren", email: contact.badpersoneel },
  { label: "Facturen", email: contact.facturen },
  { label: "Kiosk", email: contact.kiosk },
];

export default function Page() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Zo kom je bij ons"
        intro="Mail heeft de voorkeur. De mailbox wordt niet dagelijks gelezen: in het seizoen krijg je binnen een week antwoord, daarbuiten kan het iets langer duren."
        crumbs={[{ href: "/openingstijden/", label: "Bezoek" }]}
        sub={bezoekNav}
      >
        <a className="btn btn-sun" href={`mailto:${contact.email}`}>
          Mail ons
        </a>
        <ExternalLink className="btn btn-ghost" href={links.route}>
          Route via Google Maps
        </ExternalLink>
      </PageHeader>

      <section className="section-pad">
        <div className="wrap grid gap-4 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3">
          <div className="rounded-[28px] bg-board p-8 text-board-fg min-[1000px]:row-span-2">
            <p className="kicker !text-sun">Bezoekadres</p>
            <address className="not-italic">
              <span className="block font-display text-2xl font-bold">{contact.visit.street}</span>
              <span className="text-board-muted">{contact.visit.city}</span>
            </address>
            <ExternalLink className="btn btn-sun mt-6" href={links.route}>
              Plan je route
            </ExternalLink>
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="kicker !text-sun">Postadres</p>
              <address className="not-italic">
                <span className="block font-semibold">{contact.post.street}</span>
                <span className="text-board-muted">{contact.post.city}</span>
              </address>
            </div>
          </div>
          <div className="rounded-[28px] border border-line bg-surface p-8">
            <p className="kicker">Mail</p>
            <a className="text-lg font-bold [overflow-wrap:anywhere]" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <p className="mt-2 text-sm text-muted">Heeft de voorkeur.</p>
          </div>
          <div className="rounded-[28px] border border-line bg-surface p-8">
            <p className="kicker">Telefoon</p>
            <a className="font-display text-lg font-bold" href={contact.phoneHref}>
              {contact.phone}
            </a>
            <p className="mt-2 text-sm text-muted">Alleen tijdens openingstijden.</p>
          </div>
          <div className="rounded-[28px] border border-line bg-surface p-8 min-[700px]:col-span-2">
            <p className="kicker">Volg het zwembad</p>
            <div className="flex flex-wrap gap-2.5">
              {social.map((s) => (
                <ExternalLink key={s.label} className="btn btn-line btn-sm" href={s.href}>
                  {s.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Block tone="alt" kicker="Het juiste adres" title="Waarvoor mail je wie?">
        <ul className="m-0 list-none border-t-2 border-fg p-0">
          {mailbox.map((m) => (
            <li key={m.email} className="grid gap-x-6 gap-y-0.5 border-b border-line py-4 min-[600px]:grid-cols-[12rem_1fr]">
              <span className="font-semibold">{m.label}</span>
              <a href={`mailto:${m.email}`} className="break-all">
                {m.email}
              </a>
            </li>
          ))}
        </ul>
      </Block>
    </>
  );
}
