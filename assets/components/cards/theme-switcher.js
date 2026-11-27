/* Copyright (c) 2026 Quello. All rights reserved. */
(function () {
  'use strict';
  const KEY = 'quello-theme';
  function current() {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  }
  function set(theme, origin) {
    const next = theme === 'light' ? 'light' : 'dark';
    if (window.QThemeSwitch && typeof window.QThemeSwitch.set === 'function') {
      window.QThemeSwitch.set(next, origin || null);
    } else {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (_) {}
    }
    updateAll();
  }
  function updateButton(button) {
    const light = current() === 'light';
    const icon = button.querySelector('.q-sample-theme-icon');
    const label = button.querySelector('[data-q-theme-label]');
    if (icon) icon.textContent = light ? '☀' : '☾';
    if (label) label.textContent = light ? 'Light theme' : 'Dark theme';
    button.setAttribute('aria-pressed', String(light));
  }
  function updateAll() {
    document.querySelectorAll('[data-q-theme-toggle]').forEach(updateButton);
  }
  function init() {
    updateAll();
    document.querySelectorAll('[data-q-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => set(current() === 'light' ? 'dark' : 'light', button));
    });
  }
  window.QuelloThemeSwitcher = { set, current, init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
