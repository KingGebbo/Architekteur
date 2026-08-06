# Nicolai Schwarz — Portfolio

Statische Portfolio-Website für **Nicolai Schwarz, B.A. Architektur**.

**Live: https://architekteur.vercel.app**

Kein Build-Schritt, kein Framework, keine externen Abhängigkeiten zur Laufzeit.
Reines HTML, CSS und rund 50 Zeilen JavaScript.

> **Du möchtest die Seite online stellen oder Inhalte ändern?**
> → [`ANLEITUNG.md`](ANLEITUNG.md) — Schritt-für-Schritt und ohne Vorkenntnisse.

---

## Seitenstruktur

| Seite      | Datei                        | Inhalt                          |
| ---------- | ---------------------------- | ------------------------------- |
| Profil     | `index.html`                 | vollständig                     |
| Projekt 01 | `projekt-1-gut-melb.html`    | vollständig                     |
| Projekt 02 | `projekt-2-kunsthof.html`    | vollständig                     |
| Projekt 03 | `projekt-3-knitthotel.html`  | vollständig                     |
| Projekt 04 | `projekt-4.html`             | Platzhalter                     |
| Kunst      | `kunst.html`                 | Gerüst, Werke folgen            |
| Kontakt    | `kontakt.html`               | inkl. Impressum und Datenschutz |
| 404        | `404.html`                   | —                               |

## Ordner

```
assets/
  css/style.css        Gesamtes Layout, Tokens, Komponenten
  js/site.js           Scroll-Reveal, Nav-Position auf Mobil
  fonts/               Archivo als woff2, selbst gehostet
  img/profil/          Porträt und Freihandzeichnungen
  img/gut-melb/        Projekt 01 — Gut Melb
  img/kunsthof/        Projekt 02 — Kunsthof
  img/knitthotel/      Projekt 03 — Knitthotel
  favicon.svg          Signet, Bordeaux mit „N.S.", abgerundet
```

## Corporate Design

Umgesetzt nach dem Style Guide „Nicolai Max Schwarz — Corporate Design, v1.0".

**Logo** — Entwurf A: Wortmarke „N. SCHWARZ", zentriert, Sperrung 0,34 em,
Trennlinie als Achse, darunter „B.A. ARCHITEKTUR" mit 0,42 em.

**Signet** — Entwurf D, angepasst: abgerundetes Quadrat in Bordeaux mit
„N.S." in Weiß. Wird als Browser-Tab-Symbol verwendet (`favicon.svg` sowie
PNG-Fallbacks). Die Buchstaben liegen als Pfade vor, damit das Signet ohne
installierte Schrift überall gleich aussieht.

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

Projekt 02: „Kunsthof — Rudolf-Steiner-Schule Dortmund" von Luis Bongardt,
Sarah Neidhold-Lizarraga und Nicolai Schwarz, Modul BA 3.5.1 — Technischer
Ausbau & energieeffizientes Bauen, HS 2025/26. Betreuung: Prof. Swen Geiss,
M.A. Anna Marschenko.

Projekt 03: „Knitthotel — Bergische Kaserne", Modul BA 3.3.2 Entwurfsatelier III,
HS 2024/25. Betreuung: Prof. Benedikt Stahl, M.A. Avila Dietrich. Team: Deborah
Filipa Moreira Freitas, Luis Bongardt, Maria Nickenig, Martin Behrendt, Nicolai
Schwarz, Sarah Becker.
