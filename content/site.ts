/**
 * Alle vaste inhoud van de site op één plek. Bron: de oude site (zwembadaarweide.nl), seizoen 2026.
 * Voor 2027 hoeft vooral dit bestand bijgewerkt te worden (zie TODO in CLAUDE.md).
 * Nieuws staat in content/nieuws.ts, sponsoren in content/sponsoren.ts.
 */

export const links = {
  tickets: "https://shop.justtickets.nl/shop/12650/Zwembad_Aarweide_2026_Tickets",
  abonnement: "https://shop.justtickets.nl/shop/12254/Zwembad_Aarweide_2026_Abonnementen",
  appStore: "https://apps.apple.com/nl/app/justtickets/id6755696609",
  playStore: "https://play.google.com/store/apps/details?id=nl.justtickets.justticketsApp&hl=nl",
  route: "https://maps.app.goo.gl/LvTqYM95ZeD9XTsk9",
  zwembandjes: "https://www.zwembadaarweide.nl/wp-content/uploads/Goedgekeurde-zwembandjes-en-afgekeurde-zwembandjes.pdf",
  privacyBeleid: "https://www.zwembadaarweide.nl/wp-content/uploads/Privacy-beleid-2018-Aarweide.pdf",
  privacyVerklaring: "https://www.zwembadaarweide.nl/wp-content/uploads/Aarweide-Privacy-verklaring-22-mei-2018.pdf",
  sponsorFormulier: "https://www.zwembadaarweide.nl/wp-content/uploads/Aanmeldform-sponsoring-2024.pdf",
  vrijwilligersFormulier: "https://www.zwembadaarweide.nl/wp-content/uploads/Vrijwilligers_invulformulier_2017.docx",
  vacatureToezichthouder: "https://www.zwembadaarweide.nl/wp-content/uploads/Vacature-Toezichthouder-2026.pdf",
  vacatureZelfstandig: "https://www.zwembadaarweide.nl/wp-content/uploads/Vacature-Zelfstandig-Toezichthouder-2026.pdf",
} as const;

export const contact = {
  visit: { street: "Schilkerweg 21", city: "2441 EX Nieuwveen" },
  post: { street: "Korenveldweg 4", city: "2441 BH Nieuwveen" },
  phone: "0172-602516",
  phoneHref: "tel:+31172602516",
  email: "info@zwembadaarweide.nl",
  facturen: "facturen@zwembadaarweide.nl",
  zwemles: "zwemles@zwembadaarweide.nl",
  vrijwilligers: "vrijwilligers@zwembadaarweide.nl",
  badpersoneel: "badpersoneel@zwembadaarweide.nl",
  kiosk: "info@cafetaria-atlas.nl",
} as const;

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/ZwembadAarweide" },
  { label: "Instagram", href: "https://www.instagram.com/zwembadaarweide/" },
  { label: "Twitter", href: "https://twitter.com/zwembadaarweide" },
];

/* ---------- navigatie ---------- */

export type NavLink = { href: string; label: string; text?: string };
export type NavGroup = { label: string; href: string; items?: NavLink[] };

export const nav: NavGroup[] = [
  {
    label: "Bezoek",
    href: "/openingstijden/",
    items: [
      { href: "/openingstijden/", label: "Openingstijden", text: "Seizoen, dagen en uitzonderingen" },
      { href: "/tarieven/", label: "Tarieven", text: "Losse kaartjes en wie er gratis in mag" },
      { href: "/abonnementen/", label: "Abonnementen", text: "Het hele seizoen zwemmen" },
      { href: "/huisregels/", label: "Huisregels", text: "Diploma's, badkleding en veiligheid" },
      { href: "/contact/", label: "Adres en route", text: "Schilkerweg 21, Nieuwveen" },
    ],
  },
  {
    label: "Activiteiten",
    href: "/activiteiten/",
    items: [
      { href: "/activiteiten/", label: "Alle activiteiten", text: "Aqua fit, zwem4daagse, triathlon en meer" },
      { href: "/zwemlessen/", label: "Zwemlessen", text: "Diploma A, B en C" },
    ],
  },
  { label: "Nieuws", href: "/nieuws/" },
  { label: "Foto's", href: "/fotos/" },
  {
    label: "Over ons",
    href: "/stichting/",
    items: [
      { href: "/stichting/", label: "Stichting", text: "Doel, bestuur en gegevens" },
      { href: "/vrijwilligers/", label: "Vrijwilligers", text: "Zonder hen geen zwembad" },
      { href: "/vacatures/", label: "Vacatures", text: "Werken aan het water" },
      { href: "/sponsoren/", label: "Sponsoren", text: "Wie het zwembad steunen" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

/* ---------- seizoen en openingstijden ---------- */

/** Seizoen: maand is 1-12. */
export const season = {
  year: 2026,
  label: "28 april t/m 13 september 2026",
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

export const holidays = [
  { label: "Koningsdag", date: "27 april 2026" },
  { label: "Bevrijdingsdag", date: "5 mei 2026" },
  { label: "Hemelvaartsdag", date: "14 mei 2026" },
  { label: "Tweede pinksterdag", date: "25 mei 2026" },
];

export const exceptions = [
  { when: "4 mei", what: "Op doordeweekse dagen dicht om 18:45 uur vanwege de Dodenherdenking." },
  { when: "15 t/m 17 juni 2026", what: "Zwem4daagse: dicht voor andere bezoekers vanaf 17:30 uur." },
  { when: "18 juni 2026", what: "Laatste avond zwem4daagse: dicht vanaf 16:30 uur." },
  { when: "19 juni 2026", what: "Kampeernacht: dicht vanaf 17:30 uur." },
];

export const temps = [
  { value: "23 °C", label: "Diepe bad" },
  { value: "21 °C", label: "Ondiepe baden" },
];

/* ---------- de baden ---------- */

export const baths = [
  {
    name: "Wedstrijdbad",
    tag: "25 meter",
    text: "Het diepe bad voor baantjes en de startblokken. Je hebt een zwemdiploma nodig. Duiken mag alleen bij de startblokken.",
  },
  {
    name: "Recreatiebad",
    tag: "Ondiep",
    text: "Het bad om te spelen en af te koelen, met de grote glijbaan en de ligweide ernaast.",
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

/* ---------- tarieven en abonnementen ---------- */

export const ticket = {
  price: "€ 6,80",
  lines: [
    "Per persoon, aan de kassa of online via Just Tickets.",
    "Kinderen tot één jaar zijn gratis. In 2026: geboren na 27 april 2025.",
  ],
};

export const ticketRules = [
  "Een online kaartje geldt alleen op de dag die je kiest. Omzetten naar een andere dag kan niet en je krijgt geen geld terug.",
  "Is het zwembad dicht door onweer of andere omstandigheden? Dan kun je een online gekocht, ongebruikt kaartje omzetten.",
  "Aan de kassa gekochte kaartjes worden niet vergoed.",
];

export const subscriptions = {
  presaleUntil: "25 april 2026",
  single: [
    { label: "Volwassenen", note: "Geboren vóór 1 januari 2008", presale: "€ 65,00", price: "€ 80,00" },
    { label: "Jeugd", note: "Geboren op of na 1 januari 2008", presale: "€ 44,00", price: "€ 59,00" },
  ],
  family: [
    { label: "2 personen", presale: "€ 101,00", price: "€ 121,00" },
    { label: "3 personen", presale: "€ 111,50", price: "€ 131,50" },
    { label: "4 personen", presale: "€ 127,00", price: "€ 147,00" },
    { label: "5 personen", presale: "€ 142,50", price: "€ 162,50" },
    { label: "6 personen", presale: "€ 158,00", price: "€ 178,00" },
    { label: "7 personen", presale: "€ 173,50", price: "€ 193,50" },
    { label: "8 personen", presale: "€ 186,50", price: "€ 206,50" },
  ],
  pass: "€ 1,00",
  lostPass: "€ 15,00",
};

export const subscriptionTypes = [
  {
    name: "Gezinsabonnement",
    text: "Voor ouder(s) met alle kinderen die op of na 1 januari 2008 geboren zijn. Ook voor twee volwassenen op hetzelfde adres. Opa's, oma's en andere familie op hetzelfde adres hebben een eigen abonnement nodig.",
  },
  { name: "Jeugdabonnement", text: "Voor kinderen geboren op of na 1 januari 2008." },
  { name: "Volwassenenabonnement", text: "Voor iedereen geboren vóór 1 januari 2008." },
];

export const subscriptionSteps = [
  {
    title: "Koop",
    text: "Bestel je abonnement bij Just Tickets, in de webshop of in de app.",
  },
  {
    title: "Personaliseer",
    text: "Vul de gegevens en een foto in. Dat kan direct, of later via de link in je bevestigingsmail.",
  },
  {
    title: "Zwem",
    text: "Laat de QR-code op je telefoon zien, of haal een fysieke pas op voor € 1,00.",
  },
];

export const passPickup = [
  "Donderdag 16 april 2026, 19:00 – 20:00 uur",
  "Vrijdag 24 april 2026, 19:00 – 20:00 uur",
];

export const subscriptionFine = [
  "Een voorverkoopabonnement moest uiterlijk 25 april 2026 gepersonaliseerd zijn. Anders annuleert Just Tickets de aankoop en krijg je je geld terug.",
  "Zelfde e-mailadres, reserveringsnummer van vorig jaar en een gezin dat niet veranderd is? Dan kun je de pas van vorig jaar opnieuw gebruiken.",
  "Pas later aangemaakt? Die ligt bij de kassa. Neem je reserveringsnummer mee en ga zolang naar binnen met de QR-code.",
  "Pas kwijt? Vraag een nieuwe aan bij Just Tickets voor € 15,00. Dat duurt ongeveer anderhalve week.",
  "Bij misbruik, of verkeerde personen op een gezinsabonnement, kan het abonnement worden ingenomen.",
];

/* ---------- zwemlessen ---------- */

export const zwemlessen = {
  price: "€ 130,00",
  facts: [
    { label: "Diploma's", value: "A, B en C" },
    { label: "Methode", value: "ENVOZ" },
    { label: "Lesgeld", value: "€ 130 per seizoen" },
    { label: "Aanmelden", value: "Per mail, vol is vol" },
  ],
  points: [
    "Plezier en veiligheid staan voorop. Er wordt lesgegeven volgens de ENVOZ-methode.",
    "Je kind neemt elke les een eigen EasySwim-zwemvestje mee. Dat schaf je zelf aan.",
    "Het lesgeld is exclusief een abonnement op naam van je kind. Dat abonnement is verplicht.",
  ],
  status: "Voor seizoen 2026 is de inschrijving gesloten. Aanmelden voor 2027 kan zodra de nieuwe lessen bekend zijn.",
};

/* ---------- activiteiten ---------- */

export type Activity = {
  id: string;
  name: string;
  when: string;
  price?: string;
  text: string;
  points?: string[];
  link?: { href: string; label: string };
  note?: string;
};

export const activities: Activity[] = [
  {
    id: "aquafit",
    name: "Aqua fit",
    when: "Vrijdag 9:30 – 10:15 · maandag 18:45 – 19:45",
    price: "€ 2 per les",
    text: "Bewegen in het water op muziek. Op vrijdag met Shirlene, op maandagavond met Thea. Koop vooraf een kaartje aan de kassa en geef het voor de les af.",
    note: "Tijdens de les is het diepe bad beperkt beschikbaar. De laatste les van 2026 was op 24 augustus.",
  },
  {
    id: "zwem4daagse",
    name: "Zwem4daagse",
    when: "15 t/m 18 juni 2026, start tussen 18:00 en 19:30",
    price: "€ 15",
    text: "Vier avonden zwemmen voor een medaille, met muziek, spelletjes in en rond de baden en activiteiten op het veld.",
    points: [
      "Kinderen tot en met 10 jaar zwemmen 10 banen. Vanaf 11 jaar en volwassenen 20 banen.",
      "Ook kinderen zonder diploma doen mee, met een eigen programma in het ondiepe bad.",
      "Ouders zwemmen alleen mee als ze zelf ook ingeschreven zijn.",
      "Een avond gemist? Zwem de dag ervoor of erna een extra keer.",
      "Tijdens de zwem4daagse is het bad dicht voor andere bezoekers.",
    ],
  },
  {
    id: "kampeernacht",
    name: "Kampeernacht",
    when: "Vrijdag 19 juni 2026, 18:00 tot zaterdag 11:00",
    price: "€ 17,50 per kind",
    text: "Kamperen op het terrein van het zwembad, voor kinderen van 6 tot en met 13 jaar met een zwemdiploma. Eten en drinken wordt verzorgd, nachtwakers blijven de hele nacht.",
    note: "In 2026 afgelast vanwege onweer en harde windstoten.",
  },
  {
    id: "sluitingsdag",
    name: "Bodypainting en hondenplons",
    when: "Laatste dag van het seizoen",
    price: "€ 6,80 per hond",
    text: "Het seizoen sluit af met bodypainting van 14:00 tot 16:00 uur. Om 16:00 uur mogen honden het water in. Begeleiders kijken gratis mee.",
  },
  {
    id: "triathlon",
    name: "Triathlon Ter Aar",
    when: "Zondag 10 mei 2026",
    text: "De 36e editie, met het zwemonderdeel in ons buitenbad. Voor het eerst ook met afstanden voor jeugd en junioren. Lid zijn van een club is niet nodig.",
    points: [
      "1/4 triathlon (18+): 1 km zwemmen, 40 km fietsen, 10 km lopen",
      "1/8 triathlon (16+): 500 m zwemmen, 20 km fietsen, 5 km lopen",
      "Junioren (16 – 19): 750 m zwemmen, 20 km fietsen, 5 km lopen",
      "Jeugd (12 – 15): 375 m zwemmen, 10 km fietsen, 2,5 km lopen",
    ],
    link: { href: "https://www.triathlonteraar.nl/", label: "Naar Triathlon Ter Aar" },
  },
  {
    id: "wetsuit",
    name: "Wetsuit testevent",
    when: "2, 3 en 9 mei 2026",
    text: "Wetsuits passen en testen in het water, georganiseerd door Trisport van der Hoorn.",
    link: {
      href: "https://www.trisporttriathlon.nl/veelgestelde-vragen/wetsuit-testevent/",
      label: "Info en tickets",
    },
  },
];

/* ---------- huisregels ---------- */

export const rulesSummary = [
  { title: "Zwemdiploma voor het diepe bad", text: "Kinderen zonder diploma mogen het perron bij het diepe bad niet op." },
  { title: "Zonder diploma met begeleider", text: "Een begeleider van 18 jaar of ouder in badkleding, die goed kan zwemmen." },
  { title: "Badkleding in en rond de baden", text: "Ook voor baby's en peuters, glijbaan inbegrepen. Op de ligweide mag gewone kleding." },
  { title: "Duiken met beleid", text: "In de ondiepe baden niet. In het diepe bad alleen bij de startblokken." },
  { title: "Geen glas, geen huisdieren", text: "Op de sluitingsdag is de hondenplons de uitzondering." },
  { title: "Waardevolle spullen thuis", text: "Kluisjes huur je bij het kassagebouw. Het bezoek is op eigen risico." },
];

export const houseRules: { title: string; rules: string[] }[] = [
  {
    title: "Toegang",
    rules: [
      "Kinderen zonder zwemdiploma komen alleen binnen met een begeleider van 18 jaar of ouder in badkleding, die goed kan zwemmen.",
      "Wie naar verwachting de orde of rust verstoort, kan zonder opgave van reden de toegang worden geweigerd.",
      "Laat je abonnement zien aan de kassamedewerker.",
      "Een dagkaart geldt alleen op de dag van afgifte. Even het terrein af kan alleen in overleg; dat wordt op je kaartje genoteerd.",
      "Toegangsbewijzen gelden alleen tijdens de openingstijden.",
      "Dienst- en personeelsruimtes zijn niet toegankelijk voor bezoekers.",
      "Glaswerk en huisdieren zijn niet toegestaan.",
    ],
  },
  {
    title: "Verblijf",
    rules: [
      "Omkleden doe je in de kleedruimtes. Baby's en peuters zijn uitgezonderd.",
      "Kinderen en jongeren gebruiken zo veel mogelijk de gemeenschappelijke kleedruimtes.",
      "Blijf niet zonder reden in of bij de kleedruimtes hangen.",
      "Een kleedhokje of toilet gebruik je alleen.",
      "Op de perrons rond de baden loop je op blote voeten of badslippers.",
      "Afval gaat in de vuilnisbakken.",
      "Muziek mag, zolang niemand er last van heeft. Het personeel beslist.",
      "Topless zonnen of zwemmen is niet toegestaan.",
      "Niet eten of drinken in de baden.",
      "Ouders blijven altijd verantwoordelijk voor de veiligheid en het gedrag van hun kinderen.",
    ],
  },
  {
    title: "Badkleding",
    rules: [
      "Op het terrein en de ligweides mag gewone kleding.",
      "In en rond de baden, en op de glijbaan, is badkleding verplicht. Ook voor baby's en peuters.",
      "Gewone kleding of ondergoed onder je badkleding is in het water niet toegestaan.",
      "Badkleding is een bikini, badpak, tankini, burkini, zwembroek of zwemshort van waterdoorlatende stof, zoals lycra.",
    ],
  },
  {
    title: "In en om de baden",
    rules: [
      "Alleen met een zwemdiploma mag je in het diepe bad.",
      "Niet rennen op de perrons.",
      "Niet duiken in de ondiepe baden. In het diepe bad alleen bij de startblokken.",
      "Je komt bij de baden via de waterbakken.",
      "Ballen en ander speelgoed alleen in overleg met het personeel.",
      "Kinderen zonder diploma mogen het perron bij het diepe bad niet op, ook niet met begeleiding.",
      "In het instructiebad mogen kinderen zonder diploma alleen met goedgekeurde zwembandjes en onder toezicht van een volwassene.",
    ],
  },
  {
    title: "Glijbaan en springkussens",
    rules: [
      "Gebruik de grote glijbaan volgens de regels die erbij staan.",
      "Glijbaan en springkussens gebruik je op eigen risico.",
    ],
  },
  {
    title: "Openingstijden en verwijdering",
    rules: [
      "Bestuur en personeel mogen bij bijzondere omstandigheden de openingstijden aanpassen of het bad (deels) sluiten. Entreegeld wordt dan niet terugbetaald.",
      "Wie instructies van het personeel of de huisregels niet opvolgt, onder invloed is van alcohol of drugs, of anderen overlast bezorgt, kan worden verwijderd.",
    ],
  },
  {
    title: "Aansprakelijkheid",
    rules: [
      "Je bezoek is op eigen risico. Het bestuur is niet aansprakelijk voor ongevallen, diefstal of schade, ook niet op het parkeerterrein of bij de fietsenstalling.",
      "Wie schade toebrengt aan het zwembad, wordt aansprakelijk gesteld.",
      "Bij een strafbaar feit wordt direct de politie ingeschakeld.",
      "Gevonden voorwerpen lever je in bij de kassa.",
      "In gevallen waarin de huisregels niet voorzien, beslissen bestuur en personeel.",
    ],
  },
];

export const tips = [
  "Laat geen waardevolle spullen achter in de auto.",
  "Zet je fiets of brommer goed op slot.",
  "Laat sieraden en dure spullen thuis.",
];

/* ---------- stichting, vrijwilligers, vacatures ---------- */

export const stichting = {
  name: "Stichting tot behoud zwembad Aarweide",
  goal: "Het openluchtzwembad in de regio Nieuwkoop open en in stand houden, samen met donateurs, sponsoren en vrijwilligers.",
  kvk: "28096635",
  bank: "NL75 RABO 0346 4819 29",
  board: [
    { name: "Jan Otto", role: "Voorzitter" },
    { name: "Anton Captein", role: "Voorzitter a.i. / bestuurslid" },
    { name: "Frank Lek", role: "Secretaris" },
    { name: "Corina Janssen", role: "Penningmeester" },
    { name: "Mark Jalink", role: "Bestuurslid" },
    { name: "Brigitte van den Bos", role: "Bestuurslid" },
  ],
  history: [
    { year: "2005 – 2006", text: "Grote renovatie, van september 2005 tot en met mei 2006. Mogelijk gemaakt door subsidies, fondsen en een inzamelingsactie in de dorpen." },
    { year: "2007", text: "De grote glijbaan komt erbij." },
    { year: "2020", text: "Het spraypark opent." },
    { year: "2025", text: "Een warmwatermachine voor milieuvriendelijke onkruidbestrijding, betaald met de Rabo-clubactie 2025 en een bijdrage van Rotary Ter Aar." },
  ],
};

export const vrijwilligers = {
  points: [
    { title: "Jij bepaalt je tijd", text: "Het is vrijwilligerswerk. Hoeveel tijd je geeft, bepaal je zelf." },
    { title: "Vele handen", text: "Hoe meer mensen meehelpen, hoe lichter het werk." },
    { title: "Nieuwe mensen", text: "Je maakt nieuwe vrienden en contacten in de buurt." },
    { title: "Verzekerd", text: "De stichting heeft een collectieve ongevallenverzekering voor vrijwilligers." },
  ],
  insurance: [
    "Bij overlijden: een uitkering van € 5.000.",
    "Bij blijvende invaliditeit: maximaal € 25.000 bij volledige arbeidsongeschiktheid, naar rato bij gedeeltelijke.",
  ],
  teams: ["Kassa", "Technische ploeg", "Groenploeg", "Parkeren op drukke dagen"],
};

export const vacatures = [
  {
    title: "Toezichthouder",
    text: "Je houdt toezicht op de baden en zorgt dat iedereen veilig zwemt.",
    href: links.vacatureToezichthouder,
  },
  {
    title: "Zelfstandig toezichthouder",
    text: "Je bent leidinggevend op het bad en het aanspreekpunt voor collega's en bezoekers.",
    href: links.vacatureZelfstandig,
  },
];

/* ---------- foto's ---------- */

export type Photo = { src: string; alt: string; width: number; height: number; caption: string };

export const photos: Photo[] = [
  { src: "/images/galerij/diepe-bad-1.webp", width: 1448, height: 1086, caption: "Het diepe bad", alt: "Het diepe bad met baanlijnen en startblokken, omringd door hoge bomen" },
  { src: "/images/galerij/ondiepe-bad-1.webp", width: 1600, height: 1067, caption: "Recreatiebad met glijbaan", alt: "Het ondiepe recreatiebad met de rode glijbaan op de achtergrond" },
  { src: "/images/galerij/diepe-bad-2.webp", width: 1600, height: 900, caption: "Het diepe bad van opzij", alt: "Het diepe bad van opzij, met kleurige bankjes langs de rand" },
  { src: "/images/galerij/ondiepe-bad-3.webp", width: 800, height: 450, caption: "De kleine glijbaan", alt: "Een leeg ondiep bad met een gele glijbaan en bomen erachter" },
  { src: "/images/galerij/peuterbad-1.webp", width: 450, height: 337, caption: "Peuterbad", alt: "Het peuterbad met speeltoestellen, een zeehond en een klimtoren" },
  { src: "/images/galerij/diepe-bad-3.webp", width: 1600, height: 900, caption: "Zomer in de Aarweide", alt: "Breed zicht over het diepe bad op een zonnige dag" },
  { src: "/images/galerij/ondiepe-bad-2.webp", width: 450, height: 337, caption: "Het ondiepe bad", alt: "Het ondiepe bad met een gele glijbaan, gezien vanaf een gebouw" },
  { src: "/images/galerij/peuterbad-2.webp", width: 450, height: 337, caption: "Spelen in het peuterbad", alt: "Het peuterbad met een regenboogglijbaan en een zeehondfiguur" },
];
