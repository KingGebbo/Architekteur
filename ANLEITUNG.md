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
| Projekt 03 | `architekteur.vercel.app/projekt-3`                |
| Projekt 04 | `architekteur.vercel.app/projekt-4`                |
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
   | Projekt 3 (Platzhalter)       | `projekt-3.html`            |
   | Projekt 4 (Platzhalter)       | `projekt-4.html`            |
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

Diese Punkte sind bewusst als Platzhalter angelegt und warten auf deine Inhalte:

### 1. Freihandzeichnungen auf der Startseite

Zwei Platzhalter im Abschnitt „Zeichnen als Denkform":

- `assets/img/profil/zeichnung-01.svg`
- `assets/img/profil/zeichnung-02.svg`

Lade deine Zeichnungen als `zeichnung-01.jpg` und `zeichnung-02.jpg` in den
Ordner `assets/img/profil/` hoch. Danach in `index.html` die beiden Stellen
`zeichnung-01.svg` → `zeichnung-01.jpg` und `zeichnung-02.svg` →
`zeichnung-02.jpg` ändern.

### 2. Bilder für Projekt 2 (Kunsthof)

Zum Kunsthof lag nur der Text vor, keine Pläne oder Fotos. Sechs Platzhalter
warten in `assets/img/kunsthof/`:

| Datei                  | Gedacht für           |
| ---------------------- | --------------------- |
| `hero.svg`             | Leitbild / Titelbild  |
| `platzhalter-01.svg`   | Lageplan              |
| `platzhalter-02.svg`   | Grundriss             |
| `platzhalter-03.svg`   | Schnitt               |
| `platzhalter-04.svg`   | Außenperspektive      |
| `platzhalter-05.svg`   | Innenraum             |
| `platzhalter-06.svg`   | Konstruktionsdetail   |

Vorgehen wie bei den Zeichnungen: Bild hochladen, dann in
`projekt-2-kunsthof.html` die Dateinamen anpassen.

### 3. Projekt 3 und Projekt 4

Beide Seiten stehen als Gerüst bereit (`projekt-3.html`, `projekt-4.html`).
Am einfachsten: den Aufbau von `projekt-2-kunsthof.html` kopieren und die
Texte ersetzen.

### 4. Impressum vervollständigen ⚠️

In `kontakt.html` steht im Abschnitt Impressum noch:

```
[Straße und Hausnummer]
[PLZ und Ort]
```

**Das solltest du vor dem Teilen der Seite ausfüllen.** In Deutschland
verlangt § 5 DDG (früher TMG) bei geschäftsmäßigen Websites — und dazu zählt
ein Portfolio zur Jobsuche in der Regel — eine ladungsfähige Anschrift.

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
