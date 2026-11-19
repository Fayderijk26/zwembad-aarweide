"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, links, nav, type NavGroup } from "@/content/site";
import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";

const norm = (p: string) => p.replace(/\/$/, "") || "/";

function isActive(group: NavGroup, path: string) {
  const p = norm(path);
  return (
    norm(group.href) === p || !!group.items?.some((i) => norm(i.href) === p)
  );
}

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const barRef = useRef<HTMLDivElement>(null);

  // Sluit alles bij navigeren.
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [path]);

  // Escape en klik buiten het menu sluiten een uitklapmenu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node))
        setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  // Mobiel menu: pagina eronder niet laten scrollen.
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobile]);

  const enter = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
        <div ref={barRef} className="wrap flex min-h-16 items-center gap-6">
          <Link
            href="/"
            aria-label="Zwembad Aarweide, naar de homepage"
            className="mr-auto flex items-center gap-3 text-fg no-underline"
          >
            <Logo />
            <span>
              <span className="font-display text-[1.15rem] leading-none font-bold tracking-[-0.01em]">
                Aarweide
              </span>
              <span className="mt-1 block text-xs font-medium text-muted max-[480px]:hidden">
                Openluchtzwembad Nieuwveen
              </span>
            </span>
          </Link>

          {/* desktop */}
          <ul className="m-0 hidden list-none items-center gap-1 p-0 min-[1000px]:flex">
            {nav.map((g) => {
              const active = isActive(g, path);
              const cls = `relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold no-underline transition-colors ${
                active
                  ? "text-fg after:absolute after:inset-x-3.5 after:-bottom-[3px] after:h-[3px] after:rounded-full after:bg-sun"
                  : "text-fg/80 hover:bg-fg/5 hover:text-fg"
              }`;
              if (!g.items) {
                return (
                  <li key={g.label}>
                    <Link
                      href={g.href}
                      className={cls}
                      aria-current={active ? "page" : undefined}
                    >
                      {g.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = open === g.label;
              return (
                <li
                  key={g.label}
                  className="relative"
                  onPointerEnter={(e) =>
                    e.pointerType === "mouse" && enter(g.label)
                  }
                  onPointerLeave={(e) => e.pointerType === "mouse" && leave()}
                >
                  <button
                    type="button"
                    className={`${cls} cursor-pointer border-0 bg-transparent`}
                    aria-expanded={isOpen}
                    aria-controls={`menu-${g.label}`}
                    onClick={() => setOpen(isOpen ? null : g.label)}
                  >
                    {g.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M1.5 3.5 5 7l3.5-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    id={`menu-${g.label}`}
                    hidden={!isOpen}
                    className="absolute top-full left-1/2 w-[340px] -translate-x-1/2 pt-3"
                  >
                    <ul className="menu-pop m-0 list-none rounded-[20px] border border-line bg-surface p-2 shadow-[0_24px_60px_-20px_rgba(4,30,52,.45)]">
                      {g.items.map((it) => {
                        const cur = norm(it.href) === norm(path);
                        return (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              aria-current={cur ? "page" : undefined}
                              className={`block rounded-[14px] px-4 py-3 no-underline transition-colors ${cur ? "bg-sun/20" : "hover:bg-bg-alt"}`}
                            >
                              <span className="block text-md font-semibold text-fg">
                                {it.label}
                              </span>
                              {it.text && (
                                <span className="block text-sm text-muted">
                                  {it.text}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>

          <ExternalLink className="btn btn-sun btn-sm" href={links.tickets}>
            Kaartjes
          </ExternalLink>

          {/* mobiel */}
          <button
            type="button"
            className="-mr-2 grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-fg min-[1000px]:hidden"
            aria-expanded={mobile}
            aria-controls="mobiel-menu"
            aria-label={mobile ? "Menu sluiten" : "Menu openen"}
            onClick={() => setMobile((m) => !m)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              {mobile ? (
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 8h16M4 16h16"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </header>
      <div
        id="mobiel-menu"
        hidden={!mobile}
        className="mobile-menu fixed inset-x-0 top-[var(--nav-h,65px)] bottom-0 z-40 overflow-y-auto bg-board text-board-fg min-[1000px]:hidden"
      >
        <nav aria-label="Hoofdmenu" className="wrap pt-6 pb-16">
          <ul className="m-0 list-none p-0">
            {nav.map((g) => (
              <li key={g.label} className="border-b border-white/15 py-4">
                {g.items ? (
                  <>
                    <p className="mb-2 text-xs font-bold tracking-[0.12em] text-sun uppercase">
                      {g.label}
                    </p>
                    <ul className="m-0 grid list-none gap-1 p-0">
                      {g.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            aria-current={
                              norm(it.href) === norm(path) ? "page" : undefined
                            }
                            className="block py-1.5 font-display text-xl font-bold tracking-[-0.01em] text-board-fg no-underline aria-[current=page]:text-sun"
                          >
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={g.href}
                    aria-current={
                      norm(g.href) === norm(path) ? "page" : undefined
                    }
                    className="block py-1.5 font-display text-xl font-bold tracking-[-0.01em] text-board-fg no-underline aria-[current=page]:text-sun"
                  >
                    {g.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 text-board-muted">
            <ExternalLink
              className="btn btn-sun justify-self-start"
              href={links.tickets}
            >
              Koop kaartjes
            </ExternalLink>
            <a className="text-board-fg" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <span>
              {contact.visit.street}, {contact.visit.city}
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
