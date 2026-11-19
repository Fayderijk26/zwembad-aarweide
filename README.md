# Zwembad Aarweide

Nieuwe website voor openluchtzwembad Aarweide in Nieuwveen.

## Wat zit erin
- `index.html`: de site (HTML, CSS en JavaScript, geen build-stap). De hero toont een echte foto met bewegend water (WebGL), een plons bij een klik en een waterlijn die stijgt bij het scrollen.
- `public/images/hero.jpg`: de hero-foto. `hero-water-mask.png` zegt waar het water zit, zodat alleen het water beweegt.
- `public/*.png`: de aangeleverde originelen.

## Lokaal bekijken
Open de map in een terminal en start een lokale server (het water leest de foto via WebGL, dat werkt niet vanaf `file://`):

```bash
python3 -m http.server 8000
```

Ga dan naar http://localhost:8000. Zonder server of zonder WebGL blijft de foto gewoon zichtbaar, zonder bewegend water.

## Andere hero-foto gebruiken
Vervang `hero.jpg` en maak een nieuw watermasker (wit = water, zwart = rest). Pas `ALIGN` bovenin het hero-script aan voor het uitsnijden.

Inhoud en tarieven komen van https://www.zwembadaarweide.nl/ (seizoen 2026) en moeten voor 2027 worden bijgewerkt. Zie `CLAUDE.md`.
