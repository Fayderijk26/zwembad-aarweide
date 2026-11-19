import { links, nav } from "@/content/site";
import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="wrap flex min-h-16 flex-wrap items-center gap-x-7 gap-y-1 max-[860px]:pt-2">
        <a href="#top" aria-label="Zwembad Aarweide, naar boven" className="mr-auto flex items-center gap-3 text-fg no-underline">
          <Logo />
          <span>
            <span className="font-display text-[1.15rem] leading-none font-bold tracking-[-0.01em]">Aarweide</span>
            <span className="mt-1 block text-xs font-medium text-muted max-[480px]:hidden">Openluchtzwembad Nieuwveen</span>
          </span>
        </a>
        <ul className="m-0 flex list-none gap-6 p-0 max-[860px]:order-3 max-[860px]:w-full max-[860px]:gap-[22px] max-[860px]:overflow-x-auto max-[860px]:pb-2 [scrollbar-width:none]">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="border-b-2 border-transparent py-1.5 text-sm font-semibold whitespace-nowrap text-fg no-underline hover:border-sun"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ExternalLink className="btn btn-sun btn-sm" href={links.tickets}>
          Kaartjes
        </ExternalLink>
      </div>
    </header>
  );
}
