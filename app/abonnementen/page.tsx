import type { Metadata } from "next";
import { Fragment } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import { Block, Dots, NextSteps, PageHeader, bezoekNav } from "@/components/ui";
import { links, passPickup, season, subscriptionFine, subscriptionSteps, subscriptionTypes, subscriptions } from "@/content/site";

export const metadata: Metadata = {
  title: "Abonnementen",
  description: "Gezins-, jeugd- en volwassenenabonnementen voor Zwembad Aarweide, via Just Tickets.",
};

const cell = "border-b border-line py-3";

export default function Page() {
  const rows = [
    ...subscriptions.single.map((s) => ({ ...s, group: "" })),
    ...subscriptions.family.map((s) => ({ ...s, note: "", group: "Gezinsabonnement" })),
  ];
  return (
    <>
      <PageHeader
        kicker={`Abonnementen · seizoen ${season.year}`}
        title="Het hele seizoen zwemmen"
        intro="Je koopt je abonnement online bij Just Tickets en hebt het daarna altijd bij je in de app."
        crumbs={[{ href: "/openingstijden/", label: "Bezoek" }]}
        sub={bezoekNav}
      >
        <ExternalLink className="btn btn-sun" href={links.abonnement}>
          Abonnement kopen
        </ExternalLink>
      </PageHeader>

      <section className="section-pad">
        <div className="wrap">
          <p className="kicker">Zo werkt het</p>
          <ol className="mt-4 grid list-none gap-4 p-0 min-[800px]:grid-cols-3">
            {subscriptionSteps.map((s, i) => (
              <li key={s.title} className="relative rounded-[24px] border border-line bg-surface p-7">
                <span className="grid size-11 place-items-center rounded-full bg-sun font-display text-lg font-black text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex flex-wrap gap-3">
            <ExternalLink className="btn btn-line btn-sm" href={links.appStore}>
              App Store
            </ExternalLink>
            <ExternalLink className="btn btn-line btn-sm" href={links.playStore}>
              Google Play
            </ExternalLink>
          </p>
        </div>
      </section>

      <Block
        tone="alt"
        kicker="Prijzen"
        title="Voorverkoop en normaal tarief"
        intro={`De voorverkoop liep tot en met ${subscriptions.presaleUntil}. Een fysieke pas kost ${subscriptions.pass} extra.`}
      >
        <div className="overflow-x-auto rounded-[24px] border border-line bg-surface p-[clamp(16px,3vw,28px)]">
          <table className="w-full border-collapse text-sm tabular-nums min-[600px]:text-md">
            <thead>
              <tr className="text-left text-xs tracking-[0.1em] text-muted uppercase">
                <th scope="col" className="pb-3 font-bold">Abonnement</th>
                <th scope="col" className="pb-3 text-right font-bold"><span className="min-[600px]:hidden">Voor&shy;verkoop</span><span className="max-[599px]:hidden">Voorverkoop</span></th>
                <th scope="col" className="pb-3 text-right font-bold">Normaal</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <Fragment key={r.label}>
                  {r.group && rows[i - 1]?.group !== r.group && (
                    <tr>
                      <th colSpan={3} className="border-b-2 border-fg pt-6 pb-2 text-left font-display text-md font-bold">
                        {r.group}
                      </th>
                    </tr>
                  )}
                  <tr>
                    <th scope="row" className={`${cell} text-left font-medium`}>
                      {r.label}
                      {r.note && <small className="block text-xs font-normal text-muted">{r.note}</small>}
                    </th>
                    <td className={`${cell} text-right text-muted`}>{r.presale}</td>
                    <td className={`${cell} text-right font-bold`}>{r.price}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block kicker="Voor wie" title="Welk abonnement past bij jou?">
        <ul className="m-0 list-none border-t-2 border-fg p-0">
          {subscriptionTypes.map((t) => (
            <li key={t.name} className="border-b border-line py-5">
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="mt-1 max-w-[60ch] text-muted">{t.text}</p>
            </li>
          ))}
          <li className="border-b border-line py-5">
            <h3 className="text-lg font-bold">Kinderen tot één jaar</h3>
            <p className="mt-1 text-muted">Geen abonnement nodig, ze mogen gratis naar binnen.</p>
          </li>
        </ul>
      </Block>

      <Block tone="alt" kicker="Fysieke pas" title="Pas ophalen" intro="De ophaaldatum staat ook in de mail van Just Tickets, samen met je QR-code.">
        <ul className="m-0 grid list-none gap-3 p-0">
          {passPickup.map((p) => (
            <li key={p} className="rounded-[20px] border border-line bg-surface px-6 py-5 font-semibold">
              {p}
            </li>
          ))}
        </ul>
        <h3 className="mt-10 mb-4 text-lg font-bold">Verder goed om te weten</h3>
        <Dots items={subscriptionFine} className="text-muted" />
      </Block>

      <NextSteps
        items={[
          { href: links.abonnement, label: "Abonnement kopen", text: "Direct naar Just Tickets.", external: true },
          { href: "/tarieven/", label: "Losse kaartjes", text: "Eén keer zwemmen voor € 6,80." },
          { href: "/zwemlessen/", label: "Zwemlessen", text: "Daar hoort een abonnement bij." },
        ]}
      />
    </>
  );
}
