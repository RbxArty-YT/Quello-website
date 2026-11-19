/* Quello — shared helpers for login.html and dashboard.html:
   translations (same five languages and storage key as the main site),
   theme toggle, language menu, session token and API calls. */
(function () {
  'use strict';

  const CFG = window.QUELLO_CONFIG || {};
  const API_BASE = String(CFG.API_BASE || '').replace(/\/+$/, '');
  // site-config.js still holds the placeholder address from the download.
  const API_UNSET = !API_BASE || /example\.com/i.test(API_BASE);
  const apiHost = () => { try { return new URL(API_BASE).host; } catch (e) { return API_BASE; } };
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
      login_p2: 'The server owner, a Discord Administrator, or the Bot Owner can edit a server.',
      login_p3: 'Quello reads your basic Discord profile and server permission data to show servers you can manage — never your password, email or message history.',
      login_discord: 'Continue with Discord',
      login_guest: 'Continue without signing in',
      login_legal: 'By signing in you accept the', legal_terms: 'Terms of Service', legal_and: 'and', legal_privacy: 'Privacy Policy',
      err_state: 'The sign-in link expired. Please try again.',
      err_auth: 'Discord sign-in failed. Please try again.',
      err_config: 'The dashboard is not configured yet: set API_BASE in site-config.js to your bot’s API address.',
      menu_open: 'Open menu', menu_close: 'Close menu', theme: 'Theme', language: 'Language',
      menu_server: 'SERVER', menu_account: 'ACCOUNT', menu_links: 'LINKS',
      menu_switch: 'All servers', menu_docs: 'Documentation', menu_add: 'Add Quello to a server', about_creator: 'About the Creator', add_short: 'Add to server', add_hint: 'Invite the bot to another server', menu_logout: 'Log out',
      loading: 'Loading…', retry: 'Retry', reload: 'Reload',
      pick_title: 'Choose a server', pick_lead: 'Servers where you have access and Quello is installed.',
      pick_setup: 'Needs setup', setup_title: 'Initial setup', setup_text: 'Choose a manager role and the channels for QOTDs, then save. You can change everything later.', setup_role_required: 'Choose an allowed role to finish the setup.', pick_ready: 'Ready to configure',
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
      ro_banner: 'View only. A server owner, Discord Administrator, or Bot Owner can change these settings. You can still publish QOTDs and review suggestions.',
      warn_channel_missing: 'Quello can’t post here: missing {perms}. Fix the channel permissions in Discord — saving this channel will be refused.',
      warn_channel_threads: 'Quello can post here but can’t open threads: missing {perms}. QOTDs will be posted without a discussion thread.',
      perm_view_channel: 'View Channel', perm_send_messages: 'Send Messages', perm_create_public_threads: 'Create Public Threads', perm_send_messages_in_threads: 'Send Messages in Threads',
      qotd_new: 'New QOTD', qotd_question: 'Question', qotd_question_ph: 'What would you like to ask the server?',
      qotd_language: 'Language', qotd_channel: 'Channel', qotd_channel_default: 'Configured channel for this language',
      qotd_publish: 'Publish QOTD', qotd_publishing: 'Publishing…',
      qotd_random: 'Generate random question', qotd_random_hint: 'Generate an AI question in this server’s configured language and publish it to its configured channel.', qotd_random_confirm: 'Generate and publish a random AI question now? Members may be pinged.', qotd_random_loading: 'Generating…', qotd_random_published: 'Random QOTD #{n} published in #{channel}.',
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
      act_failed: 'Action failed: {msg}',
      search_ph: '🔍 Search servers…', search_none: 'No servers match “{q}”.'
    },
    ru: {
      title_login: 'Quello — Вход', title_dashboard: 'Quello — Панель управления',
      nav_docs: 'Документация', badge: 'DISCORD-БОТ', kicker_dash: 'Панель управления',
      login_title: 'Вход в Quello',
      login_lead: 'Управляйте настройками QOTD вашего сервера прямо с сайта.',
      login_p1: 'Меняйте роли, каналы и язык без слэш-команд.',
      login_p2: 'Редактировать сервер могут его владелец, пользователь с правом Discord Administrator или владелец бота.',
      login_p3: 'Quello получает базовый профиль Discord и данные о разрешениях серверов, чтобы показать доступные вам серверы. Пароль, почта и история сообщений не запрашиваются.',
      login_discord: 'Войти через Discord',
      login_guest: 'Продолжить без входа',
      login_legal: 'Входя, вы принимаете', legal_terms: 'Условия использования', legal_and: 'и', legal_privacy: 'Политику конфиденциальности',
      err_state: 'Ссылка для входа устарела. Попробуйте ещё раз.',
      err_auth: 'Не удалось войти через Discord. Попробуйте ещё раз.',
      err_config: 'Панель ещё не настроена: впишите адрес API бота в API_BASE в файле site-config.js.',
      menu_open: 'Открыть меню', menu_close: 'Закрыть меню', theme: 'Тема', language: 'Язык',
      menu_server: 'СЕРВЕР', menu_account: 'АККАУНТ', menu_links: 'ССЫЛКИ',
      menu_switch: 'Все серверы', menu_docs: 'Документация', menu_add: 'Добавить Quello на сервер', about_creator: 'О создателе', add_short: 'Добавить на сервер', add_hint: 'Пригласите бота на ещё один сервер', menu_logout: 'Выйти',
      loading: 'Загрузка…', retry: 'Повторить', reload: 'Обновить',
      pick_title: 'Выберите сервер', pick_lead: 'Серверы, к которым у вас есть доступ и где установлен Quello.',
      pick_setup: 'Нужна настройка', setup_title: 'Первоначальная настройка', setup_text: 'Выберите роль для управления и каналы для QOTD, затем сохраните. Всё можно изменить позже.', setup_role_required: 'Выберите разрешённую роль, чтобы завершить настройку.', pick_ready: 'Можно настраивать',
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
      ro_banner: 'Только просмотр. Менять эти настройки могут владелец сервера, пользователь с правом Discord Administrator или владелец бота. Публиковать QOTD и разбирать предложения вы можете.',
      warn_channel_missing: 'Quello не может писать в этот канал: нет прав {perms}. Исправьте права канала в Discord — сохранение этого канала будет отклонено.',
      warn_channel_threads: 'Quello может писать здесь, но не может создавать треды: нет прав {perms}. QOTD будут публиковаться без треда для обсуждения.',
      perm_view_channel: 'Просмотр канала', perm_send_messages: 'Отправка сообщений', perm_create_public_threads: 'Создание публичных веток', perm_send_messages_in_threads: 'Отправка сообщений в ветках',
      qotd_new: 'Новый QOTD', qotd_question: 'Вопрос', qotd_question_ph: 'О чём вы хотите спросить участников?',
      qotd_language: 'Язык', qotd_channel: 'Канал', qotd_channel_default: 'Настроенный канал для этого языка',
      qotd_publish: 'Опубликовать QOTD', qotd_publishing: 'Публикация…',
      qotd_random: 'Сгенерировать случайный вопрос', qotd_random_hint: 'ИИ создаст вопрос на основном языке этого сервера и опубликует его в настроенном канале.', qotd_random_confirm: 'Сгенерировать и сразу опубликовать случайный вопрос? Участники могут получить уведомление.', qotd_random_loading: 'Генерация…', qotd_random_published: 'Случайный QOTD #{n} опубликован в #{channel}.',
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
      act_failed: 'Не удалось выполнить действие: {msg}',
      search_ph: '🔍 Поиск сервера…', search_none: 'Серверов по запросу «{q}» не найдено.'
    },
    de: {
      title_login: 'Quello — Anmelden', title_dashboard: 'Quello — Dashboard',
      nav_docs: 'Dokumentation', badge: 'DISCORD-BOT', kicker_dash: 'Dashboard',
      login_title: 'Bei Quello anmelden',
      login_lead: 'Verwalte die QOTD-Einstellungen deines Servers direkt auf der Website.',
      login_p1: 'Rollen, Kanäle und Sprache ohne Slash-Befehle ändern.',
      login_p2: 'Der Serverbesitzer, ein Discord-Administrator oder der Bot-Inhaber kann einen Server bearbeiten.',
      login_p3: 'Quello liest dein Discord-Basisprofil und Server-Berechtigungsdaten, um zugängliche Server anzuzeigen — niemals dein Passwort, deine E-Mail oder deinen Nachrichtenverlauf.',
      login_discord: 'Weiter mit Discord',
      login_guest: 'Ohne Anmeldung fortfahren',
      login_legal: 'Mit der Anmeldung akzeptierst du die', legal_terms: 'Nutzungsbedingungen', legal_and: 'und die', legal_privacy: 'Datenschutzerklärung',
      err_state: 'Der Anmeldelink ist abgelaufen. Bitte versuche es erneut.',
      err_auth: 'Die Discord-Anmeldung ist fehlgeschlagen. Bitte versuche es erneut.',
      err_config: 'Das Dashboard ist noch nicht eingerichtet (API-Adresse fehlt).',
      menu_open: 'Menü öffnen', menu_close: 'Menü schließen', theme: 'Design', language: 'Sprache',
      menu_server: 'SERVER', menu_account: 'KONTO', menu_links: 'LINKS',
      menu_switch: 'Alle Server', menu_docs: 'Dokumentation', menu_add: 'Quello zu einem Server hinzufügen', about_creator: 'Über den Ersteller', add_short: 'Zum Server hinzufügen', add_hint: 'Lade den Bot auf einen weiteren Server ein', menu_logout: 'Abmelden',
      loading: 'Wird geladen…', retry: 'Erneut versuchen', reload: 'Neu laden',
      pick_title: 'Server auswählen', pick_lead: 'Server, auf die du Zugriff hast und auf denen Quello installiert ist.',
      pick_setup: 'Einrichtung nötig', setup_title: 'Ersteinrichtung', setup_text: 'Wähle eine Verwaltungsrolle und die Kanäle für QOTDs und speichere. Alles lässt sich später ändern.', setup_role_required: 'Wähle eine erlaubte Rolle, um die Einrichtung abzuschließen.', pick_ready: 'Bereit zur Konfiguration',
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
      no_changes: 'Nichts zu speichern.',
      tab_settings: 'Einstellungen',
      tab_qotds: 'QOTDs',
      tab_suggestions: 'Vorschläge',
      tab_logs: 'Logs',
      pick_moderator: 'Moderator · Einstellungen nur ansehen',
      ro_banner: 'Nur Ansicht. Der Serverinhaber, ein Discord-Administrator oder der Bot-Inhaber kann diese Einstellungen ändern. Du kannst weiterhin QOTDs veröffentlichen und Vorschläge prüfen.',
      warn_channel_missing: 'Quello kann hier nicht schreiben: Berechtigungen fehlen: {perms}. Korrigiere die Kanalberechtigungen in Discord – das Speichern dieses Kanals wird abgelehnt.',
      warn_channel_threads: 'Quello kann hier schreiben, aber keine Threads erstellen. Fehlende Berechtigungen: {perms}. QOTDs werden ohne Diskussionsthread gepostet.',
      perm_view_channel: 'Kanal ansehen',
      perm_send_messages: 'Nachrichten senden',
      perm_create_public_threads: 'Öffentliche Threads erstellen',
      perm_send_messages_in_threads: 'Nachrichten in Threads senden',
      qotd_new: 'Neue QOTD',
      qotd_question: 'Frage',
      qotd_question_ph: 'Was möchtest du den Server fragen?',
      qotd_language: 'Sprache',
      qotd_channel: 'Kanal',
      qotd_channel_default: 'Konfigurierter Kanal für diese Sprache',
      qotd_publish: 'QOTD veröffentlichen',
      qotd_random: 'Zufällige Frage generieren', qotd_random_hint: 'Eine KI-Frage in der eingestellten Serversprache generieren und im konfigurierten Kanal veröffentlichen.', qotd_random_confirm: 'Jetzt eine zufällige KI-Frage generieren und veröffentlichen? Mitglieder könnten benachrichtigt werden.', qotd_random_loading: 'Wird generiert…', qotd_random_published: 'Zufällige QOTD #{n} in #{channel} veröffentlicht.',
      qotd_publishing: 'Wird veröffentlicht…',
      qotd_confirm: 'Diese QOTD jetzt veröffentlichen ({channel})? Mitglieder könnten erwähnt werden.',
      qotd_published: 'QOTD #{n} in #{channel} veröffentlicht.',
      qotd_thread_missing: 'Es konnte kein Diskussionsthread erstellt werden.',
      qotd_paused: 'Veröffentlichung pausiert: Wartungsmodus oder QOTD-Sperre ist aktiv.',
      qotd_recent: 'Letzte QOTDs',
      qotd_empty: 'Noch keine QOTDs.',
      qotd_title_line: 'QOTD #{n}',
      qotd_edit: 'Bearbeiten',
      qotd_open: 'In Discord öffnen',
      qotd_save: 'Speichern',
      qotd_cancel: 'Abbrechen',
      qotd_edited: 'QOTD #{n} aktualisiert.',
      sug_title: 'Wartet auf Prüfung',
      sug_total: '{n} insgesamt',
      sug_empty: 'Im Moment gibt es nichts zu prüfen.',
      sug_from: 'Von {name}',
      sug_approve: 'Genehmigen & veröffentlichen',
      sug_reject: 'Ablehnen',
      sug_reason_ph: 'Grund für den Autor (mindestens 3 Zeichen)',
      sug_reject_confirm: 'Ablehnung senden',
      sug_approve_confirm: 'Diesen Vorschlag jetzt als nächste QOTD veröffentlichen?',
      sug_approved: 'Vorschlag #{id} als QOTD #{n} veröffentlicht.',
      sug_rejected: 'Vorschlag #{id} abgelehnt.',
      sug_dm_failed: 'Der Autor konnte nicht per DM benachrichtigt werden.',
      logs_logs: 'Aktivitätsprotokoll',
      logs_audit: 'Audit-Log',
      logs_empty: 'Noch nichts aufgezeichnet.',
      logs_more: 'Mehr laden',
      logs_total: '{n} Einträge',
      act_failed: 'Aktion fehlgeschlagen: {msg}',
      search_ph: '🔍 Server suchen…',
      search_none: 'Keine Server gefunden für „{q}“.'
    },
    fr: {
      title_login: 'Quello — Connexion', title_dashboard: 'Quello — Tableau de bord',
      nav_docs: 'Documentation', badge: 'BOT DISCORD', kicker_dash: 'Tableau de bord',
      login_title: 'Connexion à Quello',
      login_lead: 'Gérez les réglages QOTD de votre serveur directement depuis le site.',
      login_p1: 'Modifiez les rôles, salons et la langue sans commandes slash.',
      login_p2: 'Le propriétaire du serveur, un administrateur Discord ou le propriétaire du bot peut le modifier.',
      login_p3: 'Quello lit votre profil Discord de base et les autorisations des serveurs pour afficher les serveurs accessibles — jamais votre mot de passe, votre e-mail ou votre historique de messages.',
      login_discord: 'Continuer avec Discord',
      login_guest: 'Continuer sans se connecter',
      login_legal: 'En vous connectant, vous acceptez les', legal_terms: 'Conditions d’utilisation', legal_and: 'et la', legal_privacy: 'Politique de confidentialité',
      err_state: 'Le lien de connexion a expiré. Veuillez réessayer.',
      err_auth: 'La connexion Discord a échoué. Veuillez réessayer.',
      err_config: 'Le tableau de bord n’est pas encore configuré (adresse de l’API manquante).',
      menu_open: 'Ouvrir le menu', menu_close: 'Fermer le menu', theme: 'Thème', language: 'Langue',
      menu_server: 'SERVEUR', menu_account: 'COMPTE', menu_links: 'LIENS',
      menu_switch: 'Tous les serveurs', menu_docs: 'Documentation', menu_add: 'Ajouter Quello à un serveur', about_creator: 'À propos du créateur', add_short: 'Ajouter au serveur', add_hint: 'Invitez le bot sur un autre serveur', menu_logout: 'Se déconnecter',
      loading: 'Chargement…', retry: 'Réessayer', reload: 'Recharger',
      pick_title: 'Choisissez un serveur', pick_lead: 'Les serveurs auxquels vous avez accès et où Quello est installé.',
      pick_setup: 'Configuration requise', setup_title: 'Configuration initiale', setup_text: 'Choisissez un rôle de gestion et les salons des QOTD, puis enregistrez. Tout reste modifiable plus tard.', setup_role_required: 'Choisissez un rôle autorisé pour terminer la configuration.', pick_ready: 'Prêt à configurer',
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
      no_changes: 'Rien à enregistrer.',
      tab_settings: 'Paramètres',
      tab_qotds: 'QOTD',
      tab_suggestions: 'Suggestions',
      tab_logs: 'Journaux',
      pick_moderator: 'Modérateur · paramètres en lecture seule',
      ro_banner: 'Lecture seule. Le propriétaire du serveur, un administrateur Discord ou le propriétaire du bot peut modifier ces paramètres. Vous pouvez toujours publier des QOTD et examiner les suggestions.',
      warn_channel_missing: 'Quello ne peut pas publier ici : permissions manquantes : {perms}. Corrigez les permissions du salon dans Discord — l’enregistrement de ce salon sera refusé.',
      warn_channel_threads: 'Quello peut publier ici mais ne peut pas créer de fils. Permissions manquantes : {perms}. Les QOTD seront publiés sans fil de discussion.',
      perm_view_channel: 'Voir le salon',
      perm_send_messages: 'Envoyer des messages',
      perm_create_public_threads: 'Créer des fils publics',
      perm_send_messages_in_threads: 'Envoyer des messages dans les fils',
      qotd_new: 'Nouveau QOTD',
      qotd_question: 'Question',
      qotd_question_ph: 'Que souhaitez-vous demander au serveur ?',
      qotd_language: 'Langue',
      qotd_channel: 'Salon',
      qotd_channel_default: 'Salon configuré pour cette langue',
      qotd_publish: 'Publier le QOTD',
      qotd_random: 'Générer une question aléatoire', qotd_random_hint: 'Génère une question IA dans la langue principale de ce serveur et la publie dans le salon configuré.', qotd_random_confirm: 'Générer et publier une question IA aléatoire maintenant ? Les membres peuvent être notifiés.', qotd_random_loading: 'Génération…', qotd_random_published: 'QOTD aléatoire n°{n} publié dans #{channel}.',
      qotd_publishing: 'Publication…',
      qotd_confirm: 'Publier ce QOTD maintenant ({channel}) ? Des membres peuvent être mentionnés.',
      qotd_published: 'QOTD #{n} publié dans #{channel}.',
      qotd_thread_missing: 'Aucun fil de discussion n’a pu être créé.',
      qotd_paused: 'Publication en pause : le mode maintenance ou le verrouillage des QOTD est actif.',
      qotd_recent: 'QOTD récents',
      qotd_empty: 'Aucun QOTD pour le moment.',
      qotd_title_line: 'QOTD #{n}',
      qotd_edit: 'Modifier',
      qotd_open: 'Ouvrir dans Discord',
      qotd_save: 'Enregistrer',
      qotd_cancel: 'Annuler',
      qotd_edited: 'QOTD #{n} mis à jour.',
      sug_title: 'En attente d’examen',
      sug_total: '{n} au total',
      sug_empty: 'Rien à examiner pour le moment.',
      sug_from: 'De {name}',
      sug_approve: 'Approuver et publier',
      sug_reject: 'Rejeter',
      sug_reason_ph: 'Motif pour l’auteur (au moins 3 caractères)',
      sug_reject_confirm: 'Envoyer le rejet',
      sug_approve_confirm: 'Publier cette suggestion maintenant comme prochain QOTD ?',
      sug_approved: 'Suggestion #{id} publiée comme QOTD #{n}.',
      sug_rejected: 'Suggestion #{id} rejetée.',
      sug_dm_failed: 'L’auteur n’a pas pu être notifié par message privé.',
      logs_logs: 'Journal d’activité',
      logs_audit: 'Journal d’audit',
      logs_empty: 'Rien d’enregistré pour le moment.',
      logs_more: 'Charger plus',
      logs_total: '{n} entrées',
      act_failed: 'Échec de l’action : {msg}',
      search_ph: '🔍 Rechercher des serveurs…',
      search_none: 'Aucun serveur ne correspond à « {q} ».'
    },
    it: {
      title_login: 'Quello — Accedi', title_dashboard: 'Quello — Dashboard',
      nav_docs: 'Documentazione', badge: 'BOT DISCORD', kicker_dash: 'Dashboard',
      login_title: 'Accedi a Quello',
      login_lead: 'Gestisci le impostazioni QOTD del tuo server direttamente dal sito.',
      login_p1: 'Cambia ruoli, canali e lingua senza comandi slash.',
      login_p2: 'Il proprietario del server, un amministratore Discord o il proprietario del bot può modificarlo.',
      login_p3: 'Quello legge il tuo profilo Discord di base e i permessi dei server per mostrare quelli accessibili — mai la password, l’email o la cronologia dei messaggi.',
      login_discord: 'Continua con Discord',
      login_guest: 'Continua senza accedere',
      login_legal: 'Accedendo accetti i', legal_terms: 'Termini di servizio', legal_and: 'e l’', legal_privacy: 'Informativa sulla privacy',
      err_state: 'Il link di accesso è scaduto. Riprova.',
      err_auth: 'Accesso con Discord non riuscito. Riprova.',
      err_config: 'La dashboard non è ancora configurata (manca l’indirizzo dell’API).',
      menu_open: 'Apri il menu', menu_close: 'Chiudi il menu', theme: 'Tema', language: 'Lingua',
      menu_server: 'SERVER', menu_account: 'ACCOUNT', menu_links: 'LINK',
      menu_switch: 'Tutti i server', menu_docs: 'Documentazione', menu_add: 'Aggiungi Quello a un server', about_creator: 'Informazioni sul creatore', add_short: 'Aggiungi al server', add_hint: 'Invita il bot su un altro server', menu_logout: 'Esci',
      loading: 'Caricamento…', retry: 'Riprova', reload: 'Ricarica',
      pick_title: 'Scegli un server', pick_lead: 'I server a cui hai accesso e dove Quello è installato.',
      pick_setup: 'Da configurare', setup_title: 'Configurazione iniziale', setup_text: 'Scegli un ruolo di gestione e i canali per i QOTD, poi salva. Potrai cambiare tutto in seguito.', setup_role_required: 'Scegli un ruolo autorizzato per completare la configurazione.', pick_ready: 'Pronto da configurare',
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
      no_changes: 'Niente da salvare.',
      tab_settings: 'Impostazioni',
      tab_qotds: 'QOTD',
      tab_suggestions: 'Suggerimenti',
      tab_logs: 'Log',
      pick_moderator: 'Moderatore · impostazioni in sola lettura',
      ro_banner: 'Sola lettura. Il proprietario del server, un amministratore Discord o il proprietario del bot può modificare queste impostazioni. Puoi comunque pubblicare QOTD e rivedere i suggerimenti.',
      warn_channel_missing: 'Quello non può scrivere qui: permessi mancanti: {perms}. Correggi i permessi del canale in Discord: il salvataggio di questo canale verrà rifiutato.',
      warn_channel_threads: 'Quello può scrivere qui ma non può aprire thread. Permessi mancanti: {perms}. I QOTD verranno pubblicati senza thread di discussione.',
      perm_view_channel: 'Visualizza canale',
      perm_send_messages: 'Invia messaggi',
      perm_create_public_threads: 'Crea thread pubblici',
      perm_send_messages_in_threads: 'Invia messaggi nei thread',
      qotd_new: 'Nuovo QOTD',
      qotd_question: 'Domanda',
      qotd_question_ph: 'Cosa vuoi chiedere al server?',
      qotd_language: 'Lingua',
      qotd_channel: 'Canale',
      qotd_channel_default: 'Canale configurato per questa lingua',
      qotd_publish: 'Pubblica QOTD',
      qotd_random: 'Genera una domanda casuale', qotd_random_hint: 'Genera una domanda IA nella lingua principale del server e la pubblica nel canale configurato.', qotd_random_confirm: 'Generare e pubblicare subito una domanda IA casuale? I membri potrebbero ricevere una notifica.', qotd_random_loading: 'Generazione…', qotd_random_published: 'QOTD casuale #{n} pubblicato in #{channel}.',
      qotd_publishing: 'Pubblicazione…',
      qotd_confirm: 'Pubblicare questo QOTD ora ({channel})? I membri potrebbero essere menzionati.',
      qotd_published: 'QOTD #{n} pubblicato in #{channel}.',
      qotd_thread_missing: 'Non è stato possibile creare un thread di discussione.',
      qotd_paused: 'Pubblicazione in pausa: la modalità manutenzione o il blocco QOTD è attivo.',
      qotd_recent: 'QOTD recenti',
      qotd_empty: 'Ancora nessun QOTD.',
      qotd_title_line: 'QOTD #{n}',
      qotd_edit: 'Modifica',
      qotd_open: 'Apri in Discord',
      qotd_save: 'Salva',
      qotd_cancel: 'Annulla',
      qotd_edited: 'QOTD #{n} aggiornato.',
      sug_title: 'In attesa di revisione',
      sug_total: '{n} in totale',
      sug_empty: 'Niente da rivedere al momento.',
      sug_from: 'Da {name}',
      sug_approve: 'Approva e pubblica',
      sug_reject: 'Rifiuta',
      sug_reason_ph: 'Motivo per l’autore (almeno 3 caratteri)',
      sug_reject_confirm: 'Invia il rifiuto',
      sug_approve_confirm: 'Pubblicare ora questo suggerimento come prossimo QOTD?',
      sug_approved: 'Suggerimento #{id} pubblicato come QOTD #{n}.',
      sug_rejected: 'Suggerimento #{id} rifiutato.',
      sug_dm_failed: 'Non è stato possibile avvisare l’autore tramite DM.',
      logs_logs: 'Registro attività',
      logs_audit: 'Registro di audit',
      logs_empty: 'Ancora nulla di registrato.',
      logs_more: 'Carica altro',
      logs_total: '{n} voci',
      act_failed: 'Azione non riuscita: {msg}',
      search_ph: '🔍 Cerca server…',
      search_none: 'Nessun server corrisponde a “{q}”.'
    }
  };

  // New Dashboard sections — kept in the shared five-language dictionary.
  Object.assign(DICT.en, {
      tab_schedule: "Scheduled QOTD",
      tab_leaderboard: "Leaderboard",
      tab_statistics: "Statistics",
      schedule_title: "Scheduled QOTD",
      schedule_desc: "Automatically generate and publish QOTDs at your chosen interval using your server’s configured bot language.",
      schedule_enabled: "Enable Scheduled QOTD",
      schedule_time: "First publish time",
      schedule_interval: "Repeat frequency",
      schedule_every_24: "Every 24 hours",
      schedule_every_12: "Every 12 hours",
      schedule_every_6: "Every 6 hours",
      schedule_every_1: "Every hour",
      schedule_timezone: "Time zone (IANA)",
      schedule_timezone_hint: "Use an IANA time zone such as Europe/Helsinki or America/New_York.",
      schedule_retry: "Temporary generation or publishing failures are retried every 5 minutes for up to 1 hour. Non-retryable API errors (such as authentication or permission failures) skip the current slot and notify the server owner.",
      schedule_save: "Save schedule",
      schedule_saved: "Scheduled QOTD settings saved.",
      schedule_status_on: "Enabled",
      schedule_status_off: "Disabled",
      schedule_owner: "Only the server owner, a Discord Administrator, or the Bot Owner can manage the schedule.",
      schedule_invalid: "Enter a valid time and IANA time zone.",
      leader_creators: "Top QOTD creators",
      leader_responders: "Top responders",
      leader_empty: "No leaderboard data yet.",
      leader_count_qotd: "{n} QOTDs",
      leader_count_answers: "{n} answers",
      stats_total: "All-time QOTDs",
      stats_month: "This month",
      stats_week: "This week",
      stats_english: "English QOTDs",
      stats_russian: "Russian QOTDs",
      stats_empty: "No statistics available yet.",
      stats_refresh: "Refresh"
  });
  Object.assign(DICT.ru, {
      tab_schedule: "Расписание QOTD",
      tab_leaderboard: "Таблица лидеров",
      tab_statistics: "Статистика",
      schedule_title: "Расписание QOTD",
      schedule_desc: "Quello будет автоматически генерировать и публиковать QOTD с выбранным интервалом на основном языке бота сервера.",
      schedule_enabled: "Включить автоматический QOTD",
      schedule_time: "Время первой публикации",
      schedule_interval: "Частота публикаций",
      schedule_every_24: "Каждые 24 часа",
      schedule_every_12: "Каждые 12 часов",
      schedule_every_6: "Каждые 6 часов",
      schedule_every_1: "Каждый час",
      schedule_timezone: "Часовой пояс (IANA)",
      schedule_timezone_hint: "Укажите часовой пояс IANA, например Europe/Helsinki или Europe/Moscow.",
      schedule_retry: "При временных ошибках генерации или публикации Quello повторяет попытки каждые 5 минут в течение часа. Ошибки API, которые нельзя исправить повтором (например, проблемы авторизации или доступа), пропускают текущий запуск и приводят к уведомлению владельца сервера.",
      schedule_save: "Сохранить расписание",
      schedule_saved: "Настройки расписания сохранены.",
      schedule_status_on: "Включено",
      schedule_status_off: "Выключено",
      schedule_owner: "Управлять расписанием могут владелец сервера, пользователь с правом Discord Administrator или владелец бота.",
      schedule_invalid: "Укажите корректное время и часовой пояс IANA.",
      leader_creators: "Авторы QOTD",
      leader_responders: "Самые активные участники",
      leader_empty: "Данных для рейтинга пока нет.",
      leader_count_qotd: "QOTD: {n}",
      leader_count_answers: "Ответов: {n}",
      stats_total: "Всего QOTD",
      stats_month: "В этом месяце",
      stats_week: "За неделю",
      stats_english: "Английские QOTD",
      stats_russian: "Русские QOTD",
      stats_empty: "Статистика пока недоступна.",
      stats_refresh: "Обновить"
  });
  Object.assign(DICT.de, {
      tab_schedule: "Geplante QOTD",
      tab_leaderboard: "Bestenliste",
      tab_statistics: "Statistiken",
      schedule_title: "Geplante QOTD",
      schedule_desc: "Quello generiert und veröffentlicht QOTDs automatisch im gewählten Intervall in der konfigurierten Serversprache des Bots.",
      schedule_enabled: "Geplante QOTD aktivieren",
      schedule_time: "Uhrzeit der ersten Veröffentlichung",
      schedule_interval: "Wiederholungsintervall",
      schedule_every_24: "Alle 24 Stunden",
      schedule_every_12: "Alle 12 Stunden",
      schedule_every_6: "Alle 6 Stunden",
      schedule_every_1: "Jede Stunde",
      schedule_timezone: "Zeitzone (IANA)",
      schedule_timezone_hint: "Verwende eine IANA-Zeitzone, z. B. Europe/Berlin oder America/New_York.",
      schedule_retry: "Bei vorübergehenden Fehlern versucht Quello bis zu einer Stunde lang alle 5 Minuten erneut. Nicht wiederholbare API-Fehler, etwa bei Authentifizierung oder Berechtigungen, überspringen den aktuellen Termin und benachrichtigen den Serverinhaber.",
      schedule_save: "Zeitplan speichern",
      schedule_saved: "Zeitplaneinstellungen gespeichert.",
      schedule_status_on: "Aktiviert",
      schedule_status_off: "Deaktiviert",
      schedule_owner: "Nur der Serverinhaber, ein Discord-Administrator oder der Bot-Inhaber kann den Zeitplan verwalten.",
      schedule_invalid: "Gib eine gültige Uhrzeit und IANA-Zeitzone ein.",
      leader_creators: "Top-QOTD-Ersteller",
      leader_responders: "Aktivste Antwortende",
      leader_empty: "Noch keine Bestenlistendaten.",
      leader_count_qotd: "{n} QOTDs",
      leader_count_answers: "{n} Antworten",
      stats_total: "QOTDs insgesamt",
      stats_month: "Diesen Monat",
      stats_week: "Diese Woche",
      stats_english: "Englische QOTDs",
      stats_russian: "Russische QOTDs",
      stats_empty: "Noch keine Statistiken verfügbar.",
      stats_refresh: "Aktualisieren"
  });
  Object.assign(DICT.fr, {
      tab_schedule: "QOTD programmés",
      tab_leaderboard: "Classement",
      tab_statistics: "Statistiques",
      schedule_title: "QOTD programmés",
      schedule_desc: "Quello génère et publie automatiquement des QOTD selon l’intervalle choisi dans la langue configurée du bot sur le serveur.",
      schedule_enabled: "Activer les QOTD programmés",
      schedule_time: "Heure de la première publication",
      schedule_interval: "Fréquence de publication",
      schedule_every_24: "Toutes les 24 heures",
      schedule_every_12: "Toutes les 12 heures",
      schedule_every_6: "Toutes les 6 heures",
      schedule_every_1: "Toutes les heures",
      schedule_timezone: "Fuseau horaire (IANA)",
      schedule_timezone_hint: "Utilisez un fuseau IANA, par exemple Europe/Paris ou America/New_York.",
      schedule_retry: "En cas d’erreur temporaire, Quello réessaie toutes les 5 minutes pendant une heure maximum. Les erreurs API non réessayables, notamment d’authentification ou d’autorisation, ignorent le créneau actuel et avertissent le propriétaire du serveur.",
      schedule_save: "Enregistrer le programme",
      schedule_saved: "Paramètres du programme enregistrés.",
      schedule_status_on: "Activé",
      schedule_status_off: "Désactivé",
      schedule_owner: "Le propriétaire du serveur, un administrateur Discord ou le propriétaire du bot peut gérer le programme.",
      schedule_invalid: "Saisissez une heure et un fuseau IANA valides.",
      leader_creators: "Meilleurs créateurs de QOTD",
      leader_responders: "Membres les plus actifs",
      leader_empty: "Aucune donnée de classement pour le moment.",
      leader_count_qotd: "{n} QOTD",
      leader_count_answers: "{n} réponses",
      stats_total: "QOTD au total",
      stats_month: "Ce mois-ci",
      stats_week: "Cette semaine",
      stats_english: "QOTD en anglais",
      stats_russian: "QOTD en russe",
      stats_empty: "Aucune statistique disponible pour le moment.",
      stats_refresh: "Actualiser"
  });
  Object.assign(DICT.it, {
      tab_schedule: "QOTD programmati",
      tab_leaderboard: "Classifica",
      tab_statistics: "Statistiche",
      schedule_title: "QOTD programmati",
      schedule_desc: "Quello genera e pubblica automaticamente QOTD all’intervallo scelto nella lingua del bot configurata per il server.",
      schedule_enabled: "Attiva i QOTD programmati",
      schedule_time: "Orario della prima pubblicazione",
      schedule_interval: "Frequenza di pubblicazione",
      schedule_every_24: "Ogni 24 ore",
      schedule_every_12: "Ogni 12 ore",
      schedule_every_6: "Ogni 6 ore",
      schedule_every_1: "Ogni ora",
      schedule_timezone: "Fuso orario (IANA)",
      schedule_timezone_hint: "Usa un fuso IANA, ad esempio Europe/Rome o America/New_York.",
      schedule_retry: "In caso di errore temporaneo, Quello riprova ogni 5 minuti per un massimo di un’ora. Gli errori API non ripetibili, ad esempio di autenticazione o autorizzazione, saltano l’intervallo corrente e avvisano il proprietario del server.",
      schedule_save: "Salva programmazione",
      schedule_saved: "Impostazioni della programmazione salvate.",
      schedule_status_on: "Attivo",
      schedule_status_off: "Disattivato",
      schedule_owner: "Il proprietario del server, un amministratore Discord o il proprietario del bot può gestire la programmazione.",
      schedule_invalid: "Inserisci un orario e un fuso IANA validi.",
      leader_creators: "Migliori creatori di QOTD",
      leader_responders: "Membri più attivi",
      leader_empty: "Nessun dato in classifica.",
      leader_count_qotd: "{n} QOTD",
      leader_count_answers: "{n} risposte",
      stats_total: "QOTD totali",
      stats_month: "Questo mese",
      stats_week: "Questa settimana",
      stats_english: "QOTD in inglese",
      stats_russian: "QOTD in russo",
      stats_empty: "Nessuna statistica disponibile.",
      stats_refresh: "Aggiorna"
  });

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
        if (window.QThemeSwitch) { window.QThemeSwitch.set(next, themeToggle); return; }
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
    if (API_UNSET) throw new ApiFailure('config', t('err_config'));
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
      throw new ApiFailure('network', t('err_network') + ' (' + apiHost() + ')');
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

  window.Q = { CFG, API_BASE, API_UNSET, LANGS, t, applyI18n, setLang, wireHeader, getToken, setToken, clearToken, tokenLooksValid, api, ApiFailure };
})();
