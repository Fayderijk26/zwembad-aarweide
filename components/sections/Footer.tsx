import Link from "next/link";
import { contact, links, nav, social } from "@/content/site";
import { ExternalLink } from "../ExternalLink";
import { Logo } from "../Logo";

export function Footer() {
  const groups = nav.filter((g) => g.items);
  return (
    <footer className="foot relative bg-board text-board-muted">
      <div className="wrap grid gap-x-10 gap-y-12 pt-[clamp(56px,8vw,96px)] pb-10 min-[900px]:grid-cols-[5fr_7fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 text-board-fg no-underline">
            <Logo size={40} />
            <span className="font-display text-xl font-bold tracking-[-0.01em]">Zwembad Aarweide</span>
          </Link>
          <p className="mt-5 max-w-[34ch]">
            Openluchtzwembad in Nieuwveen, gerund door een stichting en vrijwilligers.
          </p>
          <address className="mt-6 grid gap-1 not-italic">
            <span className="text-board-fg">{contact.visit.street}</span>
            <span>{contact.visit.city}</span>
            <a className="mt-3 text-board-fg" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <a className="text-board-fg" href={contact.phoneHref}>
              {contact.phone}
            </a>
            <span className="text-sm">Telefoon alleen tijdens openingstijden.</span>
          </address>
          <div className="mt-6 flex flex-wrap gap-2">
            <ExternalLink className="btn btn-sun btn-sm" href={links.tickets}>
              Koop kaartjes
            </ExternalLink>
            {social.map((s) => (
              <ExternalLink key={s.label} className="btn btn-ghost btn-sm" href={s.href}>
                {s.label}
              </ExternalLink>
            ))}
          </div>
        </div>
        <nav aria-label="Alle pagina's" className="grid grid-cols-2 gap-8 min-[600px]:grid-cols-3">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="mb-3 text-xs font-bold tracking-[0.12em] text-sun uppercase">{g.label}</p>
              <ul className="m-0 grid list-none gap-2 p-0">
                {g.items!.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="text-board-fg no-underline hover:underline">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.12em] text-sun uppercase">Meer</p>
            <ul className="m-0 grid list-none gap-2 p-0">
              {[
                { href: "/nieuws/", label: "Nieuws" },
                { href: "/fotos/", label: "Foto's" },
                { href: "/contact/", label: "Contact" },
                { href: "/privacy/", label: "Privacy en disclaimer" },
              ].map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="text-board-fg no-underline hover:underline">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-white/10 py-6 text-sm">
        <span>© Stichting tot behoud zwembad Aarweide</span>
        <span>KvK 28096635</span>
      </div>
    </footer>
  );
}
