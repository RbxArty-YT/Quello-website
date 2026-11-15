/* Quello — shared helpers for login.html and dashboard.html:
   translations (same five languages and storage key as the main site),
   theme toggle, language menu, session token and API calls. */
(function () {
  'use strict';

  const CFG = window.QUELLO_CONFIG || {};
  const API_BASE = String(CFG.API_BASE || '').replace(/\/+$/, '');
  const TOKEN_KEY = 'quello-dash-token';
  const LANG_KEY = 'quello-site-language-v2';

  const LANGS = {
    en: { flag: '🇬🇧', code: 'EN', name: 'English' },
    ru: { flag: '🇷🇺', code: 'RU', name: 'Русский' },
    de: { flag: '🇩🇪', code: 'DE', name: 'Deutsch' },
    fr: { flag: '🇫🇷', code: 'FR', name: 'Français' },
    it: { flag: '🇮🇹', code: 'IT', name: 'Italiano' }
  };

  const DICT = {
    en: {
      title_login: 'Quello — Sign in', title_dashboard: 'Quello — Dashboard',
      nav_docs: 'Documentation', badge: 'DISCORD BOT', kicker_dash: 'Dashboard',
      login_title: 'Sign in to Quello',
      login_lead: 'Manage your server’s QOTD settings right from the website.',
      login_p1: 'Change roles, channels and language without slash commands.',
      login_p2: 'Only the server owner can edit a server.',
      login_p3: 'Quello only sees your Discord name, avatar and ID — never your password or messages.',
      login_discord: 'Continue with Discord', login_docs: 'No thanks, open the documentation',
      login_legal: 'By signing in you accept the', legal_terms: 'Terms of Service', legal_and: 'and', legal_privacy: 'Privacy Policy',
      err_state: 'The sign-in link expired. Please try again.',
      err_auth: 'Discord sign-in failed. Please try again.',
      err_config: 'The dashboard is not configured yet (API address is missing).',
      menu_open: 'Open menu', menu_close: 'Close menu', theme: 'Theme', language: 'Language',
      menu_server: 'SERVER', menu_account: 'ACCOUNT', menu_links: 'LINKS',
      menu_switch: 'All servers', menu_docs: 'Documentation', menu_add: 'Add Quello to a server', menu_logout: 'Log out',
      loading: 'Loading…', retry: 'Retry', reload: 'Reload',
      pick_title: 'Choose a server', pick_lead: 'Servers you own where Quello is installed.',
      pick_setup: 'Run /setup first', pick_ready: 'Ready to configure',
      pick_empty_title: 'No servers yet', pick_empty_text: 'Quello is not in a server you own. Add it first, then come back.',
      err_network: 'Can’t reach the Quello API. Check your connection and try again.',
      err_server: 'Something went wrong on the server. Try again in a moment.',
      err_session: 'Your session expired. Please sign in again.',
      err_notfound: 'This server is not available to you.',
      notconf_title: 'This server isn’t set up yet', notconf_text: 'Run /setup in Discord first, then reload this page.',
      sec_roles: 'Roles', sec_channels: 'Channels', sec_mentions: 'Mentions', sec_language: 'Language', sec_status: 'Status',
      f_allowed_role: 'Allowed role', h_allowed_role: 'Members with this role can manage QOTDs.',
      f_mention_role: 'Mention role', h_mention_role: 'Pinged when a QOTD is posted. Optional: choose None to ping only @everyone / @here (if enabled below).',
      f_english_channel: 'English channel', h_english_channel: 'Where English QOTDs are posted.',
      f_russian_channel: 'Russian channel', h_russian_channel: 'Where Russian QOTDs are posted.',
      f_everyone: 'Mention @everyone', f_here: 'Mention @here', h_mentions: 'Choose whether new QOTDs ping everyone or only active members.',
      f_language: 'Bot language', h_language: 'Language of the bot’s messages in this server.',
      lang_en: 'English', lang_ru: 'Русский', opt_none: '— None —', opt_missing: 'Not found',
      st_maintenance: 'Maintenance mode', st_lock: 'QOTD creation lock', st_on: 'On', st_off: 'Off',
      h_maintenance_control: 'Temporarily pause QOTD publishing on this server.', h_lock_control: 'Prevent new QOTD creation without enabling maintenance.',
      state_enabled: '{name} enabled.', state_disabled: '{name} disabled.', state_failed: 'Could not update state: {msg}',
      b_maintenance: 'Maintenance', b_lock: 'Locked',
      unsaved: 'Unsaved changes: {n}', save: 'Save changes', discard: 'Discard', saving: 'Saving…',
      saved: 'Saved', save_failed: 'Could not save: {msg}', discard_confirm: 'You have unsaved changes. Leave without saving?',
      no_changes: 'Nothing to save.',
      tab_settings: 'Settings', tab_qotds: 'QOTDs', tab_suggestions: 'Suggestions', tab_logs: 'Logs',
      pick_moderator: 'Moderator · view only settings',
      ro_banner: 'View only. Only the server owner can change these settings. You can still publish QOTDs and review suggestions.',
      warn_channel_missing: 'Quello can’t post here: missing {perms}. Fix the channel permissions in Discord — saving this channel will be refused.',
      warn_channel_threads: 'Quello can post here but can’t open threads: missing {perms}. QOTDs will be posted without a discussion thread.',
      perm_view_channel: 'View Channel', perm_send_messages: 'Send Messages', perm_create_public_threads: 'Create Public Threads', perm_send_messages_in_threads: 'Send Messages in Threads',
      qotd_new: 'New QOTD', qotd_question: 'Question', qotd_question_ph: 'What would you like to ask the server?',
      qotd_language: 'Language', qotd_channel: 'Channel', qotd_channel_default: 'Configured channel for this language',
      qotd_publish: 'Publish QOTD', qotd_publishing: 'Publishing…',
      qotd_confirm: 'Publish this QOTD now ({channel})? Members may be pinged.',
      qotd_published: 'QOTD #{n} published in #{channel}.', qotd_thread_missing: 'No discussion thread could be created.',
      qotd_paused: 'Publishing is paused: maintenance mode or the QOTD lock is on.',
      qotd_recent: 'Recent QOTDs', qotd_empty: 'No QOTDs yet.', qotd_title_line: 'QOTD #{n}',
      qotd_edit: 'Edit', qotd_open: 'Open in Discord', qotd_save: 'Save', qotd_cancel: 'Cancel', qotd_edited: 'QOTD #{n} updated.',
      sug_title: 'Waiting for review', sug_total: '{n} total', sug_empty: 'Nothing to review right now.',
      sug_from: 'From {name}', sug_approve: 'Approve & publish', sug_reject: 'Reject',
      sug_reason_ph: 'Reason for the author (at least 3 characters)', sug_reject_confirm: 'Send rejection',
      sug_approve_confirm: 'Publish this suggestion now as the next QOTD?',
      sug_approved: 'Suggestion #{id} published as QOTD #{n}.', sug_rejected: 'Suggestion #{id} rejected.',
      sug_dm_failed: 'The author could not be notified by DM.',
      logs_logs: 'Activity log', logs_audit: 'Audit log', logs_empty: 'Nothing recorded yet.', logs_more: 'Load more', logs_total: '{n} entries',
      act_failed: 'Action failed: {msg}'
    },
    ru: {
      title_login: 'Quello — Вход', title_dashboard: 'Quello — Панель управления',
      nav_docs: 'Документация', badge: 'DISCORD-БОТ', kicker_dash: 'Панель управления',
      login_title: 'Вход в Quello',
      login_lead: 'Управляйте настройками QOTD вашего сервера прямо с сайта.',
      login_p1: 'Меняйте роли, каналы и язык без слэш-команд.',
      login_p2: 'Редактировать сервер может только его владелец.',
      login_p3: 'Quello видит только ваше имя, аватар и ID в Discord — никаких паролей и сообщений.',
      login_discord: 'Войти через Discord', login_docs: 'Нет, перейти к документации',
      login_legal: 'Входя, вы принимаете', legal_terms: 'Условия использования', legal_and: 'и', legal_privacy: 'Политику конфиденциальности',
      err_state: 'Ссылка для входа устарела. Попробуйте ещё раз.',
      err_auth: 'Не удалось войти через Discord. Попробуйте ещё раз.',
      err_config: 'Панель ещё не настроена (не указан адрес API).',
      menu_open: 'Открыть меню', menu_close: 'Закрыть меню', theme: 'Тема', language: 'Язык',
      menu_server: 'СЕРВЕР', menu_account: 'АККАУНТ', menu_links: 'ССЫЛКИ',
      menu_switch: 'Все серверы', menu_docs: 'Документация', menu_add: 'Добавить Quello на сервер', menu_logout: 'Выйти',
      loading: 'Загрузка…', retry: 'Повторить', reload: 'Обновить',
      pick_title: 'Выберите сервер', pick_lead: 'Серверы, которыми вы владеете и где установлен Quello.',
      pick_setup: 'Сначала выполните /setup', pick_ready: 'Можно настраивать',
      pick_empty_title: 'Серверов пока нет', pick_empty_text: 'Quello не добавлен ни на один ваш сервер. Добавьте его и возвращайтесь.',
      err_network: 'Не удаётся связаться с API Quello. Проверьте соединение и попробуйте снова.',
      err_server: 'Ошибка на сервере. Попробуйте чуть позже.',
      err_session: 'Сессия истекла. Войдите снова.',
      err_notfound: 'Этот сервер вам недоступен.',
      notconf_title: 'Сервер ещё не настроен', notconf_text: 'Сначала выполните /setup в Discord, затем обновите страницу.',
      sec_roles: 'Роли', sec_channels: 'Каналы', sec_mentions: 'Упоминания', sec_language: 'Язык', sec_status: 'Состояние',
      f_allowed_role: 'Разрешённая роль', h_allowed_role: 'Участники с этой ролью могут управлять QOTD.',
      f_mention_role: 'Роль для упоминания', h_mention_role: 'Упоминается при публикации QOTD. Необязательно: выберите «Нет», чтобы упоминались только @everyone / @here (если включены ниже).',
      f_english_channel: 'Английский канал', h_english_channel: 'Куда публикуются английские QOTD.',
      f_russian_channel: 'Русский канал', h_russian_channel: 'Куда публикуются русские QOTD.',
      f_everyone: 'Упоминать @everyone', f_here: 'Упоминать @here', h_mentions: 'Выберите, будут ли новые QOTD упоминать всех или только участников онлайн.',
      f_language: 'Язык бота', h_language: 'Язык сообщений бота на этом сервере.',
      lang_en: 'English', lang_ru: 'Русский', opt_none: '— Нет —', opt_missing: 'Не найдено',
      st_maintenance: 'Режим обслуживания', st_lock: 'Блокировка создания QOTD', st_on: 'Вкл', st_off: 'Выкл',
      h_maintenance_control: 'Временно приостановить публикацию QOTD на этом сервере.', h_lock_control: 'Запретить создание новых QOTD без включения обслуживания.',
      state_enabled: '{name}: включено.', state_disabled: '{name}: выключено.', state_failed: 'Не удалось изменить состояние: {msg}',
      b_maintenance: 'Обслуживание', b_lock: 'Заблокировано',
      unsaved: 'Несохранённых изменений: {n}', save: 'Сохранить', discard: 'Отменить', saving: 'Сохранение…',
      saved: 'Сохранено', save_failed: 'Не удалось сохранить: {msg}', discard_confirm: 'Есть несохранённые изменения. Уйти без сохранения?',
      no_changes: 'Нечего сохранять.',
      tab_settings: 'Настройки', tab_qotds: 'QOTD', tab_suggestions: 'Предложения', tab_logs: 'Логи',
      pick_moderator: 'Модератор · настройки только для просмотра',
      ro_banner: 'Только просмотр. Менять эти настройки может только владелец сервера. Публиковать QOTD и разбирать предложения вы можете.',
      warn_channel_missing: 'Quello не может писать в этот канал: нет прав {perms}. Исправьте права канала в Discord — сохранение этого канала будет отклонено.',
      warn_channel_threads: 'Quello может писать здесь, но не может создавать треды: нет прав {perms}. QOTD будут публиковаться без треда для обсуждения.',
      perm_view_channel: 'Просмотр канала', perm_send_messages: 'Отправка сообщений', perm_create_public_threads: 'Создание публичных веток', perm_send_messages_in_threads: 'Отправка сообщений в ветках',
      qotd_new: 'Новый QOTD', qotd_question: 'Вопрос', qotd_question_ph: 'О чём вы хотите спросить участников?',
      qotd_language: 'Язык', qotd_channel: 'Канал', qotd_channel_default: 'Настроенный канал для этого языка',
      qotd_publish: 'Опубликовать QOTD', qotd_publishing: 'Публикация…',
      qotd_confirm: 'Опубликовать этот QOTD сейчас ({channel})? Участники могут получить уведомление.',
      qotd_published: 'QOTD #{n} опубликован в #{channel}.', qotd_thread_missing: 'Тред для обсуждения создать не удалось.',
      qotd_paused: 'Публикация приостановлена: включён режим обслуживания или блокировка QOTD.',
      qotd_recent: 'Недавние QOTD', qotd_empty: 'QOTD пока нет.', qotd_title_line: 'QOTD #{n}',
      qotd_edit: 'Изменить', qotd_open: 'Открыть в Discord', qotd_save: 'Сохранить', qotd_cancel: 'Отмена', qotd_edited: 'QOTD #{n} обновлён.',
      sug_title: 'Ожидают проверки', sug_total: 'всего {n}', sug_empty: 'Сейчас нечего проверять.',
      sug_from: 'От {name}', sug_approve: 'Одобрить и опубликовать', sug_reject: 'Отклонить',
      sug_reason_ph: 'Причина для автора (минимум 3 символа)', sug_reject_confirm: 'Отправить отказ',
      sug_approve_confirm: 'Опубликовать это предложение сейчас как следующий QOTD?',
      sug_approved: 'Предложение #{id} опубликовано как QOTD #{n}.', sug_rejected: 'Предложение #{id} отклонено.',
      sug_dm_failed: 'Автору не удалось отправить уведомление в личные сообщения.',
      logs_logs: 'Журнал действий', logs_audit: 'Аудит', logs_empty: 'Пока ничего не записано.', logs_more: 'Показать ещё', logs_total: 'записей: {n}',
      act_failed: 'Не удалось выполнить действие: {msg}'
    },
    de: {
      title_login: 'Quello — Anmelden', title_dashboard: 'Quello — Dashboard',
      nav_docs: 'Dokumentation', badge: 'DISCORD-BOT', kicker_dash: 'Dashboard',
      login_title: 'Bei Quello anmelden',
      login_lead: 'Verwalte die QOTD-Einstellungen deines Servers direkt auf der Website.',
      login_p1: 'Rollen, Kanäle und Sprache ohne Slash-Befehle ändern.',
      login_p2: 'Nur der Serverbesitzer kann einen Server bearbeiten.',
      login_p3: 'Quello sieht nur deinen Discord-Namen, dein Avatar und deine ID — nie dein Passwort oder deine Nachrichten.',
      login_discord: 'Weiter mit Discord', login_docs: 'Nein danke, zur Dokumentation',
      login_legal: 'Mit der Anmeldung akzeptierst du die', legal_terms: 'Nutzungsbedingungen', legal_and: 'und die', legal_privacy: 'Datenschutzerklärung',
      err_state: 'Der Anmeldelink ist abgelaufen. Bitte versuche es erneut.',
      err_auth: 'Die Discord-Anmeldung ist fehlgeschlagen. Bitte versuche es erneut.',
      err_config: 'Das Dashboard ist noch nicht eingerichtet (API-Adresse fehlt).',
      menu_open: 'Menü öffnen', menu_close: 'Menü schließen', theme: 'Design', language: 'Sprache',
      menu_server: 'SERVER', menu_account: 'KONTO', menu_links: 'LINKS',
      menu_switch: 'Alle Server', menu_docs: 'Dokumentation', menu_add: 'Quello zu einem Server hinzufügen', menu_logout: 'Abmelden',
      loading: 'Wird geladen…', retry: 'Erneut versuchen', reload: 'Neu laden',
      pick_title: 'Server auswählen', pick_lead: 'Server, die dir gehören und auf denen Quello installiert ist.',
      pick_setup: 'Zuerst /setup ausführen', pick_ready: 'Bereit zur Konfiguration',
      pick_empty_title: 'Noch keine Server', pick_empty_text: 'Quello ist auf keinem deiner Server. Füge es hinzu und komm zurück.',
      err_network: 'Die Quello-API ist nicht erreichbar. Prüfe deine Verbindung und versuche es erneut.',
      err_server: 'Auf dem Server ist etwas schiefgelaufen. Versuche es gleich noch einmal.',
      err_session: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
      err_notfound: 'Dieser Server ist für dich nicht verfügbar.',
      notconf_title: 'Dieser Server ist noch nicht eingerichtet', notconf_text: 'Führe zuerst /setup in Discord aus und lade diese Seite neu.',
      sec_roles: 'Rollen', sec_channels: 'Kanäle', sec_mentions: 'Erwähnungen', sec_language: 'Sprache', sec_status: 'Status',
      f_allowed_role: 'Erlaubte Rolle', h_allowed_role: 'Mitglieder mit dieser Rolle können QOTDs verwalten.',
      f_mention_role: 'Erwähnungsrolle', h_mention_role: 'Wird bei einem neuen QOTD erwähnt. Optional: Wähle Keine, um nur @everyone / @here (falls unten aktiviert) zu erwähnen.',
      f_english_channel: 'Englischer Kanal', h_english_channel: 'Hier werden englische QOTDs gepostet.',
      f_russian_channel: 'Russischer Kanal', h_russian_channel: 'Hier werden russische QOTDs gepostet.',
      f_everyone: '@everyone erwähnen', f_here: '@here erwähnen', h_mentions: 'Lege fest, ob neue QOTDs alle oder nur aktive Mitglieder erwähnen.',
      f_language: 'Bot-Sprache', h_language: 'Sprache der Bot-Nachrichten auf diesem Server.',
      lang_en: 'English', lang_ru: 'Русский', opt_none: '— Keine —', opt_missing: 'Nicht gefunden',
      st_maintenance: 'Wartungsmodus', st_lock: 'QOTD-Erstellung gesperrt', st_on: 'An', st_off: 'Aus',
      h_maintenance_control: 'Die Veröffentlichung von QOTD auf diesem Server vorübergehend pausieren.', h_lock_control: 'Neue QOTD-Erstellungen verhindern, ohne den Wartungsmodus zu aktivieren.',
      state_enabled: '{name} aktiviert.', state_disabled: '{name} deaktiviert.', state_failed: 'Status konnte nicht geändert werden: {msg}',
      b_maintenance: 'Wartung', b_lock: 'Gesperrt',
      unsaved: 'Ungespeicherte Änderungen: {n}', save: 'Änderungen speichern', discard: 'Verwerfen', saving: 'Wird gespeichert…',
      saved: 'Gespeichert', save_failed: 'Speichern fehlgeschlagen: {msg}', discard_confirm: 'Es gibt ungespeicherte Änderungen. Ohne Speichern verlassen?',
      no_changes: 'Nichts zu speichern.'
    },
    fr: {
      title_login: 'Quello — Connexion', title_dashboard: 'Quello — Tableau de bord',
      nav_docs: 'Documentation', badge: 'BOT DISCORD', kicker_dash: 'Tableau de bord',
      login_title: 'Connexion à Quello',
      login_lead: 'Gérez les réglages QOTD de votre serveur directement depuis le site.',
      login_p1: 'Modifiez les rôles, salons et la langue sans commandes slash.',
      login_p2: 'Seul le propriétaire du serveur peut le modifier.',
      login_p3: 'Quello ne voit que votre nom Discord, votre avatar et votre ID — jamais votre mot de passe ni vos messages.',
      login_discord: 'Continuer avec Discord', login_docs: 'Non merci, ouvrir la documentation',
      login_legal: 'En vous connectant, vous acceptez les', legal_terms: 'Conditions d’utilisation', legal_and: 'et la', legal_privacy: 'Politique de confidentialité',
      err_state: 'Le lien de connexion a expiré. Veuillez réessayer.',
      err_auth: 'La connexion Discord a échoué. Veuillez réessayer.',
      err_config: 'Le tableau de bord n’est pas encore configuré (adresse de l’API manquante).',
      menu_open: 'Ouvrir le menu', menu_close: 'Fermer le menu', theme: 'Thème', language: 'Langue',
      menu_server: 'SERVEUR', menu_account: 'COMPTE', menu_links: 'LIENS',
      menu_switch: 'Tous les serveurs', menu_docs: 'Documentation', menu_add: 'Ajouter Quello à un serveur', menu_logout: 'Se déconnecter',
      loading: 'Chargement…', retry: 'Réessayer', reload: 'Recharger',
      pick_title: 'Choisissez un serveur', pick_lead: 'Les serveurs dont vous êtes propriétaire et où Quello est installé.',
      pick_setup: 'Lancez d’abord /setup', pick_ready: 'Prêt à configurer',
      pick_empty_title: 'Aucun serveur pour l’instant', pick_empty_text: 'Quello n’est sur aucun de vos serveurs. Ajoutez-le puis revenez.',
      err_network: 'Impossible de joindre l’API Quello. Vérifiez votre connexion et réessayez.',
      err_server: 'Une erreur est survenue côté serveur. Réessayez dans un instant.',
      err_session: 'Votre session a expiré. Veuillez vous reconnecter.',
      err_notfound: 'Ce serveur n’est pas disponible pour vous.',
      notconf_title: 'Ce serveur n’est pas encore configuré', notconf_text: 'Lancez d’abord /setup dans Discord, puis rechargez cette page.',
      sec_roles: 'Rôles', sec_channels: 'Salons', sec_mentions: 'Mentions', sec_language: 'Langue', sec_status: 'État',
      f_allowed_role: 'Rôle autorisé', h_allowed_role: 'Les membres avec ce rôle peuvent gérer les QOTD.',
      f_mention_role: 'Rôle à mentionner', h_mention_role: 'Mentionné à la publication d’un QOTD. Facultatif : choisissez Aucun pour ne mentionner que @everyone / @here (si activés ci-dessous).',
      f_english_channel: 'Salon anglais', h_english_channel: 'Où les QOTD en anglais sont publiés.',
      f_russian_channel: 'Salon russe', h_russian_channel: 'Où les QOTD en russe sont publiés.',
      f_everyone: 'Mentionner @everyone', f_here: 'Mentionner @here', h_mentions: 'Choisissez si les nouveaux QOTD mentionnent tout le monde ou seulement les membres actifs.',
      f_language: 'Langue du bot', h_language: 'Langue des messages du bot sur ce serveur.',
      lang_en: 'English', lang_ru: 'Русский', opt_none: '— Aucun —', opt_missing: 'Introuvable',
      st_maintenance: 'Mode maintenance', st_lock: 'Verrouillage des QOTD', st_on: 'Activé', st_off: 'Désactivé',
      h_maintenance_control: 'Suspendre temporairement la publication des QOTD sur ce serveur.', h_lock_control: 'Empêcher la création de nouveaux QOTD sans activer la maintenance.',
      state_enabled: '{name} activé.', state_disabled: '{name} désactivé.', state_failed: 'Impossible de modifier l’état : {msg}',
      b_maintenance: 'Maintenance', b_lock: 'Verrouillé',
      unsaved: 'Modifications non enregistrées : {n}', save: 'Enregistrer', discard: 'Annuler', saving: 'Enregistrement…',
      saved: 'Enregistré', save_failed: 'Échec de l’enregistrement : {msg}', discard_confirm: 'Des modifications ne sont pas enregistrées. Quitter sans enregistrer ?',
      no_changes: 'Rien à enregistrer.'
    },
    it: {
      title_login: 'Quello — Accedi', title_dashboard: 'Quello — Dashboard',
      nav_docs: 'Documentazione', badge: 'BOT DISCORD', kicker_dash: 'Dashboard',
      login_title: 'Accedi a Quello',
      login_lead: 'Gestisci le impostazioni QOTD del tuo server direttamente dal sito.',
      login_p1: 'Cambia ruoli, canali e lingua senza comandi slash.',
      login_p2: 'Solo il proprietario del server può modificarlo.',
      login_p3: 'Quello vede solo il tuo nome Discord, l’avatar e l’ID — mai la password o i messaggi.',
      login_discord: 'Continua con Discord', login_docs: 'No grazie, apri la documentazione',
      login_legal: 'Accedendo accetti i', legal_terms: 'Termini di servizio', legal_and: 'e l’', legal_privacy: 'Informativa sulla privacy',
      err_state: 'Il link di accesso è scaduto. Riprova.',
      err_auth: 'Accesso con Discord non riuscito. Riprova.',
      err_config: 'La dashboard non è ancora configurata (manca l’indirizzo dell’API).',
      menu_open: 'Apri il menu', menu_close: 'Chiudi il menu', theme: 'Tema', language: 'Lingua',
      menu_server: 'SERVER', menu_account: 'ACCOUNT', menu_links: 'LINK',
      menu_switch: 'Tutti i server', menu_docs: 'Documentazione', menu_add: 'Aggiungi Quello a un server', menu_logout: 'Esci',
      loading: 'Caricamento…', retry: 'Riprova', reload: 'Ricarica',
      pick_title: 'Scegli un server', pick_lead: 'I server di cui sei proprietario e dove Quello è installato.',
      pick_setup: 'Esegui prima /setup', pick_ready: 'Pronto da configurare',
      pick_empty_title: 'Ancora nessun server', pick_empty_text: 'Quello non è in nessun tuo server. Aggiungilo e poi torna qui.',
      err_network: 'Impossibile raggiungere l’API di Quello. Controlla la connessione e riprova.',
      err_server: 'Qualcosa è andato storto sul server. Riprova tra un momento.',
      err_session: 'La sessione è scaduta. Accedi di nuovo.',
      err_notfound: 'Questo server non è disponibile per te.',
      notconf_title: 'Questo server non è ancora configurato', notconf_text: 'Esegui prima /setup in Discord, poi ricarica questa pagina.',
      sec_roles: 'Ruoli', sec_channels: 'Canali', sec_mentions: 'Menzioni', sec_language: 'Lingua', sec_status: 'Stato',
      f_allowed_role: 'Ruolo autorizzato', h_allowed_role: 'I membri con questo ruolo possono gestire i QOTD.',
      f_mention_role: 'Ruolo da menzionare', h_mention_role: 'Menzionato alla pubblicazione di un QOTD. Facoltativo: scegli Nessuno per menzionare solo @everyone / @here (se attivati sotto).',
      f_english_channel: 'Canale inglese', h_english_channel: 'Dove vengono pubblicati i QOTD in inglese.',
      f_russian_channel: 'Canale russo', h_russian_channel: 'Dove vengono pubblicati i QOTD in russo.',
      f_everyone: 'Menziona @everyone', f_here: 'Menziona @here', h_mentions: 'Scegli se i nuovi QOTD menzionano tutti o solo i membri attivi.',
      f_language: 'Lingua del bot', h_language: 'Lingua dei messaggi del bot in questo server.',
      lang_en: 'English', lang_ru: 'Русский', opt_none: '— Nessuno —', opt_missing: 'Non trovato',
      st_maintenance: 'Modalità manutenzione', st_lock: 'Blocco creazione QOTD', st_on: 'Attivo', st_off: 'Disattivo',
      h_maintenance_control: 'Sospendi temporaneamente la pubblicazione dei QOTD su questo server.', h_lock_control: 'Impedisci la creazione di nuovi QOTD senza attivare la manutenzione.',
      state_enabled: '{name} attivata.', state_disabled: '{name} disattivata.', state_failed: 'Impossibile modificare lo stato: {msg}',
      b_maintenance: 'Manutenzione', b_lock: 'Bloccato',
      unsaved: 'Modifiche non salvate: {n}', save: 'Salva modifiche', discard: 'Annulla', saving: 'Salvataggio…',
      saved: 'Salvato', save_failed: 'Salvataggio non riuscito: {msg}', discard_confirm: 'Ci sono modifiche non salvate. Uscire senza salvare?',
      no_changes: 'Niente da salvare.'
    }
  };

  let lang = 'en';
  try { lang = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { /* storage blocked */ }
  if (!DICT[lang]) lang = 'en';

  function t(key, vars) {
    let text = (DICT[lang] && DICT[lang][key]);
    if (text == null) text = DICT.en[key];
    if (text == null) text = key;
    if (vars) Object.keys(vars).forEach(k => { text = text.split('{' + k + '}').join(String(vars[k])); });
    return text;
  }

  function applyI18n(root) {
    root = root || document;
    document.documentElement.lang = lang;
    root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    root.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    const titleKey = document.body && document.body.dataset.titleKey;
    if (titleKey) document.title = t(titleKey);
    const meta = LANGS[lang];
    const flag = document.getElementById('headerLanguageFlag');
    const code = document.getElementById('headerLanguageCode');
    if (flag) flag.textContent = meta.flag;
    if (code) code.textContent = meta.code;
    document.querySelectorAll('[data-header-language]').forEach(btn => {
      const active = btn.dataset.headerLanguage === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  }

  function setLang(next) {
    if (!DICT[next]) next = 'en';
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
    applyI18n();
    window.dispatchEvent(new CustomEvent('quello:languagechange', { detail: { language: lang } }));
  }

  /* ---- theme + language menu ---- */
  function wireHeader() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('quello-theme', next); } catch (e) { /* ignore */ }
      });
    }
    const wrap = document.getElementById('headerLanguage');
    const button = document.getElementById('headerLanguageButton');
    if (!wrap || !button) return;
    const setOpen = open => { wrap.classList.toggle('open', open); button.setAttribute('aria-expanded', String(open)); };
    button.addEventListener('click', () => setOpen(!wrap.classList.contains('open')));
    document.querySelectorAll('[data-header-language]').forEach(btn => {
      btn.addEventListener('click', () => { setLang(btn.dataset.headerLanguage); setOpen(false); });
    });
    document.addEventListener('click', e => { if (!wrap.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---- session token (the API signs it; the page only stores and sends it) ---- */
  function getToken() { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; } }
  function setToken(value) { try { localStorage.setItem(TOKEN_KEY, value); } catch (e) { /* ignore */ } }
  function clearToken() { try { localStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ } }

  // Reads the expiry only to skip a pointless round trip; the API still verifies the signature.
  function tokenLooksValid(token) {
    try {
      const body = String(token || '').split('.')[0].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(body + '='.repeat((4 - body.length % 4) % 4)));
      return payload && payload.t === 'session' && payload.exp * 1000 > Date.now();
    } catch (e) { return false; }
  }

  class ApiFailure extends Error {
    constructor(code, message, status) { super(message || code); this.code = code; this.status = status || 0; }
  }

  async function api(path, options) {
    options = options || {};
    if (!API_BASE) throw new ApiFailure('config', t('err_config'));
    const headers = { Authorization: 'Bearer ' + getToken() };
    if (options.body !== undefined) headers['Content-Type'] = 'application/json';
    let response;
    try {
      response = await fetch(API_BASE + path, {
        method: options.method || 'GET',
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined
      });
    } catch (e) {
      throw new ApiFailure('network', t('err_network'));
    }
    let data = null;
    try { data = await response.json(); } catch (e) { /* not JSON */ }
    if (response.status === 401) {
      clearToken();
      location.replace('login.html');
      throw new ApiFailure('unauthorized', t('err_session'), 401);
    }
    if (!response.ok) {
      throw new ApiFailure((data && data.error) || 'server_error', (data && data.message) || t('err_server'), response.status);
    }
    return data;
  }

  window.Q = { CFG, API_BASE, LANGS, t, applyI18n, setLang, wireHeader, getToken, setToken, clearToken, tokenLooksValid, api, ApiFailure };
})();
