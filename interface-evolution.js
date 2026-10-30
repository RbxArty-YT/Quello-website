(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Extend the existing dictionaries; the existing language switch remains the source of truth.
  const copy = {
    en: {evo_eyebrow:'BUILT FOR COMMUNITIES',evo_title:'Everything your QOTD community needs.',evo_intro:'A clearer way to create questions, keep conversations moving, and manage your server.',evo_card1_title:'Create with confidence',evo_card1_text:'Build numbered questions, choose a language, and send them to the right channel.',evo_card2_title:'Keep discussions flowing',evo_card2_text:'Give every question a place for replies with automatically created discussion threads.',evo_card3_title:'Stay in control',evo_card3_text:'Use roles, configuration, history, logs, and owner tools to manage QOTD activity.',evo_steps_eyebrow:'GET STARTED',evo_steps_title:'From invite to first question.',evo_steps_intro:'Four simple steps to bring Quello into your server.',evo_step1_title:'Invite Quello',evo_step1_text:'Add the bot to your Discord server.',evo_step2_title:'Configure access',evo_step2_text:'Choose the QOTD mention role and allowed role.',evo_step3_title:'Choose channels',evo_step3_text:'Set the channels and bot language.',evo_step4_title:'Post your first QOTD',evo_step4_text:'Create a question and start a conversation.',evo_steps_link:'Read the setup guide →'},
    ru: {evo_eyebrow:'СОЗДАНО ДЛЯ СООБЩЕСТВ',evo_title:'Всё необходимое для вашего QOTD-сообщества.',evo_intro:'Удобный способ создавать вопросы, поддерживать обсуждения и управлять сервером.',evo_card1_title:'Создавайте уверенно',evo_card1_text:'Создавайте пронумерованные вопросы, выбирайте язык и нужный канал.',evo_card2_title:'Поддерживайте обсуждения',evo_card2_text:'Для каждого вопроса автоматически создаётся отдельная ветка обсуждения.',evo_card3_title:'Сохраняйте контроль',evo_card3_text:'Управляйте QOTD с помощью ролей, настроек, истории, логов и команд владельца.',evo_steps_eyebrow:'НАЧАЛО РАБОТЫ',evo_steps_title:'От приглашения до первого вопроса.',evo_steps_intro:'Четыре простых шага, чтобы добавить Quello на сервер.',evo_step1_title:'Пригласите Quello',evo_step1_text:'Добавьте бота на свой Discord-сервер.',evo_step2_title:'Настройте доступ',evo_step2_text:'Выберите упоминаемую и разрешённую роли.',evo_step3_title:'Выберите каналы',evo_step3_text:'Укажите каналы и язык бота.',evo_step4_title:'Опубликуйте первый QOTD',evo_step4_text:'Создайте вопрос и начните обсуждение.',evo_steps_link:'Открыть руководство по настройке →'},
    de: {evo_eyebrow:'FÜR COMMUNITYS ENTWICKELT',evo_title:'Alles für deine QOTD-Community.',evo_intro:'Erstelle Fragen, halte Gespräche am Laufen und verwalte deinen Server einfacher.',evo_card1_title:'Fragen sicher erstellen',evo_card1_text:'Erstelle nummerierte Fragen, wähle eine Sprache und den passenden Kanal.',evo_card2_title:'Gespräche fördern',evo_card2_text:'Für jede Frage wird automatisch ein eigener Diskussions-Thread erstellt.',evo_card3_title:'Alles im Griff',evo_card3_text:'Verwalte QOTD mit Rollen, Einstellungen, Verlauf, Logs und Besitzerbefehlen.',evo_steps_eyebrow:'ERSTE SCHRITTE',evo_steps_title:'Von der Einladung zur ersten Frage.',evo_steps_intro:'Vier einfache Schritte, um Quello auf deinem Server einzurichten.',evo_step1_title:'Quello einladen',evo_step1_text:'Füge den Bot zu deinem Discord-Server hinzu.',evo_step2_title:'Zugriff konfigurieren',evo_step2_text:'Wähle die QOTD-Erwähnungsrolle und die erlaubte Rolle.',evo_step3_title:'Kanäle auswählen',evo_step3_text:'Lege Kanäle und Bot-Sprache fest.',evo_step4_title:'Ersten QOTD posten',evo_step4_text:'Erstelle eine Frage und starte ein Gespräch.',evo_steps_link:'Einrichtungsanleitung lesen →'},
    fr: {evo_eyebrow:'CONÇU POUR LES COMMUNAUTÉS',evo_title:'Tout ce qu’il faut à votre communauté QOTD.',evo_intro:'Créez des questions, faites vivre les discussions et gérez votre serveur plus facilement.',evo_card1_title:'Créez en toute confiance',evo_card1_text:'Créez des questions numérotées, choisissez une langue et le bon salon.',evo_card2_title:'Faites vivre les échanges',evo_card2_text:'Chaque question dispose automatiquement de son propre fil de discussion.',evo_card3_title:'Gardez le contrôle',evo_card3_text:'Gérez les QOTD avec les rôles, paramètres, historiques, journaux et commandes propriétaire.',evo_steps_eyebrow:'BIEN COMMENCER',evo_steps_title:'De l’invitation à la première question.',evo_steps_intro:'Quatre étapes simples pour installer Quello sur votre serveur.',evo_step1_title:'Inviter Quello',evo_step1_text:'Ajoutez le bot à votre serveur Discord.',evo_step2_title:'Configurer les accès',evo_step2_text:'Choisissez le rôle mentionné et le rôle autorisé.',evo_step3_title:'Choisir les salons',evo_step3_text:'Définissez les salons et la langue du bot.',evo_step4_title:'Publier votre premier QOTD',evo_step4_text:'Créez une question et lancez la conversation.',evo_steps_link:'Lire le guide de configuration →'},
    it: {evo_eyebrow:'CREATO PER LE COMMUNITY',evo_title:'Tutto ciò che serve alla tua community QOTD.',evo_intro:'Crea domande, mantieni attive le conversazioni e gestisci il server più facilmente.',evo_card1_title:'Crea con sicurezza',evo_card1_text:'Crea domande numerate, scegli una lingua e il canale giusto.',evo_card2_title:'Mantieni viva la discussione',evo_card2_text:'Ogni domanda riceve automaticamente un thread dedicato alle risposte.',evo_card3_title:'Mantieni il controllo',evo_card3_text:'Gestisci i QOTD con ruoli, configurazione, cronologia, log e comandi proprietario.',evo_steps_eyebrow:'PER INIZIARE',evo_steps_title:'Dall’invito alla prima domanda.',evo_steps_intro:'Quattro semplici passaggi per aggiungere Quello al tuo server.',evo_step1_title:'Invita Quello',evo_step1_text:'Aggiungi il bot al tuo server Discord.',evo_step2_title:'Configura gli accessi',evo_step2_text:'Scegli il ruolo da menzionare e quello autorizzato.',evo_step3_title:'Scegli i canali',evo_step3_text:'Imposta i canali e la lingua del bot.',evo_step4_title:'Pubblica il primo QOTD',evo_step4_text:'Crea una domanda e avvia la conversazione.',evo_steps_link:'Apri la guida alla configurazione →'}
  };
  try {
    if (typeof translations !== 'undefined') {
      Object.entries(copy).forEach(([lang, values]) => Object.assign(translations[lang] || (translations[lang] = {}), values));
      if (typeof applyLanguage === 'function') applyLanguage(document.documentElement.lang || 'en');
    }
  } catch (_) { /* Static English content remains usable if the language module is unavailable. */ }

  // One lightweight sliding indicator tracks the active documentation tab.
  const tabs = document.getElementById('siteTabs');
  const inner = tabs?.querySelector('.site-tabs-inner');
  if (tabs && inner) {
    const indicator = document.createElement('span');
    indicator.className = 'site-tab-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    inner.appendChild(indicator);
    tabs.classList.add('has-indicator');
    const update = () => {
      const active = inner.querySelector('.site-tab.active');
      if (!active) return;
      const a = active.getBoundingClientRect(), b = inner.getBoundingClientRect();
      indicator.style.width = `${a.width}px`;
      indicator.style.transform = `translateX(${a.left - b.left + inner.scrollLeft}px)`;
    };
    update();
    new MutationObserver(update).observe(inner, {subtree:true,attributes:true,attributeFilter:['class']});
    tabs.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update, {passive:true});
  }

  // Defer decoding for off-screen images; keep the hero/avatar eager for a stable first paint.
  document.querySelectorAll('img').forEach((img, index) => {
    if (index > 2 && !img.loading) img.loading = 'lazy';
    img.decoding = 'async';
    if (img.complete) return;
    img.classList.add('q-image-pending');
    const settle = () => img.classList.remove('q-image-pending');
    img.addEventListener('load', settle, {once:true});
    img.addEventListener('error', settle, {once:true});
  });

  // Expose a tiny, accessible toast event for future UI actions without touching Playground logic.
  document.addEventListener('quello:toast', event => {
    const message = String(event.detail?.message || '').trim();
    if (!message) return;
    let toast = document.querySelector('.q-toast');
    if (!toast) { toast = document.createElement('div'); toast.className = 'q-toast'; toast.setAttribute('role','status'); toast.setAttribute('aria-live','polite'); document.body.appendChild(toast); }
    toast.textContent = message;
    toast.classList.remove('show');
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  });
  if (reduced) document.documentElement.classList.add('q-reduced-motion');
})();
