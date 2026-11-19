import { links, subscriptions, ticket } from "@/content/site";
import { ExternalLink } from "../ExternalLink";
import { Reveal } from "../Reveal";
import { SectionHeader } from "./SectionHeader";

const cell = "border-b border-line py-[11px] text-left text-md";

export function Tarieven() {
  return (
    <section id="tarieven" className="section-pad">
      <div className="wrap">
        <SectionHeader kicker="Tarieven · seizoen 2026" title="Eén keer of het hele seizoen" />
        <Reveal className="mt-10 grid items-start gap-[clamp(28px,5vw,64px)] min-[861px]:grid-cols-[5fr_7fr]" delay={0.1}>
          <div className="ticket-notch rounded-[18px] border-2 border-fg bg-surface p-7">
            <span className="text-xs font-bold tracking-[0.1em] text-muted uppercase">Los kaartje</span>
            <div className="mt-2 mb-1 font-display text-amount font-black tracking-[-0.03em] tabular-nums">
              {ticket.price}
            </div>
            {ticket.lines.map((l) => (
              <p key={l} className="mb-[.7em] text-sm text-muted">
                {l}
              </p>
            ))}
            <ExternalLink className="btn btn-sun mt-2.5" href={links.tickets}>
              Kaartjes kopen
            </ExternalLink>
          </div>
          <div>
            <table className="w-full border-collapse tabular-nums">
              <caption className="pb-3 text-left font-display text-lg font-bold">Abonnementen</caption>
              <tbody>
                {subscriptions.single.map((s) => (
                  <tr key={s.label}>
                    <th scope="row" className={`${cell} font-medium`}>
                      {s.label}
                      <small className="block text-xs font-normal text-muted">{s.note}</small>
                    </th>
                    <td className={`${cell} !text-right font-bold`}>{s.price}</td>
                  </tr>
                ))}
                <tr>
                  <th
                    colSpan={2}
                    className="border-b border-fg pt-[22px] pb-[11px] text-left text-xs font-bold tracking-[0.1em] text-muted uppercase"
                  >
                    Gezinsabonnement
                  </th>
                </tr>
                {subscriptions.family.map((s) => (
                  <tr key={s.label}>
                    <th scope="row" className={`${cell} font-medium`}>
                      {s.label}
                    </th>
                    <td className={`${cell} !text-right font-bold`}>{s.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 mb-4 max-w-[62ch] text-sm text-muted">{subscriptions.fine}</p>
            <ExternalLink className="btn btn-line" href={links.abonnement}>
              Abonnement kopen
            </ExternalLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
