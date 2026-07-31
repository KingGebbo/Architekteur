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
