import { links, social } from "@/content/site";
import { ExternalLink } from "../ExternalLink";
import { Reveal } from "../Reveal";
import { SectionHeader } from "./SectionHeader";

const h3 = "mb-3 text-sm font-medium";
const big = "mb-1 block font-display text-md font-medium text-fg";
const note = "text-sm text-muted";

export function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="wrap">
        <SectionHeader kicker="Contact" title="Zo kom je bij ons" />
        <Reveal className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-14 gap-y-9 [&_a]:font-semibold" delay={0.1}>
          <div>
            <h3 className={h3}>Bezoekadres</h3>
            <address className="text-md not-italic">
              <span className={big}>Schilkerweg 21</span>2441 EX Nieuwveen
            </address>
            <p className="mt-3.5">
              <ExternalLink className="btn btn-line btn-sm" href={links.route}>
                Route via Google Maps
              </ExternalLink>
            </p>
          </div>
          <div>
            <h3 className={h3}>Vragen</h3>
            <span className={big}>
              <a href="mailto:info@zwembadaarweide.nl">info@zwembadaarweide.nl</a>
            </span>
            <p className={`${note} mb-4`}>
              Mail heeft de voorkeur. De mailbox wordt niet dagelijks gelezen, dus reken op een antwoord binnen twee
              weken.
            </p>
            <span className={big}>
              <a href="tel:0172602516">0172-602516</a>
            </span>
            <p className={note}>Alleen tijdens openingstijden.</p>
          </div>
          <div>
            <h3 className={h3}>Postadres</h3>
            <address className="text-md not-italic">
              <span className={big}>Korenveldweg 4</span>2441 BH Nieuwveen
            </address>
            <h3 className={`${h3} mt-7`}>Werken bij Aarweide</h3>
            <p className={note}>
              Toezichthouders en leidinggevenden mailen naar{" "}
              <a href="mailto:badpersoneel@zwembadaarweide.nl">badpersoneel@zwembadaarweide.nl</a>. Werken in de kiosk?
              Mail naar <a href="mailto:info@cafetaria-atlas.nl">info@cafetaria-atlas.nl</a>.
            </p>
          </div>
          <div>
            <h3 className={h3}>Volg het zwembad</h3>
            <div className="mt-3.5 flex flex-wrap gap-2.5">
              {social.map((s) => (
                <ExternalLink key={s.label} className="btn btn-line btn-sm" href={s.href}>
                  {s.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
