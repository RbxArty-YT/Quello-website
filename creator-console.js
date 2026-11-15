/* Quello Hidden Creator Console — shared across Documentation, Dashboard and About. */
(function () {
  'use strict';
  const CFG = window.QUELLO_CONFIG || {};
  const API = String(CFG.API_BASE || '').replace(/\/+$/, '');
  const TOKEN_KEY = 'quello-dash-token';
  const LANG_KEY = 'quello-site-language-v2';
  const t = {
    en: {signin:'Sign in with Discord first — redirecting…',hold:'Keep holding…',button:'Creator Console',title:'Creator Console',sub:'Private workspace · Quello ecosystem',overview:'System Overview',appearance:'Appearance Lab',developer:'Developer Tools',localization:'Localization Lab',debug:'Console & Debug',experiments:'Experimental Features',close:'Close',refresh:'Refresh',logout:'Sign out',login:'Sign in with Discord',denied:'Creator access is not available for this account.',offline:'The Quello API is unavailable. Check API_BASE in site-config.js.',loading:'Loading creator data…',api:'API',bot:'Discord bot',ready:'Ready',notReady:'Not ready',version:'Version',guilds:'Servers',latency:'Gateway latency',uptime:'API uptime',theme:'Site theme',dark:'Dark',light:'Light',palette:'Brand palette',locale:'Current language',browser:'Browser',viewport:'Viewport',screen:'Screen',checks:'Diagnostics',run:'Run diagnostics',feature:'Experimental switches are local previews only.',status:'Status',enabled:'Enabled',disabled:'Disabled',passkey:'Passkey',totp:'TOTP',mfaNote:'Additional factors are not configured in this build. Creator endpoints still enforce the Discord owner ID server-side.',hidden:'The console is hidden from regular visitors. Use Ctrl + Shift + K or hold the Quello logo for 2 seconds.'},
    ru: {signin:'Сначала войдите через Discord — перенаправляю…',hold:'Держите…',button:'Консоль создателя',title:'Консоль создателя',sub:'Закрытое пространство · экосистема Quello',overview:'Обзор системы',appearance:'Лаборатория оформления',developer:'Инструменты разработчика',localization:'Лаборатория локализации',debug:'Консоль и отладка',experiments:'Экспериментальные функции',close:'Закрыть',refresh:'Обновить',logout:'Выйти',login:'Войти через Discord',denied:'Для этого аккаунта нет доступа создателя.',offline:'API Quello недоступен. Проверьте API_BASE в site-config.js.',loading:'Загрузка данных создателя…',api:'API',bot:'Discord-бот',ready:'Работает',notReady:'Не готов',version:'Версия',guilds:'Серверы',latency:'Задержка шлюза',uptime:'Время работы API',theme:'Тема сайта',dark:'Тёмная',light:'Светлая',palette:'Палитра бренда',locale:'Текущий язык',browser:'Браузер',viewport:'Размер окна',screen:'Экран',checks:'Диагностика',run:'Запустить диагностику',feature:'Экспериментальные переключатели — только локальный предпросмотр.',status:'Состояние',enabled:'Включено',disabled:'Выключено',passkey:'Passkey',totp:'TOTP',mfaNote:'Дополнительные факторы в этой сборке ещё не настроены. Доступ к API всё равно проверяется на сервере по Discord ID владельца.',hidden:'Консоль скрыта от обычных посетителей. Используйте Ctrl + Shift + K или удерживайте логотип Quello 2 секунды.'},
    de: {button:'Creator-Konsole',title:'Creator-Konsole',sub:'Privater Bereich · Quello-Ökosystem',overview:'Systemübersicht',appearance:'Design-Labor',developer:'Entwicklerwerkzeuge',localization:'Lokalisierungslabor',debug:'Konsole & Debug',experiments:'Experimentelle Funktionen',close:'Schließen',refresh:'Aktualisieren',logout:'Abmelden',login:'Mit Discord anmelden',denied:'Für dieses Konto ist kein Creator-Zugriff verfügbar.',offline:'Die Quello-API ist nicht erreichbar. Prüfe API_BASE in site-config.js.',loading:'Creator-Daten werden geladen…',api:'API',bot:'Discord-Bot',ready:'Bereit',notReady:'Nicht bereit',version:'Version',guilds:'Server',latency:'Gateway-Latenz',uptime:'API-Laufzeit',theme:'Website-Design',dark:'Dunkel',light:'Hell',palette:'Markenpalette',locale:'Aktuelle Sprache',browser:'Browser',viewport:'Ansichtsfenster',screen:'Bildschirm',checks:'Diagnose',run:'Diagnose starten',feature:'Experimentelle Schalter sind nur lokale Vorschauen.',status:'Status',enabled:'Aktiviert',disabled:'Deaktiviert',passkey:'Passkey',totp:'TOTP',mfaNote:'Zusätzliche Faktoren sind in diesem Build nicht eingerichtet. Creator-Endpunkte prüfen die Discord-Owner-ID weiterhin serverseitig.',hidden:'Die Konsole ist für normale Besucher verborgen. Ctrl + Shift + K drücken oder das Quello-Logo 2 Sekunden halten.'},
    fr: {button:'Console du créateur',title:'Console du créateur',sub:'Espace privé · écosystème Quello',overview:'Vue système',appearance:'Atelier visuel',developer:'Outils développeur',localization:'Atelier de localisation',debug:'Console et débogage',experiments:'Fonctionnalités expérimentales',close:'Fermer',refresh:'Actualiser',logout:'Déconnexion',login:'Se connecter avec Discord',denied:'Ce compte ne dispose pas des droits de créateur.',offline:'L’API Quello est inaccessible. Vérifiez API_BASE dans site-config.js.',loading:'Chargement des données…',api:'API',bot:'Bot Discord',ready:'Prêt',notReady:'Non prêt',version:'Version',guilds:'Serveurs',latency:'Latence passerelle',uptime:'Disponibilité API',theme:'Thème du site',dark:'Sombre',light:'Clair',palette:'Palette de marque',locale:'Langue actuelle',browser:'Navigateur',viewport:'Fenêtre',screen:'Écran',checks:'Diagnostics',run:'Lancer les diagnostics',feature:'Les options expérimentales sont des aperçus locaux uniquement.',status:'État',enabled:'Activé',disabled:'Désactivé',passkey:'Passkey',totp:'TOTP',mfaNote:'Les facteurs supplémentaires ne sont pas configurés dans cette version. Les points d’accès créateur vérifient toujours côté serveur l’ID Discord du propriétaire.',hidden:'La console est masquée aux visiteurs. Utilisez Ctrl + Shift + K ou maintenez le logo Quello pendant 2 secondes.'},
    it: {button:'Console del creatore',title:'Console del creatore',sub:'Spazio privato · ecosistema Quello',overview:'Panoramica sistema',appearance:'Laboratorio aspetto',developer:'Strumenti sviluppatore',localization:'Laboratorio localizzazione',debug:'Console e debug',experiments:'Funzioni sperimentali',close:'Chiudi',refresh:'Aggiorna',logout:'Esci',login:'Accedi con Discord',denied:'Questo account non dispone dei permessi creatore.',offline:'API Quello non raggiungibile. Controlla API_BASE in site-config.js.',loading:'Caricamento dati creatore…',api:'API',bot:'Bot Discord',ready:'Pronto',notReady:'Non pronto',version:'Versione',guilds:'Server',latency:'Latenza gateway',uptime:'Tempo attività API',theme:'Tema del sito',dark:'Scuro',light:'Chiaro',palette:'Palette del brand',locale:'Lingua corrente',browser:'Browser',viewport:'Finestra',screen:'Schermo',checks:'Diagnostica',run:'Esegui diagnostica',feature:'Le opzioni sperimentali sono solo anteprime locali.',status:'Stato',enabled:'Attivo',disabled:'Disattivato',passkey:'Passkey',totp:'TOTP',mfaNote:'I fattori aggiuntivi non sono configurati in questa build. Gli endpoint creatore verificano comunque lato server l’ID Discord del proprietario.',hidden:'La console è nascosta ai visitatori. Usa Ctrl + Shift + K o tieni premuto il logo Quello per 2 secondi.'}
  };
  const lang = () => (localStorage.getItem(LANG_KEY) || document.documentElement.lang || 'en').slice(0,2);
  const tr = key => (t[lang()] || t.en)[key] || t.en[key] || key;
  const token = () => { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (_) { return ''; } };
  let creator = false, overview = null, drawer = null, body = null, active = 'overview', errorLog = [];
  const el = (tag, cls, text) => { const n=document.createElement(tag); if(cls)n.className=cls; if(text!==undefined)n.textContent=text; return n; };
  const fmtTime = n => { const h=Math.floor(n/3600),m=Math.floor(n%3600/60),s=n%60; return [h,m,s].map(x=>String(x).padStart(2,'0')).join(':'); };
  async function request(path) {
    const tk=token();
    if(!API || /example\.com/i.test(API)) throw new Error(tr('offline'));
    if(!tk) throw new Error(tr('denied'));
    const r=await fetch(API+path,{headers:{Authorization:'Bearer '+tk}});
    let data={}; try{data=await r.json();}catch(_){}
    if(!r.ok) throw new Error(data.message || (r.status===403?tr('denied'):tr('offline')));
    return data;
  }
  function addSidebarButton() {
    const links=document.querySelector('.side-menu-links');
    if(!links) {
      const nav=document.querySelector('.about-nav-actions');
      if(nav && !nav.querySelector('[data-creator-console-entry]')) {
        const b=el('button','creator-console-entry',tr('button')); b.type='button'; b.dataset.creatorConsoleEntry='1'; b.onclick=openConsole; nav.append(b);
      }
      return;
    }
    if(links.querySelector('[data-creator-console-entry]')) return;
    const divider=el('div','side-divider');
    const label=el('div','side-section-label','CREATOR');
    const button=el('button','side-action creator-console-entry');
    button.type='button'; button.dataset.creatorConsoleEntry='1';
    button.append(el('span','side-action-icon','✦'),el('span','',tr('button')));
    button.addEventListener('click',openConsole);
    links.append(divider,label,button);
  }
  function makeDrawer() {
    if(drawer) return;
    drawer=el('div','creator-console-overlay');
    drawer.setAttribute('role','presentation');
    const panel=el('section','creator-console-panel');
    panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','true'); panel.setAttribute('aria-label',tr('title'));
    const head=el('header','creator-console-head');
    const identity=el('div','creator-console-identity');
    identity.append(el('span','creator-console-mark','Q'),el('div','',null));
    identity.lastChild.append(el('strong','',tr('title')),el('small','',tr('sub')));
    const close=el('button','creator-icon-button','×'); close.type='button'; close.setAttribute('aria-label',tr('close')); close.onclick=closeConsole;
    head.append(identity,close);
    const nav=el('nav','creator-console-tabs');
    const sections=[['overview','overview'],['appearance','appearance'],['developer','developer'],['localization','localization'],['debug','debug'],['experiments','experiments']];
    sections.forEach(([id,key])=>{const b=el('button','creator-tab',tr(key));b.type='button';b.dataset.tab=id;b.onclick=()=>{active=id;render();};nav.append(b);});
    body=el('div','creator-console-content');
    panel.append(head,nav,body); drawer.append(panel);
    drawer.addEventListener('click',e=>{if(e.target===drawer)closeConsole();});
    document.body.append(drawer);
  }
  function card(title, value, detail) {
    const c=el('article','creator-card'); c.append(el('span','creator-card-label',title),el('strong','creator-card-value',String(value)),el('small','creator-card-detail',detail||'')); return c;
  }
  function render() {
    if(!body)return;
    body.replaceChildren();
    drawer.querySelectorAll('.creator-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===active));
    if(active==='overview'){
      const grid=el('div','creator-card-grid');
      const bot=overview?.bot||{};
      grid.append(card(tr('api'), 'ONLINE', 'Creator API responded'),card(tr('bot'),bot.ready?tr('ready'):tr('notReady'),bot.name||'Quello'),card(tr('version'),overview?.version||'—', 'APP_VERSION'),card(tr('guilds'),bot.guild_count??'—','Discord cache'),card(tr('latency'),`${bot.latency_ms??'—'} ms`,'Gateway'),card(tr('uptime'),fmtTime(overview?.api_uptime_seconds||0),'API process'));
      body.append(grid);
      const features=el('article','creator-note'); features.append(el('h3','',tr('status')));
      [['Passkey',overview?.features?.passkey],['TOTP',overview?.features?.totp]].forEach(([name,on])=>features.append(el('p','',`${name}: ${on?tr('enabled'):tr('disabled')}`)));
      features.append(el('p','creator-muted',tr('mfaNote'))); body.append(features);
      const refresh=el('button','creator-primary',tr('refresh'));refresh.type='button';refresh.onclick=loadOverview;body.append(refresh);
    } else if(active==='appearance'){
      const box=el('article','creator-note');box.append(el('h3','',tr('theme')));
      const theme=el('div','creator-button-row');
      [['dark',tr('dark')],['light',tr('light')]].forEach(([v,label])=>{const b=el('button','creator-secondary',label);b.type='button';b.onclick=()=>{document.documentElement.dataset.theme=v;try{localStorage.setItem('quello-theme',v);}catch(_){};};theme.append(b);});
      box.append(theme,el('h3','',tr('palette')));
      const swatches=el('div','creator-swatches');['#8b5cf6','#ec4899','#fb4b5d'].forEach(c=>{const s=el('span','creator-swatch');s.style.background=c;s.title=c;swatches.append(s);});box.append(swatches);body.append(box);
    } else if(active==='developer'){
      const grid=el('div','creator-card-grid');
      grid.append(card(tr('browser'),navigator.userAgent, navigator.platform||''),card(tr('viewport'),`${innerWidth} × ${innerHeight}`,devicePixelRatio+'× DPR'),card(tr('screen'),`${screen.width} × ${screen.height}`,`${screen.colorDepth}-bit`),card('Online',navigator.onLine?'Yes':'No','Navigator status'));
      body.append(grid);
    } else if(active==='localization'){
      const current=lang().toUpperCase();
      const box=el('article','creator-note');box.append(el('h3','',tr('locale')),el('p','creator-card-value',current));
      box.append(el('p','creator-muted','EN · RU · DE · FR · IT'));
      const langs=el('div','creator-button-row');['en','ru','de','fr','it'].forEach(l=>{const b=el('button','creator-secondary',l.toUpperCase());b.type='button';b.onclick=()=>{try{localStorage.setItem(LANG_KEY,l);}catch(_){};location.reload();};langs.append(b);});
      box.append(langs);body.append(box);
    } else if(active==='debug'){
      const box=el('article','creator-note');box.append(el('h3','',tr('checks')));
      const run=el('button','creator-primary',tr('run'));run.type='button';run.onclick=loadDiagnostics;box.append(run);
      (errorLog.slice(-8)).forEach(e=>box.append(el('p','creator-log',e)));
      body.append(box);
    } else {
      const box=el('article','creator-note');box.append(el('h3','',tr('experiments')),el('p','creator-muted',tr('feature')));
      ['Orbit accents','Glass reflections','Particle layer'].forEach(name=>{const row=el('label','creator-toggle-row');const input=el('input');input.type='checkbox';input.addEventListener('change',()=>document.documentElement.classList.toggle('creator-preview-'+name.toLowerCase().replaceAll(' ','-'),input.checked));row.append(input,el('span','',name));box.append(row);});body.append(box);
    }
  }
  async function loadOverview() {
    if(body)body.replaceChildren(el('p','creator-muted',tr('loading')));
    try { overview=await request('/api/creator/overview');render(); }
    catch(e){ if(body)body.replaceChildren(el('p','creator-error',e.message)); }
  }
  async function loadDiagnostics() {
    try {const d=await request('/api/creator/diagnostics');errorLog=d.checks.map(c=>`${c.status.toUpperCase()} · ${c.id}: ${c.detail}`);render();}
    catch(e){errorLog=[e.message];render();}
  }
  let toastTimer = null;
  function toast(msg) {
    let n = document.querySelector('.creator-toast');
    if (!n) { n = el('div', 'creator-toast'); n.setAttribute('role', 'status'); document.body.append(n); }
    n.textContent = msg; n.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => n.classList.remove('show'), 3200);
  }
  async function openConsole() {
    if (!API || /example\.com/i.test(API)) { toast(tr('offline')); return; }
    if (!token()) { toast(tr('signin')); setTimeout(() => { location.href = 'login.html'; }, 900); return; }
    try { const me = await request('/api/me'); if (!me.is_creator) { toast(tr('denied')); return; } creator = true; }
    catch (e) { toast(e.message || tr('offline')); return; }
    makeDrawer(); drawer.classList.add('open'); document.body.classList.add('creator-console-open'); active = 'overview'; loadOverview();
  }
  function closeConsole(){if(drawer)drawer.classList.remove('open');document.body.classList.remove('creator-console-open');}
  async function verifyCreator() {
    if(!token())return;
    try {const me=await request('/api/me');if(me.is_creator){creator=true;addSidebarButton();addFloatingButton();}}
    catch(_){}
  }
  document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='k'){e.preventDefault();openConsole();}if(e.key==='Escape')closeConsole();});
  // Touch devices: hold the Quello logo for two seconds. One delegated handler (capture phase) so it also works
  // for the side-menu logo and re-rendered headers; the link/image long-press menu is blocked and the logo pulses while held.
  function installLongPress() {
    const SEL = '.brand, .side-brand, .about-brand';
    let timer = null, fired = false, sx = 0, sy = 0, held = null, touched = false;
    const stop = () => { clearTimeout(timer); timer = null; if (held) held.classList.remove('creator-holding'); held = null; };
    const begin = (e, isTouch) => {
      const h = e.target && e.target.closest ? e.target.closest(SEL) : null; if (!h) return;
      const p = (e.touches && e.touches[0]) || e; fired = false; stop(); sx = p.clientX; sy = p.clientY; held = h;
      if (isTouch) touched = true;
      h.classList.add('creator-holding');
      timer = setTimeout(() => {
        timer = null; fired = true; if (held) held.classList.remove('creator-holding');
        try { navigator.vibrate && navigator.vibrate(40); } catch (_) {}
        openConsole();
      }, 2000);
    };
    document.addEventListener('touchstart', e => begin(e, true), { passive: true, capture: true });
    document.addEventListener('touchmove', e => { if (!timer) return; const p = e.touches[0]; if (Math.abs(p.clientX - sx) > 18 || Math.abs(p.clientY - sy) > 18) stop(); }, { passive: true, capture: true });
    ['touchend', 'touchcancel'].forEach(ev => document.addEventListener(ev, () => { stop(); }, { capture: true }));
    document.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') begin(e, false); }, true);
    ['pointerup', 'pointerleave'].forEach(ev => document.addEventListener(ev, e => { if (e.pointerType === 'mouse') stop(); }, true));
    document.addEventListener('contextmenu', e => { if (e.target.closest && e.target.closest(SEL) && (timer || fired || touched)) e.preventDefault(); }, true);
    document.addEventListener('dragstart', e => { if (e.target.closest && e.target.closest(SEL)) e.preventDefault(); }, true);
    document.addEventListener('click', e => { if (fired && e.target.closest && e.target.closest(SEL)) { e.preventDefault(); e.stopPropagation(); fired = false; } }, true);
  }
  // A small round button for verified creators only, so the console is reachable on phones without a keyboard.
  function addFloatingButton() {
    if (document.querySelector('.creator-fab')) return;
    const b = el('button', 'creator-fab', '✦');
    b.type = 'button'; b.setAttribute('aria-label', tr('button')); b.title = tr('button');
    b.addEventListener('click', openConsole);
    document.body.append(b);
  }
  // Keep every creator-console label in sync when the site language changes without a page reload.
  function refreshLabels() {
    document.querySelectorAll('[data-creator-console-entry]').forEach(b => {
      const label = b.querySelector('span:not(.side-action-icon)') || b;
      label.textContent = tr('button');
    });
    const fab = document.querySelector('.creator-fab');
    if (fab) { fab.setAttribute('aria-label', tr('button')); fab.title = tr('button'); }
    if (drawer) {
      const wasOpen = drawer.classList.contains('open');
      drawer.remove(); drawer = null; body = null;
      if (wasOpen) { makeDrawer(); drawer.classList.add('open'); render(); }
    }
  }
  let refreshTimer = null;
  const scheduleRefresh = () => { clearTimeout(refreshTimer); refreshTimer = setTimeout(refreshLabels, 0); };
  new MutationObserver(scheduleRefresh).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.addEventListener('storage', e => { if (e.key === LANG_KEY) scheduleRefresh(); });
  installLongPress();
  document.addEventListener('DOMContentLoaded', () => {
    verifyCreator();
  });
  window.addEventListener('error',e=>{errorLog.push(`${e.message} · ${e.filename||''}:${e.lineno||0}`);});
  window.addEventListener('unhandledrejection',e=>{errorLog.push(`Unhandled promise: ${String(e.reason)}`);});
})();
