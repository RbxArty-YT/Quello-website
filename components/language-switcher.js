/* Copyright (c) 2026 Quello. All rights reserved. */
(function () {
  'use strict';
  const LANGUAGES = [
    { code:'en', name:'English', flag:'🇬🇧' },
    { code:'ru', name:'Русский', flag:'🇷🇺' },
    { code:'de', name:'Deutsch', flag:'🇩🇪' },
    { code:'fr', name:'Français', flag:'🇫🇷' },
    { code:'it', name:'Italiano', flag:'🇮🇹' }
  ];
  const KEY = 'quello-site-language-v2';

  function init() {
    document.querySelectorAll('[data-q-language-switcher]').forEach(root => {
      const trigger = root.querySelector('[data-q-language-trigger]');
      if (!trigger || !window.QuelloVerticalDrawer) return;
      const flag = trigger.querySelector('[data-q-language-flag]');
      const code = trigger.querySelector('[data-q-language-code]');
      const drawer = window.QuelloVerticalDrawer.create({ title:'Choose language' });
      const list = document.createElement('div');
      list.setAttribute('role', 'listbox');
      list.setAttribute('aria-label', 'Available languages');

      function selectedCode() {
        try { return (localStorage.getItem(KEY) || document.documentElement.lang || 'en').toLowerCase(); }
        catch (_) { return (document.documentElement.lang || 'en').toLowerCase(); }
      }
      function render() {
        const selected = selectedCode();
        const current = LANGUAGES.find(item => item.code === selected) || LANGUAGES[0];
        if (flag) flag.textContent = current.flag;
        if (code) code.textContent = current.code.toUpperCase();
        list.replaceChildren();
        LANGUAGES.forEach(language => {
          const option = document.createElement('button');
          option.type = 'button';
          option.className = 'q-sample-option';
          option.setAttribute('role', 'option');
          option.setAttribute('aria-selected', String(language.code === current.code));
          option.innerHTML = `<span class="q-sample-language-flag">${language.flag}</span><span>${language.name}</span><span class="q-sample-language-check">${language.code === current.code ? '✓' : ''}</span>`;
          option.addEventListener('click', () => {
            try { localStorage.setItem(KEY, language.code); } catch (_) {}
            document.documentElement.lang = language.code;
            render();
            drawer.close();
            root.dispatchEvent(new CustomEvent('quello:languagechange', { bubbles:true, detail:{ language:language.code } }));
          });
          list.append(option);
        });
      }
      render();
      trigger.addEventListener('click', () => {
        render();
        drawer.open({ title:'Choose language', content:list });
      });
    });
  }
  window.QuelloLanguageSwitcher = { languages:LANGUAGES, init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
