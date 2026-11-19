import type { Metadata } from "next";
import { HoursList } from "@/components/sections/HoursList";
import { StatusCard } from "@/components/StatusCard";
import { Block, Dots, NextSteps, PageHeader, bezoekNav } from "@/components/ui";
import { exceptions, holidays, hoursNotes, season } from "@/content/site";

export const metadata: Metadata = {
  title: "Openingstijden",
  description: `Openingstijden van Zwembad Aarweide in Nieuwveen. Seizoen ${season.label}.`,
};

export default function Page() {
  return (
    <>
      <PageHeader
        kicker={`Seizoen ${season.year}`}
        title="Openingstijden"
        intro={<>Het zwembad is open van eind april tot half september. In {season.year} was dat van {season.label.replace(` ${season.year}`, "")}.</>}
        crumbs={[{ href: "/openingstijden/", label: "Bezoek" }]}
        aside={<StatusCard />}
        sub={bezoekNav}
      />

      <Block
        kicker="Elke week"
        title="Van vroeg baantjes tot laat in de zon"
        intro={<Dots items={hoursNotes} className="text-sm" />}
      >
        <div className="rounded-[28px] bg-board p-[clamp(10px,2vw,20px)] text-board-fg">
          <HoursList />
        </div>
      </Block>

      <Block tone="alt" kicker="Let op" title="Uitzonderingen" intro="Op deze dagen wijken de tijden af. Wijzigingen door weer of onderhoud lees je bij het nieuws.">
        <ul className="m-0 list-none border-t-2 border-fg p-0">
          {exceptions.map((e) => (
            <li key={e.when} className="grid gap-x-8 gap-y-1 border-b border-line py-5 min-[600px]:grid-cols-[12em_1fr]">
              <b className="font-display text-sm font-bold">{e.when}</b>
              <span className="text-muted">{e.what}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block kicker="Feestdagen" title={`Feestdagen ${season.year}`} intro="Op feestdagen is het zwembad open van 12:00 tot 18:00 uur.">
        <ul className="m-0 grid list-none gap-3 p-0 min-[600px]:grid-cols-2">
          {holidays.map((h) => (
            <li key={h.label} className="rounded-[20px] border border-line bg-surface px-6 py-5">
              <span className="block font-display text-lg font-bold">{h.label}</span>
              <span className="text-muted">{h.date} · 12:00 – 18:00</span>
            </li>
          ))}
        </ul>
      </Block>

      <NextSteps
        items={[
          { href: "/tarieven/", label: "Tarieven", text: "Een los kaartje kost € 6,80." },
          { href: "/abonnementen/", label: "Abonnementen", text: "Het hele seizoen zwemmen." },
          { href: "/contact/", label: "Adres en route", text: "Schilkerweg 21 in Nieuwveen." },
        ]}
      />
    </>
  );
}
