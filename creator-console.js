/* Quello Hidden Creator Console — shared across Documentation, Dashboard and About. */
(function () {
  'use strict';

  const CFG = window.QUELLO_CONFIG || {};
  const API = String(CFG.API_BASE || '').replace(/\/+$/, '');
  const TOKEN_KEY = 'quello-dash-token';
  const LANG_KEY = 'quello-site-language-v2';

  const t = {
    en: {
      signin:'Sign in with Discord first — redirecting…',
      hold:'Keep holding…',
      button:'Creator Console',
      title:'Creator Console',
      sub:'Private workspace · Quello ecosystem',
      overview:'System Overview',
      appearance:'Appearance Lab',
      developer:'Developer Tools',
      localization:'Localization Lab',
      debug:'Console & Debug',
      experiments:'Experimental Features',
      close:'Close',
      refresh:'Refresh',
      logout:'Sign out',
      login:'Sign in with Discord',
      denied:'Creator access is not available for this account.',
      offline:'The Quello API is unavailable. Check API_BASE in site-config.js.',
      loading:'Loading creator data…',
      api:'API',
      bot:'Discord bot',
      ready:'Ready',
      notReady:'Not ready',
      version:'Version',
      guilds:'Servers',
      latency:'Gateway latency',
      uptime:'API uptime',
      theme:'Site theme',
      dark:'Dark',
      light:'Light',
      palette:'Brand palette',
      locale:'Current language',
      browser:'Browser',
      viewport:'Viewport',
      screen:'Screen',
      checks:'Diagnostics',
      run:'Run diagnostics',
      feature:'Experimental switches are local previews only.',
      status:'Status',
      enabled:'Enabled',
      disabled:'Disabled',
      passkey:'Passkey',
      totp:'TOTP',
      mfaNote:'Additional factors are not configured in this build. Creator endpoints still enforce the Discord owner ID server-side.',
      hidden:'The console is hidden from regular visitors. Use Ctrl + Shift + K or hold the Quello logo for 2 seconds.'
    },

    ru: {
      signin:'Сначала войдите через Discord — перенаправляю…',
      hold:'Держите…',
      button:'Консоль создателя',
      title:'Консоль создателя',
      sub:'Закрытое пространство · экосистема Quello',
      overview:'Обзор системы',
      appearance:'Лаборатория оформления',
      developer:'Инструменты разработчика',
      localization:'Лаборатория локализации',
      debug:'Консоль и отладка',
      experiments:'Экспериментальные функции',
      close:'Закрыть',
      refresh:'Обновить',
      logout:'Выйти',
      login:'Войти через Discord',
      denied:'Для этого аккаунта нет доступа создателя.',
      offline:'API Quello недоступен. Проверьте API_BASE в site-config.js.',
      loading:'Загрузка данных создателя…',
      api:'API',
      bot:'Discord-бот',
      ready:'Работает',
      notReady:'Не готов',
      version:'Версия',
      guilds:'Серверы',
      latency:'Задержка шлюза',
      uptime:'Время работы API',
      theme:'Тема сайта',
      dark:'Тёмная',
      light:'Светлая',
      palette:'Палитра бренда',
      locale:'Текущий язык',
      browser:'Браузер',
      viewport:'Размер окна',
      screen:'Экран',
      checks:'Диагностика',
      run:'Запустить диагностику',
      feature:'Экспериментальные переключатели — только локальный предпросмотр.',
      status:'Состояние',
      enabled:'Включено',
      disabled:'Выключено',
      passkey:'Passkey',
      totp:'TOTP',
      mfaNote:'Дополнительные факторы в этой сборке ещё не настроены. Доступ к API всё равно проверяется на сервере по Discord ID владельца.',
      hidden:'Консоль скрыта от обычных посетителей. Используйте Ctrl + Shift + K или удерживайте логотип Quello 2 секунды.'
    },

    de: {
      signin:'Bitte zuerst mit Discord anmelden — Weiterleitung…',
      hold:'Weiter gedrückt halten…',
      button:'Creator-Konsole',
      title:'Creator-Konsole',
      sub:'Privater Bereich · Quello-Ökosystem',
      overview:'Systemübersicht',
      appearance:'Design-Labor',
      developer:'Entwicklerwerkzeuge',
      localization:'Lokalisierungslabor',
      debug:'Konsole & Debug',
      experiments:'Experimentelle Funktionen',
      close:'Schließen',
      refresh:'Aktualisieren',
      logout:'Abmelden',
      login:'Mit Discord anmelden',
      denied:'Für dieses Konto ist kein Creator-Zugriff verfügbar.',
      offline:'Die Quello-API ist nicht erreichbar. Prüfe API_BASE in site-config.js.',
      loading:'Creator-Daten werden geladen…',
      api:'API',
      bot:'Discord-Bot',
      ready:'Bereit',
      notReady:'Nicht bereit',
      version:'Version',
      guilds:'Server',
      latency:'Gateway-Latenz',
      uptime:'API-Laufzeit',
      theme:'Website-Design',
      dark:'Dunkel',
      light:'Hell',
      palette:'Markenpalette',
      locale:'Aktuelle Sprache',
      browser:'Browser',
      viewport:'Ansichtsfenster',
      screen:'Bildschirm',
      checks:'Diagnose',
      run:'Diagnose starten',
      feature:'Experimentelle Schalter sind nur lokale Vorschauen.',
      status:'Status',
      enabled:'Aktiviert',
      disabled:'Deaktiviert',
      passkey:'Passkey',
      totp:'TOTP',
      mfaNote:'Zusätzliche Faktoren sind in diesem Build nicht eingerichtet. Creator-Endpunkte prüfen die Discord-Owner-ID weiterhin serverseitig.',
      hidden:'Die Konsole ist für normale Besucher verborgen. Ctrl + Shift + K drücken oder das Quello-Logo 2 Sekunden halten.'
    },

    fr: {
      signin:'Connectez-vous d’abord avec Discord — redirection…',
      hold:'Maintenez appuyé…',
      button:'Console du créateur',
      title:'Console du créateur',
      sub:'Espace privé · écosystème Quello',
      overview:'Vue système',
      appearance:'Atelier visuel',
      developer:'Outils développeur',
      localization:'Atelier de localisation',
      debug:'Console et débogage',
      experiments:'Fonctionnalités expérimentales',
      close:'Fermer',
      refresh:'Actualiser',
      logout:'Déconnexion',
      login:'Se connecter avec Discord',
      denied:'Ce compte ne dispose pas des droits de créateur.',
      offline:'L’API Quello est inaccessible. Vérifiez API_BASE dans site-config.js.',
      loading:'Chargement des données…',
      api:'API',
      bot:'Bot Discord',
      ready:'Prêt',
      notReady:'Non prêt',
      version:'Version',
      guilds:'Serveurs',
      latency:'Latence passerelle',
      uptime:'Disponibilité API',
      theme:'Thème du site',
      dark:'Sombre',
      light:'Clair',
      palette:'Palette de marque',
      locale:'Langue actuelle',
      browser:'Navigateur',
      viewport:'Fenêtre',
      screen:'Écran',
      checks:'Diagnostics',
      run:'Lancer les diagnostics',
      feature:'Les options expérimentales sont des aperçus locaux uniquement.',
      status:'État',
      enabled:'Activé',
      disabled:'Désactivé',
      passkey:'Passkey',
      totp:'TOTP',
      mfaNote:'Les facteurs supplémentaires ne sont pas configurés dans cette version. Les points d’accès créateur vérifient toujours côté serveur l’ID Discord du propriétaire.',
      hidden:'La console est masquée aux visiteurs. Utilisez Ctrl + Shift + K ou maintenez le logo Quello pendant 2 secondes.'
    },

    it: {
      signin:'Accedi prima con Discord — reindirizzamento…',
      hold:'Continua a tenere premuto…',
      button:'Console del creatore',
      title:'Console del creatore',
      sub:'Spazio privato · ecosistema Quello',
      overview:'Panoramica sistema',
      appearance:'Laboratorio aspetto',
      developer:'Strumenti sviluppatore',
      localization:'Laboratorio localizzazione',
      debug:'Console e debug',
      experiments:'Funzioni sperimentali',
      close:'Chiudi',
      refresh:'Aggiorna',
      logout:'Esci',
      login:'Accedi con Discord',
      denied:'Questo account non dispone dei permessi creatore.',
      offline:'API Quello non raggiungibile. Controlla API_BASE in site-config.js.',
      loading:'Caricamento dati creatore…',
      api:'API',
      bot:'Bot Discord',
      ready:'Pronto',
      notReady:'Non pronto',
      version:'Versione',
      guilds:'Server',
      latency:'Latenza gateway',
      uptime:'Tempo attività API',
      theme:'Tema del sito',
      dark:'Scuro',
      light:'Chiaro',
      palette:'Palette del brand',
      locale:'Lingua corrente',
      browser:'Browser',
      viewport:'Finestra',
      screen:'Schermo',
      checks:'Diagnostica',
      run:'Esegui diagnostica',
      feature:'Le opzioni sperimentali sono solo anteprime locali.',
      status:'Stato',
      enabled:'Attivo',
      disabled:'Disattivato',
      passkey:'Passkey',
      totp:'TOTP',
      mfaNote:'I fattori aggiuntivi non sono configurati in questa build. Gli endpoint creatore verificano comunque lato server l’ID Discord del proprietario.',
      hidden:'La console è nascosta ai visitatori. Usa Ctrl + Shift + K o tieni premuto il logo Quello per 2 secondi.'
    }
  };

  const lang = () =>
    (localStorage.getItem(LANG_KEY) ||
      document.documentElement.lang ||
      'en').slice(0, 2).toLowerCase();

  const tr = key =>
    (t[lang()] || t.en)[key] || t.en[key] || key;

  const token = () => {
    try {
      return localStorage.getItem(TOKEN_KEY) || '';
    } catch (_) {
      return '';
    }
  };

  let creator = false;
  let overview = null;
  let drawer = null;
  let body = null;
  let active = 'overview';
  let errorLog = [];
  let toastTimer = null;
  let labelRefreshTimer = null;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  };

  const fmtTime = n => {
    n = Number(n) || 0;
    const h = Math.floor(n / 3600);
    const m = Math.floor(n % 3600 / 60);
    const s = Math.floor(n % 60);

    return [h, m, s]
      .map(x => String(x).padStart(2, '0'))
      .join(':');
  };

  async function request(path) {
    const tk = token();

    if (!API || /example\.com/i.test(API)) {
      throw new Error(tr('offline'));
    }

    if (!tk) {
      throw new Error(tr('denied'));
    }

    let response;

    try {
      response = await fetch(API + path, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Authorization': 'Bearer ' + tk,
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });
    } catch (error) {
      console.error('[Quello Creator Console] Fetch failed:', path, error);

      throw new Error(
        `Не удалось получить ответ от ${path}. ` +
        'Возможны ограничения CORS/OPTIONS, сетевая ошибка или недоступность API.'
      );
    }

    const raw = await response.text();
    let data = {};

    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (_) {
      data = { message: raw.slice(0, 300) };
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.error ||
        `API error ${response.status}: ${response.statusText}`
      );
    }

    return data;
  }

  function addSidebarButton() {
    const links = document.querySelector('.side-menu-links');
    if (!links) return;
    if (links.querySelector('[data-creator-console-entry]')) return;

    const divider = el('div', 'side-divider');
    const label = el('div', 'side-section-label', 'CREATOR');
    const button = el('button', 'side-action creator-console-entry');

    button.type = 'button';
    button.dataset.creatorConsoleEntry = '1';

    button.append(
      el('span', 'side-action-icon', '✦'),
      el('span', '', tr('button'))
    );

    button.addEventListener('click', openConsole);
    links.append(divider, label, button);
  }

  function makeDrawer() {
    if (drawer) return;

    drawer = el('div', 'creator-console-overlay');
    drawer.setAttribute('role', 'presentation');

    const panel = el('section', 'creator-console-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', tr('title'));

    const head = el('header', 'creator-console-head');
    const identity = el('div', 'creator-console-identity');

    identity.append(
      el('span', 'creator-console-mark', 'Q'),
      el('div', '', null)
    );

    identity.lastChild.append(
      el('strong', '', tr('title')),
      el('small', '', tr('sub'))
    );

    const close = el('button', 'creator-icon-button', '×');
    close.type = 'button';
    close.setAttribute('aria-label', tr('close'));
    close.addEventListener('click', closeConsole);

    head.append(identity, close);

    const nav = el('nav', 'creator-console-tabs');

    const sections = [
      ['overview', 'overview'],
      ['appearance', 'appearance'],
      ['developer', 'developer'],
      ['localization', 'localization'],
      ['debug', 'debug'],
      ['experiments', 'experiments']
    ];

    sections.forEach(([id, key]) => {
      const button = el('button', 'creator-tab', tr(key));
      button.type = 'button';
      button.dataset.tab = id;

      button.addEventListener('click', () => {
        active = id;
        render();
      });

      nav.append(button);
    });

    body = el('div', 'creator-console-content');

    panel.append(head, nav, body);
    drawer.append(panel);

    drawer.addEventListener('click', event => {
      if (event.target === drawer) closeConsole();
    });

    document.body.append(drawer);
  }

  function card(title, value, detail) {
    const c = el('article', 'creator-card');

    c.append(
      el('span', 'creator-card-label', title),
      el('strong', 'creator-card-value', String(value)),
      el('small', 'creator-card-detail', detail || '')
    );

    return c;
  }
    function render() {
    if (!body || !drawer) return;

    body.replaceChildren();

    drawer.querySelectorAll('.creator-tab').forEach(button => {
      button.classList.toggle('active', button.dataset.tab === active);
    });

    if (active === 'overview') {
      const grid = el('div', 'creator-card-grid');
      const bot = overview?.bot || {};

      grid.append(
        card(tr('api'), 'ONLINE', 'Creator API responded'),
        card(
          tr('bot'),
          bot.ready ? tr('ready') : tr('notReady'),
          bot.name || 'Quello'
        ),
        card(tr('version'), overview?.version || '—', 'APP_VERSION'),
        card(tr('guilds'), bot.guild_count ?? '—', 'Discord cache'),
        card(tr('latency'), `${bot.latency_ms ?? '—'} ms`, 'Gateway'),
        card(
          tr('uptime'),
          fmtTime(overview?.api_uptime_seconds || 0),
          'API process'
        )
      );

      body.append(grid);

      const features = el('article', 'creator-note');
      features.append(el('h3', '', tr('status')));

      [
        ['Passkey', overview?.features?.passkey],
        ['TOTP', overview?.features?.totp]
      ].forEach(([name, enabled]) => {
        features.append(
          el(
            'p',
            '',
            `${name}: ${enabled ? tr('enabled') : tr('disabled')}`
          )
        );
      });

      features.append(el('p', 'creator-muted', tr('mfaNote')));
      body.append(features);

      const refresh = el('button', 'creator-primary', tr('refresh'));
      refresh.type = 'button';
      refresh.addEventListener('click', loadOverview);
      body.append(refresh);

    } else if (active === 'appearance') {
      const box = el('article', 'creator-note');
      box.append(el('h3', '', tr('theme')));

      const theme = el('div', 'creator-button-row');

      [
        ['dark', tr('dark')],
        ['light', tr('light')]
      ].forEach(([value, label]) => {
        const button = el('button', 'creator-secondary', label);
        button.type = 'button';

        button.addEventListener('click', () => {
          document.documentElement.dataset.theme = value;

          try {
            localStorage.setItem('quello-theme', value);
          } catch (_) {}
        });

        theme.append(button);
      });

      box.append(theme, el('h3', '', tr('palette')));

      const swatches = el('div', 'creator-swatches');

      ['#8b5cf6', '#ec4899', '#fb4b5d'].forEach(color => {
        const swatch = el('span', 'creator-swatch');
        swatch.style.background = color;
        swatch.title = color;
        swatches.append(swatch);
      });

      box.append(swatches);
      body.append(box);

    } else if (active === 'developer') {
      const grid = el('div', 'creator-card-grid');

      grid.append(
        card(tr('browser'), navigator.userAgent, navigator.platform || ''),
        card(
          tr('viewport'),
          `${innerWidth} × ${innerHeight}`,
          devicePixelRatio + '× DPR'
        ),
        card(
          tr('screen'),
          `${screen.width} × ${screen.height}`,
          `${screen.colorDepth}-bit`
        ),
        card(
          'Online',
          navigator.onLine ? 'Yes' : 'No',
          'Navigator status'
        )
      );

      body.append(grid);

    } else if (active === 'localization') {
      const current = lang().toUpperCase();
      const box = el('article', 'creator-note');

      box.append(
        el('h3', '', tr('locale')),
        el('p', 'creator-card-value', current),
        el('p', 'creator-muted', 'EN · RU · DE · FR · IT')
      );

      const langs = el('div', 'creator-button-row');

      ['en', 'ru', 'de', 'fr', 'it'].forEach(language => {
        const button = el(
          'button',
          'creator-secondary',
          language.toUpperCase()
        );

        button.type = 'button';

        button.addEventListener('click', () => {
          try {
            localStorage.setItem(LANG_KEY, language);
          } catch (_) {}

          location.reload();
        });

        langs.append(button);
      });

      box.append(langs);
      body.append(box);

    } else if (active === 'debug') {
      const box = el('article', 'creator-note');

      box.append(el('h3', '', tr('checks')));

      const run = el('button', 'creator-primary', tr('run'));
      run.type = 'button';
      run.addEventListener('click', loadDiagnostics);

      box.append(run);

      errorLog.slice(-20).forEach(entry => {
        box.append(el('p', 'creator-log', entry));
      });

      body.append(box);

    } else {
      const box = el('article', 'creator-note');

      box.append(
        el('h3', '', tr('experiments')),
        el('p', 'creator-muted', tr('feature'))
      );

      [
        'Orbit accents',
        'Glass reflections',
        'Particle layer'
      ].forEach(name => {
        const row = el('label', 'creator-toggle-row');
        const input = el('input');

        input.type = 'checkbox';

        input.addEventListener('change', () => {
          document.documentElement.classList.toggle(
            'creator-preview-' + name.toLowerCase().replaceAll(' ', '-'),
            input.checked
          );
        });

        row.append(input, el('span', '', name));
        box.append(row);
      });

      body.append(box);
    }
  }

  async function loadOverview() {
    if (body) {
      body.replaceChildren(
        el('p', 'creator-muted', tr('loading'))
      );
    }

    try {
      overview = await request('/api/creator/overview');
      render();
    } catch (error) {
      console.error('[Quello Creator Console] Overview failed:', error);

      if (body) {
        body.replaceChildren(
          el('p', 'creator-error', error.message)
        );
      }
    }
  }

  async function loadDiagnostics() {
    errorLog = [];

    const add = (status, message) => {
      errorLog.push(`${status} · ${message}`);
    };

    add('INFO', `API: ${API || 'NOT CONFIGURED'}`);
    add('INFO', `Website origin: ${location.origin}`);

    if (!API || /example\.com/i.test(API)) {
      add('FAIL', 'API_BASE is missing or invalid');
      render();
      return;
    }

    const tk = token();

    if (!tk) {
      add('FAIL', 'Discord access token not found');
      render();
      return;
    }

    async function testEndpoint(path) {
      try {
        const response = await fetch(API + path, {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Authorization': 'Bearer ' + tk,
            'Accept': 'application/json'
          },
          cache: 'no-store'
        });

        const raw = await response.text();
        let data = {};

        try {
          data = raw ? JSON.parse(raw) : {};
        } catch (_) {
          data = { message: raw.slice(0, 300) };
        }

        add(
          response.ok ? 'PASS' : 'FAIL',
          `${path}: HTTP ${response.status}`
        );

        if (!response.ok) {
          add(
            'INFO',
            `${path}: ${data.message || data.error || 'No error message'}`
          );
        } else {
          add('INFO', `${path}: valid response received`);
        }

      } catch (error) {
        console.error('[Quello Diagnostics]', path, error);

        add(
          'FAIL',
          `${path}: ${error.name}: ${error.message}`
        );

        add(
          'INFO',
          'Browser could not expose the response. Possible CORS/OPTIONS or network failure.'
        );
      }
    }

    try {
      const response = await fetch(API + '/api/me', {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Authorization': 'Bearer ' + tk,
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });

      const me = await response.json().catch(() => ({}));

      add(
        response.ok ? 'PASS' : 'FAIL',
        `/api/me: HTTP ${response.status}`
      );

      if (!response.ok) {
        add(
          'INFO',
          me.message || me.error || 'Authorization failed'
        );

        render();
        return;
      }

      add('INFO', `Bot owner: ${Boolean(me.is_bot_owner)}`);

    } catch (error) {
      add('FAIL', `/api/me: ${error.name}: ${error.message}`);
      render();
      return;
    }

    await testEndpoint('/api/creator/overview');
    await testEndpoint('/api/creator/diagnostics');

    render();
  }

  function toast(message) {
    let node = document.querySelector('.creator-toast');

    if (!node) {
      node = el('div', 'creator-toast');
      node.setAttribute('role', 'status');
      document.body.append(node);
    }

    node.textContent = message;
    node.classList.add('show');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      node.classList.remove('show');
    }, 3200);
  }

  async function openConsole() {
    if (!API || /example\.com/i.test(API)) {
      toast(tr('offline'));
      return;
    }

    if (!token()) {
      toast(tr('signin'));

      setTimeout(() => {
        location.href = 'login.html';
      }, 900);

      return;
    }

    try {
      const me = await request('/api/me');

      if (!me.is_bot_owner) {
        toast(tr('denied'));
        return;
      }

      creator = true;

    } catch (error) {
      console.error('[Quello Creator Console] Access check failed:', error);
      toast(error.message || tr('offline'));
      return;
    }

    makeDrawer();

    drawer.classList.add('open');
    document.body.classList.add('creator-console-open');

    active = 'overview';
    render();
    loadOverview();
  }

  function closeConsole() {
    if (drawer) {
      drawer.classList.remove('open');
    }

    document.body.classList.remove('creator-console-open');
  }

  async function verifyCreator() {
    if (!token()) return;

    try {
      const me = await request('/api/me');

      if (me.is_bot_owner) {
        creator = true;
        addSidebarButton();
        addFloatingButton();
      }

    } catch (error) {
      console.warn('[Quello Creator Console] Verification failed:', error);
    }
  }
    document.addEventListener('keydown', event => {
    if (
      event.ctrlKey &&
      event.shiftKey &&
      event.code === 'KeyK' &&
      creator
    ) {
      openConsole();
    }

    if (event.key === 'Escape' && drawer) {
      closeConsole();
    }
  });

  function installLongPress() {
    const LOGO_SELECTOR =
      '.brand, .side-brand, .about-brand, .site-logo, .logo, .navbar-brand';

    let timer = null;
    let activeTarget = null;
    let startX = 0;
    let startY = 0;
    let triggered = false;

    const HOLD_TIME = 2000;
    const MOVE_LIMIT = 12;

    function clearHold() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (activeTarget) {
        activeTarget.classList.remove('creator-holding');
        activeTarget = null;
      }
    }

    function startHold(target, x, y) {
      if (!creator || !target) return;

      clearHold();
      triggered = false;

      activeTarget = target;
      startX = x;
      startY = y;

      activeTarget.classList.add('creator-holding');

      timer = setTimeout(() => {
        timer = null;
        triggered = true;

        if (activeTarget) {
          activeTarget.classList.remove('creator-holding');
          activeTarget = null;
        }

        if (navigator.vibrate) {
          navigator.vibrate(35);
        }

        openConsole();
      }, HOLD_TIME);
    }

    function moveHold(x, y) {
      if (!timer) return;

      if (
        Math.abs(x - startX) > MOVE_LIMIT ||
        Math.abs(y - startY) > MOVE_LIMIT
      ) {
        clearHold();
      }
    }

    document.addEventListener('touchstart', event => {
      const target = event.target.closest(LOGO_SELECTOR);
      if (!target) return;

      const touch = event.touches[0];
      if (!touch) return;

      startHold(target, touch.clientX, touch.clientY);
    }, { passive: true });

    document.addEventListener('touchmove', event => {
      const touch = event.touches[0];

      if (touch) {
        moveHold(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    document.addEventListener('touchend', clearHold, { passive: true });
    document.addEventListener('touchcancel', clearHold, { passive: true });

    document.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch' || event.button !== 0) return;

      const target = event.target.closest(LOGO_SELECTOR);
      if (!target) return;

      startHold(target, event.clientX, event.clientY);
    }, true);

    document.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;

      moveHold(event.clientX, event.clientY);
    }, true);

    document.addEventListener('pointerup', clearHold, true);
    document.addEventListener('pointercancel', clearHold, true);

    document.addEventListener('click', event => {
      if (!triggered) return;

      event.preventDefault();
      event.stopPropagation();
      triggered = false;
    }, true);

    document.addEventListener('contextmenu', event => {
      if (!triggered) return;

      event.preventDefault();
      triggered = false;
    }, true);
  }

  function addFloatingButton() {
    if (!creator || document.querySelector('.creator-fab')) {
      return;
    }

    const button = el('button', 'creator-fab', '✦');

    button.id = 'quello-creator-floating';
    button.type = 'button';
    button.title = tr('button');
    button.setAttribute('aria-label', tr('button'));

    button.addEventListener('click', openConsole);

    document.body.appendChild(button);
  }

  function refreshLabels() {
    const wasOpen = Boolean(drawer);

    if (drawer) {
      drawer.remove();
      drawer = null;
      body = null;
    }

    const oldButton = document.querySelector(
      '[data-creator-console-entry]'
    );

    if (oldButton) {
      const divider = oldButton.previousElementSibling;
      const label = divider?.previousElementSibling;

      oldButton.remove();
      divider?.remove();
      label?.remove();
    }

    if (creator) {
      addSidebarButton();
      addFloatingButton();
    }

    if (wasOpen) {
      makeDrawer();
      drawer.classList.add('open');
      document.body.classList.add('creator-console-open');
      render();
    }
  }

  function scheduleLabelRefresh() {
    clearTimeout(labelRefreshTimer);

    labelRefreshTimer = setTimeout(() => {
      refreshLabels();
    }, 100);
  }

  const languageObserver = new MutationObserver(() => {
    scheduleLabelRefresh();
  });

  languageObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  window.addEventListener('storage', event => {
    if (event.key === TOKEN_KEY) {
      verifyCreator();
    }

    if (event.key === LANG_KEY) {
      scheduleLabelRefresh();
    }
  });

  installLongPress();

  document.addEventListener('DOMContentLoaded', () => {
    verifyCreator();
  });

  window.addEventListener('error', event => {
    console.error(
      '[Quello Creator Console] JavaScript error:',
      event.error || event.message
    );
  });

  window.addEventListener('unhandledrejection', event => {
    console.error(
      '[Quello Creator Console] Unhandled promise rejection:',
      event.reason
    );
  });

  if (document.readyState !== 'loading') {
    verifyCreator();
  }

})();