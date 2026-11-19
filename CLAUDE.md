# Zwembad Aarweide: projectcontext

Doel: een nieuwe, hoogwaardige en rustig mooie website voor openluchtzwembad Aarweide (Schilkerweg 21, Nieuwveen) ter vervanging van https://www.zwembadaarweide.nl/. Taal van de site: Nederlands. Doelgroep: gezinnen, zwemmers en inwoners van Nieuwveen en omgeving.

## Huidige staat
- Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion. Inhoud staat in `content/site.ts`.
- `index.html` is de oude losse versie (HTML, CSS, JS), alleen nog als referentie.
- Secties: zwemmen, openingstijden (met live status in Amsterdamse tijd), tarieven, activiteiten, nieuws, goed om te weten, contact. Deze inhoud blijft.

## Nieuwe richting hero en animatie
- De hero toont een echte foto van het zwembad, schermvullend. Geen getekende scène, geen mensen, geen grapjes (de "Bommetje."-kop is geschrapt als te kinderachtig).
- Bij het openen beweegt het water rustig: glinsteringen en zachte golfjes over het wateroppervlak (WebGL-shader of canvas-displacement over de foto).
- Klik of tik op het water: daar ontstaat een plons met uitdijende rimpels die de foto vervormen. Rimpels volgen ook subtiel de cursor.
- Waterlijn als overgang: scrollend naar beneden stijgt een waterlijn over de foto en gaat de pagina over in de volgende sectie (scroll-gestuurd, Framer Motion of GSAP ScrollTrigger).
- Respecteer `prefers-reduced-motion`: dan een stilstaande foto zonder golven, en geen automatische beweging.
- Hero-koptekst: sober en sterk, bijvoorbeeld "Zwembad Aarweide" met de regel "Openluchtzwembad in Nieuwveen". Primaire knop "Koop kaartjes".

## Foto's
- De oude miniaturen van de vorige site (100 px en 450 px, met watermerk) zijn verwijderd uit de repository en mogen niet meer worden gebruikt. Gebruik alleen foto's die de eigenaar daarna toevoegt in `public/images/`.
- Foto's komen van de oude site en zijn mogelijk klein. Een schermvullende hero heeft minimaal ~1920 px breed nodig. Controleer de afmetingen en kies de scherpste foto voor de hero.
- Verbeteren mag: bijsnijden, kleurcorrectie, lichte scherpte, ruisreductie, eventueel een AI-upscaler (dat voegt geen echte details toe, dus niet overdrijven). Combineren tot één beeld (panorama of compositie) alleen als de foto's overlappen of dezelfde hoek hebben. Geen mensen of dingen erbij verzinnen.
- Beste oplossing op termijn: nieuwe foto's of drone-opnames bij zonnig weer als het zwembad open is.
- Houd bestanden onder een paar MB. Gebruik `next/image` voor WebP en responsieve groottes. Geen video's in git.

## Gewenste volgende stappen
1. ~~Omzetten naar Next.js (App Router) + TypeScript + Tailwind, met Framer Motion.~~ Gedaan (branch `nextjs`).
2. Hero met waterbeweging en plons-bij-klik bouwen (zie hierboven).
3. Waterlijn-overgang tussen hero en de rest van de pagina.
4. Tarieven, data en activiteiten staan op seizoen 2026 en moeten voor 2027 worden bijgewerkt. Zie `TODO` hieronder.
5. Fotogalerij, sponsoren, stichting en vrijwilligers van de oude site nog overnemen.
6. Toegankelijkheid (contrast, toetsenbord, `prefers-reduced-motion`) en snelheid (Lighthouse) controleren. Een Awwwards-niveau uitvoering is het streven.

## Ontwerprichting
- Kleuren: diepblauw `#0b2c47` (inkt), poolblauw `#0f8fd6`, zonnegeel `#ffb81c` (knoppen, accent), lichte achtergrond `#f3fafd`. Donkere weergave is aanwezig. Koraal alleen als zeldzaam accent.
- Lettertypen: Unbounded (koppen), Figtree (tekst).
- Toon: rustig, warm en hoogwaardig. Korte, directe zinnen. Geen stockfoto-gevoel en geen kinderachtige humor.
- Vermijd generieke AI-looks: paarse gradients, alles gecentreerd, dezelfde kaart overal.

## Feiten (bron: oude site, seizoen 2026)
- Seizoen 2026: 28 april t/m 13 september. Ma, wo, vr 7:00-20:00; di, do 8:00-20:00; za, zo en feestdagen 12:00-18:00; zondag in juli, augustus en september vanaf 11:00.
- Los kaartje EUR 6,80. Kinderen tot een jaar gratis. Tickets en abonnementen via Just Tickets.
- Diep bad 23 graden C, ondiepe baden 21 graden C (richtwaarden).
- Telefoon 0172-602516 (alleen tijdens openingstijden), info@zwembadaarweide.nl (mail heeft voorkeur).

## TODO voor de eigenaar
- Prijzen, openingstijden en activiteiten voor 2027 aanleveren.
- Betere foto's aanleveren als de bestaande te klein zijn.
- Betekenis van het sterretje bij "Zondag*" en "Feestdagen*" op de oude openingstijdenpagina bevestigen.

## Werkafspraken
- Kleine commits met duidelijke Nederlandse of Engelse berichten.
- Draai de dev-server en bekijk de pagina op desktop en mobiel voordat je iets als klaar meldt.
