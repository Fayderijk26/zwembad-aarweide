"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Pillen naar de zusterpagina's, onderin de paginakop. */
export function SubNav({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname();
  const norm = (p: string) => p.replace(/\/$/, "");
  return (
    <nav aria-label="In dit onderdeel" className="mt-10 -mb-2 overflow-x-auto [scrollbar-width:none]">
      <ul className="m-0 flex w-max list-none gap-2 p-0">
        {items.map((it) => {
          const active = norm(path) === norm(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap no-underline transition ${
                  active
                    ? "border-sun bg-sun text-ink"
                    : "border-white/25 text-board-fg hover:border-white/60 hover:bg-white/10"
                }`}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
