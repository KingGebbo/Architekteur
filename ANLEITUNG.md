# Anleitung — Website online stellen und pflegen

Diese Anleitung ist für Menschen ohne Technik-Hintergrund geschrieben.
Du brauchst nichts zu installieren. Alles läuft im Browser.

---

## Teil 1 — Website mit Vercel online stellen

**Zeitaufwand: etwa 5 Minuten. Kosten: 0 €** (Vercel ist für private Projekte
wie dieses kostenlos.)

### Schritt 1 — Bei Vercel anmelden

1. Gehe auf **https://vercel.com**
2. Klicke oben rechts auf **Sign Up** (oder **Login**, falls du schon ein Konto hast)
3. Wähle **Continue with GitHub**
4. GitHub fragt, ob Vercel auf deine Projekte zugreifen darf → **Authorize**

### Schritt 2 — Projekt hinzufügen

1. Du landest auf dem Vercel-Dashboard. Klicke auf **Add New…** → **Project**
2. In der Liste **Import Git Repository** suchst du **`architekteur`**
3. Klicke daneben auf **Import**

> Falls `architekteur` nicht in der Liste auftaucht:
> Klicke auf **Adjust GitHub App Permissions**, wähle das Repository
> `architekteur` aus und speichere. Danach erscheint es in der Liste.

### Schritt 3 — Einstellungen prüfen

Vercel zeigt dir jetzt einen Bildschirm mit Einstellungen. Du musst **nichts**
ändern — nur eines prüfen:

- **Framework Preset**: sollte auf `Other` stehen. Falls dort etwas anderes
  steht, stelle es auf `Other` um.
- **Build Command**, **Output Directory**, **Install Command**:
  alle leer lassen. Diese Website braucht keinen Build-Vorgang.

### Schritt 4 — Richtigen Branch auswählen ⚠️ WICHTIG

Der Code liegt aktuell auf einem Zweig (englisch: *Branch*) namens:

```
claude/nicolai-schwarz-portfolio-6eyc90
```

Damit Vercel diesen Zweig veröffentlicht, gibt es zwei Wege:

**Weg A — Branch in Vercel auswählen (schnell)**

Direkt im Import-Bildschirm gibt es ganz oben ein Auswahlfeld mit dem
Branch-Namen. Wähle dort `claude/nicolai-schwarz-portfolio-6eyc90` aus.

Falls du das erst nach dem Import merkst:
Vercel → dein Projekt → **Settings** → **Git** → **Production Branch** →
`claude/nicolai-schwarz-portfolio-6eyc90` eintragen → **Save**.
Danach unter **Deployments** einmal **Redeploy** klicken.

**Weg B — Code auf `main` zusammenführen (sauberer auf Dauer)**

Auf GitHub im Repository `architekteur`:
**Pull requests** → **New pull request** → von
`claude/nicolai-schwarz-portfolio-6eyc90` nach `main` → **Create** → **Merge**.
Danach findet Vercel den Code automatisch auf `main`.

### Schritt 5 — Deploy

Klicke auf **Deploy**. Nach etwa 30 Sekunden erscheint eine Erfolgsmeldung
mit einer Adresse wie:

```
https://architekteur.vercel.app
```

Diese Adresse kannst du sofort teilen. **Fertig.**

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

1. Auf GitHub das Repository `architekteur` öffnen
2. Oben den richtigen Branch auswählen (siehe Schritt 4)
3. Die passende Datei anklicken:

   | Was du ändern willst          | Datei                       |
   | ----------------------------- | --------------------------- |
   | Startseite / Profil           | `index.html`                |
   | Projekt 1, Gut Melb           | `projekt-1-gut-melb.html`   |
   | Projekt 2, Kunsthof           | `projekt-2-kunsthof.html`   |
   | Projekt 3 (Platzhalter)       | `projekt-3.html`            |
   | Projekt 4 (Platzhalter)       | `projekt-4.html`            |
   | Kontakt, Impressum            | `kontakt.html`              |
   | Farben, Schrift, Abstände     | `assets/css/style.css`      |

4. Rechts oben auf das **Stift-Symbol** klicken (Bearbeiten)
5. Text ändern. **Wichtig:** nur den Text zwischen den spitzen Klammern
   ändern, die Klammern selbst stehen lassen.

   ```html
   <h3>Kreativ</h3>          ← nur das Wort „Kreativ" ändern
   ```

6. Runterscrollen, auf **Commit changes** klicken → nochmal **Commit changes**
7. Warte 30 Sekunden, lade die Website neu — die Änderung ist da.

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
| Vercel zeigt „404 Not Found"          | Falscher Branch. Siehe Schritt 4.                                                                        |
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
