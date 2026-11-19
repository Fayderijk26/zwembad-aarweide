import Link from "next/link";
import { ExternalLink } from "./ExternalLink";
import { Reveal } from "./Reveal";
import { SubNav } from "./SubNav";

/** Pad naar een bestand in /public, met basePath (nodig op GitHub Pages). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

type Crumb = { href: string; label: string };

/**
 * Kop van een binnenpagina: donkerblauw water met een golvende rand naar de inhoud.
 * Dezelfde golf als de stijgende waterlijn in de hero, zodat elke pagina "onder water" begint.
 */
export function PageHeader({
  kicker,
  title,
  intro,
  crumbs = [],
  children,
  aside,
  sub,
}: {
  kicker: string;
  title: string;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
  sub?: { href: string; label: string }[];
}) {
  return (
    <header className="page-head relative isolate overflow-hidden bg-board text-board-fg">
      <div className="wrap relative pt-[clamp(28px,5vw,56px)] pb-[clamp(72px,9vw,128px)]">
        <nav aria-label="Kruimelpad" className="mb-[clamp(28px,5vw,56px)] text-sm text-board-muted">
          <ol className="m-0 flex list-none flex-wrap gap-x-2 p-0">
            <li>
              <Link href="/" className="text-board-muted no-underline hover:text-board-fg hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.href} className="before:mr-2 before:content-['/']">
                <Link href={c.href} className="text-board-muted no-underline hover:text-board-fg hover:underline">
                  {c.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className={aside ? "grid items-end gap-10 min-[900px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : undefined}>
          <Reveal className="min-w-0">
            <p className="kicker !text-sun">{kicker}</p>
            <h1 className={`${aside ? "text-[clamp(2.1rem,5vw,3.5rem)]" : "text-[clamp(2.1rem,6vw,4.4rem)]"} font-black tracking-[-0.03em]`}>{title}</h1>
            {intro && <div className="mt-5 max-w-[52ch] text-lead text-board-muted">{intro}</div>}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </Reveal>
          {aside && <Reveal delay={0.1}>{aside}</Reveal>}
        </div>
        {sub && <SubNav items={sub} />}
      </div>
    </header>
  );
}

/** Sectie met kicker, kop en optionele intro links, inhoud rechts (of eronder). */
export function Block({
  id,
  kicker,
  title,
  intro,
  children,
  tone = "plain",
  split = true,
}: {
  id?: string;
  kicker?: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  tone?: "plain" | "alt";
  split?: boolean;
}) {
  return (
    <section id={id} className={`section-pad ${tone === "alt" ? "bg-bg-alt" : ""}`}>
      <div
        className={`wrap ${split ? "grid items-start gap-[clamp(28px,5vw,64px)] min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : ""}`}
      >
        <Reveal className={split ? "min-[900px]:sticky min-[900px]:top-28" : "mb-10"}>
          {kicker && <p className="kicker">{kicker}</p>}
          <h2 className={split ? "text-[clamp(1.75rem,3vw,2.4rem)] font-bold tracking-[-0.02em]" : "h2"}>{title}</h2>
          {intro && <div className="mt-[18px] max-w-[46ch] text-muted">{intro}</div>}
        </Reveal>
        <Reveal className="min-w-0" delay={0.08}>{children}</Reveal>
      </div>
    </section>
  );
}

/** Lijst met gele bolletjes. */
export function Dots({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`grid list-none gap-3 p-0 ${className}`}>
      {items.map((t, i) => (
        <li
          key={i}
          className="relative pl-6 before:absolute before:top-[.6em] before:left-0 before:size-[9px] before:rounded-full before:bg-sun before:content-['']"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Opvallende melding, bijvoorbeeld "afgelast" of "inschrijving gesloten". */
export function Notice({ children, tone = "sun" }: { children: React.ReactNode; tone?: "sun" | "pool" }) {
  return (
    <div
      className={`flex gap-3 rounded-2xl border-2 px-5 py-4 text-md ${
        tone === "sun" ? "border-sun bg-sun/15" : "border-pool bg-pool/10"
      }`}
    >
      <span aria-hidden="true" className={`mt-[.45em] size-2.5 flex-none rounded-full ${tone === "sun" ? "bg-sun" : "bg-pool"}`} />
      <div>{children}</div>
    </div>
  );
}

/** Grote doorlinkkaart onderaan een pagina: "verder lezen". */
export function NextSteps({ items }: { items: { href: string; label: string; text: string; external?: boolean }[] }) {
  return (
    <section className="section-pad bg-bg-alt">
      <div className="wrap">
        <p className="kicker">Verder</p>
        <ul className="mt-4 grid list-none gap-4 p-0 min-[700px]:grid-cols-3">
          {items.map((it) => {
            const inner = (
              <>
                <span className="font-display text-lg font-bold tracking-[-0.01em] text-fg">{it.label}</span>
                <span className="mt-1.5 block text-sm text-muted">{it.text}</span>
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-6 grid size-9 place-items-center rounded-full bg-sun text-ink transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </>
            );
            const cls =
              "group relative block h-full rounded-[22px] border border-line bg-surface p-6 pr-20 no-underline transition hover:-translate-y-1 hover:shadow-[0_14px_40px_-18px_rgba(11,44,71,.45)]";
            return (
              <li key={it.href}>
                {it.external ? (
                  <ExternalLink href={it.href} className={cls}>
                    {inner}
                  </ExternalLink>
                ) : (
                  <Link href={it.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export const bezoekNav = [
  { href: "/openingstijden/", label: "Openingstijden" },
  { href: "/tarieven/", label: "Tarieven" },
  { href: "/abonnementen/", label: "Abonnementen" },
  { href: "/huisregels/", label: "Huisregels" },
  { href: "/contact/", label: "Adres en route" },
];

export const overNav = [
  { href: "/stichting/", label: "Stichting" },
  { href: "/vrijwilligers/", label: "Vrijwilligers" },
  { href: "/vacatures/", label: "Vacatures" },
  { href: "/sponsoren/", label: "Sponsoren" },
];

export const activiteitenNav = [
  { href: "/activiteiten/", label: "Activiteiten" },
  { href: "/zwemlessen/", label: "Zwemlessen" },
];
