/* Copyright (c) 2026 Quello. All rights reserved. */
(() => {
  'use strict';
  const results = document.getElementById('serverResults');
  const status = document.getElementById('discoveryStatus');
  const search = document.getElementById('searchServers');
  const category = document.getElementById('filterCategory');
  const manage = document.getElementById('manageListings');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeInvite = value => { try { const u = new URL(String(value || '')); return u.protocol === 'https:' && (u.hostname === 'discord.gg' || u.hostname === 'discord.com' || u.hostname === 'www.discord.com') && (u.hostname !== 'discord.com' && u.hostname !== 'www.discord.com' || u.pathname.startsWith('/invite/')) ? u.href : ''; } catch (_) { return ''; } };
  let servers = [];
  const labels = {community:'Community',gaming:'Gaming',technology:'Technology',creative:'Creative',education:'Education',other:'Other'};
  function render() {
    const q = search.value.trim().toLocaleLowerCase();
    const filtered = servers.filter(s => (!category.value || s.category === category.value) && (!q || `${s.name} ${s.description}`.toLocaleLowerCase().includes(q)));
    results.innerHTML = filtered.length ? filtered.map(s => `<article class="server-card"><div class="server-card-head">${s.icon ? `<img src="${esc(s.icon)}" alt="">` : '<span class="server-placeholder" aria-hidden="true">Q</span>'}<div><h3>${esc(s.name)}</h3><small>${esc(labels[s.category] || s.category)}${s.member_count ? ` · ${Number(s.member_count).toLocaleString()} members` : ''}</small></div></div><p>${esc(s.description)}</p>${safeInvite(s.invite_url) ? `<a href="${esc(safeInvite(s.invite_url))}" target="_blank" rel="noopener noreferrer">Join on Discord ↗</a>` : '<span class="server-invite-unavailable">Invite unavailable</span>'}</article>`).join('') : '<p>No listed servers match your search.</p>';
  }
  async function loadPublic() {
    status.textContent = 'Loading servers…';
    try { if (!Q.API_BASE) throw Error('Server Discovery is temporarily unavailable: the Quello API address is not configured.');
      const data = await fetch(`${Q.API_BASE}/public/server-discovery`, {headers:{Accept:'application/json'}, cache:'no-store'}).then(r => { if (!r.ok) throw Error(`Could not load the directory (HTTP ${r.status}).`); return r.json(); });
      servers = Array.isArray(data.servers) ? data.servers.filter(s => s && typeof s.name === 'string') : []; (Array.isArray(data.categories) ? data.categories : []).forEach(c => { const value=String(c); const exists=Array.from(category.options).some(option => option.value===value); if (!exists && /^[a-z0-9_-]{1,32}$/i.test(value)) category.add(new Option(labels[value] || value, value)); }); render(); status.textContent = `${servers.length} listed server${servers.length === 1 ? '' : 's'}`;
    } catch (e) { servers = []; render(); status.textContent = e.message || 'Server Discovery is temporarily unavailable.'; }
  }
  function renderManage(items) {
    manage.innerHTML = items.length ? items.map(s => `<form class="listing-editor" data-guild="${esc(s.guild_id)}"><h3>${esc(s.name)}</h3><label class="inline"><input type="checkbox" name="enabled" ${s.enabled?'checked':''}> Publish this server in Server Discovery</label><label>Description<textarea name="description" maxlength="500">${esc(s.description)}</textarea></label><label>Category<select name="category">${Object.entries(labels).map(([v,l])=>`<option value="${v}" ${s.category===v?'selected':''}>${l}</option>`).join('')}</select></label><label>Discord invite URL<input name="invite_url" type="url" maxlength="200" value="${esc(s.invite_url)}" placeholder="https://discord.gg/…"></label><button type="submit">Save listing</button><small class="save-status" role="status"></small></form>`).join('') : '<p>No manageable servers with Quello are available on this account.</p>';
  }
  async function loadManage() {
    if (!Q.getToken()) { manage.innerHTML = '<a href="login.html?next=server-discovery.html">Sign in with Discord to manage your servers</a>'; return; }
    try { const data = await Q.api('/api/server-discovery'); renderManage(data.servers || []); }
    catch (e) { manage.textContent = e.message || 'Could not load your servers.'; }
  }
  manage.addEventListener('submit', async e => { const form = e.target.closest('form[data-guild]'); if (!form) return; e.preventDefault(); const b = form.querySelector('button'); const note = form.querySelector('.save-status'); b.disabled = true; note.textContent = 'Saving…';
    try { const invite = form.elements.invite_url.value.trim(); if (form.elements.enabled.checked && !safeInvite(invite)) throw Error('Enter a valid HTTPS Discord invite link (discord.gg or discord.com/invite).'); await Q.api('/api/server-discovery', {method:'POST',body:JSON.stringify({guild_id:form.dataset.guild,enabled:form.elements.enabled.checked,description:form.elements.description.value,category:form.elements.category.value,invite_url:invite})}); note.textContent = 'Saved.'; await loadPublic(); }
    catch (err) { note.textContent = err.message || 'Could not save listing.'; } finally { b.disabled = false; }
  });
  search.addEventListener('input', render); category.addEventListener('change', render); document.getElementById('refreshServers').addEventListener('click', loadPublic);
  loadPublic(); if (Q.getToken()) loadManage();
})();
