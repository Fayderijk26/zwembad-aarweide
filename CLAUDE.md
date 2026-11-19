# Zwembad Aarweide: projectcontext

Doel: een nieuwe, hoogwaardige en rustig mooie website voor openluchtzwembad Aarweide (Schilkerweg 21, Nieuwveen) ter vervanging van https://www.zwembadaarweide.nl/. Taal van de site: Nederlands. Doelgroep: gezinnen, zwemmers en inwoners van Nieuwveen en omgeving.

## Huidige staat
- Inhoud staat in `content/` (`site.ts`, `nieuws.ts`, `sponsoren.ts`); pagina's lezen daaruit. Feiten en prijzen alleen daar bijwerken.
- `index.html` is de oude losse versie, alleen nog als referentie.
- De hero (`components/Hero.tsx`) legt WebGL-water over `public/images/hero.webp`, binnen het masker `public/images/hero-water-mask.png`.
- Losse pagina's onder `app/` (bezoek, activiteiten, nieuws met een pagina per bericht, foto's, over ons, contact, privacy). Gedeelde bouwstenen (paginakop met golfrand, `Block`, `NextSteps`) in `components/ui.tsx`.
- Statische export (`output: "export"`), zodat de site op GitHub Pages kan. Bouw met `GITHUB_PAGES=true` voor het pad `/zwembad-aarweide`. Links naar bestanden in `public/` lopen via `asset()` uit `components/ui.tsx`, anders missen ze dat pad.
- De site staat nog NIET online. Pages niet aanzetten en niet publiceren zonder akkoord van de eigenaar.

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
1. Tarieven, data en activiteiten staan op seizoen 2026 en moeten voor 2027 worden bijgewerkt. Zie `TODO` hieronder.
2. ~~Inhoud van de oude site overnemen.~~ Gedaan; links naar pdf's en formulieren wijzen nog naar zwembadaarweide.nl.
3. Toegankelijkheid (contrast, toetsenbord, `prefers-reduced-motion`) en snelheid (Lighthouse) controleren. Een Awwwards-niveau uitvoering is het streven.

## Ontwerprichting
- Kleuren: diepblauw `#0b2c47` (inkt), poolblauw `#0f8fd6`, zonnegeel `#ffb81c` (knoppen, accent), lichte achtergrond `#f3fafd`. Donkere weergave is aanwezig. Koraal alleen als zeldzaam accent.
- Lettertypen: Unbounded (koppen), Figtree (tekst).
- Toon: rustig, warm en hoogwaardig. Korte, directe zinnen. Geen stockfoto-gevoel en geen kinderachtige humor.
- Vermijd generieke AI-looks: paarse gradients, alles gecentreerd, dezelfde kaart overal.

## TODO voor de eigenaar
- Prijzen, openingstijden en activiteiten voor 2027 aanleveren.
- Betere foto's aanleveren als de bestaande te klein zijn.
- Betekenis van het sterretje bij "Zondag*" en "Feestdagen*" op de oude openingstijdenpagina bevestigen.
- Bestuursrollen bevestigen: de oude stichtingspagina is onduidelijk over wie voorzitter is (Jan Otto of Anton Captein a.i.).
- Pdf's (privacy, vacatures, sponsorformulier, zwembandjes) aanleveren als ze op de nieuwe site zelf moeten staan.

## Werkafspraken
- Kleine commits met duidelijke Nederlandse of Engelse berichten.
- Draai de dev-server en bekijk de pagina op desktop en mobiel voordat je iets als klaar meldt.
