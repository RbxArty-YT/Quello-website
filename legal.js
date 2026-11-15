/* Quello — Terms / Privacy pages: language, theme, table of contents, scroll spy. */
(function () {
  'use strict';
  var DATA = window.QUELLO_LEGAL; if (!DATA) return;
  var DOC = document.body.dataset.doc;                       // "terms" | "privacy"
  var LANG_KEY = 'quello-site-language-v2', THEME_KEY = 'quello-theme';
  var FLAGS = { en: '🇬🇧', ru: '🇷🇺', de: '🇩🇪', fr: '🇫🇷', it: '🇮🇹' };
  var NOTE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3 7v6c0 4.4 3.1 7.6 9 9 5.9-1.4 9-4.6 9-9V7l-9-4Z M9 12l2.2 2.2L15.5 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) { var d = document.createElement('div'); d.textContent = String(s); return d.innerHTML; }
  function fmt(s) {
    return esc(s)
      .replace(/(^|[^\w\/])(\/[a-z_]{2,})(?![\w\/])/g, '$1<code>$2</code>')
      .replace(/(@(?:everyone|here))/g, '<code>$1</code>');
  }
  function li(t) {
    var i = t.indexOf(' — ');
    return i > 0 ? '<li><strong>' + fmt(t.slice(0, i)) + '</strong> — ' + fmt(t.slice(i + 3)) + '</li>' : '<li>' + fmt(t) + '</li>';
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function lang() {
    var l = null;
    try { l = localStorage.getItem(LANG_KEY); } catch (e) { /* ignore */ }
    if (!l || !DATA.ui[l]) {
      var n = ((navigator.language || 'en') + '').slice(0, 2).toLowerCase();
      l = DATA.ui[n] ? n : 'en';
    }
    return l;
  }
  function date(iso, l) {
    try { return new Intl.DateTimeFormat(l, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z')); }
    catch (e) { return iso; }
  }

  var spy = null;
  function render(l) {
    var u = DATA.ui[l], doc = DATA.docs[DOC][l];
    document.documentElement.lang = l;
    document.title = u[DOC + '_title'];
    document.querySelectorAll('[data-i18n]').forEach(function (n) { if (u[n.dataset.i18n] != null) n.textContent = u[n.dataset.i18n]; });
    [['legalDocsBtn', 'docs'], ['legalDashBtn', 'dash']].forEach(function (x) { var n = $(x[0]); n.setAttribute('aria-label', u[x[1]]); n.title = u[x[1]]; });
    $('legalTitle').textContent = u[DOC];
    $('legalLead').textContent = u[DOC + '_lead'];
    $('legalContact').textContent = u.contact;
    $('legalEffective').textContent = date(DATA.dates.effective, l);
    $('legalUpdated').textContent = date(DATA.dates.updated, l);
    $('legalCards').setAttribute('aria-label', u.summary);
    $('legalTheme').setAttribute('aria-label', u.theme); $('legalTheme').title = u.theme;
    $('legalTop').setAttribute('aria-label', u.top); $('legalTop').title = u.top;
    $('headerLanguageButton').setAttribute('aria-label', u.langlabel);
    $('headerLanguageMenu').setAttribute('aria-label', u.langlabel);
    $('headerLanguageFlag').textContent = FLAGS[l]; $('headerLanguageCode').textContent = l.toUpperCase();
    document.querySelectorAll('[data-header-language]').forEach(function (b) { b.classList.toggle('active', b.dataset.headerLanguage === l); });

    $('legalCards').innerHTML = doc.cards.map(function (c, i) {
      return '<div class="legal-card"><span class="legal-card-icon">' + (i + 1) + '</span><strong>' + esc(c[0]) + '</strong><p>' + esc(c[1]) + '</p></div>';
    }).join('');
    $('legalTocNav').innerHTML = doc.sections.map(function (s, i) {
      return '<a href="#s' + (i + 1) + '"><span>' + pad(i + 1) + '</span>' + esc(s[0]) + '</a>';
    }).join('');
    $('legalDoc').innerHTML = doc.sections.map(function (s, i) {
      var body = s[1].map(function (b) {
        if (b[0] === 'p') return '<p>' + fmt(b[1]) + '</p>';
        if (b[0] === 'h3') return '<h3>' + esc(b[1]) + '</h3>';
        if (b[0] === 'ul') return '<ul>' + b[1].map(li).join('') + '</ul>';
        return '<div class="legal-note">' + NOTE_ICON + '<p>' + fmt(b[1]) + '</p></div>';
      }).join('');
      return '<section class="legal-sec" id="s' + (i + 1) + '"><h2><span class="legal-num">' + pad(i + 1) + '</span><span>' + esc(s[0]) + '</span></h2>' + body + '</section>';
    }).join('');
    bindSpy();
    window.dispatchEvent(new Event('quello:languagechange'));
  }

  function bindSpy() {
    if (spy) spy.disconnect();
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    document.querySelectorAll('#legalTocNav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === e.target.id); });
      });
    }, { rootMargin: '-90px 0px -62% 0px', threshold: 0 });
    document.querySelectorAll('.legal-sec').forEach(function (s) { spy.observe(s); });
  }

  // contents panel: open on wide screens, collapsed on phones
  var toc = $('legalToc'), mq = window.matchMedia('(min-width: 981px)');
  function syncToc() { toc.open = mq.matches; }
  syncToc(); (mq.addEventListener ? mq.addEventListener('change', syncToc) : mq.addListener(syncToc));
  $('legalTocNav').addEventListener('click', function (e) { if (e.target.closest('a') && !mq.matches) toc.open = false; });

  // language dropdown
  var wrap = $('headerLanguage'), btn = $('headerLanguageButton');
  function setOpen(o) { wrap.classList.toggle('open', o); btn.setAttribute('aria-expanded', String(o)); }
  btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!wrap.classList.contains('open')); });
  wrap.querySelectorAll('[data-header-language]').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.dataset.headerLanguage;
      try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* ignore */ }
      render(l); setOpen(false);
    });
  });
  document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('storage', function (e) { if (e.key === LANG_KEY) render(lang()); });

  // theme
  var themeBtn = $('legalTheme');
  function setTheme(v, origin) { if (window.QThemeSwitch && origin) { window.QThemeSwitch.set(v, origin); return; } document.documentElement.dataset.theme = v; try { localStorage.setItem(THEME_KEY, v); } catch (e) { /* ignore */ } }
  if (!document.documentElement.dataset.theme) setTheme('dark');
  themeBtn.addEventListener('click', function () { setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light', themeBtn); });

  // back to top
  var top = $('legalTop');
  window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 600); }, { passive: true });
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  render(lang());
  if (location.hash.length > 1) { var t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(function () { t.scrollIntoView(); }, 60); }
})();
