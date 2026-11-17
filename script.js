
    const translations = {
      en: {
        nav_commands:'Commands',nav_preview:'Preview',menu_hint:'Documentation',menu_subtitle:'Your Question of the Day bot',menu_home:'⌂ Home',menu_commands:'▣ Commands',menu_preview:'✦ QOTD Preview',menu_setup:'⚙ Setup',menu_faq:'? FAQ',menu_trouble:'⚠ Troubleshooting',menu_changelog:'↻ Changelog',menu_community:'☁ Community',menu_terms:'Terms of Service',menu_privacy:'Privacy Policy',nav_setup:'Setup',nav_faq:'FAQ',nav_changelog:'Changelog',nav_terms:'Terms',nav_privacy:'Privacy',badge:'DISCORD BOT',hero_subtitle:'A Discord bot for creating, managing, and tracking Question of the Day posts with configurable channels, roles, logs, history, and administration tools.',add_discord:'Add to Discord',join_discord:'Join our Discord',overview_label:'ABOUT QUELLO',overview_title:'Questions made for community conversations.',overview_text:'Create numbered QOTDs, mention the configured role, optionally credit the suggester, and automatically open a discussion thread. Server owners can configure the bot and manage logs and controls from Discord.',eyebrow_commands:'EXPLORE',commands_title:'Command Explorer',commands_intro:'A clean Discord-style reference for every command currently available in Quello.',cmd_qotd:'Create a new Question of the Day.',cmd_edit:'Edit an existing QOTD by Discord message ID.',cmd_delete:'Delete an existing QOTD by Discord message ID.',cmd_info:'View information about a QOTD.',cmd_stats:'View QOTD statistics for the current server.',cmd_leaderboard:'View the QOTD creator and responder leaderboards.',cmd_history:'View QOTD history.',cmd_setup:'Configure QOTD roles, channels, and bot language.',cmd_config:'View the current QOTD configuration.',cmd_logs:'View and filter QOTD logs with pagination and Refresh.',cmd_audit:'View the separate detailed interaction audit log.',cmd_resetlogs:'Reset the normal QOTD logs.',cmd_reset:'Reset the QOTD counter.',cmd_maintenance:'Enable or disable QOTD maintenance mode.',cmd_lock:'Lock or unlock QOTD creation.',cmd_help:'Show the available Quello commands.',use_qotd:'Configured QOTD role',param_qotd:'question · language · optional channel · optional suggested_by',use_qotd_edit:'Configured QOTD role, Bot Owner or Server Owner',owner_only:'Bot Owner or Server Owner',server_command:'Current server',no_global_stats:'Server-only statistics',leaderboard_detail:'Creator and responder rankings for this server',history_detail:'Browse previously created QOTDs',setup_params:'role · allowed_role · optional English/Russian channels · language',audit_detail:'Tracks interaction attempts and errors without storing secrets',all_users:'Available to all users',permissions_label:'Permissions:',permissions_text:'QOTD creation, editing, and deletion use the configured allowed role; the Bot Owner and Server Owner can also use these tools. Owner-only management commands are restricted to the Bot Owner or Server Owner.',eyebrow_preview:'TRY IT',preview_title:'QOTD Preview Builder',preview_intro:'Build a realistic QOTD message, switch its language, hide optional credit, and copy the result with one tap.',builder_inputs:'Message settings',question_label:'Question',number_label:'QOTD number',language_label:'QOTD language',thanks_label:'Suggested by',show_suggester:'Show suggested-by line',reset_preview:'Reset',copy_preview:'Copy text',preview_channel:'Question of the Day',preview_suggested:'Suggested by:',preview_thread:'QOTD discussion thread',eyebrow_setup:'GET STARTED',setup_title:'Set Up Quello',setup_intro:'A simple visual guide for getting your server ready for its first Question of the Day.',setup_embed_title:'Quello Setup Guide',setup_embed_subtitle:'Complete these steps in order',step1_title:'Add Quello',step1_text:'Use the Add to Discord button above and select the server where you want to use Quello.',step2_title:'Run /setup',step2_text:'As the Server Owner or Bot Owner, configure the mention role, the role allowed to create QOTDs, optional English and Russian channels, and the bot interface language.',step3_title:'Check /config',step3_text:'Review the saved configuration and make sure the roles and channels match your server.',step4_title:'Create your first QOTD',step4_text:'Use /qotd with a question and language. You can optionally choose a channel and credit the member who suggested the question.',setup_note_title:'Tip',setup_note_text:'The configured allowed role controls who can create, edit, and delete QOTDs. Bot Owner and Server Owner access is also supported.',eyebrow_permissions:'ACCESS',permissions_title:'Permissions at a Glance',access_qotd:'Configured allowed role, Bot Owner or Server Owner',access_edit_delete:'Configured allowed role, Bot Owner or Server Owner',access_owner:'Bot Owner or Server Owner',eyebrow_faq:'HELP',faq_title:'Frequently Asked Questions',faq1_q:"Why isn't /qotd working?",faq1_a:'Check that the bot is configured with /setup, that the selected roles and channels are correct, and that the user has the configured allowed role.',faq2_q:'How do I change the QOTD channel?',faq2_a:'Run /setup again and update the English and/or Russian QOTD channel. You can also choose a channel directly when using /qotd.',faq3_q:'What does /lock do?',faq3_a:'It lets an authorized owner temporarily prevent new QOTDs from being created.',faq4_q:'What is /audit_log?',faq4_a:'It provides a separate, detailed record of bot interaction attempts and errors for the server. It is restricted to the Bot Owner or Server Owner.',faq5_q:'Can I use Quello on multiple servers?',faq5_a:'Yes. Each server has its own configuration, counters, QOTD history and normal logs.',eyebrow_changelog:'UPDATES',changelog_title:'Changelog',change1_title:'Website redesign & documentation update',change1_text:'Reworked the site around Discord-style embeds, improved the QOTD preview builder, and redesigned the setup guide.',change2_title:'Bot feature documentation',change2_text:'Updated the website for Audit Log, Maintenance Mode, QOTD Lock, server statistics, history, and the latest administration tools.',change3_title:'/leaderboard expanded',change3_text:'The /leaderboard command now includes separate QOTD Creator and QOTD Responder rankings, with All / English / Russian language filtering.',eyebrow_community:'COMMUNITY',community_title:'Join the Quello Community',community_text:'Get support, discuss updates, and share ideas with other Quello users.',community_button:'Join Discord',privacy_first:'Privacy first.',privacy_text:'Quello processes Discord and QOTD information needed for its features, including server configuration, QOTD history, normal logs, and detailed interaction audit records.',doc_nav_label:'DOCUMENTATION',doc_nav_commands:'Commands',doc_nav_preview:'Preview',doc_nav_setup:'Setup',doc_nav_faq:'FAQ',doc_nav_troubleshooting:'Troubleshooting',doc_nav_changelog:'Changelog',eyebrow_quickstart:'QUICK START',quickstart_title:'Ready to use Quello?',quickstart_text:'Invite the bot, configure your server, and create your first question in a few steps.',quick1:'Invite the bot',quick2:'Run /setup',quick3:'Check /config',quick4:'Create /qotd',quickstart_button:'Open Setup Guide',eyebrow_intent:'QUICK NAVIGATION',intent_title:'What do you want to do?',intent_text:'Jump directly to the part of the documentation you need.',intent_setup:'🚀 Set up the bot',intent_qotd:'💬 Build a QOTD',intent_commands:'📖 Explore commands',intent_help:'❓ Get help',eyebrow_new:"WHAT'S NEW",new_title:'Latest website updates',new_text:'Quello now has a smarter side navigation experience, an interactive Command Playground, a guided QOTD builder, setup progress, community highlights, and hidden extras.',new_button:'View full changelog →',eyebrow_details:'COMMAND DETAILS',details_title:'How the commands work',details_intro:'Open a command below to see what it does, what it expects, and who can use it.',detail_qotd:'Creates a new QOTD using the configured server settings. The command supports a question, language, an optional channel, and an optional suggested-by member. Access uses the configured allowed role, with Bot Owner and Server Owner access also supported.',detail_edit:'Edits an existing QOTD by its Discord message ID. You provide the message ID and the new question. Access uses the configured allowed role, Bot Owner, or Server Owner.',detail_delete:'Deletes an existing QOTD by Discord message ID. Access uses the configured allowed role, Bot Owner, or Server Owner.',detail_info:'Shows information about a QOTD identified by Discord message ID. Restricted to the Bot Owner or Server Owner.',detail_stats:'Shows QOTD statistics for the current server. It is not a global statistics command.',detail_leaderboard:'Shows two QOTD rankings for the current server: creators and responders, with All / English / Russian language filtering.',detail_history:'Shows the QOTD history for the current server.',detail_setup:'Configures the QOTD mention role, allowed role, optional English and Russian channels, and the bot language. Restricted to the Bot Owner or Server Owner.',detail_config:'Displays the current QOTD configuration for the server. Restricted to the Bot Owner or Server Owner.',detail_logs:'Displays and filters normal QOTD logs with pagination and Refresh controls. Restricted to the Bot Owner or Server Owner.',detail_audit:'Displays the separate interaction audit log, including interaction attempts and errors. Restricted to the Bot Owner or Server Owner and designed not to store secrets.',detail_resetlogs:'Clears the normal QOTD logs. Restricted to the Bot Owner or Server Owner.',detail_reset:'Resets the QOTD counter for the server. Restricted to the Bot Owner or Server Owner.',detail_maintenance:'Turns QOTD maintenance mode on or off. While enabled, QOTD creation is blocked. Restricted to the Bot Owner or Server Owner.',detail_lock:'Locks or unlocks QOTD creation for the server. Restricted to the Bot Owner or Server Owner.',detail_help:"Shows the bot's available commands and help categories.",checklist_title:'Server setup checklist',check_invite:'Invite Quello',check_setup:'Run /setup',check_channels:'Choose QOTD channels',check_roles:'Configure the allowed role',check_config:'Verify /config',check_first:'Create your first QOTD',eyebrow_trouble:'TROUBLESHOOTING',trouble_title:'Something not working?',trouble_intro:'Use these quick checks before changing your server configuration.',trouble1_q:'/qotd is unavailable',trouble1_a:'Run /setup and verify the allowed role, QOTD channels, and language. Make sure the user has the configured allowed role.',trouble2_q:'The bot cannot send the QOTD',trouble2_a:'Check that Quello can view the target channel, send messages, mention the configured role, and create threads there.',trouble3_q:'The QOTD counter is unexpected',trouble3_a:'Check the server counter with the relevant management commands. Remember that failed operations can leave number gaps because counters are kept safe for concurrent use.',trouble4_q:'I need to stop new QOTDs temporarily',trouble4_a:'Use /lock for a temporary lock or /maintenance when the server is being serviced.',trouble5_q:'I need to inspect bot interactions',trouble5_a:'Use /logs for normal QOTD activity or /audit_log for the separate interaction audit record.',footer_text:'Questions for better conversations.'
      },
      ru: {
        nav_commands:'Команды',nav_preview:'Предпросмотр',menu_hint:'Документация',menu_subtitle:'Ваш бот вопросов дня',menu_home:'⌂ Главная',menu_commands:'▣ Команды',menu_preview:'✦ Предпросмотр QOTD',menu_setup:'⚙ Настройка',menu_faq:'? FAQ',menu_trouble:'⚠ Решение проблем',menu_changelog:'↻ Чейнджлог',menu_community:'☁ Сообщество',menu_terms:'Условия использования',menu_privacy:'Политика конфиденциальности',nav_setup:'Настройка',nav_faq:'FAQ',nav_changelog:'Чейнджлог',nav_terms:'Условия',nav_privacy:'Приватность',badge:'DISCORD БОТ',hero_subtitle:'Discord-бот для создания, управления и отслеживания вопросов дня с настраиваемыми каналами, ролями, логами, историей и административными инструментами.',add_discord:'Добавить в Discord',join_discord:'Наш Discord',overview_label:'О БОТЕ',overview_title:'Вопросы для общения сообщества.',overview_text:'Создавайте нумерованные QOTD, упоминайте настроенную роль, при желании указывайте автора предложения и автоматически открывайте ветку обсуждения. Владелец сервера может настроить бота и управлять логами и режимами прямо из Discord.',eyebrow_commands:'КОМАНДЫ',commands_title:'Обзор команд',commands_intro:'Аккуратный Discord-подобный справочник всех текущих команд Quello.',cmd_qotd:'Создать новый вопрос дня.',cmd_edit:'Изменить QOTD по Discord Message ID.',cmd_delete:'Удалить QOTD по Discord Message ID.',cmd_info:'Просмотреть информацию о QOTD.',cmd_stats:'Просмотреть статистику QOTD текущего сервера.',cmd_leaderboard:'Просмотреть рейтинги создателей и отвечающих QOTD.',cmd_history:'Просмотреть историю QOTD.',cmd_setup:'Настроить роли, каналы и язык бота.',cmd_config:'Просмотреть текущую конфигурацию QOTD.',cmd_logs:'Просматривать и фильтровать логи QOTD с пагинацией и Refresh.',cmd_audit:'Просмотреть отдельный подробный audit log взаимодействий.',cmd_resetlogs:'Сбросить обычные логи QOTD.',cmd_reset:'Сбросить счётчик QOTD.',cmd_maintenance:'Включить или выключить режим обслуживания QOTD.',cmd_lock:'Заблокировать или разблокировать создание QOTD.',cmd_help:'Показать доступные команды Quello.',use_qotd:'Настроенная роль QOTD',param_qotd:'question · language · необязательный channel · необязательный suggested_by',use_qotd_edit:'Настроенная роль QOTD, владелец бота или сервера',owner_only:'Владелец бота или владелец сервера',server_command:'Текущий сервер',no_global_stats:'Только статистика сервера',leaderboard_detail:'Рейтинги создателей и отвечающих этого сервера',history_detail:'Просмотр созданных ранее QOTD',setup_params:'role · allowed_role · необязательные EN/RU каналы · язык',audit_detail:'Фиксирует попытки взаимодействия и ошибки без сохранения секретов',all_users:'Доступно всем пользователям',permissions_label:'Права:',permissions_text:'Создание, изменение и удаление QOTD используют настроенную разрешённую роль; владелец бота и владелец сервера также могут использовать эти команды. Команды только для владельцев доступны владельцу бота или сервера.',eyebrow_preview:'ПОПРОБУЙТЕ',preview_title:'Конструктор предпросмотра QOTD',preview_intro:'Соберите реалистичное сообщение QOTD, переключите язык, скройте необязательное указание автора и скопируйте результат одним нажатием.',builder_inputs:'Настройки сообщения',question_label:'Вопрос',number_label:'Номер QOTD',language_label:'Язык QOTD',thanks_label:'Предложил',show_suggester:'Показывать строку «Предложил»',reset_preview:'Сбросить',copy_preview:'Копировать текст',preview_channel:'Вопрос дня',preview_suggested:'Предложил:',preview_thread:'Ветка обсуждения QOTD',eyebrow_setup:'НАЧАЛО РАБОТЫ',setup_title:'Настройка Quello',setup_intro:'Наглядная инструкция, которая поможет подготовить сервер к первому вопросу дня.',setup_embed_title:'Инструкция по настройке Quello',setup_embed_subtitle:'Выполните шаги по порядку',step1_title:'Добавьте Quello',step1_text:'Используйте кнопку «Добавить в Discord» выше и выберите сервер, где хотите использовать Quello.',step2_title:'Запустите /setup',step2_text:'Будучи владельцем сервера или бота, настройте роль для упоминания, роль для создания QOTD, необязательные английский и русский каналы и язык интерфейса бота.',step3_title:'Проверьте /config',step3_text:'Просмотрите сохранённую конфигурацию и убедитесь, что роли и каналы соответствуют вашему серверу.',step4_title:'Создайте первый QOTD',step4_text:'Используйте /qotd с вопросом и языком. При желании можно выбрать канал и указать участника, который предложил вопрос.',setup_note_title:'Совет',setup_note_text:'Настроенная разрешённая роль определяет, кто может создавать, изменять и удалять QOTD. Владелец бота и владелец сервера также имеют доступ.',eyebrow_permissions:'ДОСТУП',permissions_title:'Права доступа',access_qotd:'Настроенная разрешённая роль, владелец бота или сервера',access_edit_delete:'Настроенная разрешённая роль, владелец бота или сервера',access_owner:'Владелец бота или владелец сервера',eyebrow_faq:'ПОМОЩЬ',faq_title:'Часто задаваемые вопросы',faq1_q:'Почему /qotd не работает?',faq1_a:'Проверьте настройку через /setup, выбранные роли и каналы, а также наличие у пользователя настроенной разрешённой роли.',faq2_q:'Как изменить канал QOTD?',faq2_a:'Снова запустите /setup и измените английский и/или русский канал. Также канал можно указать напрямую при использовании /qotd.',faq3_q:'Что делает /lock?',faq3_a:'Позволяет авторизованному владельцу временно запретить создание новых QOTD.',faq4_q:'Что такое /audit_log?',faq4_a:'Это отдельный подробный журнал попыток взаимодействия с ботом и ошибок на сервере. Доступен владельцу бота или сервера.',faq5_q:'Можно использовать Quello на нескольких серверах?',faq5_a:'Да. У каждого сервера свои настройки, счётчики, история QOTD и обычные логи.',eyebrow_changelog:'ОБНОВЛЕНИЯ',changelog_title:'Чейнджлог',change1_title:'Редизайн сайта и обновление документации',change1_text:'Сайт переработан вокруг Discord-подобных embed-блоков, улучшен конструктор QOTD и полностью переделана инструкция по настройке.',change2_title:'Документация функций бота',change2_text:'Сайт обновлён для Audit Log, Maintenance Mode, QOTD Lock, статистики сервера, истории и актуальных административных инструментов.',change3_title:'Обновление /leaderboard',change3_text:'Команда /leaderboard теперь включает отдельные рейтинги создателей и отвечающих QOTD с фильтрацией All / English / Russian.',eyebrow_community:'СООБЩЕСТВО',community_title:'Присоединяйтесь к сообществу Quello',community_text:'Получайте помощь, обсуждайте обновления и предлагайте идеи вместе с другими пользователями Quello.',community_button:'Присоединиться',privacy_first:'Конфиденциальность прежде всего.',privacy_text:'Quello обрабатывает данные Discord и QOTD, необходимые для работы функций, включая настройки сервера, историю QOTD, обычные логи и подробные audit records.',doc_nav_label:'ДОКУМЕНТАЦИЯ',doc_nav_commands:'Команды',doc_nav_preview:'Предпросмотр',doc_nav_setup:'Настройка',doc_nav_faq:'FAQ',doc_nav_troubleshooting:'Решение проблем',doc_nav_changelog:'Чейнджлог',eyebrow_quickstart:'БЫСТРЫЙ СТАРТ',quickstart_title:'Готовы использовать Quello?',quickstart_text:'Добавьте бота, настройте сервер и создайте первый вопрос всего за несколько шагов.',quick1:'Добавьте бота',quick2:'Запустите /setup',quick3:'Проверьте /config',quick4:'Создайте /qotd',quickstart_button:'Открыть инструкцию',eyebrow_intent:'БЫСТРАЯ НАВИГАЦИЯ',intent_title:'Что вы хотите сделать?',intent_text:'Перейдите прямо к нужному разделу документации.',intent_setup:'🚀 Настроить бота',intent_qotd:'💬 Создать QOTD',intent_commands:'📖 Изучить команды',intent_help:'❓ Получить помощь',eyebrow_new:'ЧТО НОВОГО',new_title:'Последние обновления сайта',new_text:'Документация получила более чистый Discord-подобный дизайн, удобный конструктор QOTD и пошаговую настройку сервера.',new_button:'Открыть полный чейнджлог →',eyebrow_details:'ДЕТАЛИ КОМАНД',details_title:'Как работают команды',details_intro:'Откройте команду ниже, чтобы увидеть её назначение, параметры и права доступа.',detail_qotd:'Создаёт новый QOTD с настройками сервера. Команда поддерживает вопрос, язык, необязательный канал и участника, предложившего вопрос. Доступ есть у настроенной разрешённой роли, владельца бота и владельца сервера.',detail_edit:'Изменяет существующий QOTD по Discord Message ID. Нужно указать ID сообщения и новый вопрос. Доступ есть у разрешённой роли, владельца бота или сервера.',detail_delete:'Удаляет существующий QOTD по Discord Message ID. Доступ есть у разрешённой роли, владельца бота или сервера.',detail_info:'Показывает информацию о QOTD по Discord Message ID. Только владелец бота или сервера.',detail_stats:'Показывает статистику QOTD текущего сервера. Это не глобальная статистика.',detail_leaderboard:'Показывает два рейтинга QOTD для текущего сервера: создателей и отвечающих, с фильтрацией All / English / Russian.',detail_history:'Показывает историю QOTD текущего сервера.',detail_setup:'Настраивает роль для упоминания, разрешённую роль, необязательные английский и русский каналы и язык бота. Только владелец бота или сервера.',detail_config:'Показывает текущую конфигурацию QOTD для сервера. Только владелец бота или сервера.',detail_logs:'Показывает и фильтрует обычные логи QOTD с пагинацией и Refresh. Только владелец бота или сервера.',detail_audit:'Показывает отдельный audit log взаимодействий, включая попытки и ошибки. Только владелец бота или сервера; секреты не сохраняются.',detail_resetlogs:'Очищает обычные логи QOTD. Только владелец бота или сервера.',detail_reset:'Сбрасывает счётчик QOTD для сервера. Только владелец бота или сервера.',detail_maintenance:'Включает или выключает режим обслуживания QOTD. При включении создание QOTD блокируется. Только владелец бота или сервера.',detail_lock:'Блокирует или разблокирует создание QOTD для сервера. Только владелец бота или сервера.',detail_help:'Показывает доступные команды и категории помощи.',checklist_title:'Чек-лист настройки сервера',check_invite:'Добавить Quello',check_setup:'Запустить /setup',check_channels:'Выбрать каналы QOTD',check_roles:'Настроить разрешённую роль',check_config:'Проверить /config',check_first:'Создать первый QOTD',eyebrow_trouble:'РЕШЕНИЕ ПРОБЛЕМ',trouble_title:'Что-то не работает?',trouble_intro:'Проверьте эти пункты перед изменением настроек сервера.',trouble1_q:'/qotd недоступна',trouble1_a:'Запустите /setup и проверьте разрешённую роль, каналы QOTD и язык. У пользователя должна быть настроенная разрешённая роль.',trouble2_q:'Бот не может отправить QOTD',trouble2_a:'Проверьте, что Quello может видеть нужный канал, отправлять сообщения, упоминать настроенную роль и создавать там ветки.',trouble3_q:'Счётчик QOTD выглядит неправильно',trouble3_a:'Проверьте счётчик сервера соответствующими командами управления. После неудачных операций могут оставаться пропуски номеров — это сделано для безопасной параллельной работы.',trouble4_q:'Нужно временно остановить новые QOTD',trouble4_a:'Используйте /lock для временной блокировки или /maintenance во время обслуживания.',trouble5_q:'Нужно проверить взаимодействия с ботом',trouble5_a:'Используйте /logs для обычной активности QOTD или /audit_log для отдельного журнала взаимодействий.',footer_text:'Вопросы для лучших обсуждений.'
      },
      de: {
        menu_hint:'Dokumentation',menu_subtitle:'Dein Question-of-the-Day-Bot',menu_home:'⌂ Startseite',menu_commands:'▣ Befehle',menu_preview:'✦ QOTD-Vorschau',menu_setup:'⚙ Einrichtung',menu_faq:'? FAQ',menu_trouble:'⚠ Fehlerbehebung',menu_changelog:'↻ Changelog',menu_community:'☁ Community',menu_terms:'Nutzungsbedingungen',menu_privacy:'Datenschutzerklärung',badge:'DISCORD BOT',hero_subtitle:'Ein Discord-Bot zum Erstellen, Verwalten und Organisieren von Question-of-the-Day-Beiträgen.',add_discord:'Zu Discord hinzufügen',join_discord:'Unserem Discord beitreten',overview_label:'ÜBER QUELLO',overview_title:'Fragen für echte Community-Gespräche.',overview_text:'Erstelle nummerierte QOTDs, erwähne die konfigurierte Rolle, nenne optional den Vorschlagenden und öffne automatisch einen Diskussionsthread.',eyebrow_quickstart:'SCHNELLSTART',quickstart_title:'Bereit für Quello?',quickstart_text:'Lade den Bot ein, richte deinen Server ein und erstelle deine erste Frage in wenigen Schritten.',quick1:'Bot einladen',quick2:'/setup ausführen',quick3:'/config prüfen',quick4:'/qotd erstellen',quickstart_button:'Einrichtung öffnen',eyebrow_intent:'SCHNELLE NAVIGATION',intent_title:'Was möchtest du tun?',intent_text:'Springe direkt zum benötigten Dokumentationsbereich.',intent_setup:'🚀 Bot einrichten',intent_qotd:'💬 QOTD erstellen',intent_commands:'📖 Befehle ansehen',intent_help:'❓ Hilfe erhalten',eyebrow_new:'NEUIGKEITEN',new_title:'Neueste Website-Updates',new_text:'Die Dokumentation bietet jetzt ein klareres Discord-inspiriertes Layout, einen besseren QOTD-Builder und eine geführte Einrichtung.',new_button:'Vollständigen Changelog ansehen →',eyebrow_commands:'ENTDECKEN',commands_title:'Befehlsübersicht',commands_intro:'Eine übersichtliche Referenz für alle aktuell verfügbaren Quello-Befehle.',cmd_qotd:'Erstellt eine neue Question of the Day.',cmd_edit:'Bearbeitet einen QOTD über die Discord-Nachrichten-ID.',cmd_delete:'Löscht einen QOTD über die Discord-Nachrichten-ID.',cmd_info:'Zeigt Informationen zu einem QOTD.',cmd_stats:'Zeigt QOTD-Statistiken für den aktuellen Server.',cmd_leaderboard:'Zeigt die QOTD-Ranglisten für Ersteller und Antwortende.',cmd_history:'Zeigt die QOTD-Historie.',cmd_setup:'Konfiguriert QOTD-Rollen, Kanäle und die Bot-Sprache.',cmd_config:'Zeigt die aktuelle QOTD-Konfiguration.',cmd_logs:'Zeigt und filtert QOTD-Logs mit Seitenwechsel und Aktualisieren.',cmd_audit:'Zeigt das detaillierte Interaktions-Audit-Log.',cmd_resetlogs:'Setzt die normalen QOTD-Logs zurück.',cmd_reset:'Setzt den QOTD-Zähler zurück.',cmd_maintenance:'Aktiviert oder deaktiviert den Wartungsmodus.',cmd_lock:'Sperrt oder entsperrt die QOTD-Erstellung.',cmd_help:'Zeigt die verfügbaren Quello-Befehle.',owner_only:'Bot-Eigentümer oder Server-Eigentümer',server_command:'Aktueller Server',no_global_stats:'Nur Server-Statistiken',leaderboard_detail:'Ersteller- und Antwortenden-Ranglisten dieses Servers',history_detail:'Zuvor erstellte QOTDs durchsuchen',all_users:'Für alle Benutzer verfügbar',permissions_label:'Berechtigungen:',permissions_text:'QOTD-Erstellung, Bearbeitung und Löschung verwenden die konfigurierte erlaubte Rolle; Bot- und Server-Eigentümer haben ebenfalls Zugriff.',eyebrow_preview:'AUSPROBIEREN',preview_title:'QOTD-Vorschau-Builder',preview_intro:'Erstelle eine realistische QOTD-Nachricht und kopiere das Ergebnis mit einem Klick.',builder_inputs:'Nachrichteneinstellungen',question_label:'Frage',number_label:'QOTD-Nummer',language_label:'QOTD-Sprache',thanks_label:'Vorgeschlagen von',show_suggester:'Vorschlagszeile anzeigen',reset_preview:'Zurücksetzen',copy_preview:'Text kopieren',preview_channel:'Question of the Day',preview_suggested:'Vorgeschlagen von:',preview_thread:'QOTD-Diskussionsthread',eyebrow_setup:'ERSTE SCHRITTE',setup_title:'Quello einrichten',setup_intro:'Eine einfache Anleitung, um deinen Server für die erste Question of the Day vorzubereiten.',setup_embed_title:'Quello-Einrichtungsanleitung',setup_embed_subtitle:'Führe diese Schritte der Reihe nach aus',step1_title:'Quello hinzufügen',step1_text:'Verwende die Discord-Schaltfläche oben und wähle den gewünschten Server.',step2_title:'/setup ausführen',step2_text:'Konfiguriere die Erwähnungsrolle, die erlaubte QOTD-Rolle, optionale Kanäle und die Sprache des Bots.',step3_title:'/config prüfen',step3_text:'Prüfe die gespeicherte Konfiguration und stelle sicher, dass Rollen und Kanäle stimmen.',step4_title:'Ersten QOTD erstellen',step4_text:'Verwende /qotd mit einer Frage und Sprache.',setup_note_title:'Tipp',setup_note_text:'Die konfigurierte erlaubte Rolle bestimmt, wer QOTDs erstellen, bearbeiten und löschen darf.',eyebrow_permissions:'ZUGRIFF',permissions_title:'Berechtigungen im Überblick',access_qotd:'Erlaubte Rolle, Bot-Eigentümer oder Server-Eigentümer',access_edit_delete:'Erlaubte Rolle, Bot-Eigentümer oder Server-Eigentümer',access_owner:'Bot-Eigentümer oder Server-Eigentümer',eyebrow_faq:'HILFE',faq_title:'Häufig gestellte Fragen',faq1_q:'Warum funktioniert /qotd nicht?',faq1_a:'Prüfe /setup, die Rollen und Kanäle sowie die erlaubte Rolle des Benutzers.',faq2_q:'Wie ändere ich den QOTD-Kanal?',faq2_a:'Führe /setup erneut aus und aktualisiere den gewünschten Kanal.',faq3_q:'Was macht /lock?',faq3_a:'Damit kann ein autorisierter Eigentümer neue QOTDs vorübergehend blockieren.',faq4_q:'Was ist /audit_log?',faq4_a:'Ein separates detailliertes Protokoll von Bot-Interaktionen und Fehlern.',faq5_q:'Kann ich Quello auf mehreren Servern verwenden?',faq5_a:'Ja. Jeder Server hat eigene Einstellungen, Zähler und QOTD-Historie.',eyebrow_changelog:'UPDATES',changelog_title:'Changelog',change1_title:'Website-Redesign & Dokumentationsupdate',change1_text:'Die Website wurde mit Discord-inspirierten Embeds, einer verbesserten QOTD-Vorschau und einer neuen Einrichtungsanleitung überarbeitet.',change2_title:'Bot-Funktionsdokumentation',change2_text:'Die Dokumentation wurde für Audit Log, Wartungsmodus, QOTD-Sperre, Server-Statistiken und Verwaltung aktualisiert.',change3_title:'/leaderboard erweitert',change3_text:'/leaderboard enthält jetzt separate Ranglisten für QOTD-Ersteller und Antwortende.',eyebrow_community:'COMMUNITY',community_title:'Der Quello-Community beitreten',community_text:'Erhalte Hilfe, bespreche Updates und teile Ideen mit anderen Quello-Nutzern.',community_button:'Discord beitreten',privacy_first:'Datenschutz zuerst.',privacy_text:'Quello verarbeitet die für seine Funktionen benötigten Discord- und QOTD-Daten.',privacy_link:'Datenschutzerklärung lesen.',footer_text:'Fragen für bessere Gespräche.',details_title:'So funktionieren die Befehle',details_intro:'Öffne einen Befehl, um Zweck, Parameter und Berechtigungen zu sehen.',eyebrow_details:'BEFEHLSDETAILS',eyebrow_trouble:'FEHLERBEHEBUNG',trouble_title:'Etwas funktioniert nicht?',trouble_intro:'Prüfe diese Punkte, bevor du die Servereinstellungen änderst.',trouble1_q:'/qotd nicht verfügbar',trouble1_a:'Prüfe /setup, die erlaubte Rolle, QOTD-Kanäle und Sprache.',trouble2_q:'Der Bot kann keinen QOTD senden',trouble2_a:'Prüfe die Discord-Berechtigungen des Bots im gewünschten Kanal.',trouble3_q:'Der QOTD-Zähler ist falsch',trouble3_a:'Prüfe die Serverkonfiguration und die Verwaltungsbefehle.',trouble4_q:'Neue QOTDs vorübergehend stoppen',trouble4_a:'Verwende /lock oder /maintenance.',trouble5_q:'Bot-Interaktionen prüfen',trouble5_a:'Verwende /logs oder /audit_log.'
      },
      fr: {
        menu_hint:'Documentation',menu_subtitle:'Votre bot Question du Jour',menu_home:'⌂ Accueil',menu_commands:'▣ Commandes',menu_preview:'✦ Aperçu QOTD',menu_setup:'⚙ Configuration',menu_faq:'? FAQ',menu_trouble:'⚠ Dépannage',menu_changelog:'↻ Changelog',menu_community:'☁ Communauté',menu_terms:'Conditions d’utilisation',menu_privacy:'Politique de confidentialité',badge:'BOT DISCORD',hero_subtitle:'Un bot Discord pour créer, gérer et organiser les Questions du Jour.',add_discord:'Ajouter à Discord',join_discord:'Rejoindre notre Discord',overview_label:'À PROPOS DE QUELLO',overview_title:'Des questions pour faire vivre la communauté.',overview_text:'Créez des QOTD numérotées, mentionnez le rôle configuré et ouvrez automatiquement un fil de discussion.',eyebrow_quickstart:'DÉMARRAGE RAPIDE',quickstart_title:'Prêt à utiliser Quello ?',quickstart_text:'Invitez le bot, configurez votre serveur et créez votre première question en quelques étapes.',quick1:'Inviter le bot',quick2:'Lancer /setup',quick3:'Vérifier /config',quick4:'Créer /qotd',quickstart_button:'Ouvrir la configuration',eyebrow_intent:'NAVIGATION RAPIDE',intent_title:'Que voulez-vous faire ?',intent_text:'Accédez directement à la section dont vous avez besoin.',intent_setup:'🚀 Configurer le bot',intent_qotd:'💬 Créer un QOTD',intent_commands:'📖 Explorer les commandes',intent_help:'❓ Obtenir de l’aide',eyebrow_new:'NOUVEAUTÉS',new_title:'Dernières mises à jour du site',new_text:'La documentation propose maintenant une interface inspirée de Discord, un meilleur créateur de QOTD et une configuration guidée.',new_button:'Voir le changelog complet →',eyebrow_commands:'EXPLORER',commands_title:'Explorateur de commandes',commands_intro:'Une référence claire pour toutes les commandes actuellement disponibles dans Quello.',cmd_qotd:'Créer une nouvelle Question du Jour.',cmd_edit:'Modifier un QOTD avec son ID de message Discord.',cmd_delete:'Supprimer un QOTD avec son ID de message Discord.',cmd_info:'Voir les informations d’un QOTD.',cmd_stats:'Voir les statistiques QOTD du serveur actuel.',cmd_leaderboard:'Voir les classements des créateurs et répondants.',cmd_history:'Voir l’historique des QOTD.',cmd_setup:'Configurer les rôles, salons et la langue du bot.',cmd_config:'Voir la configuration actuelle des QOTD.',cmd_logs:'Voir et filtrer les journaux QOTD.',cmd_audit:'Voir le journal détaillé des interactions.',cmd_resetlogs:'Réinitialiser les journaux QOTD.',cmd_reset:'Réinitialiser le compteur QOTD.',cmd_maintenance:'Activer ou désactiver le mode maintenance.',cmd_lock:'Verrouiller ou déverrouiller la création de QOTD.',cmd_help:'Afficher les commandes Quello disponibles.',owner_only:'Propriétaire du bot ou du serveur',server_command:'Serveur actuel',no_global_stats:'Statistiques du serveur uniquement',leaderboard_detail:'Classements des créateurs et répondants du serveur',history_detail:'Parcourir les QOTD précédents',all_users:'Disponible pour tous les utilisateurs',permissions_label:'Permissions :',permissions_text:'La création, modification et suppression des QOTD utilisent le rôle autorisé configuré. Le propriétaire du bot et du serveur y ont également accès.',eyebrow_preview:'ESSAYER',preview_title:'Créateur d’aperçu QOTD',preview_intro:'Créez un message QOTD réaliste et copiez le résultat en un clic.',builder_inputs:'Paramètres du message',question_label:'Question',number_label:'Numéro QOTD',language_label:'Langue QOTD',thanks_label:'Proposé par',show_suggester:'Afficher la ligne du proposant',reset_preview:'Réinitialiser',copy_preview:'Copier le texte',preview_channel:'Question du Jour',preview_suggested:'Proposé par :',preview_thread:'Fil de discussion QOTD',eyebrow_setup:'COMMENCER',setup_title:'Configurer Quello',setup_intro:'Un guide simple pour préparer votre serveur à sa première Question du Jour.',setup_embed_title:'Guide de configuration Quello',setup_embed_subtitle:'Suivez ces étapes dans l’ordre',step1_title:'Ajouter Quello',step1_text:'Utilisez le bouton Discord ci-dessus et choisissez votre serveur.',step2_title:'Lancer /setup',step2_text:'Configurez le rôle de mention, le rôle autorisé, les salons optionnels et la langue du bot.',step3_title:'Vérifier /config',step3_text:'Vérifiez la configuration enregistrée.',step4_title:'Créer votre premier QOTD',step4_text:'Utilisez /qotd avec une question et une langue.',setup_note_title:'Astuce',setup_note_text:'Le rôle autorisé configuré détermine qui peut créer, modifier et supprimer les QOTD.',eyebrow_permissions:'ACCÈS',permissions_title:'Permissions en un coup d’œil',access_qotd:'Rôle autorisé, propriétaire du bot ou du serveur',access_edit_delete:'Rôle autorisé, propriétaire du bot ou du serveur',access_owner:'Propriétaire du bot ou du serveur',eyebrow_faq:'AIDE',faq_title:'Questions fréquentes',faq1_q:'Pourquoi /qotd ne fonctionne pas ?',faq1_a:'Vérifiez /setup, les rôles, les salons et le rôle autorisé.',faq2_q:'Comment changer le salon QOTD ?',faq2_a:'Relancez /setup et modifiez le salon souhaité.',faq3_q:'Que fait /lock ?',faq3_a:'Il permet à un propriétaire autorisé de bloquer temporairement les nouveaux QOTD.',faq4_q:'Qu’est-ce que /audit_log ?',faq4_a:'Un journal détaillé séparé des interactions et erreurs du bot.',faq5_q:'Puis-je utiliser Quello sur plusieurs serveurs ?',faq5_a:'Oui. Chaque serveur possède sa propre configuration, ses compteurs et son historique.',eyebrow_changelog:'MISES À JOUR',changelog_title:'Changelog',change1_title:'Refonte du site et de la documentation',change1_text:'Le site a été repensé avec des embeds inspirés de Discord, un meilleur aperçu QOTD et un nouveau guide de configuration.',change2_title:'Documentation des fonctionnalités du bot',change2_text:'La documentation a été mise à jour pour Audit Log, Maintenance, verrouillage QOTD et les outils d’administration.',change3_title:'/leaderboard amélioré',change3_text:'/leaderboard comprend maintenant des classements séparés pour les créateurs et les répondants.',eyebrow_community:'COMMUNAUTÉ',community_title:'Rejoindre la communauté Quello',community_text:'Obtenez de l’aide, discutez des mises à jour et partagez vos idées.',community_button:'Rejoindre Discord',privacy_first:'Confidentialité avant tout.',privacy_text:'Quello traite les données Discord et QOTD nécessaires à ses fonctionnalités.',privacy_link:'Lire la politique de confidentialité.',footer_text:'Des questions pour de meilleures conversations.',eyebrow_details:'DÉTAILS DES COMMANDES',details_title:'Comment fonctionnent les commandes',details_intro:'Ouvrez une commande pour voir son rôle, ses paramètres et ses permissions.',eyebrow_trouble:'DÉPANNAGE',trouble_title:'Quelque chose ne fonctionne pas ?',trouble_intro:'Vérifiez ces points avant de modifier les paramètres du serveur.',trouble1_q:'/qotd indisponible',trouble1_a:'Vérifiez /setup, le rôle autorisé, les salons QOTD et la langue.',trouble2_q:'Le bot ne peut pas envoyer le QOTD',trouble2_a:'Vérifiez les permissions Discord du bot dans le salon.',trouble3_q:'Le compteur QOTD semble incorrect',trouble3_a:'Vérifiez la configuration et les commandes de gestion du serveur.',trouble4_q:'Arrêter temporairement les nouveaux QOTD',trouble4_a:'Utilisez /lock ou /maintenance.',trouble5_q:'Vérifier les interactions du bot',trouble5_a:'Utilisez /logs ou /audit_log.'
      },
      it: {
        menu_hint:'Documentazione',menu_subtitle:'Il tuo bot Question of the Day',menu_home:'⌂ Home',menu_commands:'▣ Comandi',menu_preview:'✦ Anteprima QOTD',menu_setup:'⚙ Configurazione',menu_faq:'? FAQ',menu_trouble:'⚠ Risoluzione problemi',menu_changelog:'↻ Changelog',menu_community:'☁ Community',menu_terms:'Termini di servizio',menu_privacy:'Privacy Policy',badge:'BOT DISCORD',hero_subtitle:'Un bot Discord per creare, gestire e organizzare le Question of the Day.',add_discord:'Aggiungi a Discord',join_discord:'Unisciti al nostro Discord',overview_label:'SU QUELLO',overview_title:'Domande pensate per le conversazioni della community.',overview_text:'Crea QOTD numerate, menziona il ruolo configurato e apri automaticamente un thread di discussione.',eyebrow_quickstart:'AVVIO RAPIDO',quickstart_title:'Pronto a usare Quello?',quickstart_text:'Invita il bot, configura il server e crea la tua prima domanda in pochi passaggi.',quick1:'Invita il bot',quick2:'Esegui /setup',quick3:'Controlla /config',quick4:'Crea /qotd',quickstart_button:'Apri configurazione',eyebrow_intent:'NAVIGAZIONE RAPIDA',intent_title:'Cosa vuoi fare?',intent_text:'Vai direttamente alla sezione che ti serve.',intent_setup:'🚀 Configura il bot',intent_qotd:'💬 Crea un QOTD',intent_commands:'📖 Esplora i comandi',intent_help:'❓ Ottieni aiuto',eyebrow_new:'NOVITÀ',new_title:'Ultimi aggiornamenti del sito',new_text:'La documentazione ora offre un layout ispirato a Discord, un builder QOTD migliore e una configurazione guidata.',new_button:'Vedi il changelog completo →',eyebrow_commands:'ESPLORA',commands_title:'Esplora comandi',commands_intro:'Un riferimento chiaro per tutti i comandi disponibili in Quello.',cmd_qotd:'Crea una nuova Question of the Day.',cmd_edit:'Modifica un QOTD tramite ID del messaggio Discord.',cmd_delete:'Elimina un QOTD tramite ID del messaggio Discord.',cmd_info:'Visualizza le informazioni di un QOTD.',cmd_stats:'Visualizza le statistiche QOTD del server corrente.',cmd_leaderboard:'Visualizza le classifiche di creatori e rispondenti.',cmd_history:'Visualizza la cronologia QOTD.',cmd_setup:'Configura ruoli, canali e lingua del bot.',cmd_config:'Visualizza la configurazione QOTD corrente.',cmd_logs:'Visualizza e filtra i log QOTD.',cmd_audit:'Visualizza il registro dettagliato delle interazioni.',cmd_resetlogs:'Reimposta i log QOTD normali.',cmd_reset:'Reimposta il contatore QOTD.',cmd_maintenance:'Attiva o disattiva la modalità manutenzione.',cmd_lock:'Blocca o sblocca la creazione di QOTD.',cmd_help:'Mostra i comandi disponibili di Quello.',owner_only:'Proprietario del bot o del server',server_command:'Server corrente',no_global_stats:'Solo statistiche del server',leaderboard_detail:'Classifiche di creatori e rispondenti del server',history_detail:'Sfoglia i QOTD creati in precedenza',all_users:'Disponibile a tutti gli utenti',permissions_label:'Permessi:',permissions_text:'Creazione, modifica ed eliminazione dei QOTD usano il ruolo autorizzato configurato. Anche il proprietario del bot e del server hanno accesso.',eyebrow_preview:'PROVA',preview_title:'Builder anteprima QOTD',preview_intro:'Crea un messaggio QOTD realistico e copia il risultato con un clic.',builder_inputs:'Impostazioni messaggio',question_label:'Domanda',number_label:'Numero QOTD',language_label:'Lingua QOTD',thanks_label:'Proposto da',show_suggester:'Mostra la riga del suggeritore',reset_preview:'Reimposta',copy_preview:'Copia testo',preview_channel:'Question of the Day',preview_suggested:'Proposto da:',preview_thread:'Thread di discussione QOTD',eyebrow_setup:'INIZIA',setup_title:'Configura Quello',setup_intro:'Una guida semplice per preparare il server alla prima Question of the Day.',setup_embed_title:'Guida alla configurazione di Quello',setup_embed_subtitle:'Completa questi passaggi in ordine',step1_title:'Aggiungi Quello',step1_text:'Usa il pulsante Discord qui sopra e scegli il server.',step2_title:'Esegui /setup',step2_text:'Configura il ruolo da menzionare, il ruolo autorizzato, i canali opzionali e la lingua del bot.',step3_title:'Controlla /config',step3_text:'Controlla la configurazione salvata.',step4_title:'Crea il primo QOTD',step4_text:'Usa /qotd con una domanda e una lingua.',setup_note_title:'Suggerimento',setup_note_text:'Il ruolo autorizzato configurato determina chi può creare, modificare ed eliminare QOTD.',eyebrow_permissions:'ACCESSO',permissions_title:'Permessi in sintesi',access_qotd:'Ruolo autorizzato, proprietario del bot o del server',access_edit_delete:'Ruolo autorizzato, proprietario del bot o del server',access_owner:'Proprietario del bot o del server',eyebrow_faq:'AIUTO',faq_title:'Domande frequenti',faq1_q:'Perché /qotd non funziona?',faq1_a:'Controlla /setup, ruoli, canali e ruolo autorizzato.',faq2_q:'Come cambio il canale QOTD?',faq2_a:'Esegui di nuovo /setup e modifica il canale desiderato.',faq3_q:'Cosa fa /lock?',faq3_a:'Permette a un proprietario autorizzato di bloccare temporaneamente i nuovi QOTD.',faq4_q:'Cos’è /audit_log?',faq4_a:'Un registro separato e dettagliato delle interazioni e degli errori del bot.',faq5_q:'Posso usare Quello su più server?',faq5_a:'Sì. Ogni server ha configurazione, contatori e cronologia QOTD propri.',eyebrow_changelog:'AGGIORNAMENTI',changelog_title:'Changelog',change1_title:'Restyling del sito e della documentazione',change1_text:'Il sito è stato riprogettato con embed ispirati a Discord, una migliore anteprima QOTD e una nuova guida alla configurazione.',change2_title:'Documentazione delle funzioni del bot',change2_text:'La documentazione è stata aggiornata per Audit Log, manutenzione, blocco QOTD e strumenti di amministrazione.',change3_title:'/leaderboard migliorato',change3_text:'/leaderboard ora include classifiche separate per creatori e rispondenti.',eyebrow_community:'COMMUNITY',community_title:'Unisciti alla community di Quello',community_text:'Ricevi supporto, discuti gli aggiornamenti e condividi idee.',community_button:'Unisciti a Discord',privacy_first:'Privacy prima di tutto.',privacy_text:'Quello elabora i dati Discord e QOTD necessari alle sue funzioni.',privacy_link:'Leggi la Privacy Policy.',footer_text:'Domande per conversazioni migliori.',eyebrow_details:'DETTAGLI COMANDI',details_title:'Come funzionano i comandi',details_intro:'Apri un comando per vedere scopo, parametri e permessi.',eyebrow_trouble:'RISOLUZIONE PROBLEMI',trouble_title:'Qualcosa non funziona?',trouble_intro:'Controlla questi punti prima di modificare le impostazioni del server.',trouble1_q:'/qotd non disponibile',trouble1_a:'Controlla /setup, ruolo autorizzato, canali QOTD e lingua.',trouble2_q:'Il bot non riesce a inviare il QOTD',trouble2_a:'Controlla i permessi Discord del bot nel canale.',trouble3_q:'Il contatore QOTD sembra errato',trouble3_a:'Controlla la configurazione e i comandi di gestione.',trouble4_q:'Fermare temporaneamente i nuovi QOTD',trouble4_a:'Usa /lock o /maintenance.',trouble5_q:'Controllare le interazioni del bot',trouble5_a:'Usa /logs o /audit_log.'
      }
    };

    const languagePicker = document.getElementById('languagePicker');
    const languageSwitch = document.getElementById('languageSwitch');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageCurrentFlag = document.getElementById('languageCurrentFlag');
    const languageCurrentCode = document.getElementById('languageCurrentCode');
    const languageOptions = Array.from(document.querySelectorAll('.language-option'));
    const languageMeta = {
      en: { flag:'🇬🇧', code:'EN' },
      ru: { flag:'🇷🇺', code:'RU' },
      de: { flag:'🇩🇪', code:'DE' },
      fr: { flag:'🇫🇷', code:'FR' },
      it: { flag:'🇮🇹', code:'IT' }
    };
    let currentLanguage = localStorage.getItem('quello-site-language-v2') || 'en';

    function setLanguageMenu(open){
      languagePicker.classList.toggle('open', open);
      languageSwitch.setAttribute('aria-expanded', String(open));
    }

    function applyLanguage(lang){
      if (!translations[lang]) lang = 'en';
      currentLanguage = lang;
      document.documentElement.lang = lang;
      const dictionary = translations[lang] || {};
      const fallback = translations.en || {};
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const value = dictionary[key] ?? fallback[key];
        if (value != null) el.textContent = value;
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const value = dictionary[key] ?? fallback[key];
        if (value != null) el.placeholder = value;
      });
      const meta = languageMeta[lang];
      languageCurrentFlag.textContent = meta.flag;
      languageCurrentCode.textContent = meta.code;
      languageOptions.forEach(option => {
        const active = option.dataset.language === lang;
        option.classList.toggle('active', active);
        option.setAttribute('aria-selected', String(active));
      });
      localStorage.setItem('quello-site-language-v2', lang);
      updatePreview();
    }

    languageSwitch.addEventListener('click', () => setLanguageMenu(!languagePicker.classList.contains('open')));
    languageOptions.forEach(option => option.addEventListener('click', () => {
      applyLanguage(option.dataset.language);
      setLanguageMenu(false);
    }));
    document.addEventListener('click', e => {
      if (!languagePicker.contains(e.target)) setLanguageMenu(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') setLanguageMenu(false);
    });
    const sideMenu = document.getElementById('sideMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.side-menu-links a');

    function setMenu(open){
      sideMenu.classList.toggle('open', open);
      menuOverlay.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      sideMenu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('menu-open', open);
    }
    menuToggle.addEventListener('click', () => setMenu(true));
    menuClose.addEventListener('click', () => setMenu(false));
    menuOverlay.addEventListener('click', () => setMenu(false));
    menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

    // Highlight the section currently visible on the page.
    const sectionLinks = Array.from(menuLinks).filter(link => link.getAttribute('href')?.startsWith('#'));
    const trackedSections = sectionLinks
      .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
      .filter(item => item.section);

    let activeSection = 'home';

    function setActiveSection(id) {
      if (!id || id === activeSection && document.querySelector('.side-menu-links a.active')) return;
      activeSection = id;
      sectionLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    function detectActiveSection() {
      const marker = 150;
      let current = trackedSections[0]?.section?.id || 'home';

      for (const { section } of trackedSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) {
          current = section.id;
        }
      }

      // Near the very top, keep Home selected.
      if (window.scrollY < 180) current = 'home';
      setActiveSection(current);
    }

    let scrollTick = false;
    window.addEventListener('scroll', () => {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        detectActiveSection();
        scrollTick = false;
      });
    }, { passive: true });

    window.addEventListener('resize', detectActiveSection);
    detectActiveSection();

    const q = document.getElementById('questionInput');
    const n = document.getElementById('numberInput');
    const a = document.getElementById('authorInput');
    const lang = document.getElementById('qotdLanguage');
    const showAuthor = document.getElementById('showAuthor');
    const count = document.getElementById('questionCount');
    const previewQuestion = document.getElementById('previewQuestion');
    const previewNumber = document.getElementById('previewNumber');
    const previewAuthor = document.getElementById('previewAuthor');
    const previewAuthorLine = document.getElementById('previewAuthorLine');
    const previewTitle = document.getElementById('previewTitle');
    const previewThread = document.getElementById('previewThread');
    const copyStatus = document.getElementById('copyStatus');

    function updatePreview(){
      previewQuestion.textContent = q.value.trim() || '—';
      previewNumber.textContent = '#' + (n.value || '1');
      previewAuthor.textContent = a.value.trim() || '—';
      previewAuthorLine.style.display = showAuthor.checked && a.value.trim() ? 'block' : 'none';
      count.textContent = q.value.length;
      if (lang.value === 'ru') {
        previewTitle.textContent = '💬 ВОПРОС ДНЯ';
        previewThread.textContent = 'Ветка обсуждения QOTD';
      } else {
        previewTitle.textContent = '💬 QUESTION OF THE DAY';
        previewThread.textContent = 'QOTD discussion thread';
      }
    }

    [q,n,a,lang,showAuthor].forEach(el => el.addEventListener('input', updatePreview));
    lang.addEventListener('change', updatePreview);

    document.getElementById('resetPreview').addEventListener('click', () => {
      q.value = 'What game would you recommend to everyone?';
      n.value = '42';
      a.value = 'Community Member';
      lang.value = 'en';
      showAuthor.checked = true;
      copyStatus.textContent = '';
      updatePreview();
    });

    document.getElementById('copyPreview').addEventListener('click', async () => {
      const title = lang.value === 'ru' ? '💬 ВОПРОС ДНЯ' : '💬 QUESTION OF THE DAY';
      const thread = lang.value === 'ru' ? '🧵 Ветка обсуждения QOTD' : '🧵 QOTD discussion thread';
      const credit = showAuthor.checked && a.value.trim() ? `\n\n${lang.value === 'ru' ? 'Предложил' : 'Suggested by'}: ${a.value.trim()}` : '';
      const text = `${title}\n#${n.value || '1'}\n\n${q.value.trim() || '—'}${credit}\n\n${thread}`;
      try {
        await navigator.clipboard.writeText(text);
        copyStatus.textContent = lang.value === 'ru' ? 'Скопировано!' : 'Copied!';
      } catch {
        copyStatus.textContent = lang.value === 'ru' ? 'Не удалось скопировать автоматически.' : 'Automatic copy is not available in this browser.';
      }
      setTimeout(() => copyStatus.textContent = '', 2500);
    });

    const checklist = document.querySelectorAll('.setup-check');
    const checklistProgress = document.getElementById('checklistProgress');
    const checklistStorageKey = 'quello-setup-checklist';
    function updateChecklist(){
      const state = {};
      let done = 0;
      checklist.forEach(item => {
        state[item.dataset.key] = item.checked;
        if (item.checked) done++;
      });
      checklistProgress.textContent = `${done} / ${checklist.length}`;
      localStorage.setItem(checklistStorageKey, JSON.stringify(state));
    }
    try {
      const saved = JSON.parse(localStorage.getItem(checklistStorageKey) || '{}');
      checklist.forEach(item => { item.checked = Boolean(saved[item.dataset.key]); });
    } catch {}
    checklist.forEach(item => item.addEventListener('change', updateChecklist));
    updateChecklist();


    // Command Playground
    const playgroundData = {
      qotd:['QOTD','Create a new Question of the Day.','Create and publish a QOTD using the configured server settings.','Configured QOTD role, Bot Owner or Server Owner','/qotd question:"What should we discuss today?"'],
      edit:['QOTD','Edit an existing QOTD.','Change a QOTD by its Discord message ID.','Configured QOTD role, Bot Owner or Server Owner','/edit message_id:123456789 question:"New question"'],
      delete:['QOTD','Delete an existing QOTD.','Remove a QOTD by its Discord message ID.','Configured QOTD role, Bot Owner or Server Owner','/delete message_id:123456789'],
      leaderboard:['COMMUNITY','View QOTD rankings.','See Creator and Responder rankings for the current server.','Available to all users','/leaderboard'],
      history:['INFO','Browse QOTD history.','Explore previously created QOTDs on the current server.','Available to all users','/history'],
      setup:['SETUP','Configure Quello.','Set the QOTD role, allowed role, channels, and bot language.','Bot Owner or Server Owner','/setup'],
      logs:['ADMIN','Review QOTD logs.','View and filter normal QOTD logs with pagination.','Bot Owner or Server Owner','/logs'],
      audit_log:['OWNER','Inspect the audit trail.','View detailed interaction attempts and errors.','Bot Owner or Server Owner','/audit_log'],
      maintenance:['OWNER','Manage maintenance mode.','Temporarily block new QOTD creation while maintaining the server.','Bot Owner or Server Owner','/maintenance enabled:true'],
      lock:['OWNER','Lock QOTD creation.','Lock or unlock the creation of new QOTDs.','Bot Owner or Server Owner','/lock enabled:true']
    };
    const commandSelect = document.getElementById('commandSelect');
    function updatePlayground(){
      if(!commandSelect) return;
      const d=playgroundData[commandSelect.value]||playgroundData.qotd;
      document.getElementById('playgroundName').textContent='/'+commandSelect.value;
      document.getElementById('playgroundTag').textContent=d[0];
      document.getElementById('playgroundTitle').textContent=d[1];
      document.getElementById('playgroundDescription').textContent=d[2];
      document.getElementById('playgroundAccess').textContent=d[3];
      document.getElementById('playgroundExample').textContent=d[4];
      localStorage.setItem('quello-playground-used','1');
      unlockAchievement('playground');
    }
    commandSelect?.addEventListener('change',updatePlayground);
    updatePlayground();

    // Build Your QOTD flow
    let flowStep=1, flowLanguage='en';
    const flowPanels=Array.from(document.querySelectorAll('.flow-panel'));
    const flowSteps=Array.from(document.querySelectorAll('.flow-step'));
    function updateFlow(){
      flowPanels.forEach(p=>p.classList.toggle('active',p.dataset.panel===String(flowStep)));
      flowSteps.forEach(p=>p.classList.toggle('active',Number(p.dataset.step)===flowStep));
      if(flowStep===3){
        const q=document.getElementById('flowQuestion').value.trim()||'What should we discuss today?';
        const safe=q.replace(/"/g,'\\"');
        document.getElementById('generatedCommand').textContent=`/qotd question:"${safe}" language:${flowLanguage}`;
      }
    }
    document.querySelectorAll('.flow-next').forEach(b=>b.addEventListener('click',()=>{if(flowStep<3){flowStep++;updateFlow()}}));
    document.querySelectorAll('.flow-back').forEach(b=>b.addEventListener('click',()=>{if(flowStep>1){flowStep--;updateFlow()}}));
    document.querySelectorAll('.flow-language').forEach(b=>b.addEventListener('click',()=>{flowLanguage=b.dataset.flowLang;document.querySelectorAll('.flow-language').forEach(x=>x.classList.toggle('active',x===b));updateFlow()}));
    document.getElementById('flowQuestion')?.addEventListener('input',updateFlow);
    document.getElementById('copyGenerated')?.addEventListener('click',async()=>{
      const text=document.getElementById('generatedCommand').textContent;
      const status=document.getElementById('flowCopyStatus');
      try{await navigator.clipboard.writeText(text);status.textContent='Copied!';}catch{status.textContent='Copy is not available in this browser.';}
      setTimeout(()=>status.textContent='',2200);
    });

    // Did You Know
    const tips=[
      ['Quello is built around QOTD conversations.','Each server keeps its own configuration, counters, history, and normal logs.'],
      ['English and Russian QOTDs use separate counters.','Language selection can be configured and QOTDs can also target a specific channel.'],
      ['Quello can open a discussion thread automatically.','That keeps the question itself clean while giving the community a dedicated place to respond.'],
      ['Owner tools are intentionally separated.','Administrative controls such as /setup, /logs, /lock, and /maintenance are restricted to the appropriate owners.'],
      ['The website remembers your setup checklist.','Your progress is stored locally in your browser so you can return later.']
    ];
    let tipIndex=0;
    document.getElementById('nextTip')?.addEventListener('click',()=>{tipIndex=(tipIndex+1)%tips.length;document.getElementById('tipTitle').textContent=tips[tipIndex][0];document.getElementById('tipText').textContent=tips[tipIndex][1];});

    // Random QOTD
    const randomQuestions=[
      'What game would you recommend to everyone?',
      'What is one game you could replay forever?',
      'Which fictional world would you visit for one day?',
      'What game soundtrack do you never get tired of?',
      'What small game mechanic makes a huge difference to you?',
      'Which game deserves more attention?',
      'What was the first game you remember being obsessed with?',
      'If you could add one feature to your favorite game, what would it be?',
      'Which game character would make the best teammate?',
      'What game would you introduce to someone who rarely plays games?'
    ];
    document.getElementById('randomQotd')?.addEventListener('click',()=>{
      const el=document.getElementById('randomQuestion');
      let next=randomQuestions[Math.floor(Math.random()*randomQuestions.length)];
      if(randomQuestions.length>1 && next===el.textContent) next=randomQuestions[(randomQuestions.indexOf(next)+1)%randomQuestions.length];
      el.textContent=next;
      localStorage.setItem('quello-random-used','1');
      unlockAchievement('random');
    });

    // Achievements
    function unlockAchievement(key){
      const el=document.querySelector(`.achievement[data-achievement="${key}"]`);
      if(el){el.classList.add('unlocked');localStorage.setItem(`quello-ach-${key}`,'1');}
    }
    ['playground','setup','random','secret'].forEach(key=>{if(localStorage.getItem(`quello-ach-${key}`)==='1')unlockAchievement(key)});
    document.querySelectorAll('.setup-check').forEach(c=>c.addEventListener('change',()=>{
      const all=Array.from(document.querySelectorAll('.setup-check')).every(x=>x.checked);
      if(all)unlockAchievement('setup');
    }));

    // Quello easter egg: click the main avatar 5 times.
    let avatarClicks=0, avatarTimer=null;
    const heroAvatar=document.querySelector('.hero-avatar');
    heroAvatar?.addEventListener('click',()=>{
      avatarClicks++;
      clearTimeout(avatarTimer);
      avatarTimer=setTimeout(()=>avatarClicks=0,1700);
      if(avatarClicks>=5){
        avatarClicks=0;
        const msg=document.getElementById('secretMessage');
        msg.textContent='✦ You found the Quello secret. Questions bring people together. ✦';
        unlockAchievement('secret');
        document.getElementById('easterEgg')?.scrollIntoView({behavior:'smooth',block:'center'});
      }
    });
    document.getElementById('secretHint')?.addEventListener('click',()=>{
      document.getElementById('secretMessage').textContent='Hint: the big Quello avatar on the home section has a secret…';
    });

    applyLanguage(currentLanguage);
  