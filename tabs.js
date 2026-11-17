document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /*
   * =========================================
   * QUELLO — TAB NAVIGATION
   * =========================================
   */

  const tabGroups = {
    home: [],
    commands: ['commands'],
    playground: ['playground'],
    builder: ['preview', 'qotd-flow'],
    guide: [
      'setup',
      'permissions',
      'faq',
      'troubleshooting',
      'extras'
    ],
    updates: ['changelog'],
    community: ['community']
  };

  const tabLabels = {
    en: {
      home: 'Home',
      commands: 'Commands',
      playground: 'Playground',
      builder: 'QOTD Builder',
      guide: 'Guide',
      updates: 'Changelog',
      community: 'Community'
    },

    ru: {
      home: 'Главная',
      commands: 'Команды',
      playground: 'Плейграунд',
      builder: 'Конструктор QOTD',
      guide: 'Гайд',
      updates: 'Изменения',
      community: 'Сообщество'
    },

    de: {
      home: 'Start',
      commands: 'Befehle',
      playground: 'Playground',
      builder: 'QOTD Builder',
      guide: 'Anleitung',
      updates: 'Changelog',
      community: 'Community'
    },

    fr: {
      home: 'Accueil',
      commands: 'Commandes',
      playground: 'Playground',
      builder: 'Créateur QOTD',
      guide: 'Guide',
      updates: 'Changelog',
      community: 'Communauté'
    },

    it: {
      home: 'Home',
      commands: 'Comandi',
      playground: 'Playground',
      builder: 'Builder QOTD',
      guide: 'Guida',
      updates: 'Changelog',
      community: 'Community'
    }
  };

  /*
   * Existing section -> tab
   */

  const sectionToTab = {
    commands: 'commands',

    playground: 'playground',

    preview: 'builder',
    'qotd-flow': 'builder',

    setup: 'guide',
    permissions: 'guide',
    faq: 'guide',
    troubleshooting: 'guide',
    extras: 'guide',

    changelog: 'updates',

    community: 'community'
  };

  const nav = document.querySelector('.nav');
  const container = document.querySelector('.container');

  if (!nav || !container) {
    console.warn('[Quello Tabs] Navigation or container not found.');
    return;
  }

  /*
   * Create tab navigation
   */

  const tabBar = document.createElement('nav');

  tabBar.className = 'site-tabs';
  tabBar.setAttribute(
    'aria-label',
    'Documentation sections'
  );

  Object.keys(tabGroups).forEach(tabName => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'site-tab';

    button.dataset.tab = tabName;

    button.setAttribute(
      'aria-selected',
      'false'
    );

    button.setAttribute(
      'role',
      'tab'
    );

    const language =
      document.documentElement.lang || 'en';

    button.textContent =
      tabLabels[language]?.[tabName] ||
      tabLabels.en[tabName];

    tabBar.appendChild(button);
  });

  nav.appendChild(tabBar);

  /*
   * Mark sections as tab panels
   */

  const children = Array.from(container.children);

  children.forEach(element => {
    const id = element.id;

    if (id && sectionToTab[id]) {
      element.dataset.tabPanel =
        sectionToTab[id];

      return;
    }

    /*
     * Anything that isn't one of the
     * existing documentation sections
     * belongs to Home.
     */

    element.dataset.tabPanel = 'home';
  });

  /*
   * Find the correct tab
   */

  function getTabFromHash() {
    const hash =
      window.location.hash
        .replace('#', '')
        .trim();

    if (!hash) {
      return 'home';
    }

    if (tabGroups[hash]) {
      return hash;
    }

    if (sectionToTab[hash]) {
      return sectionToTab[hash];
    }

    return 'home';
  }

  /*
   * Update button labels
   */

  function updateLabels() {
    const language =
      document.documentElement.lang || 'en';

    const labels =
      tabLabels[language] ||
      tabLabels.en;

    tabBar
      .querySelectorAll('.site-tab')
      .forEach(button => {
        const tab = button.dataset.tab;

        button.textContent =
          labels[tab] || tab;
      });
  }

  /*
   * Activate tab
   */

  function setActiveTab(
    tab,
    updateHash = true
  ) {
    if (!tabGroups[tab]) {
      tab = 'home';
    }

    /*
     * Show / hide panels
     */

    container
      .querySelectorAll('[data-tab-panel]')
      .forEach(panel => {
        const visible =
          panel.dataset.tabPanel === tab;

        panel.hidden = !visible;

        panel.classList.toggle(
          'tab-panel-active',
          visible
        );

        panel.setAttribute(
          'aria-hidden',
          String(!visible)
        );
      });

    /*
     * Update buttons
     */

    tabBar
      .querySelectorAll('.site-tab')
      .forEach(button => {
        const active =
          button.dataset.tab === tab;

        button.classList.toggle(
          'active',
          active
        );

        button.setAttribute(
          'aria-selected',
          String(active)
        );
      });

    /*
     * URL hash
     */

    if (updateHash) {
      const newHash = `#${tab}`;

      if (
        window.location.hash !== newHash
      ) {
        history.pushState(
          { tab },
          '',
          newHash
        );
      }
    }

    /*
     * Scroll to top
     */

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /*
   * Tab click
   */

  tabBar
    .querySelectorAll('.site-tab')
    .forEach(button => {
      button.addEventListener(
        'click',
        () => {
          setActiveTab(
            button.dataset.tab
          );
        }
      );
    });

  /*
   * Existing links such as:
   *
   * #commands
   * #playground
   * #setup
   * #faq
   */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {
      const href =
        link.getAttribute('href');

      if (!href || href === '#') {
        return;
      }

      const target =
        href.substring(1);

      const targetTab =
        sectionToTab[target] ||
        tabGroups[target]
          ? (
              sectionToTab[target] ||
              target
            )
          : null;

      if (!targetTab) {
        return;
      }

      link.addEventListener(
        'click',
        event => {
          event.preventDefault();

          setActiveTab(
            targetTab
          );
        }
      );
    });

  /*
   * Browser back / forward
   */

  window.addEventListener(
    'popstate',
    () => {
      setActiveTab(
        getTabFromHash(),
        false
      );
    }
  );

  window.addEventListener(
    'hashchange',
    () => {
      setActiveTab(
        getTabFromHash(),
        false
      );
    }
  );

  /*
   * Language changes
   *
   * We don't replace the existing
   * translation system.
   * We simply refresh the tab labels.
   */

  const languageObserver =
    new MutationObserver(() => {
      updateLabels();
    });

  languageObserver.observe(
    document.documentElement,
    {
      attributes: true,
      attributeFilter: ['lang']
    }
  );

  /*
   * Initial state
   */

  updateLabels();

  setActiveTab(
    getTabFromHash(),
    false
  );

  console.log(
    '[Quello Tabs] Tab navigation loaded.'
  );
});