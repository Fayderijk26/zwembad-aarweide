import { links, rules } from "@/content/site";
import { ExternalLink } from "../ExternalLink";
import { Reveal } from "../Reveal";
import { SectionHeader } from "./SectionHeader";

export function Regels() {
  return (
    <section id="regels" className="section-pad bg-bg-alt">
      <div className="wrap">
        <SectionHeader kicker="Voor je komt" title="Goed om te weten" />
        <Reveal as="ul" className="mt-9 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 p-0" delay={0.1}>
          {rules.map((r) => (
            <li
              key={r.title}
              className="relative border-t border-line py-[18px] pl-9 before:absolute before:top-[22px] before:left-0 before:size-[18px] before:rounded-full before:border-[3px] before:border-pool before:content-['']"
            >
              <b className="block font-bold">{r.title}</b>
              <span className="text-sm text-muted">{r.text}</span>
            </li>
          ))}
        </Reveal>
        <p className="mt-4 text-sm text-muted">
          <ExternalLink href={links.huisregels}>Lees alle huisregels</ExternalLink>
        </p>
      </div>
    </section>
  );
}
