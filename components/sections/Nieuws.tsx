import { news } from "@/content/site";
import { ExternalLink } from "../ExternalLink";
import { Reveal } from "../Reveal";
import { SectionHeader } from "./SectionHeader";

export function Nieuws() {
  return (
    <section id="nieuws" className="section-pad">
      <div className="wrap">
        <SectionHeader kicker="Nieuws" title="Het laatste van het zwembad" />
        <Reveal as="ul" className="mt-9 list-none border-t-2 border-fg p-0" delay={0.1}>
          {news.map((n) => (
            <li key={n.href} className="grid gap-x-6 gap-y-1.5 border-b border-line py-[18px] min-[561px]:grid-cols-[9.5em_1fr]">
              <time dateTime={n.date} className="text-sm text-muted tabular-nums">
                {n.label}
              </time>
              <ExternalLink
                href={n.href}
                className="font-semibold text-fg no-underline hover:underline hover:decoration-sun hover:decoration-[3px]"
              >
                {n.title}
              </ExternalLink>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
