import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { Reveal } from "@/components/Reveal";
import { Dots, NextSteps, PageHeader, bezoekNav } from "@/components/ui";
import { houseRules, links, rulesSummary, tips } from "@/content/site";

export const metadata: Metadata = {
  title: "Huisregels",
  description: "De huisregels van Zwembad Aarweide: zwemdiploma, badkleding, duiken en veiligheid.",
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "");

export default function Page() {
  return (
    <>
      <PageHeader
        kicker="Voor je komt"
        title="Huisregels"
        intro="Zodat iedereen veilig, rustig en schoon kan zwemmen. Met een kaartje of abonnement ga je akkoord met deze regels."
        crumbs={[{ href: "/openingstijden/", label: "Bezoek" }]}
        sub={bezoekNav}
      />

      <section className="section-pad">
        <div className="wrap">
          <p className="kicker">In het kort</p>
          <h2 className="h2">De zes belangrijkste</h2>
          <Reveal as="ul" className="mt-9 grid list-none gap-4 p-0 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3" delay={0.08}>
            {rulesSummary.map((r, i) => (
              <li key={r.title} className="rounded-[24px] border border-line bg-surface p-6">
                <span className="font-display text-sm font-bold text-link">0{i + 1}</span>
                <b className="mt-2 block text-lg font-bold">{r.title}</b>
                <span className="mt-1 block text-muted">{r.text}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-bg-alt">
        <div className="wrap grid items-start gap-[clamp(28px,6vw,80px)] min-[900px]:grid-cols-[4fr_7fr]">
          <nav aria-label="Onderwerpen" className="min-[900px]:sticky min-[900px]:top-28">
            <p className="kicker">Alle regels</p>
            <h2 className="h2">Per onderwerp</h2>
            <ul className="mt-6 grid list-none gap-1 p-0">
              {houseRules.map((g) => (
                <li key={g.title}>
                  <a href={`#${slug(g.title)}`} className="font-semibold text-fg no-underline hover:underline">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-12">
            {houseRules.map((g) => (
              <Reveal key={g.title}>
                <h3 id={slug(g.title)} className="scroll-mt-28 border-b-2 border-fg pb-3 text-xl font-bold">
                  {g.title}
                </h3>
                <ol className="m-0 list-none p-0">
                  {g.rules.map((r) => (
                    <li key={r} className="border-b border-line py-3.5">
                      {r}
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
            <Reveal>
              <h3 className="border-b-2 border-fg pb-3 text-xl font-bold">Tips</h3>
              <Dots items={tips} className="mt-4" />
              <p className="mt-8 text-sm text-muted">
                Welke zwembandjes goedgekeurd zijn, lees je in{" "}
                <ExternalLink href={links.zwembandjes}>dit overzicht (pdf)</ExternalLink>. Klachten of opmerkingen? Laat
                het ons weten, we nemen ze serieus. Huisregels vastgesteld in augustus 2026.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <NextSteps
        items={[
          { href: "/openingstijden/", label: "Openingstijden", text: "Wanneer het bad open is." },
          { href: "/tarieven/", label: "Tarieven", text: "Losse kaartjes en wie gratis is." },
          { href: "/contact/", label: "Contact", text: "Vragen of een klacht." },
        ]}
      />
    </>
  );
}
