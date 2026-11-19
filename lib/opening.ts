import { season, weekHours } from "@/content/site";

export type OpeningState = "open" | "later" | "closed";

export type OpeningStatus = {
  state: OpeningState;
  main: string;
  sub: string;
  /** Weekdag (0 = zondag) die als "vandaag" gemarkeerd wordt, of null buiten het seizoen. */
  today: number | null;
};

const DAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Bepaalt de status van het zwembad in Amsterdamse tijd. */
export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value ?? "";

  const dayIdx = DAY_INDEX[get("weekday")];
  const month = parseInt(get("month"), 10);
  const dom = parseInt(get("day"), 10);
  const mins = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);

  const { start, end } = season;
  const inSeason =
    (month > start.month || (month === start.month && dom >= start.day)) &&
    (month < end.month || (month === end.month && dom <= end.day));

  if (!inSeason) {
    return {
      state: "closed",
      main: "Buiten het seizoen",
      sub: "Het zwembad opent weer eind april.",
      today: null,
    };
  }

  const [openH, closeH] = weekHours[dayIdx];
  const opens = dayIdx === 0 && month >= season.sundayEarlyFromMonth ? season.sundayEarlyOpen : openH;
  const fmt = (h: number) => `${h}:00`;

  if (mins >= opens * 60 && mins < closeH * 60) {
    return { state: "open", main: "Nu open", sub: `Vandaag tot ${fmt(closeH)} uur.`, today: dayIdx };
  }
  return {
    state: "later",
    main: mins < opens * 60 ? `Vandaag open vanaf ${fmt(opens)}` : "Gesloten",
    sub: `Vandaag ${fmt(opens)} tot ${fmt(closeH)} uur.`,
    today: dayIdx,
  };
}
