import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { Block, Dots, PageHeader } from "@/components/ui";
import { contact, links, stichting } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy en disclaimer",
  description: "Hoe Zwembad Aarweide omgaat met persoonsgegevens, cookies en de informatie op deze website.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        kicker="Privacy"
        title="Privacy, cookies en disclaimer"
        intro={`${stichting.name} gaat zorgvuldig om met persoonsgegevens, zoals de AVG vraagt.`}
      />

      <Block kicker="AVG" title="Privacy" intro="Sinds 25 mei 2018 geldt de Algemene Verordening Gegevensbescherming. Het bestuur heeft daarvoor twee documenten opgesteld.">
        <div className="grid gap-3">
          <ExternalLink className="btn btn-line justify-self-start" href={links.privacyBeleid}>
            Privacybeleid 2018 (pdf)
          </ExternalLink>
          <ExternalLink className="btn btn-line justify-self-start" href={links.privacyVerklaring}>
            Privacyverklaring 22 mei 2018 (pdf)
          </ExternalLink>
          <p className="mt-4 text-muted">
            Vragen over je gegevens? Mail naar <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>
        </div>
      </Block>

      <Block tone="alt" kicker="Cookies" title="Cookies">
        <div className="grid gap-4 text-md">
          <p>
            Deze website plaatst geen cookies en gebruikt geen trackers of advertenties. Lettertypen en afbeeldingen
            komen van onze eigen site.
          </p>
          <p className="text-muted">
            Klik je door naar een andere site, zoals Just Tickets, Google Maps, Facebook of Instagram, dan gelden de
            regels van die site.
          </p>
        </div>
      </Block>

      <Block kicker="Disclaimer" title="Disclaimer">
        <Dots
          className="text-md"
          items={[
            "We doen ons best om de informatie op deze site juist en actueel te houden. Toch kan er iets niet kloppen of tijdelijk niet werken.",
            "Het zwembad is niet aansprakelijk voor fouten op de site of voor gevolgen van het gebruik ervan, voor zover de Nederlandse wet dat toestaat.",
            "Tijden, prijzen en activiteiten kunnen veranderen. Bij twijfel geldt wat het zwembad zelf zegt.",
          ]}
        />
      </Block>
    </>
  );
}
