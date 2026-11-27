/* Copyright (c) 2026 Quello. All rights reserved. */
/* About Creator: show the creator's CURRENT Discord avatar (via the bot's public API), round,
   and fall back to the bundled picture if Discord/the API is missing, slow or fails to load. */
(function () {
  'use strict';
  var FALLBACK = 'assets/img/creator-fallback.png';
  var img = document.getElementById('aboutCreatorDiscordAvatar');
  if (!img) return;
  img.classList.add('q-creator-avatar');
  var done = false;
  function useFallback() {
    if (done) return; done = true;
    img.onerror = null;
    if (img.getAttribute('src') !== FALLBACK) img.src = FALLBACK;
  }
  img.src = FALLBACK; /* instant, never blank */
  var cfg = window.QUELLO_CONFIG || {};
  if (!cfg.API_BASE || !window.fetch) return;
  var ctl = ('AbortController' in window) ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 6000);
  fetch(cfg.API_BASE.replace(/\/$/, '') + '/public/creator', { cache: 'no-cache', signal: ctl ? ctl.signal : undefined })
    .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
    .then(function (d) {
      clearTimeout(timer);
      var url = d && typeof d.avatar === 'string' ? d.avatar : '';
      if (!/^https:\/\/cdn\.discordapp\.com\//.test(url)) return; /* keep fallback */
      var probe = new Image();
      probe.onload = function () { img.referrerPolicy = 'no-referrer'; img.src = url; img.onerror = useFallback; };
      probe.onerror = function () { /* keep fallback already shown */ };
      probe.referrerPolicy = 'no-referrer';
      probe.src = url;
    })
    .catch(function () { clearTimeout(timer); /* fallback stays */ });
})();
