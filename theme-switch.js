/* Copyright (c) 2026 Quello. All rights reserved. */
/* Quello — one shared, smooth light/dark switch for every page.
   Why it was janky: on a theme change ~40 rules transitioned colours at once, the endless background animations kept
   running, and the circle reveal had to snapshot a page with a heavy fixed gradient. This helper
     1) freezes transitions + endless animations for the moment of the switch,
     2) runs the circle reveal (View Transitions) only where it is supported and motion is allowed,
     3) otherwise flips the theme instantly (no half-transitioned colours).
   Usage:  QThemeSwitch.set('light', buttonElement, afterReveal) */
(function () {
  'use strict';
  var root = document.documentElement;
  var st = document.createElement('style');
  st.textContent =
    'html.theme-switching *,html.theme-switching *::before,html.theme-switching *::after{transition:none!important;animation-play-state:paused!important}' +
    '::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}' +
    '::view-transition-group(root){animation-duration:0s}';
  (document.head || root).appendChild(st);

  var reduce = false;
  try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var lite = false;
  try { lite = matchMedia('(max-width:700px), (pointer:coarse)').matches; } catch (e) {}
  var busy = false;

  function save(theme) { try { localStorage.setItem('quello-theme', theme); } catch (e) {} }

  function set(theme, origin, after) {
    if (root.dataset.theme === theme) { if (after) after(); return; }
    var apply = function () { root.dataset.theme = theme; save(theme); };
    var done = function () { root.classList.remove('theme-switching'); busy = false; };

    // Instant path: no View Transitions, reduced motion, no origin, or a switch already running.
    if (!document.startViewTransition || reduce || lite || !origin || busy) {
      root.classList.add('theme-switching');
      apply();
      requestAnimationFrame(function () { requestAnimationFrame(done); });
      if (after) after();
      return;
    }

    busy = true;
    root.classList.add('theme-switching');
    var r = origin.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var vt;
    try { vt = document.startViewTransition(apply); } catch (e) { apply(); done(); if (after) after(); return; }
    vt.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 480, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
      if (after) after();          // emoji burst starts with the reveal, so it is never frozen inside a snapshot
    }, function () { apply(); if (after) after(); });
    vt.finished.then(done, done);
  }

  window.QThemeSwitch = { set: set };
})();
