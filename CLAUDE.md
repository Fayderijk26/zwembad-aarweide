# Zwembad Aarweide: projectcontext

Doel: een nieuwe, opvallend mooie website voor openluchtzwembad Aarweide (Schilkerweg 21, Nieuwveen) ter vervanging van https://www.zwembadaarweide.nl/. Taal van de site: Nederlands. Doelgroep: gezinnen, zwemmers en inwoners van Nieuwveen en omgeving.

## Huidige staat
- `index.html` is een zelfstandige eerste versie (HTML, CSS, JS, canvas). Geen build-stap.
- De hero is een canvas-scène: doorsnede van een zwembad, een duiker springt van de duikplank en maakt een bommetje met splash, rimpels en bubbels. Knop "Nog een bommetje" herhaalt de duik.
- Secties: zwemmen, openingstijden (met live status in Amsterdamse tijd), tarieven, activiteiten, nieuws, goed om te weten, contact.

## Gewenste volgende stappen
1. Omzetten naar Next.js (App Router) + TypeScript + Tailwind, met Framer Motion voor animaties. Inhoud en teksten uit `index.html` overnemen, niets verzinnen.
2. De duik laten meebewegen met scrollen en een watergolf als overgang tussen secties. Eén georkestreerd moment is sterker dan veel losse effecten.
3. Echte foto's van het zwembad verwerken zodra de eigenaar ze aanlevert (nu is de hero getekend).
4. Tarieven, data en activiteiten staan op seizoen 2026 en moeten voor 2027 worden bijgewerkt. Zie `TODO` hieronder.
5. Fotogalerij, sponsoren, stichting en vrijwilligers van de oude site nog overnemen.
6. Toegankelijkheid (contrast, toetsenbord, `prefers-reduced-motion`) en snelheid (Lighthouse) controleren. Een Awwwards-niveau uitvoering is het streven.

## Ontwerprichting
- Kleuren: diepblauw `#0b2c47` (inkt), poolblauw `#0f8fd6`, zonnegeel `#ffb81c` (knoppen, accent), koraal `#ff5d48` (alleen de duiker en parasols), lichte achtergrond `#f3fafd`. Donkere weergave is aanwezig.
- Lettertypen: Unbounded (koppen), Figtree (tekst).
- Toon: speels en warm, geen stockfoto-gevoel. Korte, directe zinnen.
- Vermijd generieke AI-looks: paarse gradients, alles gecentreerd, dezelfde kaart overal.

## Feiten (bron: oude site, seizoen 2026)
- Seizoen 2026: 28 april t/m 13 september. Ma, wo, vr 7:00-20:00; di, do 8:00-20:00; za, zo en feestdagen 12:00-18:00; zondag in juli, augustus en september vanaf 11:00.
- Los kaartje EUR 6,80. Kinderen tot een jaar gratis. Tickets en abonnementen via Just Tickets.
- Diep bad 23 graden C, ondiepe baden 21 graden C (richtwaarden).
- Telefoon 0172-602516 (alleen tijdens openingstijden), info@zwembadaarweide.nl (mail heeft voorkeur).

## TODO voor de eigenaar
- Prijzen, openingstijden en activiteiten voor 2027 aanleveren.
- Foto's aanleveren.
- Betekenis van het sterretje bij "Zondag*" en "Feestdagen*" op de oude openingstijdenpagina bevestigen.

## Werkafspraken
- Kleine commits met duidelijke Nederlandse of Engelse berichten.
- Draai de dev-server en bekijk de pagina op desktop en mobiel voordat je iets als klaar meldt.
