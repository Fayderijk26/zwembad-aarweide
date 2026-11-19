import { activities } from "@/content/site";
import { Reveal } from "../Reveal";
import { SectionHeader } from "./SectionHeader";

export function Activiteiten() {
  return (
    <section id="activiteiten" className="section-pad bg-bg-alt">
      <div className="wrap">
        <SectionHeader
          kicker="Activiteiten · programma 2026"
          title="Meer dan een duik"
          intro="Lessen, sportieve avonden en een afsluiting met bodypainting en honden in het water. Data voor het nieuwe seizoen verschijnen hier zodra ze bekend zijn."
        />
        <Reveal as="ul" className="mt-10 list-none border-t-2 border-fg p-0" delay={0.1}>
          {activities.map((a) => (
            <li
              key={a.name}
              className="grid gap-x-7 gap-y-1.5 border-b border-line py-6 min-[641px]:grid-cols-[minmax(0,1fr)_auto]"
            >
              <div>
                <h3 className="mb-1.5 text-lg font-bold tracking-[-0.01em]">{a.name}</h3>
                <p className="max-w-[60ch] text-md text-muted">{a.text}</p>
              </div>
              <div className="text-sm leading-[1.4] font-bold min-[641px]:text-right">
                {a.meta}
                {a.sub && <small className="block text-xs font-medium text-muted">{a.sub}</small>}
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
