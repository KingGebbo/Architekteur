/* Nicolai Max Schwarz — Portfolio
   Zurückhaltende Bewegung: einmaliges Einblenden beim Scrollen.
   Keine Abhängigkeiten. */
(function () {
  'use strict';

  var reduce =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Auf schmalen Bildschirmen den aktiven Navigationspunkt sichtbar machen. */
  var current = document.querySelector('.nav a[aria-current="page"]');
  var nav = document.querySelector('.nav');
  if (current && nav && nav.scrollWidth > nav.clientWidth) {
    nav.scrollLeft = Math.max(
      0,
      current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2
    );
  }

  var nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.add('is-in');
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  );

  nodes.forEach(function (node) {
    io.observe(node);
  });
})();

/* Planbetrachter — grosse Zeichnungen per Klick im Vollbild oeffnen,
   dort zoomen und verschieben. Keine Abhaengigkeiten. */
(function () {
  'use strict';

  var plates = document.querySelectorAll('[data-zoom]');
  if (!plates.length) return;

  var overlay, stage, blatt, image, kachelfeld, closeBtn, lastFocus;
  var scale = 1, minScale = 1, maxScale = 12, x = 0, y = 0;
  var dragging = false, startX = 0, startY = 0;
  var pinchStart = 0, pinchScale = 1;

  /* Ein Kachelsatz ist ein Plan, der in viele kleine Bilder zerlegt wurde —
     in mehreren Stufen, von grob bis sehr fein. Der Betrachter laedt immer
     nur die Kacheln, die gerade zu sehen sind, und zwar in der Feinheit, die
     die aktuelle Vergroesserung braucht. So bleibt die Zeichnung bis zur
     tiefsten Stufe scharf, ohne dass je ein riesiges Bild geladen wird. */
  var satz = null;            // {ordner, breite, hoehe, kachel, stufen}
  var blattW = 0, blattH = 0;
  var kacheln = {};           // Schluessel -> img
  var ausstehend = 0;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'viewer';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Zeichnung vergrößert');
    overlay.innerHTML =
      '<div class="viewer__stage"><div class="viewer__blatt">' +
      '<img alt=""><div class="viewer__kacheln"></div>' +
      '</div></div>' +
      '<button class="viewer__close" type="button" aria-label="Schließen">Schließen</button>' +
      '<p class="viewer__hint">Ziehen zum Verschieben · Mausrad oder zwei Finger zum Zoomen · Esc schließt</p>';
    document.body.appendChild(overlay);
    stage = overlay.querySelector('.viewer__stage');
    blatt = overlay.querySelector('.viewer__blatt');
    image = overlay.querySelector('img');
    kachelfeld = overlay.querySelector('.viewer__kacheln');
    closeBtn = overlay.querySelector('.viewer__close');

    /* Nur der Schliessen-Knopf und Esc schliessen. Ein Klick auf den
       Hintergrund darf es nicht: Nach dem Ziehen loest das Loslassen der
       Maustaste ein Klick-Ereignis aus und der Betrachter fiele sofort zu. */
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
    });

    /* Der Zoomschritt richtet sich nach der Staerke der Geste. Trackpads
       feuern viele kleine Ereignisse, ein Mausrad wenige grosse — ohne diese
       Umrechnung springt das Bild auf dem Trackpad sofort auf Maximum. */
    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      var d = e.deltaY;
      if (e.deltaMode === 1) d *= 16;            // Zeilen statt Pixel
      else if (e.deltaMode === 2) d *= 400;      // Seiten statt Pixel
      var factor = Math.exp(-d * 0.0016);
      factor = Math.min(1.14, Math.max(1 / 1.14, factor));
      zoomAt(e.clientX, e.clientY, factor);
    }, { passive: false });

    stage.addEventListener('dblclick', function (e) {
      if (scale > minScale * 1.05) reset();
      else zoomAt(e.clientX, e.clientY, 2.5 / scale);
    });

    stage.addEventListener('pointerdown', function (e) {
      dragging = true;
      startX = e.clientX - x; startY = e.clientY - y;
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      x = e.clientX - startX; y = e.clientY - startY;
      apply();
    });
    ['pointerup', 'pointercancel'].forEach(function (t) {
      stage.addEventListener(t, function () { dragging = false; });
    });

    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 2) return;
      pinchStart = dist(e.touches); pinchScale = scale;
    }, { passive: true });
    stage.addEventListener('touchmove', function (e) {
      if (e.touches.length !== 2 || !pinchStart) return;
      e.preventDefault();
      var f = Math.pow(dist(e.touches) / pinchStart, 0.85);
      var mid = {
        clientX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        clientY: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
      zoomAt(mid.clientX, mid.clientY, (pinchScale * f) / scale);
    }, { passive: false });
    stage.addEventListener('touchend', function () { pinchStart = 0; });
  }

  function dist(t) {
    return Math.hypot(
      t[0].clientX - t[1].clientX,
      t[0].clientY - t[1].clientY
    );
  }

  function apply() {
    blatt.style.transform =
      'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
    if (satz) kachelnZeichnen();
  }

  function zoomAt(cx, cy, factor) {
    var next = Math.min(maxScale, Math.max(minScale, scale * factor));
    if (next === scale) return;
    var r = stage.getBoundingClientRect();
    var ox = cx - r.left - r.width / 2 - x;
    var oy = cy - r.top - r.height / 2 - y;
    x -= ox * (next / scale - 1);
    y -= oy * (next / scale - 1);
    scale = next;
    apply();
  }

  function reset() {
    scale = minScale; x = 0; y = 0; apply();
  }

  /* --- Kachelsatz ---------------------------------------------------- */

  function stufenBreite(stufe) {
    return satz.breite / Math.pow(2, satz.stufen - 1 - stufe);
  }

  function blattEinpassen() {
    var r = stage.getBoundingClientRect();
    var platzB = r.width * 0.96, platzH = r.height * 0.88;
    var verhaeltnis = satz.breite / satz.hoehe;
    blattW = platzB;
    blattH = blattW / verhaeltnis;
    if (blattH > platzH) { blattH = platzH; blattW = blattH * verhaeltnis; }
    blatt.style.width = blattW + 'px';
    blatt.style.height = blattH + 'px';
    /* Weiter als bis zur tiefsten Stufe darf nicht gezoomt werden — ab dort
       wuerden nur noch Pixel vergroessert und die Zeichnung wuerde unscharf. */
    var dpr = window.devicePixelRatio || 1;
    maxScale = Math.max(2, satz.breite / (blattW * dpr));
  }

  /* Die Kachelgrenzen muessen auf ganze Bildschirmpunkte fallen. Sonst
     rundet der Browser jede Kachel fuer sich und zwischen zwei Nachbarn
     bleibt ein haarfeiner heller Spalt stehen. Beide Nachbarn runden
     denselben Grenzwert, deshalb passen sie danach exakt aneinander. */
  function setzeKachel(el, stufe, spalte, zeile) {
    var k = satz.kachel;
    var breite = stufenBreite(stufe), hoehe = breite / (satz.breite / satz.hoehe);
    var faktor = blattW / breite;
    var g = scale * (window.devicePixelRatio || 1);
    var links = Math.round(spalte * k * faktor * g) / g;
    var rechts = Math.round(Math.min((spalte + 1) * k, breite) * faktor * g) / g;
    var oben = Math.round(zeile * k * faktor * g) / g;
    var unten = Math.round(Math.min((zeile + 1) * k, hoehe) * faktor * g) / g;
    el.style.left = links + 'px';
    el.style.top = oben + 'px';
    el.style.width = (rechts - links) + 'px';
    el.style.height = (unten - oben) + 'px';
  }

  function kachelAnlegen(stufe, spalte, zeile) {
    var el = document.createElement('img');
    el.className = 'viewer__kachel';
    el.alt = '';
    el.decoding = 'async';
    el.style.zIndex = stufe;
    setzeKachel(el, stufe, spalte, zeile);
    ausstehend++;
    el.onload = el.onerror = function () { ausstehend--; };
    el.src = satz.ordner + '/' + stufe + '/' + spalte + '-' + zeile + '.webp';
    kachelfeld.appendChild(el);
    return el;
  }

  function sammeln(stufe, ziel, ganz) {
    var k = satz.kachel;
    var breite = stufenBreite(stufe), hoehe = breite / (satz.breite / satz.hoehe);
    var spalten = Math.ceil(breite / k), zeilen = Math.ceil(hoehe / k);
    var vonS = 0, bisS = spalten - 1, vonZ = 0, bisZ = zeilen - 1;
    if (!ganz) {
      /* Sichtbarer Ausschnitt, umgerechnet in Kachelnummern dieser Stufe. */
      var r = blatt.getBoundingClientRect();
      var s = stage.getBoundingClientRect();
      var proKachel = (k * blattW / breite) * scale;   // Kachelbreite am Schirm
      vonS = Math.max(0, Math.floor((s.left - r.left) / proKachel) - 1);
      bisS = Math.min(spalten - 1, Math.ceil((s.right - r.left) / proKachel));
      vonZ = Math.max(0, Math.floor((s.top - r.top) / proKachel) - 1);
      bisZ = Math.min(zeilen - 1, Math.ceil((s.bottom - r.top) / proKachel));
    }
    for (var z = vonZ; z <= bisZ; z++) {
      for (var sp = vonS; sp <= bisS; sp++) ziel[stufe + ':' + sp + '-' + z] = [stufe, sp, z];
    }
  }

  function kachelnZeichnen() {
    var dpr = window.devicePixelRatio || 1;
    var noetig = blattW * scale * dpr;
    var stufe = 0;
    while (stufe < satz.stufen - 1 && stufenBreite(stufe) < noetig) stufe++;

    var gebraucht = {};
    sammeln(0, gebraucht, true);                 // grobe Stufe bleibt als Grund
    if (stufe !== 0) sammeln(stufe, gebraucht, false);

    Object.keys(gebraucht).forEach(function (schluessel) {
      var t = gebraucht[schluessel];
      if (!kacheln[schluessel]) kacheln[schluessel] = kachelAnlegen(t[0], t[1], t[2]);
      else setzeKachel(kacheln[schluessel], t[0], t[1], t[2]);
    });

    /* Kacheln anderer Stufen erst wegnehmen, wenn die neuen geladen sind —
       sonst blitzt beim Zoomen kurz die leere Flaeche durch. */
    Object.keys(kacheln).forEach(function (schluessel) {
      if (gebraucht[schluessel]) return;
      var eigene = Number(schluessel.split(':')[0]);
      if (eigene === stufe || eigene === 0 || ausstehend === 0) {
        kacheln[schluessel].remove();
        delete kacheln[schluessel];
      }
    });
  }

  function kachelnLeeren() {
    Object.keys(kacheln).forEach(function (s) { kacheln[s].remove(); });
    kacheln = {};
    ausstehend = 0;
  }

  /* Die grosse Fassung braucht einen Moment. Darum erscheint zuerst das
     bereits geladene Bild aus der Bildstrecke und wird ausgetauscht, sobald
     die scharfe Fassung im Zwischenspeicher liegt — so bleibt der Betrachter
     nie leer und das Austauschen ist nicht zu sehen. */
  var laufendeNummer = 0;

  function open(kleinerSrc, grosserSrc, alt, kachelsatz) {
    if (!overlay) build();
    var nummer = ++laufendeNummer;
    kachelnLeeren();
    satz = kachelsatz || null;
    lastFocus = document.activeElement;
    overlay.classList.add('is-open');
    document.documentElement.classList.add('viewer-open');

    if (satz) {
      /* Kachelsatz: kein einzelnes Bild, der Plan wird aus Kacheln gebaut. */
      image.style.display = 'none';
      blatt.setAttribute('aria-label', alt || '');
      maxScale = 12;
      blattEinpassen();
      overlay.classList.remove('is-loading');
      reset();
      closeBtn.focus();
      return;
    }

    image.style.display = '';
    blatt.style.width = blatt.style.height = '';
    maxScale = 12;
    image.alt = alt || '';
    image.src = kleinerSrc || grosserSrc;
    overlay.classList.toggle('is-loading', !!kleinerSrc && grosserSrc !== kleinerSrc);
    reset();
    closeBtn.focus();

    if (!grosserSrc || grosserSrc === kleinerSrc) {
      overlay.classList.remove('is-loading');
      return;
    }
    var vorlader = new Image();
    vorlader.onload = function () {
      if (nummer !== laufendeNummer) return;   // inzwischen anderes Bild geoeffnet
      image.src = grosserSrc;
      overlay.classList.remove('is-loading');
    };
    vorlader.onerror = function () {
      if (nummer !== laufendeNummer) return;
      overlay.classList.remove('is-loading');
    };
    vorlader.src = grosserSrc;
  }

  function close() {
    laufendeNummer++;
    overlay.classList.remove('is-open');
    overlay.classList.remove('is-loading');
    document.documentElement.classList.remove('viewer-open');
    image.src = '';
    kachelnLeeren();
    satz = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  window.addEventListener('resize', function () {
    if (!overlay || !overlay.classList.contains('is-open') || !satz) return;
    kachelnLeeren();
    blattEinpassen();
    reset();
  });

  plates.forEach(function (plate) {
    var img = plate.tagName === 'IMG' ? plate : plate.querySelector('img');
    if (!img) return;
    plate.tabIndex = 0;
    plate.setAttribute('role', 'button');
    plate.setAttribute('aria-label', 'Vergrößert ansehen: ' + (img.alt || 'Zeichnung'));
    function launch() {
      var klein = img.currentSrc || img.src;
      var gross = plate.getAttribute('data-zoom') || klein;
      /* Ein Kachelsatz hat Vorrang: Er bleibt bis zur tiefsten Stufe scharf.
         Auf Handys und Tablets bleibt es beim einzelnen Bild — dort lohnt
         der Aufwand nicht und die Datenmenge waere unnoetig. */
      var ordner = plate.getAttribute('data-kacheln');
      var grossGeraet = window.matchMedia('(min-width: 900px) and (pointer: fine)').matches;
      if (ordner && grossGeraet) {
        var masse = (plate.getAttribute('data-kacheln-masse') || '').split('x');
        open(null, null, img.alt, {
          ordner: ordner,
          breite: Number(masse[0]),
          hoehe: Number(masse[1]),
          kachel: Number(plate.getAttribute('data-kacheln-groesse')) || 1024,
          stufen: Number(plate.getAttribute('data-kacheln-stufen')) || 5
        });
        return;
      }
      /* Die sehr grosse Fassung (9600 px) kommt nur auf Zeigergeraeten mit
         breitem Fenster zum Einsatz. Handys und Tablets koennen ein Bild
         dieser Groesse nicht mehr entschluesseln und zeigen dann nichts an —
         auf ihrem kleinen Schirm bringt sie ohnehin keinen Gewinn. */
      var hd = plate.getAttribute('data-zoom-hd');
      if (hd && grossGeraet) gross = hd;
      open(klein, gross, img.alt);
    }
    plate.addEventListener('click', launch);
    plate.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); launch(); }
    });
  });
})();

/* Bildstrecke — ziehen mit der Maus, Pfeile am Rand, Punkte als Fortschritt.
   Auf Touch uebernimmt das native Wischen, dort greift nichts davon ein. */
(function () {
  'use strict';

  var sliders = document.querySelectorAll('[data-slider]');
  if (!sliders.length) return;

  var reduce =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sliders.forEach(function (slider) {
    var track = slider.querySelector('.slider__track');
    var slides = slider.querySelectorAll('.slider__slide');
    if (!track || slides.length < 2) return;

    var prev = slider.querySelector('.slider__nav--prev');
    var next = slider.querySelector('.slider__nav--next');
    var caption = slider.querySelector('.slider__caption');
    var dotBox = slider.querySelector('.slider__dots');
    var viewport = slider.querySelector('.slider__viewport');
    var dots = [];
    var index = 0;

    /* Duerfen die Seiten einer Strecke ihr eigenes Format behalten, folgt
       die Hoehe des Felds der gerade sichtbaren Folie. So wird keine Seite
       angeschnitten und keine steht in einem zu grossen Rahmen. */
    var freieHoehe = slider.classList.contains('slider--frei');

    function hoeheAnpassen() {
      if (!freieHoehe || !viewport) return;
      var h = slides[index].offsetHeight;
      if (h) viewport.style.height = h + 'px';
    }

    if (freieHoehe) {
      window.addEventListener('resize', hoeheAnpassen);
    }

    if (dotBox) {
      slides.forEach(function (slide, i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'slider__dot';
        d.setAttribute('aria-label', 'Bild ' + (i + 1) + ' von ' + slides.length);
        d.addEventListener('click', function () { go(i); });
        dotBox.appendChild(d);
        dots.push(d);
      });
    }

    /* Im Kreis: vom ersten Bild nach links kommt das letzte, vom letzten
       nach rechts wieder das erste. Beim Umschlag wird gesprungen statt
       gescrollt — sonst rauscht die ganze Strecke durchs Bild. */
    function go(i, snap) {
      var wrap = i < 0 || i > slides.length - 1;
      if (i < 0) i = slides.length - 1;
      else if (i > slides.length - 1) i = 0;
      track.scrollTo({
        left: slides[i].offsetLeft - track.offsetLeft,
        behavior: reduce || wrap || snap ? 'auto' : 'smooth'
      });
    }

    function nearest() {
      var mid = track.scrollLeft + track.clientWidth / 2;
      var best = 0, bestDist = Infinity;
      slides.forEach(function (s, i) {
        var c = s.offsetLeft - track.offsetLeft + s.offsetWidth / 2;
        var d = Math.abs(c - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    function sync() {
      var i = nearest();
      if (i === index && caption && caption.textContent) return;
      index = i;
      if (caption) {
        caption.textContent = slides[i].getAttribute('data-caption') || '';
        /* Zeichnungen lassen sich vergroessern — das steht dann dabei */
        if (slides[i].querySelector('[data-zoom]')) {
          var hinweis = document.createElement('span');
          hinweis.className = 'plate__hint';
          hinweis.textContent = 'Zum Vergrößern klicken';
          caption.appendChild(hinweis);
        }
      }
      dots.forEach(function (d, j) {
        d.classList.toggle('is-active', j === i);
        d.setAttribute('aria-current', j === i ? 'true' : 'false');
      });
      hoeheAnpassen();
    }

    var ticking = false;
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; sync(); });
    });

    if (prev) prev.addEventListener('click', function () { go(index - 1); });
    if (next) next.addEventListener('click', function () { go(index + 1); });

    /* Ziehen mit gedrueckter Maustaste. Waehrend des Ziehens wird das
       Einrasten abgeschaltet, sonst kaempft es gegen die Bewegung.
       Der Zeiger wird erst eingefangen, wenn wirklich gezogen wird — sonst
       landet ein einfacher Klick auf dem Rahmen statt auf dem Bild und die
       Zeichnung liesse sich nicht mehr vergroessern. */
    var dragging = false, gefangen = false, zeiger = null;
    var startX = 0, startScroll = 0, moved = 0;

    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true; gefangen = false; moved = 0; zeiger = e.pointerId;
      startX = e.clientX;
      startScroll = track.scrollLeft;
    });
    track.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > moved) moved = Math.abs(dx);
      if (!gefangen) {
        if (moved <= 4) return;
        gefangen = true;
        track.classList.add('is-dragging');
        try { track.setPointerCapture(zeiger); } catch (fehler) {}
      }
      track.scrollLeft = startScroll - dx;
    });
    ['pointerup', 'pointercancel'].forEach(function (type) {
      track.addEventListener(type, function () {
        if (!dragging) return;
        dragging = false;
        if (gefangen) {
          try { track.releasePointerCapture(zeiger); } catch (fehler) {}
          track.classList.remove('is-dragging');
          go(nearest());
        }
        gefangen = false;
      });
    });
    /* Nach dem Ziehen keinen Klick auslösen */
    track.addEventListener('click', function (e) {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; }
    }, true);
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });

    track.tabIndex = 0;
    track.setAttribute('role', 'group');
    track.setAttribute('aria-label', 'Bildstrecke, ' + slides.length + ' Bilder');
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    });

    sync();
  });
})();
