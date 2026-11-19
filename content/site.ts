/**
 * Alle inhoud van de site op één plek. Bron: de oude site, seizoen 2026.
 * Voor 2027 hoeft alleen dit bestand bijgewerkt te worden (zie TODO in CLAUDE.md).
 */

export const links = {
  tickets: "https://shop.justtickets.nl/shop/12650/Zwembad_Aarweide_2026_Tickets",
  abonnement:
    "https://shop.justtickets.nl/shop/12254/Zwembad_Aarweide_2026_Abonnementen/8064556480141775373",
  route: "https://maps.app.goo.gl/LvTqYM95ZeD9XTsk9",
  huisregels: "https://www.zwembadaarweide.nl/stichting/huisregels/",
  stichting: "https://www.zwembadaarweide.nl/stichting/",
  sponsoren: "https://www.zwembadaarweide.nl/sponsoren/",
  privacy: "https://www.zwembadaarweide.nl/welkom/contact/avg/",
} as const;

export const nav = [
  { href: "#baden", label: "Zwemmen" },
  { href: "#tijden", label: "Openingstijden" },
  { href: "#tarieven", label: "Tarieven" },
  { href: "#activiteiten", label: "Activiteiten" },
  { href: "#nieuws", label: "Nieuws" },
  { href: "#contact", label: "Contact" },
] as const;

/** Seizoen: maand is 1-12. */
export const season = {
  year: 2026,
  start: { month: 4, day: 28 },
  end: { month: 9, day: 13 },
  /** Vanaf deze maand opent het bad op zondag eerder. */
  sundayEarlyFromMonth: 7,
  sundayEarlyOpen: 11,
};

/** Openingsuren per weekdag (0 = zondag), [open, sluit] in hele uren. */
export const weekHours: Record<number, [number, number]> = {
  1: [7, 20],
  2: [8, 20],
  3: [7, 20],
  4: [8, 20],
  5: [7, 20],
  6: [12, 18],
  0: [12, 18],
};

export const hoursList: { day: number | null; label: string; time: string }[] = [
  { day: 1, label: "Maandag", time: "7:00 – 20:00" },
  { day: 2, label: "Dinsdag", time: "8:00 – 20:00" },
  { day: 3, label: "Woensdag", time: "7:00 – 20:00" },
  { day: 4, label: "Donderdag", time: "8:00 – 20:00" },
  { day: 5, label: "Vrijdag", time: "7:00 – 20:00" },
  { day: 6, label: "Zaterdag", time: "12:00 – 18:00" },
  { day: 0, label: "Zondag", time: "12:00 – 18:00" },
  { day: null, label: "Feestdagen", time: "12:00 – 18:00" },
];

export const hoursNotes = [
  "In juli, augustus en september gaat het zwembad op zondag al om 11:00 open.",
  "Op feestdagen gelden de zaterdagtijden.",
  "Bij evenementen en op 4 mei kan het bad eerder sluiten. Kijk bij het nieuws voor wijzigingen.",
];

export const temps = [
  { value: "23 °C", label: "Diepe bad" },
  { value: "21 °C", label: "Ondiepe baden" },
];

export const baths = [
  {
    name: "Wedstrijdbad",
    tag: "25 meter",
    text: "Het diepe bad voor baantjes en de startblokken. Je hebt een zwemdiploma nodig. Duiken mag alleen bij de startblokken.",
  },
  {
    name: "Recreatiebad",
    tag: "Ondiep",
    text: "Het bad om te spelen, af te koelen en bij te komen tussen de glijbaan en de ligweide.",
  },
  {
    name: "Peuterbad",
    tag: "Kleintjes",
    text: "Een apart bad voor de kleinsten, met een eigen zonneweide ernaast.",
  },
];

export const beside = [
  { name: "Grote glijbaan", text: "Met een eigen bassin." },
  { name: "Springkussens", text: "Twee stuks, voor wie op het droge wil stuiteren." },
  { name: "Spraypark", text: "Sinds 2020 een vaste attractie." },
  { name: "Sportvelden", text: "Een voetbalveld en een volleybalveld." },
  { name: "Zonneweide", text: "Grote ligweide, plus een eigen weide bij het peuterbad." },
  { name: "Kiosk", text: "Snoep, snacks, ijs en drinken. Op warme dagen open." },
  {
    name: "Kassagebouw",
    text: "Koffie, thee en chocolademelk, een magnetron voor babyflessen en kluisjes te huur.",
  },
];

export const ticket = {
  price: "€ 6,80",
  lines: [
    "Per persoon, aan de kassa of online. Kinderen tot één jaar zijn gratis.",
    "Online gekochte kaartjes gelden alleen op de gekozen dag en zijn niet restitueerbaar.",
  ],
};

export const subscriptions = {
  single: [
    { label: "Volwassenen", note: "Geboren vóór 1 januari 2008", price: "€ 80,00" },
    { label: "Jeugd", note: "Geboren op of na 1 januari 2008", price: "€ 59,00" },
  ],
  family: [
    { label: "2 personen", price: "€ 121,00" },
    { label: "3 personen", price: "€ 131,50" },
    { label: "4 personen", price: "€ 147,00" },
    { label: "5 personen", price: "€ 162,50" },
    { label: "6 personen", price: "€ 178,00" },
    { label: "7 personen", price: "€ 193,50" },
    { label: "8 personen", price: "€ 206,50" },
  ],
  fine: "Prijzen na de voorverkoop. In de voorverkoop was een abonnement € 15 tot € 20 goedkoper. Een fysieke pas kost € 1,00. Je koopt een abonnement via Just Tickets, in de webshop of de app, en personaliseert het daarna met je gegevens en een foto.",
};

export const activities = [
  {
    name: "Zwemlessen",
    text: "Lessen voor diploma A, B en C volgens de ENVOZ-methode, met plezier en veiligheid voorop. Kinderen nemen elke les een eigen EasySwim-zwemvestje mee. Aanmelden kan via zwemles@zwembadaarweide.nl, want vol is vol.",
    meta: "€ 130 per seizoen",
    sub: "plus verplicht abonnement op naam",
  },
  {
    name: "Aqua fit",
    text: "Vrijdag van 9:30 tot 10:15 uur met Shirlene en maandag van 18:45 tot 19:45 uur met Thea. Koop vooraf een kaartje aan de kassa. Tijdens de les is het diepe bad beperkt beschikbaar.",
    meta: "€ 2 per les",
  },
  {
    name: "Zwem4daagse",
    text: "Vier avonden zwemmen voor een medaille. Kinderen tot en met 10 jaar zwemmen 10 banen, vanaf 11 jaar en volwassenen 20 banen. Ook kinderen zonder diploma doen mee, in het ondiepe bad.",
    meta: "€ 15",
    sub: "15 t/m 18 juni 2026",
  },
  {
    name: "Sluitingsdag",
    text: "De laatste dag van het seizoen: bodypainting van 14:00 tot 16:00 uur en om 16:00 uur de hondenplons. Begeleiders mogen gratis kijken.",
    meta: "€ 6,80 per hond",
  },
  {
    name: "Triathlon Ter Aar",
    text: "De 36e editie met een zwemonderdeel in het buitenbad, voor volwassenen, junioren en jeugd. Inschrijven via de website van de triathlon.",
    meta: "10 mei 2026",
  },
  {
    name: "Wetsuit testevent",
    text: "Wetsuits passen en testen in het water, met Trisport van der Hoorn. Tickets via hun website.",
    meta: "2, 3 en 9 mei 2026",
  },
];

export const news = [
  {
    date: "2026-06-19",
    label: "19 juni 2026",
    title: "Kampeernacht afgelast",
    href: "https://www.zwembadaarweide.nl/afgelasten-kampeernacht/",
  },
  {
    date: "2026-06-07",
    label: "7 juni 2026",
    title: "Zwemvierdaagse 2026",
    href: "https://www.zwembadaarweide.nl/zwemvierdaagse-2026/",
  },
  {
    date: "2026-06-07",
    label: "7 juni 2026",
    title: "Kampeernacht 19 en 20 juni, met aanvullende informatie",
    href: "https://www.zwembadaarweide.nl/kampeernacht-19-20-juni-2026-inclusief-aanvullende-informatie/",
  },
  {
    date: "2026-04-27",
    label: "27 april 2026",
    title: "Temperatuur middenbad nog niet op niveau en renovatie glijbaan",
    href: "https://www.zwembadaarweide.nl/temperatuur-middenbad-nog-niet-op-gewenst-niveau-renovatie-glijbaan/",
  },
  {
    date: "2026-03-12",
    label: "12 maart 2026",
    title: "Zwemseizoen opent op 28 april 2026",
    href: "https://www.zwembadaarweide.nl/opening-zwembad/",
  },
];

export const rules = [
  {
    title: "Zwemdiploma voor het diepe bad",
    text: "Kinderen zonder diploma mogen het perron bij het diepe bad niet op.",
  },
  {
    title: "Zonder diploma met begeleider",
    text: "Een begeleider van 18 jaar of ouder in badkleding, die goed kan zwemmen.",
  },
  {
    title: "Badkleding in en rond de baden",
    text: "Ook voor baby's en peuters, glijbaan inbegrepen. Op de ligweide mag gewone kleding.",
  },
  {
    title: "Duiken met beleid",
    text: "In de ondiepe baden mag je niet duiken. In het diepe bad alleen bij de startblokken.",
  },
  {
    title: "Geen glas, geen huisdieren",
    text: "Op de sluitingsdag is de hondenplons de uitzondering.",
  },
  {
    title: "Waardevolle spullen thuis",
    text: "Kluisjes huur je bij het kassagebouw. Het bezoek is op eigen risico.",
  },
];

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/ZwembadAarweide" },
  { label: "Instagram", href: "https://www.instagram.com/zwembadaarweide/" },
  { label: "Twitter", href: "https://twitter.com/zwembadaarweide" },
];
