import { hoursNotes } from "@/content/site";
import { Reveal } from "../Reveal";
import { HoursList } from "./HoursList";

export function Tijden() {
  return (
    <section id="tijden" className="section-pad bg-board text-board-fg">
      <div className="wrap">
        <div className="grid items-start gap-[clamp(28px,6vw,80px)] min-[861px]:grid-cols-[5fr_7fr]">
          <Reveal>
            <p className="kicker !text-sun">Openingstijden</p>
            <h2 className="h2">Van vroeg baantjes tot laat in de zon</h2>
            <p className="mt-[18px] max-w-[46ch] text-board-muted">
              Het zwemseizoen loopt van eind april tot half september. In 2026 was dat van 28 april tot en met 13
              september.
            </p>
            <ul className="mt-7 grid list-none gap-3 p-0 text-sm text-board-muted">
              {hoursNotes.map((n) => (
                <li
                  key={n}
                  className="relative pl-[22px] before:absolute before:top-[.55em] before:left-0 before:size-[9px] before:rounded-full before:bg-sun before:content-['']"
                >
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <HoursList />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
