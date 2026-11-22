/* Copyright (c) 2026 Quello. All rights reserved. */
/* Quello — shows the signed-in person's Discord avatar at the far right of the header.
   Reads the session token that dashboard sign-in already stores (no API call needed:
   the token carries the Discord ID and avatar hash). Does nothing for signed-out visitors. */
(function () {
  'use strict';

  var TOKEN_KEY = 'quello-dash-token';
  var LANG_KEY = 'quello-site-language-v2';
  var L = {
    en: { dash: 'Dashboard', docs: 'Documentation', out: 'Log out', alt: 'Account' },
    ru: { dash: 'Панель управления', docs: 'Документация', out: 'Выйти', alt: 'Аккаунт' },
    de: { dash: 'Dashboard', docs: 'Dokumentation', out: 'Abmelden', alt: 'Konto' },
    fr: { dash: 'Tableau de bord', docs: 'Documentation', out: 'Se déconnecter', alt: 'Compte' },
    it: { dash: 'Dashboard', docs: 'Documentazione', out: 'Esci', alt: 'Account' }
  };

  function lang() {
    try { var l = localStorage.getItem(LANG_KEY); if (l && L[l]) return l; } catch (e) { /* ignore */ }
    var d = (document.documentElement.lang || 'en').slice(0, 2);
    return L[d] ? d : 'en';
  }

  function session() {
    try {
      var token = localStorage.getItem(TOKEN_KEY) || '';
      var body = token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/');
      var p = JSON.parse(decodeURIComponent(escape(atob(body + '='.repeat((4 - body.length % 4) % 4)))));
      if (p && p.t === 'session' && p.exp * 1000 > Date.now() && p.uid) return p;
    } catch (e) { /* signed out or malformed */ }
    return null;
  }

  function avatarUrl(p) {
    if (p.avatar) return 'https://cdn.discordapp.com/avatars/' + p.uid + '/' + p.avatar + '.png?size=128';
    var n = 0;
    try { n = Number((BigInt(p.uid) >> 22n) % 6n); } catch (e) { /* default 0 */ }
    return 'https://cdn.discordapp.com/embed/avatars/' + n + '.png';
  }

  var ICON_DASH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h8v8H3z M13 3h8v5h-8z M13 10h8v11h-8z M3 13h8v8H3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
  var ICON_DOCS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_OUT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(s) { var d = document.createElement('div'); d.textContent = String(s == null ? '' : s); return d.innerHTML; }

  // Documentation link (shown in the dashboard's avatar menu).
  function docsHref() {
    var cfg = window.QUELLO_CONFIG || {};
    return cfg.DOCS_URL || 'index.html#home';
  }
  function onDashboard() { return !!(document.body && document.body.dataset.page === 'dashboard'); }

  function setLabels(w, t) {
    ['dash', 'docs', 'out'].forEach(function (k) {
      var el = w.querySelector('[data-ha="' + k + '"]');
      if (el) el.textContent = t[k];
    });
  }

  function host() {
    return document.querySelector('.header-tools') ||
           document.querySelector('.about-nav-actions') ||
           document.querySelector('.legal-nav-actions') ||
           document.querySelector('.nav-inner');
  }

  function remove() {
    var old = document.getElementById('headerAvatar');
    if (old) old.remove();
  }

  function build() {
    remove();
    var p = session();
    var h = host();
    if (!p || !h) return;

    var t = L[lang()];
    var url = avatarUrl(p);
    var name = p.name || 'Discord';
    // On the dashboard the menu links to the documentation only; everywhere else it links to the dashboard only.
    var linkItem = onDashboard()
      ? '<a class="header-avatar-item" role="menuitem" href="' + esc(docsHref()) + '">' + ICON_DOCS + '<span data-ha="docs">' + esc(t.docs) + '</span></a>'
      : '<a class="header-avatar-item" role="menuitem" href="dashboard.html">' + ICON_DASH + '<span data-ha="dash">' + esc(t.dash) + '</span></a>';

    var wrap = document.createElement('div');
    wrap.className = 'header-avatar';
    wrap.id = 'headerAvatar';
    wrap.innerHTML =
      '<button class="header-avatar-btn" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="' + esc(t.alt + ': ' + name) + '" title="' + esc(name) + '">' +
        '<img src="' + esc(url) + '" alt="" width="40" height="40" referrerpolicy="no-referrer" decoding="async">' +
      '</button>' +
      '<div class="header-avatar-menu" role="menu">' +
        '<div class="header-avatar-user"><img src="' + esc(url) + '" alt="" width="32" height="32" referrerpolicy="no-referrer"><span>' + esc(name) + '</span></div>' +
        linkItem +
        '<button class="header-avatar-item danger" role="menuitem" type="button" data-ha-out>' + ICON_OUT + '<span data-ha="out">' + esc(t.out) + '</span></button>' +
      '</div>';
    h.appendChild(wrap);   // last child = rightmost, after theme and language

    var btn = wrap.querySelector('.header-avatar-btn');
    function setOpen(open) {
      wrap.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var tt = L[lang()];   // pick up a language change made since the page loaded
        setLabels(wrap, tt);
      }
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!wrap.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    wrap.querySelector('[data-ha-out]').addEventListener('click', function () {
      setOpen(false);
      var dashLogout = document.getElementById('logoutBtn');
      if (dashLogout) { dashLogout.click(); return; }   // dashboard: keeps its "unsaved changes" check
      try { localStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ }
      if (/login\.html$/i.test(location.pathname)) location.reload(); else remove();
    });
  }

  function init() { build(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  // Signing in or out in another tab, or a language change, keeps the header in sync.
  window.addEventListener('storage', function (e) { if (e.key === TOKEN_KEY) build(); });
  window.addEventListener('quello:languagechange', function () {
    var w = document.getElementById('headerAvatar'); if (!w) return;
    setLabels(w, L[lang()]);
  });
  window.QuelloHeaderAvatar = { refresh: build };
})();
