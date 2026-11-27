/* Copyright (c) 2026 Quello. All rights reserved.
 * Static Admin Panel UI sample. This file intentionally makes no API calls.
 */
(function () {
  'use strict';
  const views = {
    overview: { title:'System Overview', cards:[['Servers','128'],['Members','24.6K'],['Uptime','99.9%']], note:'Overview sample. Connect real data only through the authenticated Admin Panel backend.' },
    announcements: { title:'Announcements', cards:[['Published','18'],['Drafts','3'],['Languages','5']], note:'Announcement controls are represented as a visual sample only.' },
    team: { title:'Developer Team', cards:[['Members','7'],['Admins','2'],['Developers','5']], note:'Team membership and permissions must always be validated server-side.' }
  };
  function init() {
    document.querySelectorAll('[data-q-admin-sample]').forEach(root => {
      const title = root.querySelector('[data-q-admin-title]');
      const cards = root.querySelector('[data-q-admin-cards]');
      const note = root.querySelector('[data-q-admin-note]');
      const tabs = root.querySelectorAll('[data-q-admin-tab]');
      function activate(name) {
        const view = views[name] || views.overview;
        if (title) title.textContent = view.title;
        if (note) note.textContent = view.note;
        if (cards) {
          cards.replaceChildren();
          view.cards.forEach(([label,value]) => {
            const card = document.createElement('article');
            card.className = 'q-sample-admin-card';
            const small = document.createElement('small'); small.textContent = label;
            const strong = document.createElement('strong'); strong.textContent = value;
            card.append(small,strong); cards.append(card);
          });
        }
        tabs.forEach(tab => {
          const active = tab.dataset.qAdminTab === name;
          tab.setAttribute('aria-current', active ? 'page' : 'false');
        });
      }
      tabs.forEach(tab => tab.addEventListener('click', () => activate(tab.dataset.qAdminTab)));
      activate('overview');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
