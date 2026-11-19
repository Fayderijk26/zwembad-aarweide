"use client";

import { hoursList } from "@/content/site";
import { useOpeningStatus } from "../useOpeningStatus";

export function HoursList() {
  const status = useOpeningStatus();
  const today = status?.today ?? null;

  return (
    <ul className="m-0 list-none p-0 tabular-nums">
      {hoursList.map((row) => {
        const isToday = row.day !== null && row.day === today;
        return (
          <li
            key={row.label}
            className={`flex items-center gap-4 border-b border-[rgba(231,244,250,.16)] px-[18px] py-[15px] text-md first:border-t ${
              isToday ? "rounded-[10px] border-transparent bg-sun text-ink" : ""
            }`}
          >
            <span className="min-w-[7.5em] font-semibold">{row.label}</span>
            {isToday && (
              <span className="rounded-full bg-ink px-[9px] py-[3px] text-xs font-bold tracking-[0.06em] text-sun uppercase">
                Vandaag
              </span>
            )}
            <span className={`ml-auto font-display text-sm tracking-[0.02em] ${isToday ? "font-bold" : "font-medium"}`}>
              {row.time}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
