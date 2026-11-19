# Zwembad Aarweide

Nieuwe website voor openluchtzwembad Aarweide in Nieuwveen.

Gebouwd met Next.js (App Router), TypeScript, Tailwind CSS v4 en Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # productiebuild
npm run typecheck
```

## Waar staat wat
- `content/site.ts`: alle teksten, tijden, prijzen en activiteiten. Voor een nieuw seizoen hoeft alleen dit bestand bijgewerkt te worden.
- `lib/opening.ts`: live open/dicht-status in Amsterdamse tijd.
- `lib/diveScene.ts`: de canvas-animatie in de hero (het bommetje).
- `components/`: navigatie, hero, statusbalk en de secties.
- `app/globals.css`: kleurtokens (licht en donker) en Tailwind-thema.
- `index.html`: de eerste, losse versie. Blijft als referentie tot de Next.js-versie live staat.

Inhoud en tarieven komen van https://www.zwembadaarweide.nl/ (seizoen 2026) en moeten voor 2027 worden bijgewerkt.
