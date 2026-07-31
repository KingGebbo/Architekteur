# Anleitung — Website online stellen und pflegen

Diese Anleitung ist für Menschen ohne Technik-Hintergrund geschrieben.
Du brauchst nichts zu installieren. Alles läuft im Browser.

---

## Teil 1 — Die Website ist bereits online ✅

**Hier musst du nichts mehr tun.** Dein GitHub-Konto war schon mit Vercel
verbunden. In dem Moment, in dem der Code hochgeladen wurde, hat Vercel die
Seite automatisch veröffentlicht.

**Deine Adresse:**

```
https://architekteur.vercel.app
```

Die kannst du sofort teilen — sie funktioniert auf Handy, Tablet und Rechner
und hat ein gültiges HTTPS-Zertifikat (das Schloss-Symbol im Browser).

### Geprüft und in Ordnung

| Seite      | Adresse                                            |
| ---------- | -------------------------------------------------- |
| Profil     | `architekteur.vercel.app`                          |
| Projekt 01 | `architekteur.vercel.app/projekt-1-gut-melb`       |
| Projekt 02 | `architekteur.vercel.app/projekt-2-kunsthof`       |
| Projekt 03 | `architekteur.vercel.app/projekt-3-knitthotel`     |
| Projekt 04 | `architekteur.vercel.app/projekt-4`                |
| Projekt 05 | `architekteur.vercel.app/projekt-5`                |
| Kontakt    | `architekteur.vercel.app/kontakt`                  |

### Wo finde ich das Ganze bei Vercel?

1. Gehe auf **https://vercel.com** und melde dich mit **GitHub** an
2. Im Dashboard siehst du das Projekt **architekteur**
3. Ein Klick darauf zeigt dir alle bisherigen Veröffentlichungen
   (Reiter **Deployments**)

Falls du dort einmal nachsehen musst, wie das Projekt eingestellt ist —
so sollte es aussehen:

- **Framework Preset**: `Other`
- **Build Command**, **Output Directory**, **Install Command**: leer
- **Production Branch**: `claude/nicolai-schwarz-portfolio-6eyc90`

> **Zum Hintergrund:** Der Code liegt auf einem Zweig (englisch: *Branch*)
> namens `claude/nicolai-schwarz-portfolio-6eyc90`. Weil das gleichzeitig der
> Hauptzweig des Repositorys ist, veröffentlicht Vercel ihn automatisch.
> Du kannst den Zweig später umbenennen (GitHub → **Settings** → **Branches**),
> musst aber nicht. Es funktioniert so, wie es ist.

---

## Teil 2 — Eigene Domain verbinden (optional)

Wenn die Seite später unter einer eigenen Adresse laufen soll, zum Beispiel
`nicolaimaxschwarz.de`:

1. Domain bei einem Anbieter kaufen (z. B. Namecheap, INWX, Strato, IONOS).
   Kosten: meist 10–20 € pro Jahr.
2. In Vercel: dein Projekt → **Settings** → **Domains** → Domain eintragen →
   **Add**
3. Vercel zeigt dir zwei bis drei Zeilen an (sogenannte DNS-Einträge).
   Diese trägst du beim Domain-Anbieter im Bereich „DNS" ein.
4. Nach ein paar Minuten bis wenigen Stunden ist die Domain aktiv.
   Das HTTPS-Zertifikat (das Schloss-Symbol im Browser) richtet Vercel
   automatisch ein.

---

## Teil 3 — Inhalte ändern

**Der wichtigste Satz dieser Anleitung:**
Sobald du auf GitHub etwas änderst und speicherst, baut Vercel die Website
innerhalb von etwa 30 Sekunden neu. Du musst nichts weiter tun.

### Text ändern

1. Auf GitHub das Repository `architekteur` öffnen:
   https://github.com/KingGebbo/Architekteur
2. Die passende Datei anklicken:

   | Was du ändern willst          | Datei                       |
   | ----------------------------- | --------------------------- |
   | Startseite / Profil           | `index.html`                |
   | Projekt 1, Gut Melb           | `projekt-1-gut-melb.html`   |
   | Projekt 2, Kunsthof           | `projekt-2-kunsthof.html`   |
   | Projekt 3, Knitthotel         | `projekt-3-knitthotel.html` |
   | Projekt 4 (Platzhalter)       | `projekt-4.html`            |
   | Projekt 5 (Platzhalter)       | `projekt-5.html`            |
   | Kontakt, Impressum            | `kontakt.html`              |
   | Farben, Schrift, Abstände     | `assets/css/style.css`      |

3. Rechts oben auf das **Stift-Symbol** klicken (Bearbeiten)
4. Text ändern. **Wichtig:** nur den Text zwischen den spitzen Klammern
   ändern, die Klammern selbst stehen lassen.

   ```html
   <h3>Kreativ</h3>          ← nur das Wort „Kreativ" ändern
   ```

5. Runterscrollen, auf **Commit changes** klicken → nochmal **Commit changes**
6. Warte 30 Sekunden, lade die Website neu — die Änderung ist da.

### Bild austauschen

Alle Bilder liegen im Ordner `assets/img/`. Ein Bild ersetzt du so:

1. Auf GitHub in den passenden Ordner gehen, z. B. `assets/img/profil/`
2. **Add file** → **Upload files**
3. Dein neues Bild hochladen. **Wichtig:** Es muss **exakt genauso heißen**
   wie das alte, dann wird es automatisch überall ersetzt.
4. **Commit changes**

**Faustregeln für Bilder:**
- Format: `.jpg` für Fotos, `.png` für Grafiken mit klaren Kanten
- Breite: 1200–2000 Pixel reicht völlig
- Dateigröße: möglichst unter 500 KB pro Bild, sonst lädt die Seite langsam
  (verkleinern z. B. auf https://squoosh.app)

---

## Teil 4 — Was noch zu tun ist

### 1. Freihandzeichnungen hochladen ⚠️

Die beiden Zeichnungen sind bisher nur als Chat-Vorschau angekommen, nicht als
Datei. Auf der Startseite stehen deshalb noch zwei graue Platzhalter.

So tauschst du sie aus:

1. Auf GitHub in den Ordner `assets/img/profil/` gehen
2. **Add file** → **Upload files**
3. Die Zeichnungen hochladen, benannt als:
   - `zeichnung-01.jpg` — die Tuschezeichnung „Never Stop Exploring“
   - `zeichnung-02.jpg` — die Pagode am Wasser
4. **Commit changes**
5. Danach in `index.html` an zwei Stellen die Endung ändern:
   `zeichnung-01.svg` → `zeichnung-01.jpg` und
   `zeichnung-02.svg` → `zeichnung-02.jpg`

Die Bildunterschriften sind bereits passend hinterlegt. Tipp: die Zeichnungen
vor dem Hochladen gerade beschneiden — also nur das Blatt, ohne Tisch, Stift
und Radiergummi drumherum.

### 2. Projekt 4 und Projekt 5

Beide Seiten stehen als Gerüst bereit (`projekt-4.html`, `projekt-5.html`).
Am einfachsten: den Aufbau von `projekt-3-knitthotel.html` kopieren und die
Texte ersetzen.

### 3. Modulnummer beim Knitthotel prüfen

In der Dokumentation stehen zwei verschiedene Angaben: die zweite Seite nennt
„BA 3.4.2 Entwurfsatelier IV, 4. Semester“, das Impressum auf der letzten Seite
„BA 3.3.2 Entwurfsatelier III, HS 2024/2025, 3. Semester“. Auf der Website steht
die Angabe aus dem Impressum, weil sie zur Aufgabenstellung im Dokument passt.
Falls das doch anders war: in `projekt-3-knitthotel.html` an zwei Stellen
korrigieren (Faktenblatt oben und Nachweise unten).

---

## Kleine Fehlerkunde

| Problem                              | Ursache und Lösung                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Änderung ist nicht sichtbar           | 1 Minute warten. Dann Browser hart neu laden: `Strg`+`F5` (Windows) bzw. `Cmd`+`Shift`+`R` (Mac).        |
| Ein Bild wird nicht angezeigt         | Dateiname stimmt nicht exakt. Groß-/Kleinschreibung zählt: `Bild.JPG` ist nicht `bild.jpg`.               |
| Seite sieht „kaputt" aus              | Beim Bearbeiten wurde vermutlich eine spitze Klammer gelöscht. Auf GitHub unter **History** die letzte Änderung rückgängig machen. |

---

## Was hier eigentlich gebaut wurde

Eine reine HTML-Website. Kein WordPress, keine Datenbank, kein Baukasten.

Das hat drei Vorteile: Sie lädt sehr schnell, sie kostet nichts im Betrieb,
und sie funktioniert auch in zehn Jahren noch, ohne dass irgendetwas
aktualisiert werden muss.

Details zur technischen Struktur stehen in `README.md`.
