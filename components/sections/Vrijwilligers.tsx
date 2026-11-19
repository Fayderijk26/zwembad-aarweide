import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../Reveal";
import { asset } from "../ui";

/** Oproep voor vrijwilligers op de homepage. */
export function VrijwilligersOproep() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <Reveal className="grid overflow-hidden rounded-[32px] bg-pool-deep text-white min-[860px]:grid-cols-[6fr_5fr]">
          <div className="p-[clamp(28px,5vw,56px)]">
            <p className="kicker !text-white/80">Vrijwilligers</p>
            <h2 className="h2 max-w-[16ch]">Zonder vrijwilligers geen zwembad</h2>
            <p className="mt-5 max-w-[44ch] text-white/90">
              Op het badpersoneel na draait het zwembad volledig op vrijwilligers: aan de kassa, in
              de technische ploeg, in het groen en bij het parkeren op drukke dagen. Jij bepaalt hoeveel tijd je geeft.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/vrijwilligers/" className="btn btn-sun">
                Word vrijwilliger
              </Link>
              <Link href="/sponsoren/" className="btn btn-ghost">
                Of word sponsor
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px]">
            <Image
              src={asset("/images/galerij/diepe-bad-2.webp")}
              alt="Het diepe bad op een zonnige dag"
              fill
              sizes="(min-width: 860px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
