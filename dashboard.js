/* Copyright (c) 2026 Quello. All rights reserved. */
/* dashboard.html: server picker + settings editor.
   All data from the API is inserted with textContent / DOM nodes (never innerHTML). */
(function () {
  'use strict';
  const Q = window.Q;
  const { CFG, t, applyI18n, wireHeader, api } = Q;

  const app = document.getElementById('app');
  const crumb = document.getElementById('crumb');
  const saveBar = document.getElementById('saveBar');
  const saveCount = document.getElementById('saveCount');
  const saveBtn = document.getElementById('saveBtn');
  const discardBtn = document.getElementById('discardBtn');
  const toastBox = document.getElementById('toast');

  let me = null;
  let guilds = [];
  let guildId = null;       // server currently open
  let detail = null;        // GET /api/guilds/{id}
  let current = null;       // saved configuration
  let pending = {};         // staged changes: setting name -> new value
  let busy = false;
  let serverQuery = '';     // text typed in the server search boxes
  let redrawPicker = null;  // redraws the picker's grid while the picker is on screen
  let pickerBox = null;     // the picker's search input, kept in sync with the side-menu one
  let tab = 'settings';     // settings | qotds | suggestions | logs
  let viewSeq = 0;          // drops answers that arrive after the person moved on
  let rerender = () => {};  // re-draws the current view (language change)
  let toastTimer = null;

  // owner = server owner / bot owner; moderator = holds the server's allowed role.
  const isOwner = () => !!detail && detail.access === 'owner';
  const readOnly = () => !isOwner();
  const allowedTabs = () => (isOwner() ? ['settings', 'qotds', 'suggestions', 'schedule', 'leaderboard', 'statistics', 'logs'] : ['settings', 'qotds', 'suggestions', 'leaderboard', 'statistics']);

  /* ------------------------------------------------------------- helpers */
  function el(tag, props) {
    const node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(key => {
        const value = props[key];
        if (value == null || value === false) return;
        if (key === 'class') node.className = value;
        else if (key === 'text') node.textContent = value;
        else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
        else node.setAttribute(key, value === true ? '' : value);
      });
    }
    for (let i = 2; i < arguments.length; i++) {
      const child = arguments[i];
      if (child == null || child === false) continue;
      node.append(child);
    }
    return node;
  }

  function toast(message, kind) {
    toastBox.textContent = message;
    toastBox.className = 'toast show ' + (kind || '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastBox.classList.remove('show'), 3600);
  }

  function icon(guild, size) {
    if (guild.icon) {
      return el('img', { class: 'avatar-round server-icon', src: guild.icon, alt: '', width: size, height: size, loading: 'lazy', referrerpolicy: 'no-referrer' });
    }
    return el('span', { class: 'avatar-round server-icon', 'aria-hidden': 'true', text: (guild.name || '?').trim().charAt(0).toUpperCase() });
  }

  function isDirty() { return Object.keys(pending).length > 0; }
  function confirmLeave() { return !isDirty() || window.confirm(t('discard_confirm')); }

  function stateCard(title, text, actions) {
    return el('section', { class: 'state-card' },
      title ? el('h2', { text: title }) : null,
      text ? el('p', { text }) : null,
      actions || null);
  }

  /* --------------------------------------------------------- generic views */
  function showLoading() {
    rerender = showLoading;
    updateBar();
    crumb.classList.add('is-hidden');
    app.replaceChildren(stateCard(null, null, el('div', { class: 'spinner', role: 'status', 'aria-label': t('loading') })));
  }

  function showError(error, retry) {
    rerender = () => showError(error, retry);
    updateBar();
    const message = (error && error.message) || t('err_server');
    app.replaceChildren(stateCard(null, message, retry ? el('button', { class: 'button hero-primary', type: 'button', text: t('retry'), onclick: retry }) : null));
  }

  /* ---------------------------------------------------------- server picker */
  // Case-insensitive match on the server name (or its id).
  function matchingGuilds() {
    const query = serverQuery.trim().toLowerCase();
    return query ? guilds.filter(guild => guild.name.toLowerCase().includes(query) || guild.id.includes(query)) : guilds;
  }

  function onSearch(value) {
    serverQuery = value;
    if (pickerBox && pickerBox.value !== value) pickerBox.value = value;
    renderServerList();
    if (redrawPicker) redrawPicker();
  }

  function showPicker() {
    guildId = null; detail = null; current = null; pending = {};
    rerender = showPicker;
    redrawPicker = null;
    pickerBox = null;
    updateBar();
    crumb.classList.add('is-hidden');
    renderServerList();

    if (!guilds.length) {
      app.replaceChildren(stateCard(t('pick_empty_title'), t('pick_empty_text'),
        el('a', { class: 'button hero-primary', href: CFG.INVITE_URL || '#', target: '_blank', rel: 'noopener noreferrer', text: t('menu_add') + ' ↗' })));
      return;
    }

    const grid = el('div', { class: 'server-grid' });
    const draw = () => {
      const found = matchingGuilds();
      grid.replaceChildren();
      if (!found.length) {
        grid.append(el('p', { class: 'empty-note search-empty', text: t('search_none', { q: serverQuery.trim() }) }));
        return;
      }
      found.forEach(guild => {
        grid.append(el('button', { class: 'server-card', type: 'button', onclick: () => navigate(guild.id) },
          icon(guild, 48),
          el('div', null,
            el('strong', { text: guild.name }),
            el('small', { text: !guild.configured ? t('pick_setup') : guild.access === 'moderator' ? t('pick_moderator') : t('pick_ready') }))));
      });
      if (!serverQuery.trim()) {
        grid.append(el('a', { class: 'server-card server-add', href: CFG.INVITE_URL || '#', target: '_blank', rel: 'noopener noreferrer' },
          el('span', { class: 'server-add-icon', 'aria-hidden': 'true', text: '+' }),
          el('div', null, el('strong', { text: t('menu_add') }), el('small', { text: t('add_hint') }))));
      }
    };
    redrawPicker = draw;

    const search = el('input', {
      class: 'search-input', id: 'pickerSearch', type: 'search', autocomplete: 'off', spellcheck: 'false',
      placeholder: t('search_ph'), 'aria-label': t('search_ph'),
    });
    search.value = serverQuery;
    pickerBox = guilds.length > 1 ? search : null;
    search.addEventListener('input', () => onSearch(search.value));
    draw();

    app.replaceChildren(
      el('header', { class: 'page-head' }, el('div', null,
        el('h1', { class: 'hero-gradient-text', text: t('pick_title') }),
        el('p', { text: t('pick_lead') })),
        el('a', { class: 'button hero-primary add-server-btn', href: CFG.INVITE_URL || '#', target: '_blank', rel: 'noopener noreferrer' },
          el('span', { class: 'add-server-plus', 'aria-hidden': 'true', text: '+' }), el('span', { text: t('add_short') }))),
      ...(guilds.length > 1 ? [search] : []),
      grid);
  }

  /* ------------------------------------------------------------ settings */
  function valueOf(key) { return key in pending ? pending[key] : current[key]; }

  function stage(key, value) {
    if (value === current[key]) delete pending[key]; else pending[key] = value;
    const field = app.querySelector('[data-field="' + key + '"]');
    if (field) field.classList.toggle('changed', key in pending);
    updateBar();
  }

  function updateBar() {
    const count = Object.keys(pending).length;
    saveBar.classList.toggle('show', count > 0 && !!current && tab === 'settings' && !readOnly());
    saveCount.textContent = t('unsaved', { n: count });
  }

  function field(key, labelKey, hintKey, control, controlId) {
    return el('div', { class: 'field' + (key in pending ? ' changed' : ''), 'data-field': key },
      el('label', { for: controlId, text: t(labelKey) }),
      control,
      hintKey ? el('p', { class: 'hint', text: t(hintKey) }) : null);
  }

  function selectControl(key, options, allowNone) {
    const id = 'f_' + key;
    const select = el('select', { class: 'select', id });
    const value = valueOf(key);
    if (allowNone) select.append(el('option', { value: '', text: t('opt_none') }));
    const known = new Set();
    const addOption = (parent, opt) => { known.add(opt.value); parent.append(el('option', { value: opt.value, text: opt.label })); };
    const groups = new Map();
    options.forEach(opt => {
      if (opt.group) {
        if (!groups.has(opt.group)) groups.set(opt.group, el('optgroup', { label: opt.group }));
        addOption(groups.get(opt.group), opt);
      } else {
        addOption(select, opt);
      }
    });
    groups.forEach(group => select.append(group));
    if (value && !known.has(value)) {
      select.append(el('option', { value, text: t('opt_missing') + ' (' + value + ')' }));
    }
    select.value = value == null ? '' : value;
    select.disabled = readOnly();
    select.addEventListener('change', () => stage(key, select.value === '' ? null : select.value));
    return { id, control: select };
  }

  function roleField(key, labelKey, hintKey, allowNone) {
    const options = detail.roles.map(role => ({ value: role.id, label: role.name }));
    const { id, control } = selectControl(key, options, allowNone);
    return field(key, labelKey, hintKey, control, id);
  }

  // The API tells us which permissions the bot lacks in each channel.
  const REQUIRED_PERMS = ['view_channel', 'send_messages'];
  const permLabel = name => t('perm_' + name);
  const channelById = id => (detail.channels || []).find(channel => channel.id === id) || null;
  const cannotPost = channel => !!channel && channel.missing.some(name => REQUIRED_PERMS.includes(name));

  function channelWarning(channelId) {
    const channel = channelId ? channelById(channelId) : null;
    if (!channel || !channel.missing.length) return null;
    const blocking = channel.missing.filter(name => REQUIRED_PERMS.includes(name));
    if (blocking.length) return { kind: 'bad', text: t('warn_channel_missing', { perms: blocking.map(permLabel).join(', ') }) };
    return { kind: 'warn', text: t('warn_channel_threads', { perms: channel.missing.map(permLabel).join(', ') }) };
  }

  function bindChannelWarning(select, note) {
    const update = () => {
      const warning = channelWarning(select.value || null);
      note.textContent = warning ? '⚠ ' + warning.text : '';
      note.className = 'hint channel-note' + (warning ? ' ' + warning.kind : ' is-hidden');
    };
    select.addEventListener('change', update);
    update();
  }

  function channelOptions(select) {
    const groups = new Map();
    (detail.channels || []).forEach(channel => {
      const option = el('option', { value: channel.id, text: (cannotPost(channel) ? '⚠ ' : '') + '# ' + channel.name });
      if (channel.category) {
        if (!groups.has(channel.category)) groups.set(channel.category, el('optgroup', { label: channel.category }));
        groups.get(channel.category).append(option);
      } else {
        select.append(option);
      }
    });
    groups.forEach(group => select.append(group));
  }

  function channelField(key, labelKey, hintKey) {
    const options = (detail.channels || []).map(channel => ({
      value: channel.id, label: (cannotPost(channel) ? '⚠ ' : '') + '# ' + channel.name, group: channel.category,
    }));
    const { id, control } = selectControl(key, options, true);
    const note = el('p', { class: 'hint channel-note is-hidden' });
    bindChannelWarning(control, note);
    const wrapper = field(key, labelKey, hintKey, control, id);
    wrapper.append(note);
    return wrapper;
  }

  function toggleField(key, labelKey) {
    const id = 'f_' + key;
    const input = el('input', { type: 'checkbox', id });
    input.checked = !!valueOf(key);
    input.disabled = readOnly();
    input.addEventListener('change', () => stage(key, input.checked));
    return el('div', { class: 'field' + (key in pending ? ' changed' : ''), 'data-field': key },
      el('div', { class: 'switch-row' },
        el('label', { for: id, text: t(labelKey) }),
        el('span', { class: 'switch' }, input, el('span', { class: 'switch-ui', 'aria-hidden': 'true' }))));
  }

  function languageField() {
    const options = ['en', 'ru', 'de', 'fr', 'it'].map(code => ({ value: code, label: t('lang_' + code) }));
    const { id, control } = selectControl('bot_language', options, false);
    return field('bot_language', 'f_language', 'h_language', control, id);
  }

  function statusSwitch(key, labelKey, hintKey) {
    const id = 'state_' + key;
    const input = el('input', { type: 'checkbox', id, role: 'switch', 'aria-label': t(labelKey) });
    input.checked = !!current[key];
    input.disabled = readOnly();
    input.addEventListener('change', async () => {
      if (busy) { input.checked = !!current[key]; return; }
      const nextValue = input.checked;
      busy = true;
      input.disabled = true;
      const row = input.closest('.state-control');
      if (row) row.classList.add('is-saving');
      try {
        const result = await api('/api/guilds/' + encodeURIComponent(guildId) + '/state', {
          method: 'PATCH', body: { [key]: nextValue }
        });
        current = result.config;
        detail.config = result.config;
        renderGuild();
        toast(t(nextValue ? 'state_enabled' : 'state_disabled', { name: t(labelKey) }), 'ok');
      } catch (error) {
        input.checked = !nextValue;
        if (error.code !== 'unauthorized') toast(t('state_failed', { msg: error.message }), 'bad');
      } finally {
        input.disabled = readOnly();
        if (row) row.classList.remove('is-saving');
        busy = false;
      }
    });
    return el('div', { class: 'state-control' },
      el('div', { class: 'state-control-copy' },
        el('label', { for: id, text: t(labelKey) }),
        el('p', { class: 'hint', text: t(hintKey) })),
      el('span', { class: 'switch state-switch' }, input, el('span', { class: 'switch-ui', 'aria-hidden': 'true' })),
      el('span', { class: 'state-value', text: current[key] ? t('st_on') : t('st_off') }));
  }

  /* ------------------------------------------------------------ shared UI bits */
  function fmtDate(value) {
    const date = new Date(String(value).replace(' ', 'T') + 'Z');
    return isNaN(date.getTime()) ? String(value) : date.toLocaleString(document.documentElement.lang || undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }
  const who = (name, id) => name || ('ID ' + id);
  const langName = code => t('lang_' + (['en', 'ru', 'de', 'fr', 'it'].includes(code) ? code : 'en'));

  function fail(error) {
    if (error && error.code === 'unauthorized') return;
    toast(t('act_failed', { msg: (error && error.message) || t('err_server') }), 'bad');
  }

  // Shows a spinner, loads, then builds; answers that arrive after the person left are dropped.
  async function loadInto(container, loader, build) {
    const seq = ++viewSeq;
    container.replaceChildren(el('div', { class: 'panel-loading' }, el('div', { class: 'spinner', role: 'status', 'aria-label': t('loading') })));
    try {
      const data = await loader();
      if (seq !== viewSeq) return;
      container.replaceChildren();
      build(data);
    } catch (error) {
      if (seq !== viewSeq || (error && error.code === 'unauthorized')) return;
      container.replaceChildren(stateCard(null, (error && error.message) || t('err_server'),
        el('button', { class: 'button hero-primary', type: 'button', text: t('retry'), onclick: () => loadInto(container, loader, build) })));
    }
  }

  const guildApi = (path, options) => api('/api/guilds/' + encodeURIComponent(guildId) + path, options);

  /* ------------------------------------------------------------ the open server */
  function renderGuild() {
    rerender = renderGuild;
    viewSeq++;
    const guild = detail.guild;
    crumb.textContent = guild.name;
    crumb.classList.remove('is-hidden');
    renderServerList();

    if (!detail.configured && isOwner()) { renderSetup(guild); return; }
    if (!detail.configured) {
      app.replaceChildren(stateCard(t('notconf_title'), t('notconf_text'),
        el('div', { style: 'display:grid;gap:12px;width:100%' },
          el('button', { class: 'button hero-primary', type: 'button', text: t('reload'), onclick: () => openGuild(guildId, tab, true) }),
          el('button', { class: 'button dashboard-back-button', type: 'button', text: '← ' + t('menu_switch'), onclick: () => navigate(null), 'aria-label': t('menu_switch') }))));
      updateBar();
      return;
    }
    if (!allowedTabs().includes(tab)) tab = 'settings';

    const badges = el('div', { class: 'badges' });
    if (!isOwner()) badges.append(el('span', { class: 'badge-pill', text: '👁 ' + t('pick_moderator') }));
    if (current.maintenance) badges.append(el('span', { class: 'badge-pill warn', text: '🛠 ' + t('b_maintenance') }));
    if (current.lock) badges.append(el('span', { class: 'badge-pill warn', text: '🔒 ' + t('b_lock') }));

    const bar = el('div', { class: 'tab-bar', role: 'tablist' }, ...allowedTabs().map(name =>
      el('button', {
        class: 'tab' + (name === tab ? ' active' : ''), type: 'button', role: 'tab',
        'aria-selected': String(name === tab), text: t('tab_' + name), onclick: () => switchTab(name),
      })));
    const panel = el('div', { class: 'tab-panel' });

    const backButton = el('button', {
      class: 'button dashboard-back-button', type: 'button',
      text: '← ' + t('menu_switch'),
      onclick: () => navigate(null),
      'aria-label': t('menu_switch')
    });

    app.replaceChildren(
      el('header', { class: 'page-head dashboard-guild-head' },
        backButton,
        icon(guild, 56),
        el('div', { class: 'dashboard-guild-title' }, el('h1', { text: guild.name }), el('p', { text: t('kicker_dash') })),
        badges),
      bar, panel);

    const renderers = { settings: renderSettings, qotds: renderQotds, suggestions: renderSuggestions, schedule: renderSchedule, leaderboard: renderLeaderboard, statistics: renderStatistics, logs: renderLogs };
    renderers[tab](panel);
    updateBar();
  }

  /* ------------------------------------------------------------ first-time setup (replaces /setup) */
  function renderSetup(guild) {
    tab = 'settings';
    const panel = el('div', { class: 'tab-panel' });
    app.replaceChildren(
      el('header', { class: 'page-head dashboard-guild-head' },
        el('button', { class: 'button dashboard-back-button', type: 'button', text: '← ' + t('menu_switch'), onclick: () => navigate(null), 'aria-label': t('menu_switch') }),
        icon(guild, 56),
        el('div', { class: 'dashboard-guild-title' }, el('h1', { text: guild.name }), el('p', { text: t('setup_title') }))),
      panel);
    panel.append(el('div', { class: 'ro-banner', role: 'note', text: '✨ ' + t('setup_text') }));
    renderSettings(panel);
    updateBar();
  }

  /* ------------------------------------------------------------ tab: settings */
  function renderSettings(panel) {
    const card = (titleKey, ...children) => el('section', { class: 'dash-card' }, el('h2', { text: t(titleKey) }), ...children);
    if (readOnly()) panel.append(el('div', { class: 'ro-banner', role: 'note', text: '👁 ' + t('ro_banner') }));
    panel.append(
      el('div', { class: 'dash-grid' },
        card('sec_roles',
          roleField('allowed_role', 'f_allowed_role', 'h_allowed_role', false),
          roleField('mention_role', 'f_mention_role', 'h_mention_role', true)),
        card('sec_channels',
          channelField('qotd_channel', 'f_qotd_channel', 'h_qotd_channel'),
          channelField('announcement_channel', 'f_announcement_channel', 'h_announcement_channel')),
        card('sec_mentions',
          toggleField('mention_everyone', 'f_everyone'),
          toggleField('mention_here', 'f_here'),
          el('p', { class: 'hint', text: t('h_mentions') })),
        card('sec_language', languageField()),
        detail.configured ? el('section', { class: 'dash-card wide state-card-controls' },
          el('h2', { text: t('sec_status') }),
          el('div', { class: 'state-controls' },
            statusSwitch('maintenance', 'st_maintenance', 'h_maintenance_control'),
            statusSwitch('lock', 'st_lock', 'h_lock_control'))) : null));
  }

  /* ------------------------------------------------------------ tab: QOTDs */
  function renderQotds(panel) {
    const paused = !!(current.maintenance || current.lock);
    const compose = el('section', { class: 'dash-card wide' }, el('h2', { text: t('qotd_new') }));
    if (paused) compose.append(el('div', { class: 'ro-banner warn', role: 'note', text: '⏸ ' + t('qotd_paused') }));

    const publishBtn = el('button', { class: 'button hero-primary', type: 'button', text: t('qotd_publish') });
    const randomBtn = el('button', { class: 'button ghost', type: 'button', text: '✨ ' + t('qotd_random') });
    const randomNote = el('p', { class: 'hint', text: t('qotd_random_hint') });
    randomBtn.disabled = paused || busy;
    const counter = el('span', { class: 'counter', text: '0/1500' });
    const question = el('textarea', { class: 'textarea', id: 'qotdQuestion', rows: '4', maxlength: '1500', placeholder: t('qotd_question_ph') });
    const sync = () => {
      counter.textContent = question.value.length + '/1500';
      publishBtn.disabled = paused || busy || !question.value.trim();
      randomBtn.disabled = paused || busy;
    };
    question.addEventListener('input', sync);

        const channel = el('select', { class: 'select', id: 'qotdChannel' }, el('option', { value: '', text: t('qotd_channel_default') }));
    channelOptions(channel);
    const note = el('p', { class: 'hint channel-note is-hidden' });
    bindChannelWarning(channel, note);

    const list = el('div', { class: 'item-list' });
    const reload = () => loadInto(list, () => guildApi('/qotds?limit=20'), data => buildQotdList(list, data.qotds));

    publishBtn.addEventListener('click', async () => {
      if (busy || !question.value.trim()) return;
      const target = channel.value ? channel.options[channel.selectedIndex].textContent.replace('⚠ ', '') : t('qotd_channel_default');
      if (!window.confirm(t('qotd_confirm', { channel: target }))) return;
      busy = true;
      publishBtn.disabled = true;
      publishBtn.textContent = t('qotd_publishing');
      try {
        const result = await guildApi('/qotds', { method: 'POST', body: { question: question.value, channel: channel.value || null } });
        question.value = '';
        toast(t('qotd_published', { n: result.qotd.number, channel: result.qotd.channel_name }) + (result.qotd.thread_created ? '' : ' ' + t('qotd_thread_missing')), 'ok');
        reload();
      } catch (error) {
        fail(error);
      } finally {
        busy = false;
        publishBtn.textContent = t('qotd_publish');
        sync();
      }
    });

    randomBtn.addEventListener('click', async () => {
      if (busy || paused) return;
      if (!window.confirm(t('qotd_random_confirm'))) return;
      busy = true;
      randomBtn.disabled = true;
      publishBtn.disabled = true;
      randomBtn.textContent = '✨ ' + t('qotd_random_loading');
      try {
        const result = await guildApi('/qotds/random', { method: 'POST' });
        toast(t('qotd_random_published', { n: result.qotd.number, channel: result.qotd.channel_name }) + (result.qotd.thread_created ? '' : ' ' + t('qotd_thread_missing')), 'ok');
        reload();
      } catch (error) { fail(error); }
      finally {
        busy = false;
        randomBtn.textContent = '✨ ' + t('qotd_random');
        randomBtn.disabled = paused;
        sync();
      }
    });

    compose.append(
      el('div', { class: 'btn-row' }, randomBtn), randomNote,
      el('div', { class: 'field' }, el('label', { for: 'qotdQuestion', text: t('qotd_question') }), question, counter),
      el('div', { class: 'field' }, el('label', { for: 'qotdChannel', text: t('qotd_channel') }), channel, note),
      el('div', { class: 'btn-row' }, publishBtn));
    sync();

    panel.append(compose, el('h2', { class: 'list-title', text: t('qotd_recent') }), list);
    reload();
  }

  function buildQotdList(list, qotds) {
    if (!qotds.length) { list.append(el('p', { class: 'empty-note', text: t('qotd_empty') })); return; }
    qotds.forEach(q => list.append(qotdCard(q)));
  }

  function qotdCard(q) {
    const card = el('article', { class: 'item-card' });
    const meta = () => el('div', { class: 'item-meta' },
      el('strong', { text: t('qotd_title_line', { n: q.number }) }),
      el('span', { class: 'badge-pill', text: langName(q.language) }),
      el('span', { class: 'item-sub', text: fmtDate(q.created_at) + ' · ' + who(q.author_name, q.author_id) }));

    function draw() {
      const actions = el('div', { class: 'btn-row' });
      if (q.url) actions.append(el('a', { class: 'button ghost', href: q.url, target: '_blank', rel: 'noopener noreferrer', text: t('qotd_open') + ' ↗' }));
      if (q.editable) actions.append(el('button', { class: 'button ghost', type: 'button', text: '✏️ ' + t('qotd_edit'), onclick: drawEdit }));
      actions.append(el('button', { class: 'button danger', type: 'button', text: '🗑 ' + t('qotd_delete'), onclick: drawDelete }));
      card.replaceChildren(meta(), el('p', { class: 'item-text', text: q.question }), actions);
    }

    function drawDelete() {
      const yes = el('button', { class: 'button danger', type: 'button', text: t('qotd_delete_yes') });
      yes.addEventListener('click', async () => {
        if (busy) return;
        busy = true;
        yes.disabled = true;
        try {
          const result = await guildApi('/qotds/' + encodeURIComponent(q.id), { method: 'DELETE' });
          const done = result && result.deleted;
          toast(t(done && done.discord_message_deleted === false ? 'qotd_deleted_partial' : 'qotd_deleted', { n: q.number }),
            done && done.discord_message_deleted === false ? 'warn' : 'ok');
          card.remove();
        } catch (error) {
          fail(error);
          yes.disabled = false;
        } finally {
          busy = false;
        }
      });
      card.replaceChildren(meta(), el('p', { class: 'item-text', text: q.question }),
        el('p', { class: 'empty-note', text: t('qotd_delete_confirm', { n: q.number }) }),
        el('div', { class: 'btn-row' }, yes, el('button', { class: 'button ghost', type: 'button', text: t('qotd_cancel'), onclick: draw })));
    }

    function drawEdit() {
      const area = el('textarea', { class: 'textarea', rows: '4', maxlength: '1500', 'aria-label': t('qotd_question') });
      area.value = q.question;
      const save = el('button', { class: 'button hero-primary', type: 'button', text: t('qotd_save') });
      save.addEventListener('click', async () => {
        if (busy || !area.value.trim() || area.value.trim() === q.question) { if (area.value.trim() === q.question) draw(); return; }
        busy = true;
        save.disabled = true;
        try {
          const result = await guildApi('/qotds/' + encodeURIComponent(q.id), { method: 'PATCH', body: { question: area.value } });
          q.question = result.qotd.question;
          toast(t('qotd_edited', { n: q.number }), 'ok');
          draw();
        } catch (error) {
          fail(error);
          save.disabled = false;
        } finally {
          busy = false;
        }
      });
      card.replaceChildren(meta(), area,
        el('div', { class: 'btn-row' }, save, el('button', { class: 'button ghost', type: 'button', text: t('qotd_cancel'), onclick: draw })));
      area.focus();
    }

    draw();
    return card;
  }

  /* ------------------------------------------------------------ tab: suggestions */
  function renderSuggestions(panel) {
    const list = el('div', { class: 'item-list' });
    panel.append(list);
    loadInto(list, () => guildApi('/suggestions'), data => buildSuggestions(list, data));
  }

  function buildSuggestions(list, data) {
    let left = data.suggestions.length;
    const head = el('h2', { class: 'list-title', text: t('sug_title') + ' · ' + t('sug_total', { n: data.total }) });
    list.append(head);
    const empty = el('p', { class: 'empty-note', text: t('sug_empty') });
    if (!left) list.append(empty);
    data.suggestions.forEach(item => list.append(suggestionCard(item, card => {
      card.remove();
      left -= 1;
      if (!left) list.append(empty);
    })));
  }

  function suggestionCard(item, done) {
    const card = el('article', { class: 'item-card' });
    const approve = el('button', { class: 'button hero-primary', type: 'button', text: '✓ ' + t('sug_approve') });
    const reject = el('button', { class: 'button danger', type: 'button', text: '✕ ' + t('sug_reject') });
    const actions = el('div', { class: 'btn-row' }, approve, reject);
    const lock = on => { approve.disabled = on; reject.disabled = on; };

    approve.addEventListener('click', async () => {
      if (busy || !window.confirm(t('sug_approve_confirm'))) return;
      busy = true; lock(true);
      try {
        const result = await guildApi('/suggestions/' + encodeURIComponent(item.id) + '/approve', { method: 'POST' });
        toast(t('sug_approved', { id: item.id, n: result.qotd.number }) + (result.dm_delivered ? '' : ' ' + t('sug_dm_failed')), 'ok');
        done(card);
      } catch (error) {
        fail(error); lock(false);
        if (error && error.code === 'already_reviewed') done(card);
      } finally { busy = false; }
    });

    reject.addEventListener('click', () => {
      const reason = el('input', { class: 'select reason-input', type: 'text', maxlength: '500', placeholder: t('sug_reason_ph'), 'aria-label': t('sug_reason_ph') });
      const send = el('button', { class: 'button danger', type: 'button', text: t('sug_reject_confirm') });
      send.addEventListener('click', async () => {
        if (busy) return;
        busy = true; send.disabled = true;
        try {
          await guildApi('/suggestions/' + encodeURIComponent(item.id) + '/reject', { method: 'POST', body: { reason: reason.value } });
          toast(t('sug_rejected', { id: item.id }), 'ok');
          done(card);
        } catch (error) {
          fail(error); send.disabled = false;
          if (error && error.code === 'already_reviewed') done(card);
        } finally { busy = false; }
      });
      actions.replaceChildren(reason, send, el('button', { class: 'button ghost', type: 'button', text: t('qotd_cancel'), onclick: () => actions.replaceChildren(approve, reject) }));
      reason.focus();
    });

    card.append(
      el('div', { class: 'item-meta' },
        el('strong', { text: '#' + item.id }),
        el('span', { class: 'badge-pill', text: langName(item.language) }),
        el('span', { class: 'item-sub', text: t('sug_from', { name: who(item.author_name, item.user_id) }) + ' · ' + fmtDate(item.created_at) })),
      el('p', { class: 'item-text', text: item.question }),
      actions);
    return card;
  }

  /* ------------------------------------------------------------ tab: logs (owner) */
  let logKind = 'logs';

  /* ---------------------------------------------------------- tab: schedule */
  function renderSchedule(panel) {
    const card = el('section', { class: 'dash-card wide schedule-card' });
    const status = el('span', { class: 'badge-pill schedule-status-pill', text: t('loading'), 'aria-live': 'polite' });
    card.append(el('div', { class: 'schedule-card-head' }, el('h2', { text: t('schedule_title') }), status));
    card.append(el('p', { class: 'hint', text: t('schedule_desc') }));
    card.append(el('p', { class: 'hint', text: t('schedule_owner') }));
    const enabled = el('input', { type: 'checkbox', id: 'scheduleEnabled' });
    const time = el('input', { class: 'input', type: 'time', id: 'scheduleTime', required: true });
    const interval = el('select', { class: 'select', id: 'scheduleInterval' },
      el('option', { value: '24', text: t('schedule_every_24') }),
      el('option', { value: '12', text: t('schedule_every_12') }),
      el('option', { value: '6', text: t('schedule_every_6') }),
      el('option', { value: '1', text: t('schedule_every_1') }));
    const timezone = el('input', { class: 'input', type: 'text', id: 'scheduleTimezone', maxlength: '80', autocomplete: 'off', placeholder: 'Europe/Helsinki' });
    const saveSchedule = el('button', { class: 'button hero-primary', type: 'button', text: t('schedule_save') });
    const note = el('p', { class: 'hint', text: t('schedule_retry') });
    const form = el('div', { class: 'schedule-form' },
      el('label', { class: 'schedule-toggle', for: 'scheduleEnabled' }, enabled, el('span', { text: t('schedule_enabled') })),
      field('schedule_time', 'schedule_time', null, time, 'scheduleTime'),
      field('schedule_interval', 'schedule_interval', null, interval, 'scheduleInterval'),
      field('schedule_timezone', 'schedule_timezone', 'schedule_timezone_hint', timezone, 'scheduleTimezone'),
      note, el('div', { class: 'btn-row' }, saveSchedule));
    card.append(form);
    panel.append(card);
    saveSchedule.disabled = true;
    const scheduleSeq = ++viewSeq;
    guildApi('/schedule').then(data => {
      if (scheduleSeq !== viewSeq) return;
      const schedule = data.schedule || {};
      enabled.checked = !!schedule.enabled;
      time.value = schedule.time || '10:00';
      timezone.value = schedule.timezone || 'UTC';
      interval.value = String(schedule.interval_hours || 24);
      status.textContent = schedule.enabled ? t('schedule_status_on') : t('schedule_status_off');
      status.className = 'badge-pill' + (schedule.enabled ? ' ok' : '');
      saveSchedule.disabled = false;
    }).catch(error => {
      if (scheduleSeq !== viewSeq) return;
      status.textContent = (error && error.message) || t('err_server');
      status.className = 'badge-pill bad';
      saveSchedule.disabled = true;
    });
    saveSchedule.addEventListener('click', async () => {
      if (busy) return;
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time.value) || !/^[A-Za-z0-9_+-]+(?:\/[A-Za-z0-9_+.-]+)*$/.test(timezone.value.trim())) {
        toast(t('schedule_invalid'), 'bad'); return;
      }
      busy = true; saveSchedule.disabled = true;
      try {
        const result = await guildApi('/schedule', { method: 'PATCH', body: { enabled: enabled.checked, time: time.value, timezone: timezone.value.trim(), interval_hours: Number(interval.value) } });
        status.textContent = result.schedule.enabled ? t('schedule_status_on') : t('schedule_status_off');
        status.className = 'badge-pill' + (result.schedule.enabled ? ' ok' : '');
        toast(t('schedule_saved'), 'ok');
      } catch (error) { fail(error); }
      finally { busy = false; saveSchedule.disabled = false; }
    });
  }

  /* -------------------------------------------------------- tab: leaderboard */
  function renderLeaderboard(panel) {
    const switcher = el('div', { class: 'sub-tabs', role: 'tablist' });
    const list = el('div', { class: 'item-list' });
    let kind = 'creators';
    const draw = data => {
      const rows = kind === 'creators' ? data.creators : data.responders;
      list.replaceChildren();
      if (!rows || !rows.length) { list.append(el('p', { class: 'empty-note', text: t('leader_empty') })); return; }
      rows.forEach((row, index) => {
        const count = Number(row.count) || 0;
        const label = kind === 'creators' ? t('leader_count_qotd', { n: count }) : t('leader_count_answers', { n: count });
        list.append(el('article', { class: 'leader-row' },
          el('span', { class: 'leader-rank', text: String(index + 1).padStart(2, '0') }),
          el('div', { class: 'leader-person' }, el('strong', { text: row.user_name || ('User ' + row.user_id) }), el('small', { text: row.user_id })),
          el('span', { class: 'badge-pill', text: label })));
      });
    };
    const load = () => loadInto(list, () => guildApi('/leaderboard'), draw);
    ['creators', 'responders'].forEach(key => switcher.append(el('button', { class: 'tab small' + (key === kind ? ' active' : ''), type: 'button', role: 'tab', text: t(key === 'creators' ? 'leader_creators' : 'leader_responders'), onclick: () => { kind = key; switcher.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === (key === 'creators' ? 0 : 1))); load(); } })));
    panel.append(switcher, list); load();
  }

  /* ---------------------------------------------------------- tab: statistics */
  function renderStatistics(panel) {
    const grid = el('div', { class: 'stats-grid' });
    const refresh = el('button', { class: 'button ghost', type: 'button', text: t('stats_refresh') });
    const resetCounter = el('button', { class: 'button danger', type: 'button', text: t('stats_reset_counter') });
    const controls = el('div', { class: 'btn-row' }, refresh);
    if (isOwner()) controls.append(resetCounter);
    const wrap = el('section', { class: 'dash-card wide' }, el('div', { class: 'stats-head' }, el('h2', { text: t('tab_statistics') }), controls), grid);
    panel.append(wrap);
    const load = () => loadInto(grid, () => guildApi('/statistics'), data => {
      const st = data.statistics || {};
      const values = [
        ['stats_total', st.total],
        ['stats_month', st.month_total],
        ['stats_week', st.week_total],
      ];
      grid.replaceChildren(...values.map(([key, value]) => el('article', { class: 'stat-card' }, el('span', { text: t(key) },), el('strong', { text: String(Number(value) || 0) }))));
    });
    refresh.addEventListener('click', load);
    resetCounter.addEventListener('click', async () => {
      if (busy || !window.confirm(t('stats_reset_counter_confirm'))) return;
      busy = true; resetCounter.disabled = true;
      try {
        await guildApi('/counter/reset', { method: 'POST' });
        toast(t('stats_reset_counter_done'), 'ok');
        load();
      } catch (error) {
        fail(error);
      } finally {
        busy = false; resetCounter.disabled = false;
      }
    });
    load();
  }

  function renderLogs(panel) {
    const kinds = ['logs', 'audit'];
    const switcher = el('div', { class: 'sub-tabs', role: 'tablist' }, ...kinds.map(kind =>
      el('button', { class: 'tab small' + (kind === logKind ? ' active' : ''), type: 'button', role: 'tab', text: t('logs_' + kind),
        onclick: () => { logKind = kind; renderGuild(); } })));
    const list = el('div', { class: 'item-list' });
    const controls = el('div', { class: 'btn-row' }, switcher);
    if (logKind === 'logs' && isOwner()) {
      const resetLogs = el('button', { class: 'button danger', type: 'button', text: t('logs_reset_button') });
      resetLogs.addEventListener('click', async () => {
        if (busy || !window.confirm(t('logs_reset_confirm'))) return;
        busy = true; resetLogs.disabled = true;
        try {
          const result = await guildApi('/logs/reset', { method: 'POST' });
          toast(t('logs_reset_done') + ` (${result.deleted})`, 'ok');
          renderGuild();
        } catch (error) {
          fail(error); resetLogs.disabled = false;
        } finally { busy = false; }
      });
      controls.append(resetLogs);
    }
    panel.append(controls, list);

    const PAGE = 25;
    let offset = 0;
    const first = () => guildApi('/' + logKind + '?limit=' + PAGE + '&offset=0');
    loadInto(list, first, data => {
      const rows = el('div', { class: 'log-rows' });
      const more = el('button', { class: 'button ghost', type: 'button', text: t('logs_more') });
      const total = el('p', { class: 'item-sub', text: t('logs_total', { n: data.total }) });
      const add = items => {
        items.forEach(row => rows.append(logRow(row)));
        offset += items.length;
        more.classList.toggle('is-hidden', offset >= data.total || !items.length);
      };
      more.addEventListener('click', async () => {
        more.disabled = true;
        try { add((await guildApi('/' + logKind + '?limit=' + PAGE + '&offset=' + offset)).items); }
        catch (error) { fail(error); }
        finally { more.disabled = false; }
      });
      list.append(total);
      if (!data.items.length) list.append(el('p', { class: 'empty-note', text: t('logs_empty') }));
      list.append(rows, el('div', { class: 'btn-row' }, more));
      add(data.items);
    });
  }

  function logRow(row) {
    const isAudit = row.type !== undefined;
    const label = isAudit ? row.type + ' · ' + row.name : row.action;
    const statusClass = isAudit ? (row.status === 'success' ? ' ok' : row.status === 'error' || row.status === 'denied' ? ' bad' : ' warn') : '';
    return el('div', { class: 'log-row' },
      el('div', { class: 'log-head' },
        el('span', { class: 'badge-pill' + statusClass, text: label }),
        isAudit ? el('span', { class: 'badge-pill' + statusClass, text: row.status }) : null,
        el('span', { class: 'item-sub', text: fmtDate(row.created_at) + ' · ' + who(row.user_name, row.user_id) + (row.qotd_number ? ' · QOTD #' + row.qotd_number : '') })),
      row.details ? el('p', { class: 'log-details', text: row.details }) : null);
  }

  /* ------------------------------------------------------------ open / save / tabs */
  async function openGuild(id, nextTab, force) {
    if (!force && detail && guildId === id) {
      tab = nextTab || 'settings';
      pending = {};
      renderGuild();
      return;
    }
    guildId = id;
    tab = nextTab || 'settings';
    pending = {};
    showLoading();
    try {
      detail = await api('/api/guilds/' + encodeURIComponent(id));
    } catch (error) {
      if (error.code === 'unauthorized') return;
      if (error.code === 'not_found') { toast(t('err_notfound'), 'bad'); navigate(null, true); return; }
      showError(error, () => openGuild(id, nextTab, true));
      return;
    }
    if (guildId !== id) return; // the person moved on while loading
    current = detail.config || {
      allowed_role: null, mention_role: null, qotd_channel: null,
      announcement_channel: null, bot_language: 'en', mention_everyone: false, mention_here: false, maintenance: false, lock: false,
    };
    renderGuild();
  }

  function switchTab(next) {
    if (next === tab || !confirmLeave()) return;
    pending = {};
    tab = next;
    history.pushState(null, '', location.pathname + hashFor(guildId, next));
    renderGuild();
  }

  async function save() {
    if (busy || !isDirty() || !guildId || readOnly()) return;
    if (!detail.configured && !pending.allowed_role) { toast(t('setup_role_required'), 'bad'); return; }
    busy = true;
    saveBtn.disabled = true;
    saveBtn.textContent = t('saving');
    try {
      const result = await api('/api/guilds/' + encodeURIComponent(guildId) + '/config', { method: 'PATCH', body: pending });
      current = result.config;
      detail.config = result.config;
      detail.configured = true;
      const known = guilds.find(g => g.id === guildId);
      if (known) known.configured = true;
      pending = {};
      renderGuild();
      toast(t('saved'), 'ok');
    } catch (error) {
      if (error.code !== 'unauthorized') toast(t('save_failed', { msg: error.message }), 'bad');
    } finally {
      busy = false;
      saveBtn.disabled = false;
      saveBtn.textContent = t('save');
      updateBar();
    }
  }

  function discard() {
    pending = {};
    if (detail && current) renderGuild();
  }

  /* ------------------------------------------------------ side menu + routing */
  function renderUser() {
    const card = document.getElementById('userCard');
    if (!me) return;
    card.replaceChildren(
      el('img', { class: 'avatar-round', src: me.avatar, alt: '', width: 38, height: 38, referrerpolicy: 'no-referrer' }),
      el('div', null, el('strong', { text: me.name }), el('small', { text: 'Discord' })));
    card.classList.remove('is-hidden');
  }

  function renderServerList() {
    const list = document.getElementById('serverList');
    const box = document.getElementById('serverSearch');
    const many = guilds.length > 6;
    box.classList.toggle('is-hidden', !many);
    box.placeholder = t('search_ph');
    box.setAttribute('aria-label', t('search_ph'));
    if (box.value !== serverQuery) box.value = serverQuery;
    const shown = many ? matchingGuilds() : guilds;
    list.replaceChildren(...shown.map(guild => {
      const button = el('button', { class: 'side-action' + (guild.id === guildId ? ' active' : ''), type: 'button', onclick: () => { setMenu(false); if (guild.id !== guildId) navigate(guild.id); } },
        el('span', { class: 'side-action-icon' }, icon(guild, 22)),
        el('span', { text: guild.name }));
      return button;
    }));
    if (many && !shown.length) list.append(el('p', { class: 'hint side-empty', text: t('search_none', { q: serverQuery.trim() }) }));
  }

  const hashFor = (id, name) => '#g=' + id + (name && name !== 'settings' ? '&t=' + name : '');

  function parseRoute() {
    const match = /^#g=(\d{1,20})(?:&t=(settings|qotds|suggestions|schedule|leaderboard|statistics|logs))?$/.exec(location.hash);
    return match ? { id: match[1], tab: match[2] || 'settings' } : null;
  }

  function route() {
    const target = parseRoute();
    if (target && guilds.some(guild => guild.id === target.id)) { openGuild(target.id, target.tab); return; }
    if (location.hash) history.replaceState(null, '', location.pathname);
    showPicker();
  }

  function navigate(id, force) {
    if (!force && !confirmLeave()) return;
    pending = {};
    history.pushState(null, '', location.pathname + (id ? hashFor(id) : ''));
    route();
  }

  const sideMenu = document.getElementById('sideMenu');
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  function setMenu(open) {
    sideMenu.classList.toggle('open', open);
    menuOverlay.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    sideMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  function wireStatic() {
    menuToggle.addEventListener('click', () => setMenu(true));
    document.getElementById('menuClose').addEventListener('click', () => setMenu(false));
    menuOverlay.addEventListener('click', () => setMenu(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    const serverSearch = document.getElementById('serverSearch');
    serverSearch.addEventListener('input', () => onSearch(serverSearch.value));
    document.getElementById('allServersBtn').addEventListener('click', () => { setMenu(false); if (guildId) navigate(null); });
    document.getElementById('docsLink').href = CFG.DOCS_URL || 'index.html#home';
    document.getElementById('addLink').href = CFG.INVITE_URL || '#';
    document.getElementById('logoutBtn').addEventListener('click', () => {
      if (!confirmLeave()) return;
      pending = {};
      Q.clearToken();
      location.replace('login.html');
    });
    saveBtn.addEventListener('click', save);
    discardBtn.addEventListener('click', discard);
    window.addEventListener('popstate', () => { pending = {}; route(); });
    window.addEventListener('beforeunload', e => { if (isDirty()) { e.preventDefault(); e.returnValue = ''; } });
    window.addEventListener('quello:languagechange', () => { renderUser(); renderServerList(); rerender(); });
  }

  async function load() {
    showLoading();
    try {
      me = await api('/api/me');
      guilds = (await api('/api/guilds')).guilds;
    } catch (error) {
      if (error.code !== 'unauthorized') showError(error, load);
      return;
    }
    renderUser();
    route();
  }

  /* ------------------------------------------------------------------ start */
  wireHeader();
  applyI18n();
  wireStatic();

  // The API sends people back here as dashboard.html#token=...; keep it and clean the address bar.
  const fromHash = /[#&]token=([A-Za-z0-9_.-]+)/.exec(location.hash);
  if (fromHash) {
    Q.setToken(fromHash[1]);
    history.replaceState(null, '', location.pathname);
    // Signed in from the "sign in first" prompt on another page -> go back to that page.
    let back = '';
    try { back = sessionStorage.getItem('quello-after-login') || ''; sessionStorage.removeItem('quello-after-login'); } catch (e) { /* ignore */ }
    if (/^(index|about|terms|privacy)\.html(#[A-Za-z0-9_-]{1,40})?$/.test(back) && Q.tokenLooksValid(Q.getToken())) { location.replace(back); return; }
  }
  if (!Q.tokenLooksValid(Q.getToken())) {
    Q.clearToken();
    location.replace('login.html');
    return;
  }
  load();
})();
