/* Quello Hidden Admin Console — shared across Documentation, Dashboard and About. */
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
      button:'Admin Console',
      section:'ADMIN',
      title:'Admin Console',
      sub:'Private workspace · Quello ecosystem',
      overview:'System Overview',
      announcements:'Announcements', newAnnouncement:'New announcement', editAnnouncement:'Edit announcement', titleField:'Title', descriptionField:'Description', colorField:'Embed color (optional)', urlField:'Link URL (optional)', imageField:'Image URL (optional)', thumbnailField:'Thumbnail URL (optional)', authorField:'Author (optional)', footerField:'Footer (optional)', extraFields:'Additional fields', addField:'Add field', fieldName:'Field name', fieldValue:'Field value', inlineField:'Inline', publishAnnouncement:'Publish to configured servers', saveChanges:'Save changes', cancelEdit:'Cancel', edit:'Edit', delete:'Delete', noAnnouncements:'No announcements yet.', confirmDelete:'Delete this announcement from every server where it was published?', announcementPublished:'Announcement published. Sent: {sent}; failed: {failed}; skipped: {skipped}.', announcementUpdated:'Announcement updated on {updated} servers; {failed} failed.', announcementDeleted:'Announcement deleted from {deleted} servers.', announcementPartialDelete:'Some copies could not be deleted. Fix permissions and retry.', optionalChannelNote:'Only servers with an Announcement Channel configured receive announcements.',
      appearance:'Appearance Lab',
      developer:'Developer Tools',
      localization:'Localization Lab',
      debug:'Console & Debug',
      experiments:'Experimental Features',
      close:'Close',
      refresh:'Refresh',
      logout:'Sign out',
      login:'Sign in with Discord',
      denied:'Admin access is not available for this account.',
      offline:'The Quello API is unavailable. Check API_BASE in site-config.js.',
      loading:'Loading admin data…',
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
      mfaNote:'Additional factors are not configured in this build. Admin Console endpoints still enforce the configured BOT_OWNER_ID server-side.',
      hidden:'The console is hidden from regular visitors. Use Ctrl + Shift + K or hold the Quello logo for 2 seconds.'
    },

    ru: {
      signin:'Сначала войдите через Discord — перенаправляю…',
      hold:'Держите…',
      button:'Панель администратора',
      section:'АДМИНИСТРАТОР',
      title:'Панель администратора',
      sub:'Закрытое пространство · экосистема Quello',
      overview:'Обзор системы',
      announcements:'Объявления', newAnnouncement:'Новое объявление', editAnnouncement:'Редактирование объявления', titleField:'Заголовок', descriptionField:'Описание', colorField:'Цвет Embed (необязательно)', urlField:'Ссылка (необязательно)', imageField:'URL изображения (необязательно)', thumbnailField:'URL миниатюры (необязательно)', authorField:'Автор (необязательно)', footerField:'Подпись (необязательно)', extraFields:'Дополнительные поля', addField:'Добавить поле', fieldName:'Название поля', fieldValue:'Значение поля', inlineField:'В строку', publishAnnouncement:'Опубликовать на настроенных серверах', saveChanges:'Сохранить изменения', cancelEdit:'Отмена', edit:'Изменить', delete:'Удалить', noAnnouncements:'Объявлений пока нет.', confirmDelete:'Удалить это объявление на всех серверах, где оно опубликовано?', announcementPublished:'Объявление опубликовано. Отправлено: {sent}; ошибок: {failed}; пропущено: {skipped}.', announcementUpdated:'Объявление обновлено на {updated} серверах; ошибок: {failed}.', announcementDeleted:'Объявление удалено на {deleted} серверах.', announcementPartialDelete:'Некоторые копии удалить не удалось. Проверь права и повтори попытку.', optionalChannelNote:'Объявления получают только серверы с настроенным каналом объявлений.',
      appearance:'Лаборатория оформления',
      developer:'Инструменты разработчика',
      localization:'Лаборатория локализации',
      debug:'Консоль и отладка',
      experiments:'Экспериментальные функции',
      close:'Закрыть',
      refresh:'Обновить',
      logout:'Выйти',
      login:'Войти через Discord',
      denied:'Для этого аккаунта нет доступа к панели администратора.',
      offline:'API Quello недоступен. Проверьте API_BASE в site-config.js.',
      loading:'Загрузка данных панели администратора…',
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
      mfaNote:'Дополнительные факторы в этой сборке ещё не настроены. Доступ к Admin Console по-прежнему проверяется на сервере по BOT_OWNER_ID.',
      hidden:'Консоль скрыта от обычных посетителей. Используйте Ctrl + Shift + K или удерживайте логотип Quello 2 секунды.'
    },

    de: {
      signin:'Bitte zuerst mit Discord anmelden — Weiterleitung…',
      hold:'Weiter gedrückt halten…',
      button:'Admin-Konsole',
      section:'ADMIN',
      title:'Admin-Konsole',
      sub:'Privater Bereich · Quello-Ökosystem',
      overview:'Systemübersicht',
      announcements:'Ankündigungen', newAnnouncement:'Neue Ankündigung', editAnnouncement:'Ankündigung bearbeiten', titleField:'Titel', descriptionField:'Beschreibung', colorField:'Embed-Farbe (optional)', urlField:'Link-URL (optional)', imageField:'Bild-URL (optional)', thumbnailField:'Thumbnail-URL (optional)', authorField:'Autor (optional)', footerField:'Fußzeile (optional)', extraFields:'Zusätzliche Felder', addField:'Feld hinzufügen', fieldName:'Feldname', fieldValue:'Feldwert', inlineField:'Inline', publishAnnouncement:'Auf konfigurierten Servern veröffentlichen', saveChanges:'Änderungen speichern', cancelEdit:'Abbrechen', edit:'Bearbeiten', delete:'Löschen', noAnnouncements:'Noch keine Ankündigungen.', confirmDelete:'Diese Ankündigung auf allen Servern löschen, auf denen sie veröffentlicht wurde?', announcementPublished:'Ankündigung veröffentlicht. Gesendet: {sent}; fehlgeschlagen: {failed}; übersprungen: {skipped}.', announcementUpdated:'Auf {updated} Servern aktualisiert; {failed} fehlgeschlagen.', announcementDeleted:'Auf {deleted} Servern gelöscht.', announcementPartialDelete:'Einige Kopien konnten nicht gelöscht werden. Berechtigungen prüfen und erneut versuchen.', optionalChannelNote:'Nur Server mit konfiguriertem Ankündigungskanal erhalten Ankündigungen.',
      appearance:'Design-Labor',
      developer:'Entwicklerwerkzeuge',
      localization:'Lokalisierungslabor',
      debug:'Konsole & Debug',
      experiments:'Experimentelle Funktionen',
      close:'Schließen',
      refresh:'Aktualisieren',
      logout:'Abmelden',
      login:'Mit Discord anmelden',
      denied:'Für dieses Konto ist kein Admin-Zugriff verfügbar.',
      offline:'Die Quello-API ist nicht erreichbar. Prüfe API_BASE in site-config.js.',
      loading:'Admin-Daten werden geladen…',
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
      mfaNote:'Zusätzliche Faktoren sind in diesem Build nicht eingerichtet. Admin-Endpunkte prüfen BOT_OWNER_ID weiterhin serverseitig.',
      hidden:'Die Konsole ist für normale Besucher verborgen. Ctrl + Shift + K drücken oder das Quello-Logo 2 Sekunden halten.'
    },

    fr: {
      signin:'Connectez-vous d’abord avec Discord — redirection…',
      hold:'Maintenez appuyé…',
      button:'Console d’administration',
      section:'ADMIN',
      title:'Console d’administration',
      sub:'Espace privé · écosystème Quello',
      overview:'Vue système',
      announcements:'Annonces', newAnnouncement:'Nouvelle annonce', editAnnouncement:'Modifier l’annonce', titleField:'Titre', descriptionField:'Description', colorField:'Couleur Embed (facultatif)', urlField:'URL du lien (facultatif)', imageField:'URL de l’image (facultatif)', thumbnailField:'URL de la miniature (facultatif)', authorField:'Auteur (facultatif)', footerField:'Pied de page (facultatif)', extraFields:'Champs supplémentaires', addField:'Ajouter un champ', fieldName:'Nom du champ', fieldValue:'Valeur du champ', inlineField:'En ligne', publishAnnouncement:'Publier sur les serveurs configurés', saveChanges:'Enregistrer', cancelEdit:'Annuler', edit:'Modifier', delete:'Supprimer', noAnnouncements:'Aucune annonce pour le moment.', confirmDelete:'Supprimer cette annonce de tous les serveurs où elle a été publiée ?', announcementPublished:'Annonce publiée. Envoyées : {sent} ; échecs : {failed} ; ignorées : {skipped}.', announcementUpdated:'Annonce mise à jour sur {updated} serveurs ; {failed} échecs.', announcementDeleted:'Annonce supprimée sur {deleted} serveurs.', announcementPartialDelete:'Certaines copies n’ont pas pu être supprimées. Vérifiez les permissions et réessayez.', optionalChannelNote:'Seuls les serveurs ayant configuré un salon d’annonces les reçoivent.',
      appearance:'Atelier visuel',
      developer:'Outils développeur',
      localization:'Atelier de localisation',
      debug:'Console et débogage',
      experiments:'Fonctionnalités expérimentales',
      close:'Fermer',
      refresh:'Actualiser',
      logout:'Déconnexion',
      login:'Se connecter avec Discord',
      denied:'Ce compte ne dispose pas des droits d’administration.',
      offline:'L’API Quello est inaccessible. Vérifiez API_BASE dans site-config.js.',
      loading:'Chargement des données administrateur…',
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
      mfaNote:'Les facteurs supplémentaires ne sont pas configurés dans cette version. Les points d’accès Admin Console vérifient toujours BOT_OWNER_ID côté serveur.',
      hidden:'La console est masquée aux visiteurs. Utilisez Ctrl + Shift + K ou maintenez le logo Quello pendant 2 secondes.'
    },

    it: {
      signin:'Accedi prima con Discord — reindirizzamento…',
      hold:'Continua a tenere premuto…',
      button:'Console di amministrazione',
      section:'ADMIN',
      title:'Console di amministrazione',
      sub:'Spazio privato · ecosistema Quello',
      overview:'Panoramica sistema',
      announcements:'Annunci', newAnnouncement:'Nuovo annuncio', editAnnouncement:'Modifica annuncio', titleField:'Titolo', descriptionField:'Descrizione', colorField:'Colore Embed (facoltativo)', urlField:'URL del collegamento (facoltativo)', imageField:'URL immagine (facoltativo)', thumbnailField:'URL miniatura (facoltativo)', authorField:'Autore (facoltativo)', footerField:'Piè di pagina (facoltativo)', extraFields:'Campi aggiuntivi', addField:'Aggiungi campo', fieldName:'Nome campo', fieldValue:'Valore campo', inlineField:'In linea', publishAnnouncement:'Pubblica sui server configurati', saveChanges:'Salva modifiche', cancelEdit:'Annulla', edit:'Modifica', delete:'Elimina', noAnnouncements:'Nessun annuncio al momento.', confirmDelete:'Eliminare questo annuncio da tutti i server in cui è stato pubblicato?', announcementPublished:'Annuncio pubblicato. Inviati: {sent}; non riusciti: {failed}; ignorati: {skipped}.', announcementUpdated:'Annuncio aggiornato su {updated} server; {failed} errori.', announcementDeleted:'Annuncio eliminato da {deleted} server.', announcementPartialDelete:'Impossibile eliminare alcune copie. Controlla i permessi e riprova.', optionalChannelNote:'Gli annunci vengono inviati solo ai server con un canale annunci configurato.',
      appearance:'Laboratorio aspetto',
      developer:'Strumenti sviluppatore',
      localization:'Laboratorio localizzazione',
      debug:'Console e debug',
      experiments:'Funzioni sperimentali',
      close:'Chiudi',
      refresh:'Aggiorna',
      logout:'Esci',
      login:'Accedi con Discord',
      denied:'Questo account non dispone dei permessi di amministrazione.',
      offline:'API Quello non raggiungibile. Controlla API_BASE in site-config.js.',
      loading:'Caricamento dati amministratore…',
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
      mfaNote:'I fattori aggiuntivi non sono configurati in questa build. Gli endpoint Admin Console verificano comunque BOT_OWNER_ID lato server.',
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
  let announcements = [];
  let editingAnnouncement = null;
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

  async function request(path, options = {}) {
    const tk = token();

    if (!API || /example\.com/i.test(API)) {
      throw new Error(tr('offline'));
    }

    if (!tk) {
      throw new Error(tr('denied'));
    }

    let response;

    try {
      const headers = {
        'Authorization': 'Bearer ' + tk,
        'Accept': 'application/json'
      };
      if (options.body !== undefined) headers['Content-Type'] = 'application/json';
      response = await fetch(API + path, {
        method: options.method || 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        cache: 'no-store'
      });
    } catch (error) {
      console.error('[Quello Admin Console] Fetch failed:', path, error);

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
    const label = el('div', 'side-section-label', tr('section'));
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
      ['announcements', 'announcements'],
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
        if (id === 'announcements') loadAnnouncements();
        else render();
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
        card(tr('api'), 'ONLINE', 'Admin API responded'),
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

    } else if (active === 'announcements') {
      renderAnnouncements();

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

  function renderAnnouncements() {
    if (!body) return;
    body.replaceChildren();
    const form = el('article', 'creator-note');
    form.append(el('h3', '', editingAnnouncement ? tr('editAnnouncement') : tr('newAnnouncement')));
    form.append(el('p', 'creator-muted', tr('optionalChannelNote')));

    const controls = {};
    const addInput = (key, label, value, type = 'text', multiline = false) => {
      const wrap = el('label', 'creator-form-field');
      wrap.append(el('span', '', label));
      const control = multiline ? el('textarea', 'creator-form-control') : el('input', 'creator-form-control');
      if (!multiline) control.type = type;
      control.value = value || '';
      control.maxLength = key === 'description' ? 4096 : 500;
      controls[key] = control;
      wrap.append(control);
      form.append(wrap);
    };
    const p = editingAnnouncement?.payload || {};
    addInput('title', tr('titleField'), p.title || '');
    addInput('description', tr('descriptionField'), p.description || '', 'text', true);
    addInput('color', tr('colorField'), p.color ? '#' + Number(p.color).toString(16).padStart(6, '0') : '');
    addInput('url', tr('urlField'), p.url || '', 'url');
    addInput('image', tr('imageField'), p.image || '', 'url');
    addInput('thumbnail', tr('thumbnailField'), p.thumbnail || '', 'url');
    addInput('author', tr('authorField'), p.author || '');
    addInput('footer', tr('footerField'), p.footer || '');

    const fieldsBox = el('div', 'creator-announcement-fields');
    fieldsBox.append(el('h4', '', tr('extraFields')));
    const fieldRows = [];
    const addFieldRow = (item = {}) => {
      const row = el('div', 'creator-announcement-field-row');
      const name = el('input', 'creator-form-control'); name.placeholder = tr('fieldName'); name.value = item.name || ''; name.maxLength = 256;
      const value = el('textarea', 'creator-form-control'); value.placeholder = tr('fieldValue'); value.value = item.value || ''; value.maxLength = 1024;
      const inlineLabel = el('label', 'creator-inline-label');
      const inline = el('input'); inline.type = 'checkbox'; inline.checked = !!item.inline;
      inlineLabel.append(inline, el('span', '', tr('inlineField')));
      const remove = el('button', 'creator-secondary', '×'); remove.type = 'button'; remove.setAttribute('aria-label', tr('delete'));
      remove.addEventListener('click', () => { row.remove(); const index = fieldRows.indexOf(row); if (index >= 0) fieldRows.splice(index, 1); });
      row.append(name, value, inlineLabel, remove);
      fieldRows.push(row); fieldsBox.append(row);
    };
    (p.fields || []).forEach(addFieldRow);
    const addField = el('button', 'creator-secondary', tr('addField')); addField.type = 'button'; addField.addEventListener('click', () => addFieldRow());
    fieldsBox.append(addField); form.append(fieldsBox);

    const actions = el('div', 'creator-button-row');
    const save = el('button', 'creator-primary', editingAnnouncement ? tr('saveChanges') : tr('publishAnnouncement'));
    save.type = 'button';
    save.addEventListener('click', async () => {
      const fields = fieldRows.map(row => {
        const inputs = row.querySelectorAll('input,textarea');
        return { name: inputs[0].value.trim(), value: inputs[1].value.trim(), inline: inputs[2].checked };
      }).filter(item => item.name || item.value);
      const payload = {
        title: controls.title.value.trim() || null,
        description: controls.description.value.trim() || null,
        color: controls.color.value.trim() || null,
        url: controls.url.value.trim() || null,
        image: controls.image.value.trim() || null,
        thumbnail: controls.thumbnail.value.trim() || null,
        author: controls.author.value.trim() || null,
        footer: controls.footer.value.trim() || null,
        fields
      };
      if (!payload.title && !payload.description) { toast(tr('titleField') + ' / ' + tr('descriptionField')); return; }
      save.disabled = true;
      try {
        if (editingAnnouncement) {
          const result = await request('/api/creator/announcements/' + editingAnnouncement.id, { method: 'PATCH', body: payload });
          toast(tr('announcementUpdated').replace('{updated}', result.updated).replace('{failed}', result.failed));
          editingAnnouncement = null;
        } else {
          const result = await request('/api/creator/announcements', { method: 'POST', body: payload });
          toast(tr('announcementPublished').replace('{sent}', result.counts.sent).replace('{failed}', result.counts.failed).replace('{skipped}', result.counts.skipped));
        }
        await loadAnnouncements();
      } catch (error) { toast(error.message || tr('offline')); save.disabled = false; }
    });
    actions.append(save);
    if (editingAnnouncement) {
      const cancel = el('button', 'creator-secondary', tr('cancelEdit')); cancel.type = 'button';
      cancel.addEventListener('click', () => { editingAnnouncement = null; renderAnnouncements(); });
      actions.append(cancel);
    }
    form.append(actions);
    body.append(form);

    const list = el('section', 'creator-note');
    list.append(el('h3', '', tr('announcements')));
    if (!announcements.length) list.append(el('p', 'creator-muted', tr('noAnnouncements')));
    announcements.forEach(item => {
      const cardNode = el('article', 'creator-announcement-card');
      const payload = item.payload || {};
      cardNode.append(el('strong', '', payload.title || payload.description || ('#' + item.id)));
      const delivery = item.deliveries || [];
      const sent = delivery.filter(x => x.status === 'sent').length;
      const failed = delivery.filter(x => x.status !== 'sent').length;
      cardNode.append(el('small', 'creator-muted', `#${item.id} · ${sent} sent · ${failed} unavailable`));
      delivery.filter(x => x.status !== 'sent').forEach(copy => {
        const where = copy.guild_name || copy.guild_id;
        cardNode.append(el('small', 'creator-error', `${where}: ${copy.status}${copy.error ? ' · ' + copy.error : ''}`));
      });
      const row = el('div', 'creator-button-row');
      const edit = el('button', 'creator-secondary', tr('edit')); edit.type = 'button';
      edit.addEventListener('click', () => { editingAnnouncement = item; renderAnnouncements(); });
      const remove = el('button', 'creator-secondary', tr('delete')); remove.type = 'button';
      remove.addEventListener('click', async () => {
        if (!window.confirm(tr('confirmDelete'))) return;
        remove.disabled = true;
        try {
          const result = await request('/api/creator/announcements/' + item.id, { method: 'DELETE' });
          if (result.removed) { toast(tr('announcementDeleted').replace('{deleted}', result.deleted)); await loadAnnouncements(); }
          else { toast(tr('announcementPartialDelete')); await loadAnnouncements(); }
        } catch (error) { toast(error.message || tr('offline')); remove.disabled = false; }
      });
      row.append(edit, remove); cardNode.append(row); list.append(cardNode);
    });
    const refresh = el('button', 'creator-secondary', tr('refresh')); refresh.type = 'button'; refresh.addEventListener('click', loadAnnouncements);
    list.append(refresh); body.append(list);
  }

  async function loadAnnouncements() {
    if (body) body.replaceChildren(el('p', 'creator-muted', tr('loading')));
    try {
      const data = await request('/api/creator/announcements');
      announcements = data.announcements || [];
      renderAnnouncements();
    } catch (error) {
      if (body) body.replaceChildren(el('p', 'creator-error', error.message));
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
      console.error('[Quello Admin Console] Overview failed:', error);

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

        return response.ok ? data : null;

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

      return null;
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
    const diag = await testEndpoint('/api/creator/diagnostics');

    if (diag && diag.checks) {
      Object.entries(diag.checks).forEach(([name, check]) => {
        if (name === 'schedules') return;
        add(check.ok === false ? 'FAIL' : 'PASS', `check ${name}`);
      });

      const sch = diag.checks.schedules;

      if (sch && sch.ok && sch.data) {
        add(
          sch.data.llm_key_configured ? 'PASS' : 'FAIL',
          `LLM key: ${sch.data.llm_key_configured ? 'configured' : 'MISSING (GROQ_API_KEY)'} · ${sch.data.llm_host}`
        );

        if (!sch.data.guilds.length) {
          add('INFO', 'No servers have scheduled QOTD enabled');
        }

        sch.data.guilds.forEach(g => {
          add(
            'INFO',
            `Schedule ${g.guild}: next ${g.next_run_at || 'not set'} · every ${g.interval_hours}h · retries ${g.retry_count}`
          );

          if (!g.configured) add('FAIL', `${g.guild}: /setup not completed`);
          if (g.maintenance) add('FAIL', `${g.guild}: maintenance mode blocks publishing`);
          if (g.lock) add('FAIL', `${g.guild}: lock mode blocks publishing`);

          (g.errors || []).forEach(e => {
            add('FAIL', `${g.guild} · ${e.name} · ${e.created_at}: ${e.details}`);
          });
        });
      } else if (sch) {
        add('FAIL', 'schedules check failed: ' + (sch.error || 'unknown'));
      }
    }

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
      console.error('[Quello Admin Console] Access check failed:', error);
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
      console.warn('[Quello Admin Console] Verification failed:', error);
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
      if (triggered) {
        event.preventDefault();
        triggered = false;
        return;
      }

      // Mobile browsers open the link/image menu after ~0.5 s of holding,
      // long before the 2 s timer fires; block it on the logo for the creator
      // so the hold can finish. Everyone else keeps the normal browser menu.
      if (creator && event.target.closest && event.target.closest(LOGO_SELECTOR)) {
        event.preventDefault();
      }
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
      '[Quello Admin Console] JavaScript error:',
      event.error || event.message
    );
  });

  window.addEventListener('unhandledrejection', event => {
    console.error(
      '[Quello Admin Console] Unhandled promise rejection:',
      event.reason
    );
  });

  if (document.readyState !== 'loading') {
    verifyCreator();
  }

})();