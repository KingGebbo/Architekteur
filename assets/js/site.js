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

  var overlay, stage, image, closeBtn, lastFocus;
  var scale = 1, minScale = 1, x = 0, y = 0;
  var dragging = false, startX = 0, startY = 0, moved = false;
  var pinchStart = 0, pinchScale = 1;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'viewer';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Zeichnung vergrößert');
    overlay.innerHTML =
      '<div class="viewer__stage"><img alt=""></div>' +
      '<button class="viewer__close" type="button" aria-label="Schließen">Schließen</button>' +
      '<p class="viewer__hint">Ziehen zum Verschieben · Mausrad oder zwei Finger zum Zoomen · Esc schließt</p>';
    document.body.appendChild(overlay);
    stage = overlay.querySelector('.viewer__stage');
    image = overlay.querySelector('img');
    closeBtn = overlay.querySelector('.viewer__close');

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === stage) close();
    });
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
      dragging = true; moved = false;
      startX = e.clientX - x; startY = e.clientY - y;
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      x = e.clientX - startX; y = e.clientY - startY;
      moved = true; apply();
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
    image.style.transform =
      'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
  }

  function zoomAt(cx, cy, factor) {
    var next = Math.min(12, Math.max(minScale, scale * factor));
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

  function open(src, alt) {
    if (!overlay) build();
    image.src = src;
    image.alt = alt || '';
    lastFocus = document.activeElement;
    overlay.classList.add('is-open');
    document.documentElement.classList.add('viewer-open');
    reset();
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    document.documentElement.classList.remove('viewer-open');
    image.src = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  plates.forEach(function (plate) {
    var img = plate.tagName === 'IMG' ? plate : plate.querySelector('img');
    if (!img) return;
    plate.tabIndex = 0;
    plate.setAttribute('role', 'button');
    plate.setAttribute('aria-label', 'Vergrößert ansehen: ' + (img.alt || 'Zeichnung'));
    function launch() {
      open(plate.getAttribute('data-zoom') || img.currentSrc || img.src, img.alt);
    }
    plate.addEventListener('click', launch);
    plate.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); launch(); }
    });
  });
})();
