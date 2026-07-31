# Nicolai Max Schwarz — Portfolio

Statische Portfolio-Website für **Nicolai Max Schwarz, B.A. Architektur**.

**Live: https://architekteur.vercel.app**

Kein Build-Schritt, kein Framework, keine externen Abhängigkeiten zur Laufzeit.
Reines HTML, CSS und rund 50 Zeilen JavaScript.

> **Du möchtest die Seite online stellen oder Inhalte ändern?**
> → [`ANLEITUNG.md`](ANLEITUNG.md) — Schritt-für-Schritt und ohne Vorkenntnisse.

---

## Seitenstruktur

| Seite      | Datei                     |
| ---------- | ------------------------- |
| Profil     | `index.html`              |
| Projekt 01 | `projekt-1-gut-melb.html` |
| Projekt 02 | `projekt-2-kunsthof.html` |
| Projekt 03 | `projekt-3.html`          |
| Projekt 04 | `projekt-4.html`          |
| Kontakt    | `kontakt.html`            |
| 404        | `404.html`                |

## Ordner

```
assets/
  css/style.css        Gesamtes Layout, Tokens, Komponenten
  js/site.js           Scroll-Reveal, Nav-Position auf Mobil
  fonts/               Archivo als woff2, selbst gehostet
  img/profil/          Porträt und Freihandzeichnungen
  img/gut-melb/        Projekt 01
  img/kunsthof/        Projekt 02 (Platzhalter)
  favicon.svg          Signet, Bordeaux mit „NS"
```

## Corporate Design

Umgesetzt nach dem Style Guide „Nicolai Max Schwarz — Corporate Design, v1.0".

**Logo** — Entwurf A: Wortmarke „N. SCHWARZ", zentriert, Sperrung 0,34 em,
Trennlinie als Achse, darunter „B.A. ARCHITEKTUR" mit 0,42 em.

**Signet** — Entwurf D: Quadrat in Bordeaux mit „NS" in Weiß. Wird als
Browser-Tab-Symbol verwendet (`favicon.svg` sowie PNG-Fallbacks).

**Farben**

| Rolle          | Hex       | Verwendung                            |
| -------------- | --------- | ------------------------------------- |
| Tiefschwarz    | `#0A0A0A` | Typografie, Linien, Flächen           |
| Papier         | `#F4F3F1` | Grundfläche                           |
| Bordeaux       | `#6A1A2B` | Akzent: Links, Marker, aktive Zustände |
| Bordeaux Hell  | `#8A2438` | Hover                                 |
| Bordeaux Tief  | `#45111C` | Aktiv                                 |
| Grau 700       | `#56534F` | Fließtext                             |
| Grau 400       | `#8A8681` | Sekundär                              |
| Linie          | `#DCD9D5` | 1 px Trennlinien                      |

Bordeaux bleibt laut Style Guide unter 5 % der Fläche.

**Typografie** — Archivo, Gewichte 400 / 500 / 600. Selbst gehostet aus dem
Style-Guide-Bundle; keine Verbindung zu Google Fonts.

**Raster** — 12 Spalten, Rinne 24 px, Außenrand 64 px (mobil 20 px),
Sektionsabstand 88 px, Trennlinien 1 px.

**Textmarkierung** — Auf ausdrücklichen Wunsch weicht die Seite hier vom Style
Guide ab: Markierter Text wird in Bordeaux gefärbt statt weiß auf Bordeaux.

```css
::selection { background: rgba(106,26,43,.14); color: #6A1A2B; }
```

## Technisches

- **Barrierefreiheit** — Skip-Link, `aria-current` in der Navigation,
  sichtbarer Fokusrahmen, Alt-Texte, `prefers-reduced-motion` wird respektiert.
- **Responsiv** — Ein Breakpoint-Set (900 / 760 / 560 px). Breite Pläne
  scrollen in eigenen Containern (`.scroll-x`), die Seite selbst nie horizontal.
- **Datenschutz** — Keine Cookies, kein Tracking, keine externen Ressourcen,
  kein Formular. Die Seite lädt ausschließlich eigene Dateien.
- **Performance** — Alle Bilder unter 500 KB, `loading="lazy"` unterhalb des
  ersten Bildschirms, Schriften mit `font-display: swap` und Preload.

## Lokal ansehen

```bash
python3 -m http.server 8000
# danach im Browser: http://localhost:8000
```

## Hosting

Vercel, konfiguriert über `vercel.json`:

- `cleanUrls: true` — `/kontakt` statt `/kontakt.html`
- Lange Cache-Zeiten für Schriften und Bilder

## Bildnachweise

Alle Abbildungen zu Projekt 01 stammen aus der Bachelorarbeit „Gut Melb —
Entwicklung eines gemeinwohlorientierten Zentrums" von Nicolai Max Schwarz,
Lena Teresa Stadtfeld und Luis Valentin Bongardt, Alanus Hochschule für Kunst
und Gesellschaft, 2026.

Projekt 02 basiert auf der Projektbeschreibung „Kunsthof — Rudolf-Steiner-Schule
Dortmund" von Luis Bongardt, Sarah Neidhold-Lizarraga und Nicolai Schwarz,
Modul BA 3.5.1, HS 2025/26. Bildmaterial folgt.
