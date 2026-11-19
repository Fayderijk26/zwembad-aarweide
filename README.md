# Zwembad Aarweide

Nieuwe website voor openluchtzwembad Aarweide in Nieuwveen.

Gebouwd met Next.js (App Router), TypeScript, Tailwind CSS v4 en Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statische export naar out/
npm run typecheck
```

## Waar staat wat
- `content/site.ts`: teksten, tijden, prijzen, activiteiten, huisregels, stichting. `content/nieuws.ts`: nieuwsberichten. `content/sponsoren.ts`: sponsoren. Voor een nieuw seizoen hoeven vooral deze bestanden bijgewerkt te worden.
- `app/`: één map per pagina; `app/nieuws/[slug]` maakt een pagina per bericht.
- `components/`: menu, hero, footer en gedeelde bouwstenen (`ui.tsx`).
- `lib/opening.ts`: live open/dicht-status in Amsterdamse tijd.
- `app/globals.css`: kleurtokens (licht en donker), Tailwind-thema, hero en golfranden.
- `index.html`: de eerste, losse versie. Blijft als referentie.

## GitHub Pages (nog niet aan)
De site bouwt als statische export. Voor GitHub Pages: `GITHUB_PAGES=true npm run build` en publiceer de map `out/`.

Inhoud en tarieven komen van https://www.zwembadaarweide.nl/ (seizoen 2026) en moeten voor 2027 worden bijgewerkt. Zie `CLAUDE.md`.
