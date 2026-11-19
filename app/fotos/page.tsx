import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/ui";
import { contact, photos } from "@/content/site";

export const metadata: Metadata = {
  title: "Foto's",
  description: "Foto's van Zwembad Aarweide: het diepe bad, het recreatiebad met glijbaan en het peuterbad.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        kicker="Foto's"
        title="Een kijkje bij het water"
        intro="Het diepe bad, het recreatiebad met de glijbaan en het peuterbad. Klik op een foto om hem groot te bekijken."
      />
      <section className="section-pad">
        <div className="wrap">
          <Gallery photos={photos} />
          <p className="mt-10 max-w-[60ch] text-muted">
            Heb je mooie foto&apos;s van het zwembad, zonder herkenbare mensen? Stuur ze naar{" "}
            <a href={`mailto:${contact.email}?subject=Foto's voor de website`}>{contact.email}</a>. Meer over het zwembad
            lees je bij de <Link href="/stichting/">stichting</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
