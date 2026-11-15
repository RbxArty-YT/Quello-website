/* Quello — shows the signed-in person's Discord avatar at the far right of the header.
   Reads the session token that dashboard sign-in already stores (no API call needed:
   the token carries the Discord ID and avatar hash). Does nothing for signed-out visitors. */
(function () {
  'use strict';

  var TOKEN_KEY = 'quello-dash-token';
  var LANG_KEY = 'quello-site-language-v2';
  var L = {
    en: { dash: 'Dashboard', out: 'Log out', alt: 'Account' },
    ru: { dash: 'Панель управления', out: 'Выйти', alt: 'Аккаунт' },
    de: { dash: 'Dashboard', out: 'Abmelden', alt: 'Konto' },
    fr: { dash: 'Tableau de bord', out: 'Se déconnecter', alt: 'Compte' },
    it: { dash: 'Dashboard', out: 'Esci', alt: 'Account' }
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
  var ICON_OUT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(s) { var d = document.createElement('div'); d.textContent = String(s == null ? '' : s); return d.innerHTML; }

  function host() {
    return document.querySelector('.header-tools') ||
           document.querySelector('.about-nav-actions') ||
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

    var wrap = document.createElement('div');
    wrap.className = 'header-avatar';
    wrap.id = 'headerAvatar';
    wrap.innerHTML =
      '<button class="header-avatar-btn" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="' + esc(t.alt + ': ' + name) + '" title="' + esc(name) + '">' +
        '<img src="' + esc(url) + '" alt="" width="40" height="40" referrerpolicy="no-referrer" decoding="async">' +
      '</button>' +
      '<div class="header-avatar-menu" role="menu">' +
        '<div class="header-avatar-user"><img src="' + esc(url) + '" alt="" width="32" height="32" referrerpolicy="no-referrer"><span>' + esc(name) + '</span></div>' +
        '<a class="header-avatar-item" role="menuitem" href="dashboard.html">' + ICON_DASH + '<span data-ha="dash">' + esc(t.dash) + '</span></a>' +
        '<button class="header-avatar-item danger" role="menuitem" type="button" data-ha-out>' + ICON_OUT + '<span data-ha="out">' + esc(t.out) + '</span></button>' +
      '</div>';
    h.appendChild(wrap);   // last child = rightmost, after theme and language

    var btn = wrap.querySelector('.header-avatar-btn');
    function setOpen(open) {
      wrap.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var tt = L[lang()];   // pick up a language change made since the page loaded
        wrap.querySelector('[data-ha="dash"]').textContent = tt.dash;
        wrap.querySelector('[data-ha="out"]').textContent = tt.out;
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
    var t = L[lang()];
    w.querySelector('[data-ha="dash"]').textContent = t.dash;
    w.querySelector('[data-ha="out"]').textContent = t.out;
  });
  window.QuelloHeaderAvatar = { refresh: build };
})();
