import Image from "next/image";
import Link from "next/link";
import { season, ticket } from "@/content/site";
import { Reveal } from "../Reveal";
import { asset } from "../ui";
import { HoursList } from "./HoursList";
import { SectionHeader } from "./SectionHeader";

const tile =
  "group relative block overflow-hidden rounded-[28px] no-underline transition hover:-translate-y-1 hover:shadow-[0_18px_50px_-22px_rgba(11,44,71,.55)]";
const arrow = (
  <span
    aria-hidden="true"
    className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-sun text-lg text-ink transition-transform group-hover:translate-x-1"
  >
    →
  </span>
);

/** Snelle ingangen naar de belangrijkste pagina's, als een raster met verschillende tegels. */
export function DirectNaar() {
  return (
    <section className="section-pad bg-bg-alt">
      <div className="wrap">
        <SectionHeader kicker="Direct naar" title="Alles voor je bezoek" />
        <Reveal
          className="mt-10 grid gap-4 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-[1.25fr_1fr_1fr] min-[1000px]:grid-rows-[auto_auto]"
          delay={0.08}
        >
          {/* openingstijden: groot, met de week */}
          <Link href="/openingstijden/" className={`${tile} bg-board p-7 text-board-fg min-[1000px]:row-span-2`}>
            {arrow}
            <p className="kicker !text-sun">Openingstijden</p>
            <p className="font-display text-xl font-bold tracking-[-0.01em]">{season.label}</p>
            <div className="mt-5 -mx-[18px] text-board-fg [&_li]:py-[11px] [&_li]:text-sm">
              <HoursList />
            </div>
          </Link>

          {/* los kaartje: zonnegeel */}
          <Link href="/tarieven/" className={`${tile} bg-sun p-7 text-ink`}>
            {arrow}
            <p className="text-xs font-bold tracking-[0.12em] uppercase">Los kaartje</p>
            <p className="mt-3 font-display text-amount leading-none font-black tracking-[-0.03em]">{ticket.price}</p>
            <p className="mt-3 max-w-[24ch] text-sm">Kinderen tot één jaar gratis. Aan de kassa of online.</p>
          </Link>

          {/* abonnementen */}
          <Link href="/abonnementen/" className={`${tile} border border-line bg-surface p-7`}>
            {arrow}
            <p className="kicker">Abonnementen</p>
            <p className="max-w-[18ch] font-display text-xl font-bold tracking-[-0.01em] text-fg">Het hele seizoen zwemmen</p>
            <p className="mt-3 text-sm text-muted">Vanaf € 59 voor jeugd, gezinnen vanaf € 121.</p>
          </Link>

          {/* activiteiten met foto */}
          <Link href="/activiteiten/" className={`${tile} min-h-[240px] bg-board text-white`}>
            <Image
              src={asset("/images/galerij/ondiepe-bad-1.webp")}
              alt=""
              fill
              sizes="(min-width: 1000px) 30vw, (min-width: 700px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[rgba(4,24,42,.85)] via-[rgba(4,24,42,.2)] to-transparent" />
            {arrow}
            <span className="absolute inset-x-6 bottom-6">
              <span className="block text-xs font-bold tracking-[0.12em] text-sun uppercase">Activiteiten</span>
              <span className="mt-1 block font-display text-lg leading-tight font-bold tracking-[-0.01em]">Aqua fit, zwem4daagse en meer</span>
            </span>
          </Link>

          {/* zwemlessen */}
          <Link href="/zwemlessen/" className={`${tile} border border-line bg-surface p-7`}>
            {arrow}
            <p className="kicker">Zwemlessen</p>
            <p className="max-w-[16ch] font-display text-xl font-bold tracking-[-0.01em] text-fg">Diploma A, B en C</p>
            <p className="mt-3 text-sm text-muted">Volgens de ENVOZ-methode, met plezier en veiligheid voorop.</p>
          </Link>
        </Reveal>
        <Reveal className="mt-4 grid gap-4 min-[700px]:grid-cols-3" delay={0.12}>
          {[
            { href: "/huisregels/", label: "Huisregels", text: "Diploma's, badkleding en veiligheid." },
            { href: "/contact/", label: "Adres en route", text: "Schilkerweg 21, Nieuwveen." },
            { href: "/vacatures/", label: "Werken bij Aarweide", text: "Toezichthouders gezocht." },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between gap-4 rounded-full border border-line bg-surface py-3 pr-3 pl-6 no-underline transition hover:border-fg"
            >
              <span>
                <span className="block font-semibold text-fg">{l.label}</span>
                <span className="block text-sm text-muted">{l.text}</span>
              </span>
              <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-full bg-bg-alt text-fg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
