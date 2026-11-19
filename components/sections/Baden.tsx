import { baths, beside } from "@/content/site";
import { Reveal } from "../Reveal";
import { SectionHeader } from "./SectionHeader";

export function Baden() {
  return (
    <section id="baden" className="section-pad">
      <div className="wrap">
        <div className="grid items-start gap-[clamp(28px,6vw,80px)] min-[861px]:grid-cols-[5fr_7fr]">
          <SectionHeader
            kicker="Zwemmen"
            title="Drie baden en een grote weide"
            intro="Veilig, schoon en buiten. Baantjes trekken, spelen in het water of languit op het gras: het kan allemaal op één terrein."
          />
          <Reveal as="ul" className="m-0 list-none border-t-2 border-fg p-0" delay={0.1}>
            {baths.map((b) => (
              <li key={b.name} className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-1 border-b border-line py-6">
                <h3 className="text-lg font-bold tracking-[-0.01em]">{b.name}</h3>
                <span className="col-start-2 row-start-1 self-start rounded-full bg-sun px-[11px] py-[5px] text-xs font-bold tracking-[0.06em] whitespace-nowrap text-ink uppercase">
                  {b.tag}
                </span>
                <p className="col-start-1 mt-1.5 max-w-[52ch] text-muted">{b.text}</p>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-[clamp(40px,6vw,72px)]">
          <h3 className="mb-2 text-lg font-bold">Naast het water</h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-8">
            {beside.map((item) => (
              <div key={item.name} className="border-t border-line py-[18px]">
                <b className="mb-1 block font-display text-sm font-medium">{item.name}</b>
                <span className="block text-sm text-muted">{item.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
