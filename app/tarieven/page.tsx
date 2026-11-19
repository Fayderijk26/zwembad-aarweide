import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { Block, Dots, NextSteps, PageHeader, bezoekNav } from "@/components/ui";
import { links, season, subscriptions, ticket, ticketRules } from "@/content/site";

export const metadata: Metadata = {
  title: "Tarieven",
  description: `Een los kaartje voor Zwembad Aarweide kost ${ticket.price}. Kinderen tot één jaar gratis.`,
};

export default function Page() {
  return (
    <>
      <PageHeader
        kicker={`Tarieven · seizoen ${season.year}`}
        title="Eén keer of het hele seizoen"
        intro="Koop een los kaartje aan de kassa of online. Kom je vaker? Dan is een abonnement voordeliger."
        crumbs={[{ href: "/openingstijden/", label: "Bezoek" }]}
        sub={bezoekNav}
      >
        <ExternalLink className="btn btn-sun" href={links.tickets}>
          Koop kaartjes
        </ExternalLink>
        <Link className="btn btn-ghost" href="/abonnementen/">
          Abonnementen
        </Link>
      </PageHeader>

      <section className="section-pad">
        <div className="wrap grid items-start gap-[clamp(28px,5vw,64px)] min-[900px]:grid-cols-[5fr_7fr]">
          <div className="ticket-notch rounded-[24px] border-2 border-fg bg-surface p-8">
            <span className="text-xs font-bold tracking-[0.1em] text-muted uppercase">Los kaartje</span>
            <div className="mt-2 mb-2 font-display text-amount font-black tracking-[-0.03em] tabular-nums">{ticket.price}</div>
            {ticket.lines.map((l) => (
              <p key={l} className="mb-[.6em] text-muted">
                {l}
              </p>
            ))}
            <ExternalLink className="btn btn-sun mt-3" href={links.tickets}>
              Kaartjes kopen
            </ExternalLink>
          </div>
          <div>
            <h2 className="h2">Goed om te weten</h2>
            <Dots items={ticketRules} className="mt-6 text-md" />
          </div>
        </div>
      </section>

      <Block
        tone="alt"
        kicker="Abonnementen"
        title="Vaker komen?"
        intro={
          <>
            Met een abonnement zwem je het hele seizoen. In de voorverkoop is het € 15 tot € 20 goedkoper.{" "}
            <Link href="/abonnementen/">Alles over abonnementen</Link>
          </>
        }
      >
        <div className="grid gap-3 min-[600px]:grid-cols-3">
          {[
            { label: "Jeugd", price: subscriptions.single[1].price },
            { label: "Volwassenen", price: subscriptions.single[0].price },
            { label: "Gezin, vanaf", price: subscriptions.family[0].price },
          ].map((s) => (
            <div key={s.label} className="rounded-[20px] border border-line bg-surface p-6">
              <span className="text-sm font-semibold text-muted">{s.label}</span>
              <span className="mt-1 block font-display text-2xl font-black tabular-nums">{s.price}</span>
            </div>
          ))}
        </div>
      </Block>

      <NextSteps
        items={[
          { href: "/abonnementen/", label: "Abonnementen", text: "Alle prijzen en hoe het werkt." },
          { href: "/openingstijden/", label: "Openingstijden", text: "Wanneer het bad open is." },
          { href: "/huisregels/", label: "Huisregels", text: "Waar je rekening mee houdt." },
        ]}
      />
    </>
  );
}
