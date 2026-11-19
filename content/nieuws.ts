/**
 * Nieuwsberichten van de oude site, ingekort tot de feiten. Nieuwste eerst.
 * Datums 1 t/m 5 staan zo op de oude site; de rest is de laatste wijzigingsdatum uit de sitemap
 * (de oude site toont bij die berichten geen datum).
 */

export type NewsTag = "Seizoen" | "Activiteiten" | "Stichting" | "Werken";

export type NewsPost = {
  slug: string;
  date: string;
  title: string;
  tag: NewsTag;
  summary: string;
  body: string[];
  links?: { href: string; label: string }[];
};

export const posts: NewsPost[] = [
  {
    slug: "afgelasten-kampeernacht",
    date: "2026-06-19",
    title: "Kampeernacht afgelast",
    tag: "Activiteiten",
    summary: "Door onweersdreiging gaat de kampeernacht van 19 juni niet door.",
    body: [
      "De kampeernacht is afgelast vanwege de onweersdreiging. Het management stelde dit vrijdagochtend voor en het bestuur heeft besloten: veiligheid gaat voor.",
      "Alle ouders zijn per mail op de hoogte gebracht. De organisatie lag bij het management, in het bijzonder bij Betty. Het bestuur hoopt de kampeernacht later in het seizoen alsnog te houden.",
      "De zwem4daagse was ondertussen een groot succes.",
    ],
  },
  {
    slug: "zwemvierdaagse-2026",
    date: "2026-06-07",
    title: "Zwemvierdaagse 2026",
    tag: "Activiteiten",
    summary: "Van 15 tot en met 18 juni vier avonden zwemmen voor een medaille.",
    body: [
      "De zwemvierdaagse is van 15 tot en met 18 juni 2026. Kinderen tot en met 10 jaar zwemmen 10 banen, kinderen vanaf 11 jaar en volwassenen 20 banen. Je start tussen 18:00 en 19:30 uur.",
      "Meedoen kost € 15,00. Inschrijven kan tot maandag 15 juni, 19:00 uur. Kinderen zonder zwemdiploma zwemmen mee in het ondiepe bad. Ouders zwemmen alleen mee als ze zelf ook ingeschreven zijn.",
      "Een avond gemist? Zwem dan de dag ervoor of erna extra. Tijdens de zwemvierdaagse is het zwembad dicht voor andere bezoekers.",
    ],
    links: [{ href: "https://shop.justtickets.nl/shop/12672/Zwem4daagse_2026", label: "Inschrijven via Just Tickets" }],
  },
  {
    slug: "kampeernacht-19-20-juni-2026-inclusief-aanvullende-informatie",
    date: "2026-06-07",
    title: "Kampeernacht 19 en 20 juni 2026",
    tag: "Activiteiten",
    summary: "Een nacht kamperen op het zwembadterrein voor kinderen van 6 tot en met 13 jaar.",
    body: [
      "De kampeernacht is voor kinderen van 6 tot en met 13 jaar, van vrijdag 19 juni 18:00 uur tot zaterdag 20 juni 11:00 uur. Kinderen nemen een tent, kampeerspullen, zwemkleding en droge kleren mee. Voor eten en drinken wordt gezorgd.",
      "Deelname kost € 17,50 per kind, te betalen bij het inchecken. Om 23:00 uur ligt iedereen in de tent, om 23:30 uur is het stil. Kinderen krijgen een polsbandje en nachtwakers blijven de hele nacht. 's Nachts zijn de waterbakken naar het middenbad en het diepe bad afgesloten.",
      "Bij slecht weer kan de nacht worden afgelast. Vragen? Mail naar j.otto@zwembadaarweide.nl.",
    ],
  },
  {
    slug: "temperatuur-middenbad-nog-niet-op-gewenst-niveau-renovatie-glijbaan",
    date: "2026-04-27",
    title: "Middenbad nog niet op temperatuur en renovatie glijbaan",
    tag: "Seizoen",
    summary: "Het diepe bad is 23 graden, het middenbad volgt later in de week. De glijbaan krijgt een opknapbeurt.",
    body: [
      "Het diepe bad en het middenbad worden apart verwarmd. Het diepe bad is bij de opening 23 graden. Het middenbad loopt achter en haalt naar verwachting donderdag of vrijdag 21 graden.",
      "Een gespecialiseerd bedrijf knapt de grote glijbaan op: schuren, scheurtjes en gaatjes vullen en een nieuwe kleur. Er is ook op Koningsdag doorgewerkt. Als het weer meezit, gaat de glijbaan het weekend erna open.",
    ],
  },
  {
    slug: "opening-zwembad",
    date: "2026-03-12",
    title: "Zwemseizoen opent op 28 april 2026",
    tag: "Seizoen",
    summary: "Het bad gaat op 28 april om 8:00 uur open. Abonnementen zijn te koop vanaf 29 maart.",
    body: [
      "Het zwembad gaat op 28 april 2026 om 8:00 uur open. Abonnementen zijn vanaf 29 maart te koop via Just Tickets.",
      "Wie zijn abonnement voor 26 april koopt en personaliseert, betaalt het voorverkooptarief. In de Just Tickets-app staan je abonnementen bij elkaar. Het abonnement van een kind kun je doorsturen naar de ouder met wie het kind meegaat.",
    ],
  },
  {
    slug: "milieuvriendelijke-onkruidbestrijdingsmachine",
    date: "2025-11-23",
    title: "Milieuvriendelijke onkruidbestrijdingsmachine",
    tag: "Stichting",
    summary: "Met heet water in plaats van gif: een nieuwe machine voor de vrijwilligers.",
    body: [
      "Bestrijdingsmiddelen mogen niet meer, dus vrijwilligers haalden het onkruid tussen de tegels met de hand weg. Met de opbrengst van de Rabo-clubactie 2025 en een bijdrage van Rotary Ter Aar is nu een machine gekocht die onkruid met water van boven de 100 graden bestrijdt.",
      "De machine kan in het voorjaar ook de baden schoonmaken, zodat er geen hogedrukreiniger meer gehuurd hoeft te worden. Op 11 november is hij geleverd en uitgelegd aan de vrijwilligers. Leverancier Fa. Roeleveld-Bos gaf korting.",
    ],
  },
  {
    slug: "extra-les-aquafit",
    date: "2025-06-24",
    title: "Extra les aqua fit",
    tag: "Activiteiten",
    summary: "Vanaf 30 juni ook aqua fit op maandagavond.",
    body: [
      "Vanaf maandag 30 juni is er een extra aqua-fitles op maandagavond van 19:30 tot 20:15 uur. Net als op vrijdag kost een les € 2,00 per persoon. Je koopt een kaartje aan de kassa.",
    ],
  },
  {
    slug: "maandag-2-juni-alleen-diepe-bad-open",
    date: "2025-05-21",
    title: "Maandag 2 juni alleen het diepe bad open",
    tag: "Seizoen",
    summary: "Door onderhoud in de machinekamer zijn het ondiepe bad en het peuterbad een dag dicht.",
    body: [
      "Op maandag 2 juni 2025 is alleen het diepe bad open, vanwege onderhoud in de machinekamer. Het ondiepe bad met de glijbaan en het peuterbad zijn die dag dicht. Op dinsdag 3 juni zijn naar verwachting alle baden weer open.",
    ],
  },
  {
    slug: "aquasport",
    date: "2025-05-13",
    title: "Aqua fit start op 23 mei",
    tag: "Activiteiten",
    summary: "Elke vrijdagochtend bewegen in het water, gegeven door het badpersoneel.",
    body: [
      "Op vrijdag 23 mei 2025 om 9:30 uur begint aqua fit. De lessen worden gegeven door het badpersoneel.",
      "Omdat er materiaal is aangeschaft, vraagt het zwembad € 2,00 per persoon. Koop je kaartje aan de kassa en geef het af aan het personeelslid dat de les geeft.",
    ],
  },
  {
    slug: "verhoging-tarieven-2025",
    date: "2025-03-19",
    title: "Verhoging tarieven 2025",
    tag: "Stichting",
    summary: "Door hogere kosten gaan de prijzen van kaartjes en abonnementen omhoog.",
    body: [
      "Inflatie, hogere kosten voor gas, water, stroom en materiaal, en hogere personeelskosten maken een prijsverhoging vanaf seizoen 2025 nodig. Dat geldt voor losse kaartjes en abonnementen.",
      "Bij het vaststellen van de prijzen is gekeken naar de inflatie, de openingstijden in de regio en de meerprijs per extra persoon op een abonnement. Afgezien van het badpersoneel draait het zwembad volledig op vrijwilligers.",
    ],
  },
  {
    slug: "zaterdag-20-juli-gaan-we-eerder-open",
    date: "2024-07-18",
    title: "Zaterdag 20 juli eerder open",
    tag: "Seizoen",
    summary: "Vanwege het mooie weer eenmalig open om 11:00 uur.",
    body: [
      "Vanwege het mooie weer gaat het zwembad op zaterdag 20 juli eenmalig al om 11:00 uur open. Tot 12:00 uur is het diepe bad alleen voor baantjeszwemmers.",
    ],
  },
  {
    slug: "zwemvierdaagse",
    date: "2024-06-05",
    title: "Zwemvierdaagse 2024",
    tag: "Activiteiten",
    summary: "De aankondiging van de zwemvierdaagse van 2024.",
    body: ["Dit bericht bestond op de oude site alleen uit een poster met de aankondiging van de zwemvierdaagse 2024."],
  },
  {
    slug: "rotary-ter-aar-organiseert-papeneiland-festival",
    date: "2024-05-29",
    title: "Rotary Ter Aar organiseert Papeneiland Festival",
    tag: "Stichting",
    summary: "Het inschrijfgeld van de supronde en de rondvaartboot gaat naar het zwembad.",
    body: [
      "Op 9 juni organiseert Rotary Ter Aar het derde Papeneiland Festival. Het inschrijfgeld voor de supronde en de rondvaartboot gaat naar Zwembad Aarweide.",
    ],
    links: [{ href: "https://www.rotaryteraar.nl/sup.html", label: "Meer over het festival" }],
  },
  {
    slug: "aquasport-in-zwembad-aarweide",
    date: "2024-05-12",
    title: "Aquasport in zwembad Aarweide",
    tag: "Activiteiten",
    summary: "De aankondiging van aquasport in 2024.",
    body: ["Dit bericht bestond op de oude site alleen uit een poster over aquasport in het zwembad."],
  },
  {
    slug: "nieuwe-badmanagers",
    date: "2024-05-06",
    title: "Nieuwe badmanagers",
    tag: "Stichting",
    summary: "Bart Boevink en Lennard van der Ende volgen samen de heer Wens op.",
    body: [
      "Na het pensioen van de heer Wens zijn twee ervaren mensen gevonden die samen de functie van zwembadmanager invullen: Bart Boevink en Lennard van der Ende. Ze hebben de vrijwilligers van de technische ploeg en de groenploeg al ontmoet.",
      "Het bestuur zocht ook nieuwe medewerkers. Half maart was er een kennismakingsavond, en een week eerder het eerste deel van de herhalingscursus EHBO en BHV. Dit bericht verscheen eerder in De Omroeper.",
    ],
  },
  {
    slug: "bijdrage-rabobank-aan-zwembad-aarweide",
    date: "2024-02-06",
    title: "Bijdrage Rabobank voor een windmolen",
    tag: "Stichting",
    summary: "Een donatie voor een kleine windmolen die de stroomkosten omlaag brengt.",
    body: [
      "Ter gelegenheid van haar 125-jarig bestaan heeft de Rabobank een bedrag gedoneerd voor een kleine windmolen. Bij veel wind en weinig zon moet het water extra verwarmd worden en draaien pompen en installaties op stroom. Een eigen windmolen verlaagt die kosten.",
      "Zonnepanelen op het veld zijn geen optie. Omdat de stichting niet in aanmerking komt voor fiscale aftrek, zijn donaties hard nodig. Fonds Alphen heeft ook een bijdrage toegezegd. De windmolen wordt niet voor of tijdens seizoen 2024 geplaatst.",
    ],
  },
  {
    slug: "hondenplons-afgelast-wegens-bijzondere-weer",
    date: "2023-09-10",
    title: "Hondenplons afgelast door het mooie weer",
    tag: "Activiteiten",
    summary: "De laatste twee uur blijft het bad open voor zwemmers.",
    body: [
      "Door het mooie weer en de verwachte drukte blijft het bad de laatste twee uur open voor zwemmers. De hondenplons gaat dit jaar daarom niet door. Het bestuur begrijpt dat dit vervelend is voor hondenbezitters.",
    ],
  },
  {
    slug: "50-000ste-bezoeker",
    date: "2023-09-10",
    title: "De 50.000ste bezoeker",
    tag: "Seizoen",
    summary: "Denise Verkerk werd verrast met een handdoek en een abonnement voor volgend jaar.",
    body: [
      "Op donderdag 7 september is de 50.000ste bezoeker van het seizoen welkom geheten. Denise Verkerk kwam met haar gezin zwemmen en werd verrast door de badmanager. Ze kreeg een handdoek en een waardebon voor een abonnement voor het volgende seizoen.",
    ],
  },
  {
    slug: "hevige-brand-in-ter-aar-zwembad-wel-open",
    date: "2023-06-10",
    title: "Brand in Ter Aar, zwembad wel open",
    tag: "Seizoen",
    summary: "De wind stond van het zwembad af, het bad kon gewoon open.",
    body: [
      "Op de avond van 9 juni 2023 woedde een grote brand op het bedrijventerrein in Ter Aar. De wind stond niet richting het zwembad, dus het bad kon gewoon open. Het bestuur leeft mee met de getroffen bedrijven, waaronder een aantal sponsoren.",
    ],
  },
  {
    slug: "zwem4daagse",
    date: "2023-05-23",
    title: "Zwem4daagse 2023",
    tag: "Activiteiten",
    summary: "Van 20 tot en met 23 juni vier avonden zwemmen voor een medaille.",
    body: [
      "De zwem4daagse was van 20 tot en met 23 juni. Kinderen tot en met 10 jaar zwommen 10 banen, vanaf 11 jaar en volwassenen 20 banen. Starten kon tussen 17:30 en 18:30 uur, deelname kostte € 12,50. Elke avond was er muziek en waren er activiteiten.",
    ],
  },
  {
    slug: "ondiep-bad-spraypark-open",
    date: "2023-05-22",
    title: "Ondiep bad en spraypark open",
    tag: "Seizoen",
    summary: "Alle baden open, behalve het peuterbad.",
    body: [
      "Het ondiepe bad met de glijbaan en het spraypark zijn open. Het diepe bad is 23 graden. Het peuterbad blijft door de koude nachten nog even dicht.",
    ],
  },
  {
    slug: "trimzwemmen-gaat-weer-beginnen",
    date: "2023-05-14",
    title: "Trimzwemmen begint weer",
    tag: "Activiteiten",
    summary: "Elke vrijdagochtend trimzwemmen met René.",
    body: ["Vanaf vrijdag 19 mei is er elke vrijdagochtend van 10:00 tot 10:45 uur trimzwemmen, gegeven door René."],
  },
  {
    slug: "ondiepe-en-peuterbad-voorlopig-gesloten",
    date: "2023-04-26",
    title: "Ondiep bad en peuterbad voorlopig dicht",
    tag: "Seizoen",
    summary: "Door de kou gaat alle warmte naar het diepe bad.",
    body: [
      "Door de lage buitentemperaturen warmt het water langzaam op. Omdat er bomen op de dijk zijn weggehaald, heeft de wind meer vat op het water. De verwachting voor de week erna is niet goed.",
      "Daarom blijven het ondiepe bad en het peuterbad voorlopig dicht. De warmte van de warmtepompen gaat naar het diepe bad, zodat baantjeszwemmers gewoon kunnen zwemmen.",
    ],
  },
  {
    slug: "informatie-vertraging-levering-en-plaatsing-hek",
    date: "2023-04-24",
    title: "Vertraging bij het nieuwe hek",
    tag: "Stichting",
    summary: "Het hekwerk rond het zwembad komt pas eind mei, tot die tijd staat er een tijdelijk hek.",
    body: [
      "Het bestuur is teleurgesteld over de vertraging van het nieuwe hekwerk rond het zwembad. Op 17 april bleek dat het niet op tijd klaar zou zijn. Er is maar één onderaannemer die het kan plaatsen.",
      "De eerste maand staat er een tijdelijk hek. Eind mei komen het definitieve hekwerk en het zichtscherm op de dijk. Vragen kunnen naar info@zwembadaarweide.nl.",
    ],
  },
  {
    slug: "abonnementenverkoop-start-op-31-maart",
    date: "2023-03-29",
    title: "Abonnementenverkoop start op 31 maart",
    tag: "Seizoen",
    summary: "Voor het eerst online via Just Tickets, met ophaaldagen voor de pasjes.",
    body: [
      "Vanaf vrijdag 31 maart 2023 verkoopt Just Tickets de abonnementen online. Een gezinsabonnement is voor gezinnen en voor twee volwassenen op één adres. Opa's, oma's en andere familie hebben een eigen abonnement nodig. Een fysieke pas kost € 1,00.",
      "Het zwembad ging op zaterdag 29 april open. Pasjes konden worden opgehaald met het reserveringsnummer.",
    ],
  },
  {
    slug: "zwembaden-schoon",
    date: "2023-03-21",
    title: "De baden zijn schoon",
    tag: "Seizoen",
    summary: "Klaar voor de opening op 29 april 2023.",
    body: [
      "Het mooie weer laat op zich wachten en de regen vertraagt de dijkverzwaring, maar de baden zijn al schoongemaakt. Het zwembad gaat op zaterdag 29 april 2023 weer open.",
    ],
  },
  {
    slug: "wij-zoeken-badpersoneel",
    date: "2022-02-08",
    title: "Wij zoeken badpersoneel",
    tag: "Werken",
    summary: "Leidinggevenden, toezichthouders en zweminstructeurs gezocht.",
    body: [
      "Het zwembad zocht leidinggevenden, toezichthouders en gediplomeerde zweminstructeurs voor de periode van eind april tot half september. De functies staan open voor mensen van alle leeftijden.",
    ],
    links: [{ href: "/vacatures/", label: "Bekijk de huidige vacatures" }],
  },
  {
    slug: "nieuwe-voorzitter",
    date: "2021-11-07",
    title: "Nieuwe voorzitter",
    tag: "Stichting",
    summary: "Henny Rekelhof volgt Herman Niesten op.",
    body: [
      "Het bestuur heeft Henny Rekelhof gekozen als nieuwe voorzitter. Hij zat al in het bestuur en volgt Herman Niesten op. Het doel blijft het behoud en de toekomst van het zwembad, samen met de vrijwilligers als één hechte club.",
    ],
  },
  {
    slug: "vanaf-24-mei-recreatief-zwemmen-mogelijk",
    date: "2021-05-19",
    title: "Vanaf 24 mei weer recreatief zwemmen",
    tag: "Seizoen",
    summary: "Vanaf tweede pinksterdag mag de ligweide weer gebruikt worden.",
    body: [
      "Vanaf tweede pinksterdag kon er weer recreatief gezwommen worden en mocht de ligweide weer gebruikt worden. Reserveren bleef verplicht en de douches bleven dicht vanwege de coronaregels.",
    ],
  },
  {
    slug: "zwembad-aarweide-opent-12-mei",
    date: "2021-05-09",
    title: "Zwembad Aarweide opent 12 mei",
    tag: "Seizoen",
    summary: "Seizoen 2021 begon met reserveren en beperkte openingstijden.",
    body: [
      "Het seizoen 2021 begon op woensdag 12 mei om 14:00 uur, met beperkte openingstijden en verplicht reserveren vanwege corona. Een los kaartje kostte € 5,50, er waren tien- en twintigbadenkaarten. Het ondiepe bad, de glijbaan en het peuterbad waren nog niet open voor recreatie.",
    ],
  },
  {
    slug: "zwembad-aarweide-maakt-zich-op-voor-nieuw-seizoen",
    date: "2021-05-09",
    title: "Zwembad Aarweide maakt zich op voor het nieuwe seizoen",
    tag: "Seizoen",
    summary: "Opening met tijdsblokken en nieuwe meerbadenkaarten.",
    body: [
      "Het zwembad opende op 12 mei 2021 met een reserveringssysteem met tijdsblokken. Nieuw waren de meerbadenkaarten, voordelig voor vaste bezoekers. Het seizoen 2020 eindigde met een flink verlies door het slechte weer in juli.",
    ],
  },
  {
    slug: "vernieuwde-tijdsloten",
    date: "2020-08-11",
    title: "Vernieuwde tijdsloten",
    tag: "Seizoen",
    summary: "Na een evaluatie zijn de openingstijden in 2020 aangepast.",
    body: [
      "In juni 2020 besloot het bestuur open te gaan, ook om maatschappelijke redenen. Het verplichte reserveren was lastig voor vooral oudere bezoekers, en op sommige momenten kwamen er weinig mensen. Daarom zijn de tijdsloten aangepast.",
    ],
  },
  {
    slug: "zwemmen-in-2020",
    date: "2020-07-04",
    title: "Zwemmen in 2020",
    tag: "Seizoen",
    summary: "Geen abonnementen, wel losse kaartjes met tijdsloten.",
    body: [
      "In 2020 werden geen abonnementen verkocht, alleen losse entreebewijzen met een tijdslot per dag. Vooraf kopen en reserveren was verplicht.",
    ],
  },
  {
    slug: "zwembad-misschien-per-1-juli-2020-open",
    date: "2020-05-14",
    title: "Zwembad misschien per 1 juli 2020 open",
    tag: "Seizoen",
    summary: "1 juli als richtdatum, onder voorbehoud van de coronaregels.",
    body: [
      "Het bestuur hield 1 juli 2020 aan als richtdatum voor de opening, met mogelijk een seizoen tot eind september. Er moest nog veel worden uitgewerkt: veiligheid, schoonmaak, voorverkoop en tijdsblokken.",
    ],
  },
  {
    slug: "maatregelen-ivm-corona-virus",
    date: "2020-04-05",
    title: "Maatregelen vanwege het coronavirus",
    tag: "Seizoen",
    summary: "Het zwembad kon niet voor 1 juni 2020 open.",
    body: ["De overheidsmaatregelen werden verlengd tot 1 juni 2020. Het zwembad kon in ieder geval niet eerder open."],
  },
  {
    slug: "data-voorverkoop-abonnementen-2",
    date: "2020-03-17",
    title: "Voorverkoop abonnementen uitgesteld",
    tag: "Seizoen",
    summary: "De voorverkoop van 3 en 4 april 2020 ging niet door.",
    body: [
      "Vanwege het coronavirus gingen de voorverkoopdagen van 3 en 4 april 2020 niet door. Ook de voorverkoop van 17 en 18 april was onzeker.",
    ],
  },
  {
    slug: "werken-bij-zwembad-aarweide",
    date: "2020-02-13",
    title: "Werken bij zwembad Aarweide?",
    tag: "Werken",
    summary: "Toezichthouders en zweminstructeurs gezocht voor 2020.",
    body: [
      "Voor seizoen 2020 zocht het zwembad toezichthouders, en toezichthouders met een ABC-zweminstructeursdiploma voor de zwemlessen op maandag, dinsdag en donderdag. Gemiddeld ging het om 20 uur per week of een deel daarvan.",
    ],
    links: [{ href: "/vacatures/", label: "Bekijk de huidige vacatures" }],
  },
];

export const newsTags: NewsTag[] = ["Seizoen", "Activiteiten", "Stichting", "Werken"];

const fmt = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const formatDate = (iso: string) => fmt.format(new Date(iso + "T00:00:00Z"));
