/* Copyright (c) 2026 Quello. All rights reserved. */
(function () {
  'use strict';
  function init() {
    const vertical = window.QuelloVerticalDrawer && window.QuelloVerticalDrawer.create({ title:'Vertical drawer' });
    const side = window.QuelloSideDrawer && window.QuelloSideDrawer.create({ title:'Side drawer' });

    const verticalButton = document.querySelector('[data-open-vertical]');
    const sideButton = document.querySelector('[data-open-side]');
    if (verticalButton && vertical) verticalButton.addEventListener('click', () => {
      const content = document.createElement('div');
      content.innerHTML = '<p style="color:var(--text-3)">A vertical sheet slides upward from the bottom edge. It works well for mobile option lists and compact actions.</p><button class="q-sample-option" type="button">Example action <span style="margin-left:auto">→</span></button><button class="q-sample-option" type="button">Another action <span style="margin-left:auto">→</span></button>';
      vertical.open({ title:'Vertical drawer sample', content });
    });
    if (sideButton && side) sideButton.addEventListener('click', () => {
      const content = document.createElement('div');
      content.innerHTML = '<p style="color:var(--text-3)">A side drawer enters from the right. It suits settings, filters and larger workspaces.</p><div class="q-sample-admin-note">The panel keeps its own scroll area and closes with Escape or the backdrop.</div>';
      side.open({ title:'Side drawer sample', content });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
