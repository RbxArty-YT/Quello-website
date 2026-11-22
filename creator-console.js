/* Copyright (c) 2026 Quello. All rights reserved. */
/* Quello Hidden Admin Panel — shared across Documentation, Dashboard and About. */
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
      button:'Admin Panel',
      section:'ADMIN',
      title:'Admin Panel',
      sub:'Private workspace · Quello ecosystem',
      overview:'System Overview', ownerActions:'Owner Actions',
      developerTeamActions:'Developer Actions',
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
      devTeam:'Developer Team',
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
      mfaNote:'Additional factors are not configured in this build. Admin Panel endpoints still verify Bot Owner, Developer Team Owner, Admin or Developer access server-side.',
      globalLogs:'Global Logs', globalAudit:'Global Audit Logs', guild:'Server', action:'Action', event:'Event', status:'Status', user:'User', details:'Details', time:'Time', noEntries:'No log entries.', loadMore:'Load more',
      hidden:'The console is hidden from regular visitors. Use Ctrl + Shift + K or hold the Quello logo for 2 seconds.'
    },

    ru: {
      signin:'Сначала войдите через Discord — перенаправляю…',
      hold:'Держите…',
      button:'Админ панель',
      section:'АДМИНИСТРАТОР',
      title:'Админ панель',
      sub:'Закрытое пространство · экосистема Quello',
      overview:'Обзор системы', ownerActions:'Действия владельца',
      developerTeamActions:'Действия разработчика',
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
      denied:'Для этого аккаунта нет доступа к Админ панели.',
      offline:'API Quello недоступен. Проверьте API_BASE в site-config.js.',
      loading:'Загрузка данных Админ панели…',
      devTeam:'Команда разработчиков',
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
      mfaNote:'Дополнительные факторы в этой сборке ещё не настроены. Доступ к Админ панели по-прежнему проверяется на сервере: Bot Owner, владелец Developer Team, Admin или Developer.',
      globalLogs:'Глобальные логи', globalAudit:'Глобальный аудит', guild:'Сервер', action:'Действие', event:'Событие', status:'Статус', user:'Пользователь', details:'Подробности', time:'Время', noEntries:'Записей нет.', loadMore:'Загрузить ещё',
      hidden:'Консоль скрыта от обычных посетителей. Используйте Ctrl + Shift + K или удерживайте логотип Quello 2 секунды.'
    },

    de: {
      signin:'Bitte zuerst mit Discord anmelden — Weiterleitung…',
      hold:'Weiter gedrückt halten…',
      button:'Admin-Panel',
      section:'ADMIN',
      title:'Admin-Panel',
      sub:'Privater Bereich · Quello-Ökosystem',
      overview:'Systemübersicht', ownerActions:'Owner-Aktionen',
      developerTeamActions:'Entwickleraktionen',
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
      devTeam:'Developer-Team',
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
      mfaNote:'Zusätzliche Faktoren sind in diesem Build nicht konfiguriert. Der Zugriff auf das Admin-Panel wird weiterhin serverseitig für Bot Owner, Developer-Team-Owner, Admin oder Developer geprüft.',
      globalLogs:'Globale Logs', globalAudit:'Globales Audit-Protokoll', guild:'Server', action:'Aktion', event:'Ereignis', status:'Status', user:'Benutzer', details:'Details', time:'Zeit', noEntries:'Keine Logeinträge.', loadMore:'Mehr laden',
      hidden:'Die Konsole ist für normale Besucher verborgen. Ctrl + Shift + K drücken oder das Quello-Logo 2 Sekunden halten.'
    },

    fr: {
      signin:'Connectez-vous d’abord avec Discord — redirection…',
      hold:'Maintenez appuyé…',
      button:'Panneau d’administration',
      section:'ADMIN',
      title:'Panneau d’administration',
      sub:'Espace privé · écosystème Quello',
      overview:'Vue système', ownerActions:'Actions du propriétaire',
      developerTeamActions:'Actions développeur',
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
      devTeam:'Équipe de développeurs',
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
      mfaNote:'Les facteurs supplémentaires ne sont pas configurés dans cette version. Les points d’accès du panneau d’administration vérifient toujours côté serveur le Bot Owner, le Team Owner, les Admin et les Developer.',
      globalLogs:'Journaux globaux', globalAudit:'Audit global', guild:'Serveur', action:'Action', event:'Événement', status:'Statut', user:'Utilisateur', details:'Détails', time:'Heure', noEntries:'Aucune entrée de journal.', loadMore:'Charger plus',
      hidden:'La console est masquée aux visiteurs. Utilisez Ctrl + Shift + K ou maintenez le logo Quello pendant 2 secondes.'
    },

    it: {
      signin:'Accedi prima con Discord — reindirizzamento…',
      hold:'Continua a tenere premuto…',
      button:'Pannello di amministrazione',
      section:'ADMIN',
      title:'Pannello di amministrazione',
      sub:'Spazio privato · ecosistema Quello',
      overview:'Panoramica sistema', ownerActions:'Azioni proprietario',
      developerTeamActions:'Azioni sviluppatore',
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
      devTeam:'Team di sviluppatori',
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
      mfaNote:'I fattori aggiuntivi non sono configurati in questa build. Gli endpoint del pannello di amministrazione verificano comunque lato server Bot Owner, Team Owner, Admin o Developer.',
      globalLogs:'Log globali', globalAudit:'Audit globale', guild:'Server', action:'Azione', event:'Evento', status:'Stato', user:'Utente', details:'Dettagli', time:'Ora', noEntries:'Nessuna voce di log.', loadMore:'Carica altro',
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
  let accessRole = null;
  let errorLog = [];
  let toastTimer = null;
  let labelRefreshTimer = null;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  };

  const ownerText = (key) => {
    const language = lang();
    const words = {
      en:{teamRole:'Developer Team role',teamScope:'Developer Actions scope',teamScopeDescription:'The Bot Owner, the verified Team Owner and accepted Team Admins and Developers all have System Overview, Announcements, Owner Actions and Developer Actions. Access is verified server-side against the Discord Developer Team.',ownerActions:'Owner Actions',technical:'Technical Work Mode',sessions:'Dashboard Sessions',enabled:'Enabled',disabled:'Disabled',reason:'Reason for technical work',end:'End time (Unix timestamp, optional)',turnOn:'Enable mode',turnOff:'Disable mode',refresh:'Refresh',revoke:'End session',none:'No active Dashboard sessions.',until:'Ends',user:'User',expires:'Expires',confirm:'End this user session? ',saved:'Technical Work Mode updated.',duration:'Duration',noEnd:'Until I disable it',remaining:'Remaining',unitMin:'min',unitHour:'h',unitDay:'d',failedSessions:'Dashboard sessions could not be loaded.',colName:'Nickname',colRole:'Role',colStatus:'Status',statusPending:'Pending acceptance',roleOwner:'Owner',roleAdmin:'Admin',roleDeveloper:'Developer',roleReadOnly:'Read-only',teamEmpty:'No Developer Team is set up for this application.',teamHint:'Members as listed in the Discord Developer Portal.',endAll:'End all sessions of this user',thisSession:'This session',confirmEnd:'Tap again to confirm',signedIn:'Signed in',ended:'Session ended.',endedMany:'Sessions ended: ',nothingEnded:'That session had already ended.'},
      ru:{teamRole:'Роль в Developer Team',teamScope:'Область Developer Actions',teamScopeDescription:'Bot Owner, подтверждённый владелец команды, а также принятые Admin и Developer из Developer Team имеют доступ к обзору системы, объявлениям, действиям владельца и действиям разработчика. Доступ проверяется на сервере по Discord Developer Team.',ownerActions:'Действия владельца',technical:'Режим технических работ',sessions:'Сессии Dashboard',enabled:'Включён',disabled:'Выключен',reason:'Причина технических работ',end:'Время окончания (Unix timestamp, необязательно)',turnOn:'Включить режим',turnOff:'Выключить режим',refresh:'Обновить',revoke:'Завершить сессию',none:'Активных сессий Dashboard нет.',until:'До',user:'Пользователь',expires:'Истекает',confirm:'Завершить эту сессию пользователя?',saved:'Режим технических работ обновлён.',duration:'Длительность',noEnd:'Пока я не выключу',remaining:'Осталось',unitMin:'мин',unitHour:'ч',unitDay:'д',failedSessions:'Не удалось загрузить сессии Dashboard.',colName:'Ник',colRole:'Роль',colStatus:'Статус',statusPending:'Ожидает принятия',roleOwner:'Владелец',roleAdmin:'Admin',roleDeveloper:'Developer',roleReadOnly:'Только чтение',teamEmpty:'Для этого приложения не настроена команда разработчиков.',teamHint:'Участники как в Discord Developer Portal.',endAll:'Завершить все сессии пользователя',thisSession:'Эта сессия',confirmEnd:'Нажмите ещё раз для подтверждения',signedIn:'Вход',ended:'Сессия завершена.',endedMany:'Завершено сессий: ',nothingEnded:'Эта сессия уже была завершена.'},
      de:{teamRole:'Developer-Team-Rolle',teamScope:'Umfang der Entwickleraktionen',teamScopeDescription:'Bot Owner, verifizierter Team Owner sowie akzeptierte Admins und Developer des Teams haben Zugriff auf Systemübersicht, Ankündigungen, Owner-Aktionen und Entwickleraktionen. Der Zugriff wird serverseitig anhand des Discord Developer Teams geprüft.',ownerActions:'Owner-Aktionen',technical:'Wartungsmodus',sessions:'Dashboard-Sitzungen',enabled:'Aktiviert',disabled:'Deaktiviert',reason:'Grund der Wartungsarbeiten',end:'Endzeit (Unix-Zeitstempel, optional)',turnOn:'Aktivieren',turnOff:'Deaktivieren',refresh:'Aktualisieren',revoke:'Sitzung beenden',none:'Keine aktiven Dashboard-Sitzungen.',until:'Bis',user:'Benutzer',expires:'Läuft ab',confirm:'Diese Sitzung beenden?',saved:'Wartungsmodus aktualisiert.',duration:'Dauer',noEnd:'Bis ich es deaktiviere',remaining:'Verbleibend',unitMin:'Min.',unitHour:'Std.',unitDay:'Tg.',failedSessions:'Dashboard-Sitzungen konnten nicht geladen werden.',colName:'Nickname',colRole:'Rolle',colStatus:'Status',statusPending:'Wartet auf Annahme',roleOwner:'Owner',roleAdmin:'Admin',roleDeveloper:'Developer',roleReadOnly:'Nur Lesen',teamEmpty:'Für diese Anwendung ist kein Developer Team eingerichtet.',teamHint:'Mitglieder wie im Discord Developer Portal aufgeführt.',endAll:'Alle Sitzungen dieses Nutzers beenden',thisSession:'Diese Sitzung',confirmEnd:'Zum Bestätigen erneut tippen',signedIn:'Angemeldet',ended:'Sitzung beendet.',endedMany:'Beendete Sitzungen: ',nothingEnded:'Diese Sitzung war bereits beendet.'},
      fr:{teamRole:'Rôle Developer Team',teamScope:'Portée des actions développeur',teamScopeDescription:'Le Bot Owner, le Team Owner vérifié ainsi que les Admin et Developer acceptés ont accès à l’aperçu du système, aux annonces, aux actions du propriétaire et aux actions développeur. L’accès est vérifié côté serveur via la Developer Team Discord.',ownerActions:'Actions du propriétaire',technical:'Mode maintenance',sessions:'Sessions Dashboard',enabled:'Activé',disabled:'Désactivé',reason:'Motif de maintenance',end:'Heure de fin (horodatage Unix, facultatif)',turnOn:'Activer',turnOff:'Désactiver',refresh:'Actualiser',revoke:'Terminer la session',none:'Aucune session Dashboard active.',until:'Jusqu’à',user:'Utilisateur',expires:'Expire',confirm:'Terminer cette session ?',saved:'Mode maintenance mis à jour.',duration:'Durée',noEnd:'Jusqu’à désactivation manuelle',remaining:'Restant',unitMin:'min',unitHour:'h',unitDay:'j',failedSessions:'Impossible de charger les sessions Dashboard.',colName:'Pseudo',colRole:'Rôle',colStatus:'Statut',statusPending:'En attente d’acceptation',roleOwner:'Propriétaire',roleAdmin:'Admin',roleDeveloper:'Developer',roleReadOnly:'Lecture seule',teamEmpty:'Aucune Developer Team n’est configurée pour cette application.',teamHint:'Membres tels que listés dans le Discord Developer Portal.',endAll:'Terminer toutes les sessions de cet utilisateur',thisSession:'Cette session',confirmEnd:'Touchez à nouveau pour confirmer',signedIn:'Connexion',ended:'Session terminée.',endedMany:'Sessions terminées : ',nothingEnded:'Cette session était déjà terminée.'},
      it:{teamRole:'Ruolo Developer Team',teamScope:'Ambito Developer Actions',teamScopeDescription:'Bot Owner, Team Owner verificato e Admin e Developer accettati hanno accesso a panoramica del sistema, annunci, azioni proprietario e azioni sviluppatore. L’accesso è verificato lato server tramite il Developer Team Discord.',ownerActions:'Azioni proprietario',technical:'Modalità manutenzione',sessions:'Sessioni Dashboard',enabled:'Attiva',disabled:'Disattiva',reason:'Motivo della manutenzione',end:'Ora di fine (timestamp Unix, facoltativo)',turnOn:'Attiva modalità',turnOff:'Disattiva modalità',refresh:'Aggiorna',revoke:'Termina sessione',none:'Nessuna sessione Dashboard attiva.',until:'Fino a',user:'Utente',expires:'Scade',confirm:'Terminare questa sessione?',saved:'Modalità manutenzione aggiornata.',duration:'Durata',noEnd:'Finché non la disattivo',remaining:'Rimanente',unitMin:'min',unitHour:'h',unitDay:'g',failedSessions:'Impossibile caricare le sessioni Dashboard.',colName:'Nickname',colRole:'Ruolo',colStatus:'Stato',statusPending:'In attesa di accettazione',roleOwner:'Proprietario',roleAdmin:'Admin',roleDeveloper:'Developer',roleReadOnly:'Sola lettura',teamEmpty:'Nessun Developer Team configurato per questa applicazione.',teamHint:'Membri come elencati nel Discord Developer Portal.',endAll:'Termina tutte le sessioni di questo utente',thisSession:'Questa sessione',confirmEnd:'Tocca di nuovo per confermare',signedIn:'Accesso',ended:'Sessione terminata.',endedMany:'Sessioni terminate: ',nothingEnded:'Questa sessione era già terminata.'}
    };
    return (words[language] || words.en)[key] || words.en[key] || key;
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
      console.error('[Quello Admin Panel] Fetch failed:', path, error);

      throw new Error(tr('offline'));
    }

    const raw = await response.text();
    let data = {};

    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (_) {
      data = { message: raw.slice(0, 300) };
    }

    if (!response.ok) {
      const error = new Error(
        data.message ||
        data.error ||
        `API error ${response.status}: ${response.statusText}`
      );
      error.status = response.status;
      throw error;
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
      ['owner-actions', 'ownerActions'],
      ['team-actions', 'developerTeamActions'],
      ['team', 'devTeam'],
      ['global-logs', 'globalLogs'],
      ['global-audit', 'globalAudit'],
      ['debug', 'debug']
    ];

    // Every Admin Panel role gets the shared workspace tabs. Global Logs and
    // Global Audit Logs are rendered only for the actual Bot Owner; the API
    // independently enforces this restriction.
    const sharedTabs = ['overview', 'announcements', 'owner-actions', 'team-actions', 'team'];
    sections.forEach(([id, key]) => {
      if (accessRole !== 'bot_owner' && !sharedTabs.includes(id)) return;
      const button = el('button', 'creator-tab', tr(key));
      button.type = 'button';
      button.dataset.tab = id;

      button.addEventListener('click', () => {
        active = id;
        markActiveTab();
        if (id === 'announcements') loadAnnouncements();
        else if (id === 'owner-actions') loadOwnerActions();
        else if (id === 'team-actions') loadTeamActions();
        else if (id === 'team') loadTeam();
        else if (id === 'global-logs') loadGlobalLogView('logs');
        else if (id === 'global-audit') loadGlobalLogView('audit');
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
    function markActiveTab() {
    if (!drawer) return;
    drawer.querySelectorAll('.creator-tab').forEach(button => {
      button.classList.toggle('active', button.dataset.tab === active);
    });
  }

  function render() {
    if (!body || !drawer) return;

    body.replaceChildren();
    markActiveTab();

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

    } else if (active === 'owner-actions') {
      loadOwnerActions();
      return;
    } else if (active === 'team-actions') {
      loadTeamActions();
      return;
    } else if (active === 'team') {
      loadTeam();
      return;
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
      body.append(el('p', 'creator-muted', tr('denied')));
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

  const TECHNICAL_DURATIONS = [15, 30, 60, 120, 360, 720, 1440, 4320, 10080];

  function durationLabel(minutes) {
    if (minutes % 1440 === 0) return `${minutes / 1440} ${ownerText('unitDay')}`;
    if (minutes % 60 === 0) return `${minutes / 60} ${ownerText('unitHour')}`;
    return `${minutes} ${ownerText('unitMin')}`;
  }

  function remainingLabel(endsAt, serverTime) {
    const seconds = Math.max(0, Number(endsAt) - Number(serverTime || Math.floor(Date.now() / 1000)));
    const minutes = Math.ceil(seconds / 60);
    if (minutes >= 1440) return `${Math.floor(minutes / 1440)} ${ownerText('unitDay')} ${Math.floor(minutes % 1440 / 60)} ${ownerText('unitHour')}`;
    if (minutes >= 60) return `${Math.floor(minutes / 60)} ${ownerText('unitHour')} ${minutes % 60} ${ownerText('unitMin')}`;
    return `${minutes} ${ownerText('unitMin')}`;
  }

  async function sendTechnicalWork(payload) {
    try {
      await request('/api/creator/technical-work', { method: 'PATCH', body: payload });
      toast(ownerText('saved'));
    } catch (error) {
      toast(error.message || tr('offline'));
    }
    loadOwnerActions();
  }

  async function loadOwnerActions() {
    if (!body) return;
    body.replaceChildren(el('p', 'creator-muted', tr('loading')));
    let work;
    let sessions = null;
    try {
      work = await request('/api/creator/technical-work');
    } catch (error) {
      body.replaceChildren(el('p', 'creator-error', error.message || tr('offline')));
      return;
    }
    try {
      sessions = await request('/api/creator/sessions');
    } catch (error) {
      console.error('[Quello Admin Panel] Sessions failed:', error);
    }

    body.replaceChildren();
    const state = work.technical_work || {};
    const box = el('article', 'creator-note');
    box.append(el('h3', '', ownerText('technical')));
    box.append(el('p', 'creator-muted', `${tr('status')}: ${state.enabled ? ownerText('enabled') : ownerText('disabled')}`));
    if (state.enabled && state.reason) box.append(el('p', '', state.reason));
    if (state.enabled && state.ends_at) {
      box.append(el('p', 'creator-muted',
        `${ownerText('until')}: ${new Date(state.ends_at * 1000).toLocaleString()} · ${ownerText('remaining')}: ${remainingLabel(state.ends_at, work.server_time)}`));
    }

    const reason = el('input', 'creator-input');
    reason.type = 'text';
    reason.maxLength = 300;
    reason.placeholder = ownerText('reason');
    reason.value = state.enabled ? (state.reason || '') : '';

    const durationLabelNode = el('label', 'creator-form-field');
    durationLabelNode.append(el('span', '', ownerText('duration')));
    const duration = el('select', 'creator-input');
    const noEnd = el('option', '', ownerText('noEnd'));
    noEnd.value = '';
    duration.append(noEnd);
    TECHNICAL_DURATIONS.forEach(minutes => {
      const option = el('option', '', durationLabel(minutes));
      option.value = String(minutes);
      duration.append(option);
    });
    durationLabelNode.append(duration);

    const actions = el('div', 'creator-button-row');
    const on = el('button', 'creator-primary', ownerText('turnOn'));
    on.type = 'button';
    on.addEventListener('click', () => {
      const text = reason.value.trim();
      if (!text) { toast(ownerText('reason')); reason.focus(); return; }
      on.disabled = true;
      const payload = { enabled: true, reason: text };
      if (duration.value) payload.duration_minutes = Number(duration.value);
      sendTechnicalWork(payload);
    });
    const off = el('button', 'creator-secondary', ownerText('turnOff'));
    off.type = 'button';
    off.disabled = !state.enabled;
    off.addEventListener('click', () => { off.disabled = true; sendTechnicalWork({ enabled: false }); });
    actions.append(on, off);
    box.append(reason, durationLabelNode, actions);
    body.append(box);

    const sessionBox = el('article', 'creator-note');
    sessionBox.append(el('h3', '', ownerText('sessions')));
    if (sessions === null) {
      sessionBox.append(el('p', 'creator-error', ownerText('failedSessions')));
    } else {
      const list = sessions.sessions || [];
      if (!list.length) sessionBox.append(el('p', 'creator-muted', ownerText('none')));
      const groups = new Map();
      list.forEach(item => {
        if (!groups.has(item.uid)) groups.set(item.uid, []);
        groups.get(item.uid).push(item);
      });
      groups.forEach((items, uid) => {
        const group = el('div', 'creator-session-group');
        const head = el('div', 'creator-session-row');
        head.append(el('strong', '', `${items[0].name} (${uid})`));
        if (items.length > 1) {
          head.append(confirmButton(ownerText('endAll'), () => endSessions({ user_id: uid })));
        }
        group.append(head);
        items.forEach(item => {
          const row = el('div', 'creator-session-row');
          const info = el('div');
          info.append(el('small', 'creator-muted',
            `${ownerText('signedIn')}: ${new Date(item.created_at * 1000).toLocaleString()} · ${ownerText('expires')}: ${new Date(item.expires_at * 1000).toLocaleString()}`));
          if (item.current) info.append(el('span', 'creator-badge', ownerText('thisSession')));
          row.append(info, confirmButton(ownerText('revoke'), () => endSessions({ session_id: item.sid })));
          group.append(row);
        });
        sessionBox.append(group);
      });
    }
    const refresh = el('button', 'creator-secondary', ownerText('refresh'));
    refresh.type = 'button';
    refresh.addEventListener('click', loadOwnerActions);
    sessionBox.append(refresh);
    body.append(sessionBox);
  }

  // Two-step button: the first tap arms it, the second tap within 4 seconds runs it.
  // (window.confirm() is silently blocked in some browsers, which made ending
  // sessions look like it did nothing.)
  function confirmButton(label, action) {
    const button = el('button', 'creator-secondary', label);
    button.type = 'button';
    let armed = null;
    button.addEventListener('click', () => {
      if (!armed) {
        button.textContent = ownerText('confirmEnd');
        button.classList.add('creator-danger');
        armed = setTimeout(() => { armed = null; button.textContent = label; button.classList.remove('creator-danger'); }, 4000);
        return;
      }
      clearTimeout(armed);
      armed = null;
      button.disabled = true;
      action();
    });
    return button;
  }

  async function endSessions(payload) {
    try {
      const result = await request('/api/creator/sessions', { method: 'DELETE', body: payload });
      if (payload.user_id) toast(ownerText('endedMany') + (result.ended || 0));
      else toast(result.revoked ? ownerText('ended') : ownerText('nothingEnded'));
    } catch (error) {
      toast(error.message || tr('offline'));
    }
    loadOwnerActions();
  }

  async function loadTeam() {
    if (!body) return;
    body.replaceChildren(el('p', 'creator-muted', tr('loading')));
    try {
      const data = await request('/api/creator/team');
      body.replaceChildren();
      const box = el('article', 'creator-note');
      box.append(el('h3', '', tr('devTeam')), el('p', 'creator-muted', ownerText('teamHint')));
      const members = data.members || [];
      if (!members.length) {
        box.append(el('p', 'creator-muted', ownerText('teamEmpty')));
      } else {
        const wrap = el('div', 'creator-table-wrap');
        const table = el('table', 'creator-table creator-team-table');
        const head = el('tr');
        const teamColumns = ['colName', 'colRole', 'colStatus'];
        teamColumns.forEach(key => head.append(el('th', '', ownerText(key))));
        const thead = el('thead');
        thead.append(head);
        table.append(thead);
        const tbody = el('tbody');
        const roleLabel = { owner: 'roleOwner', admin: 'roleAdmin', developer: 'roleDeveloper', read_only: 'roleReadOnly' };
        members.forEach(member => {
          const row = el('tr');
          const roleKey = roleLabel[member.role];
          const cells = [
            el('td', '', member.name),
            el('td', '', roleKey ? ownerText(roleKey) : member.role),
            el('td', member.status === 'invited' ? 'creator-pending' : '', member.status === 'invited' ? ownerText('statusPending') : '')
          ];
          cells.forEach((cell, index) => { cell.dataset.label = ownerText(teamColumns[index]); row.append(cell); });
          tbody.append(row);
        });
        table.append(tbody);
        wrap.append(table);
        box.append(wrap);
      }
      body.append(box);
    } catch (error) {
      body.replaceChildren(el('p', 'creator-error', error.message || tr('offline')));
    }
  }

  async function loadGlobalLogView(kind, offset = 0, accumulated = []) {
    if (!body) return;
    body.replaceChildren(el('p', 'creator-muted', tr('loading')));
    const audit = kind === 'audit';
    const endpoint = audit ? '/api/creator/global-audit' : '/api/creator/global-logs';
    try {
      const data = await request(`${endpoint}?limit=50&offset=${offset}`);
      const items = accumulated.concat(data.items || []);
      body.replaceChildren();
      const wrap = el('div', 'creator-table-wrap creator-log-wrap');
      const table = el('table', `creator-table creator-log-table${audit ? ' creator-audit-table' : ''}`);
      const headers = audit ? ['time', 'guild', 'event', 'status', 'user', 'details'] : ['time', 'guild', 'action', 'user', 'details'];
      const headRow = el('tr');
      headers.forEach(key => headRow.append(el('th', '', tr(key))));
      const thead = el('thead'); thead.append(headRow); table.append(thead);
      const tbody = el('tbody');
      items.forEach(item => {
        const row = el('tr');
        const values = audit
          ? [item.created_at, item.guild_name, `${item.type || ''} / ${item.name || ''}`, item.status, item.user_name || item.user_id || '—', item.details || '—']
          : [item.created_at, item.guild_name, item.action, item.user_name || item.user_id || '—', item.details || '—'];
        values.forEach((value, index) => {
          const cell = el('td', '', String(value ?? '—'));
          cell.dataset.label = tr(headers[index]);
          if (headers[index] === 'details') cell.classList.add('creator-details-cell');
          if (headers[index] === 'time') cell.classList.add('creator-time-cell');
          row.append(cell);
        });
        tbody.append(row);
      });
      table.append(tbody); wrap.append(table); body.append(wrap);
      if (!items.length) body.append(el('p', 'creator-muted', tr('noEntries')));
      if (items.length < Number(data.total || 0)) {
        const more = el('button', 'creator-secondary', tr('loadMore'));
        more.type = 'button';
        more.addEventListener('click', () => loadGlobalLogView(kind, items.length, items));
        body.append(more);
      }
    } catch (error) {
      body.replaceChildren(el('p', 'creator-error', error.message || tr('offline')));
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
      console.error('[Quello Admin Panel] Overview failed:', error);

      if (body) {
        body.replaceChildren(
          el('p', 'creator-error', error.message)
        );
      }
    }
  }

  async function loadTeamActions() {
    if (!body) return;
    body.replaceChildren(el('p', 'creator-muted', tr('loading')));
    try {
      const data = await request('/api/creator/developer/overview');
      const grid = el('div', 'creator-card-grid');
      grid.append(
        card(ownerText('teamRole'), data.access_role || '—', 'Discord Developer Team'),
        card(tr('version'), data.version || '—', 'APP_VERSION'),
        card(tr('bot'), data.bot_ready ? tr('ready') : tr('notReady'), 'Gateway status'),
        card(tr('guilds'), data.guild_count ?? '—', 'Discord cache'),
        card(tr('latency'), data.latency_ms == null ? '—' : `${data.latency_ms} ms`, 'Gateway')
      );
      body.replaceChildren(grid);
      const note = el('article', 'creator-note');
      note.append(el('h3', '', ownerText('teamScope')));
      note.append(el('p', 'creator-muted', ownerText('teamScopeDescription')));
      const run = el('button', 'creator-primary', tr('run'));
      run.type = 'button';
      run.addEventListener('click', async () => {
        run.disabled = true;
        try {
          const report = await request('/api/creator/diagnostics');
          const details = el('article', 'creator-note');
          details.append(el('h3', '', tr('checks')));
          Object.entries(report.checks || {}).forEach(([name, result]) => {
            details.append(el('p', result.ok ? 'creator-log' : 'creator-error', `${name}: ${result.ok ? 'OK' : 'FAILED'}${result.error ? ` (${result.error})` : ''}`));
          });
          body.append(details);
        } catch (error) {
          toast(error.message || tr('offline'));
        } finally {
          run.disabled = false;
        }
      });
      note.append(run);
      body.append(note);
    } catch (error) {
      body.replaceChildren(el('p', 'creator-error', error.message || tr('offline')));
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
    // The logo gesture is available to everyone; authentication and role checks
    // happen here, after the gesture, rather than hiding the gesture itself.
    if (!token()) {
      toast(tr('signin'));
      setTimeout(() => {
        location.href = 'login.html';
      }, 700);
      return;
    }

    if (!API || /example\.com/i.test(API)) {
      toast(tr('offline'));
      return;
    }

    try {
      const me = await request('/api/me');
      accessRole = me.is_bot_owner ? 'bot_owner' : (me.access_role || null);
      if (!['bot_owner', 'owner', 'admin', 'developer'].includes(accessRole)) {
        toast(tr('denied'));
        return;
      }

      creator = true;

    } catch (error) {
      console.error('[Quello Admin Panel] Access check failed:', error);
      // A missing/expired login is different from a valid account without a role.
      if (error.status === 401) {
        try { localStorage.removeItem(TOKEN_KEY); } catch (_) {}
        toast(tr('signin'));
        setTimeout(() => { location.href = 'login.html'; }, 700);
        return;
      }
      if (error.status === 403) {
        toast(tr('denied'));
        return;
      }
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

      const role = me.is_bot_owner ? 'bot_owner' : (me.access_role || '');
      if (['bot_owner', 'owner', 'admin', 'developer'].includes(role)) {
        creator = true;
        accessRole = role;
        addSidebarButton();
        addFloatingButton();
      }

    } catch (error) {
      console.warn('[Quello Admin Panel] Verification failed:', error);
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
    let activePointerId = null;
    let activeTouchId = null;
    let startX = 0;
    let startY = 0;
    let triggered = false;

    const HOLD_TIME = 2000;
    const MOVE_LIMIT = 14;

    function clearHold() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (activeTarget) activeTarget.classList.remove('creator-holding');
      activeTarget = null;
      activePointerId = null;
      activeTouchId = null;
    }

    function startHold(target, x, y, pointerId = null, touchId = null) {
      // Do not gate the gesture on creator status. openConsole() performs
      // the authoritative sign-in and permission checks after the hold.
      if (!target) return;

      clearHold();
      triggered = false;
      activeTarget = target;
      activePointerId = pointerId;
      activeTouchId = touchId;
      startX = x;
      startY = y;
      activeTarget.classList.add('creator-holding');

      timer = setTimeout(() => {
        timer = null;
        triggered = true;
        if (activeTarget) activeTarget.classList.remove('creator-holding');
        activeTarget = null;
        activePointerId = null;
        activeTouchId = null;
        if (navigator.vibrate) {
          try { navigator.vibrate(35); } catch (_) {}
        }
        openConsole();
      }, HOLD_TIME);
    }

    function moveHold(x, y) {
      if (timer === null) return;
      if (Math.abs(x - startX) > MOVE_LIMIT || Math.abs(y - startY) > MOVE_LIMIT) {
        clearHold();
      }
    }

    function findLogo(event) {
      const target = event.target;
      return target && typeof target.closest === 'function'
        ? target.closest(LOGO_SELECTOR)
        : null;
    }

    // Prefer Pointer Events on current iOS Safari and Android browsers.
    // This avoids duplicate touch + pointer timers on hybrid devices.
    if ('PointerEvent' in window) {
      document.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0) return;
        const target = findLogo(event);
        if (!target) return;
        startHold(target, event.clientX, event.clientY, event.pointerId);
      }, true);

      document.addEventListener('pointermove', event => {
        if (activePointerId === null || event.pointerId !== activePointerId) return;
        moveHold(event.clientX, event.clientY);
      }, true);

      const finishPointer = event => {
        if (activePointerId !== null && event.pointerId === activePointerId) clearHold();
      };
      document.addEventListener('pointerup', finishPointer, true);
      document.addEventListener('pointercancel', finishPointer, true);
    } else {
      // Fallback for older iOS Safari / Android WebViews without Pointer Events.
      document.addEventListener('touchstart', event => {
        if (event.touches.length !== 1) {
          clearHold();
          return;
        }
        const target = findLogo(event);
        if (!target) return;
        const touch = event.touches[0];
        startHold(target, touch.clientX, touch.clientY, null, touch.identifier);
      }, { passive: true });

      document.addEventListener('touchmove', event => {
        if (activeTouchId === null) return;
        if (event.touches.length !== 1) {
          clearHold();
          return;
        }
        const touch = Array.from(event.touches).find(item => item.identifier === activeTouchId);
        if (touch) moveHold(touch.clientX, touch.clientY);
        else clearHold();
      }, { passive: true });

      const finishTouch = event => {
        if (activeTouchId === null) return;
        const ended = Array.from(event.changedTouches || []).some(
          item => item.identifier === activeTouchId
        );
        if (ended) clearHold();
      };
      document.addEventListener('touchend', finishTouch, { passive: true });
      document.addEventListener('touchcancel', finishTouch, { passive: true });
    }

    document.addEventListener('click', event => {
      if (!triggered) return;
      event.preventDefault();
      event.stopPropagation();
      triggered = false;
    }, true);

    document.addEventListener('contextmenu', event => {
      const target = findLogo(event);
      if (triggered) {
        event.preventDefault();
        triggered = false;
        return;
      }
      // Suppress the native image/link callout for every visitor so the
      // 2-second hold can complete before Chrome opens its link context menu.
      if (target) event.preventDefault();
    }, true);

    const cancelForInterruption = () => {
      clearHold();
      triggered = false;
    };
    window.addEventListener('blur', cancelForInterruption);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelForInterruption();
    });
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
      '[Quello Admin Panel] JavaScript error:',
      event.error || event.message
    );
  });

  window.addEventListener('unhandledrejection', event => {
    console.error(
      '[Quello Admin Panel] Unhandled promise rejection:',
      event.reason
    );
  });

  if (document.readyState !== 'loading') {
    verifyCreator();
  }

})();