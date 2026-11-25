/* Copyright (c) 2026 Quello. All rights reserved. */
(() => {
  'use strict';
  const form = document.getElementById('feedbackForm');
  const list = document.getElementById('feedbackList');
  const status = document.getElementById('formStatus');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const lang = (() => { try { return (localStorage.getItem('quello-site-language-v2') || 'en').slice(0,2).toLowerCase(); } catch (_) { return 'en'; } })();
  const copy = {
    en:{title:'Feedback Center',intro:'Share an idea, report a problem or ask a question. Follow updates and discuss your submission with the Quello team.',submit:'Submit feedback',category:'Category',idea:'Feature idea',bug:'Bug report',question:'Question',other:'Other',titleLabel:'Title',description:'Description',send:'Send feedback',your:'Your submissions',refresh:'Refresh',loading:'Loading…',empty:'You have not submitted feedback yet.',sent:'Feedback submitted.',reply:'Write a reply…',replyBtn:'Reply',staff:'View all feedback',team:'Quello team',statuses:{new:'New',reviewing:'Under review',planned:'Planned',in_progress:'In progress',completed:'Completed',declined:'Declined'}},
    ru:{title:'Центр обратной связи',intro:'Предложите идею, сообщите об ошибке или задайте вопрос. Следите за статусом обращения и обсуждайте его с командой Quello.',submit:'Отправить обращение',category:'Категория',idea:'Идея',bug:'Сообщение об ошибке',question:'Вопрос',other:'Другое',titleLabel:'Заголовок',description:'Описание',send:'Отправить',your:'Ваши обращения',refresh:'Обновить',loading:'Загрузка…',empty:'Вы ещё не отправляли обращений.',sent:'Обращение отправлено.',reply:'Написать ответ…',replyBtn:'Ответить',staff:'Все обращения',team:'Команда Quello',statuses:{new:'Новое',reviewing:'На рассмотрении',planned:'Запланировано',in_progress:'В работе',completed:'Завершено',declined:'Отклонено'}},
    de:{title:'Feedback-Center',intro:'Teile eine Idee, melde einen Fehler oder stelle eine Frage. Verfolge den Status und diskutiere mit dem Quello-Team.',submit:'Feedback senden',category:'Kategorie',idea:'Funktionsidee',bug:'Fehlerbericht',question:'Frage',other:'Sonstiges',titleLabel:'Titel',description:'Beschreibung',send:'Feedback senden',your:'Deine Beiträge',refresh:'Aktualisieren',loading:'Wird geladen…',empty:'Du hast noch kein Feedback gesendet.',sent:'Feedback gesendet.',reply:'Antwort schreiben…',replyBtn:'Antworten',staff:'Alle Beiträge',team:'Quello-Team',statuses:{new:'Neu',reviewing:'In Prüfung',planned:'Geplant',in_progress:'In Arbeit',completed:'Abgeschlossen',declined:'Abgelehnt'}},
    fr:{title:'Centre de commentaires',intro:'Propose une idée, signale un problème ou pose une question. Suis son statut et échange avec l’équipe Quello.',submit:'Envoyer un retour',category:'Catégorie',idea:'Idée de fonctionnalité',bug:'Signalement de bug',question:'Question',other:'Autre',titleLabel:'Titre',description:'Description',send:'Envoyer',your:'Vos demandes',refresh:'Actualiser',loading:'Chargement…',empty:'Vous n’avez pas encore envoyé de retour.',sent:'Retour envoyé.',reply:'Écrire une réponse…',replyBtn:'Répondre',staff:'Tous les retours',team:'Équipe Quello',statuses:{new:'Nouveau',reviewing:'En examen',planned:'Planifié',in_progress:'En cours',completed:'Terminé',declined:'Refusé'}},
    it:{title:'Centro feedback',intro:'Condividi un’idea, segnala un problema o fai una domanda. Segui gli aggiornamenti e discuti con il team Quello.',submit:'Invia feedback',category:'Categoria',idea:'Idea per una funzione',bug:'Segnalazione bug',question:'Domanda',other:'Altro',titleLabel:'Titolo',description:'Descrizione',send:'Invia feedback',your:'Le tue richieste',refresh:'Aggiorna',loading:'Caricamento…',empty:'Non hai ancora inviato feedback.',sent:'Feedback inviato.',reply:'Scrivi una risposta…',replyBtn:'Rispondi',staff:'Tutti i feedback',team:'Team Quello',statuses:{new:'Nuovo',reviewing:'In revisione',planned:'Pianificato',in_progress:'In corso',completed:'Completato',declined:'Rifiutato'}}
  };
  const tr = copy[lang] || copy.en;
  const labels = tr.statuses;
  [['fcTitle','title'],['fcIntro','intro'],['fcSubmitTitle','submit'],['fcCategory','category'],['fcTitleLabel','titleLabel'],['fcDescription','description'],['fcSend','send'],['fcYour','your'],['fcRefresh','refresh']].forEach(([id,key]) => { const el=document.getElementById(id); if(el) el.textContent=tr[key]; });
  const categorySelect=document.getElementById('category'); [...categorySelect.options].forEach(option => { option.textContent=tr[option.value] || tr.other; });
  document.getElementById('title').placeholder = ({en:'A short summary',ru:'Краткое описание',de:'Kurze Zusammenfassung',fr:'Un bref résumé',it:'Un breve riepilogo'})[lang] || 'A short summary';
  document.getElementById('body').placeholder = ({en:'Describe your idea or issue…',ru:'Опишите идею или проблему…',de:'Beschreibe deine Idee oder das Problem…',fr:'Décris ton idée ou le problème…',it:'Descrivi la tua idea o il problema…'})[lang] || 'Describe your idea or issue…';
  window.feedbackStaffView = false;
  async function load() {
    list.textContent = tr.loading;
    try {
      const data = await Q.api('/api/feedback' + (window.feedbackStaffView ? '?all=1' : ''));
      if (data.staff && !document.getElementById('staffView')) { const toggle = document.createElement('button'); toggle.id = 'staffView'; toggle.className = 'button'; toggle.type = 'button'; toggle.textContent = tr.staff; toggle.addEventListener('click', () => { window.feedbackStaffView = !window.feedbackStaffView; load(); }); document.querySelector('.feedback-heading').append(toggle); }
      if (!data.items.length) { list.innerHTML = `<p class="feedback-empty">${tr.empty}</p>`; return; }
      list.innerHTML = data.items.map(item => `<article class="feedback-item" data-id="${item.id}"><div class="feedback-meta"><span>#${item.id}</span><span>${esc(item.category)}</span><span class="feedback-status">${esc(labels[item.status] || item.status)}</span><span>${esc(item.created_at)}</span></div><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p><div class="feedback-replies">${(item.messages || []).map(m => `<div class="feedback-reply"><small>${esc(m.user_name)}${m.is_staff ? ' · ' + tr.team : ''}</small><div>${esc(m.body)}</div></div>`).join('')}</div>${data.staff ? `<label>Status <select data-status="${item.id}">${Object.entries(labels).map(([value,label]) => `<option value="${value}" ${value===item.status?'selected':''}>${label}</option>`).join('')}</select></label>` : ''}<form class="feedback-reply-form" data-reply="${item.id}"><input name="reply" maxlength="2000" required placeholder="${tr.reply}"><button class="button" type="submit">${tr.replyBtn}</button></form></article>`).join('');
    } catch (error) { list.textContent = error.message || tr.empty; }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault(); const button = form.querySelector('button[type=submit]'); button.disabled = true; status.textContent = tr.loading;
    try { await Q.api('/api/feedback', {method:'POST',body:JSON.stringify({action:'create',category:document.getElementById('category').value,title:document.getElementById('title').value,body:document.getElementById('body').value})}); form.reset(); status.textContent = tr.sent; await load(); }
    catch (error) { status.textContent = error.message || 'Could not submit feedback.'; }
    finally { button.disabled = false; }
  });
  list.addEventListener('change', async event => { const select = event.target.closest('[data-status]'); if (!select) return; select.disabled = true; try { await Q.api('/api/feedback', {method:'POST',body:JSON.stringify({action:'status',id:Number(select.dataset.status),status:select.value})}); await load(); } catch (error) { window.alert(error.message || 'Could not update status.'); } finally { select.disabled = false; } });
  list.addEventListener('submit', async event => { const replyForm = event.target.closest('[data-reply]'); if (!replyForm) return; event.preventDefault(); const input = replyForm.elements.reply; const button = replyForm.querySelector('button'); button.disabled = true;
    try { await Q.api('/api/feedback', {method:'POST',body:JSON.stringify({action:'reply',id:Number(replyForm.dataset.reply),body:input.value})}); await load(); }
    catch (error) { window.alert(error.message || 'Could not send reply.'); }
    finally { button.disabled = false; }
  });
  document.getElementById('refreshFeedback').addEventListener('click', load);
  if (!Q.getToken()) { location.href = 'login.html?next=feedback.html'; return; }
  load();
})();
