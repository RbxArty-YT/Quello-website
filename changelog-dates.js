/* Quello — shows the changelog dates in the selected site language
   (the HTML keeps the English date, e.g. "NOVEMBER 16, 2026", as the source). */
(function () {
  'use strict';
  var MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  var spans = document.querySelectorAll('#changelog .timeline article > span');
  if (!spans.length) return;

  var dates = [];
  spans.forEach(function (el) {
    var m = /^([A-Z]+)\s+(\d{1,2}),\s*(\d{4})$/.exec(el.textContent.trim());
    var month = m ? MONTHS.indexOf(m[1]) : -1;
    if (month < 0) return;
    dates.push({ el: el, original: el.textContent, date: new Date(Date.UTC(+m[3], month, +m[2])) });
  });

  function render(lang) {
    lang = /^(en|ru|de|fr|it)$/.test(lang) ? lang : 'en';
    dates.forEach(function (d) {
      if (lang === 'en') { d.el.textContent = d.original; return; }
      try {
        d.el.textContent = d.date
          .toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
          .toLocaleUpperCase(lang);
      } catch (e) { d.el.textContent = d.original; }
    });
  }

  render((document.documentElement.lang || 'en').slice(0, 2));
  window.addEventListener('quello:languagechange', function (e) {
    render((e.detail && e.detail.language) || document.documentElement.lang);
  });
})();
