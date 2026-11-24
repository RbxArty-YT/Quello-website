/* Copyright (c) 2026 Quello. All rights reserved. */
(function(){
  'use strict';
  const copy={
    en:{eyebrow:'COMMUNITY RANKINGS',title:'Global Leaderboard',intro:'See the most active QOTD creators and participants across all Quello servers.',updated:'Updated {time}',loading:'Loading…',refresh:'↻ Refresh',creators:'Question creators',creatorsSub:'Most published QOTDs',responders:'QOTD responders',respondersSub:'Most answered QOTDs',streaks:'Current streak',streaksSub:'Consecutive active days',scope:'Global statistics across all Quello servers',back:'← Back to Quello',questions:'questions',answers:'answers',days:'days',empty:'No entries yet.',error:'Could not load global statistics. Please try again.',unknown:'Discord user'},
    ru:{eyebrow:'РЕЙТИНГ СООБЩЕСТВА',title:'Глобальная таблица лидеров',intro:'Самые активные авторы вопросов и участники QOTD на всех серверах Quello.',updated:'Обновлено: {time}',loading:'Загрузка…',refresh:'↻ Обновить',creators:'Авторы вопросов',creatorsSub:'Больше всего опубликованных QOTD',responders:'Участники QOTD',respondersSub:'Больше всего ответов',streaks:'Текущий Streak',streaksSub:'Последовательные дни активности',scope:'Общая статистика всех серверов Quello',back:'← На главную Quello',questions:'вопросов',answers:'ответов',days:'дн.',empty:'Пока нет результатов.',error:'Не удалось загрузить статистику. Попробуйте ещё раз.',unknown:'Пользователь Discord'},
    de:{eyebrow:'COMMUNITY-RANGLISTEN',title:'Globale Bestenliste',intro:'Die aktivsten QOTD-Fragenautoren und Teilnehmer auf allen Quello-Servern.',updated:'Aktualisiert: {time}',loading:'Wird geladen…',refresh:'↻ Aktualisieren',creators:'Fragenautoren',creatorsSub:'Meiste veröffentlichte QOTDs',responders:'QOTD-Teilnehmer',respondersSub:'Meiste Antworten',streaks:'Aktuelle Serie',streaksSub:'Aufeinanderfolgende aktive Tage',scope:'Globale Statistiken aller Quello-Server',back:'← Zurück zu Quello',questions:'Fragen',answers:'Antworten',days:'Tage',empty:'Noch keine Einträge.',error:'Statistiken konnten nicht geladen werden. Bitte erneut versuchen.',unknown:'Discord-Nutzer'},
    fr:{eyebrow:'CLASSEMENTS DE LA COMMUNAUTÉ',title:'Classement mondial',intro:'Les auteurs de QOTD et participants les plus actifs sur tous les serveurs Quello.',updated:'Mis à jour : {time}',loading:'Chargement…',refresh:'↻ Actualiser',creators:'Auteurs de questions',creatorsSub:'Plus grand nombre de QOTD publiés',responders:'Participants aux QOTD',respondersSub:'Plus grand nombre de réponses',streaks:'Série actuelle',streaksSub:'Jours d’activité consécutifs',scope:'Statistiques globales de tous les serveurs Quello',back:'← Retour à Quello',questions:'questions',answers:'réponses',days:'jours',empty:'Aucun résultat pour le moment.',error:'Impossible de charger les statistiques. Réessaie.',unknown:'Utilisateur Discord'},
    it:{eyebrow:'CLASSIFICHE DELLA COMMUNITY',title:'Classifica globale',intro:'Gli autori di QOTD e i partecipanti più attivi su tutti i server Quello.',updated:'Aggiornato: {time}',loading:'Caricamento…',refresh:'↻ Aggiorna',creators:'Autori delle domande',creatorsSub:'Maggior numero di QOTD pubblicati',responders:'Partecipanti ai QOTD',respondersSub:'Maggior numero di risposte',streaks:'Serie attuale',streaksSub:'Giorni consecutivi di attività',scope:'Statistiche globali di tutti i server Quello',back:'← Torna a Quello',questions:'domande',answers:'risposte',days:'giorni',empty:'Ancora nessun risultato.',error:'Impossibile caricare le statistiche. Riprova.',unknown:'Utente Discord'}
  };
  const ids=['creatorsList','respondersList','streaksList'];
  let language='en';
  const $=id=>document.getElementById(id);
  function t(key){return copy[language][key]||copy.en[key]||key;}
  function applyLanguage(){
    $('boardEyebrow').textContent=t('eyebrow');$('boardTitle').textContent=t('title');$('boardIntro').textContent=t('intro');
    $('boardRefresh').textContent=t('refresh');$('creatorsTitle').textContent=t('creators');$('creatorsSubtitle').textContent=t('creatorsSub');
    $('respondersTitle').textContent=t('responders');$('respondersSubtitle').textContent=t('respondersSub');
    $('streaksTitle').textContent=t('streaks');$('streaksSubtitle').textContent=t('streaksSub');$('backHome').textContent=t('back');$('boardScope').textContent=t('scope');
    document.documentElement.lang=language;
    document.title=t('title')+' — Quello';
    document.querySelectorAll('.global-board-placeholder').forEach(el=>el.textContent=t('loading'));
  }
  function renderList(id,rows,unit){
    const list=$(id);list.replaceChildren();
    if(!rows||!rows.length){const li=document.createElement('li');li.className='global-board-placeholder';li.textContent=t('empty');list.append(li);return;}
    rows.forEach((row,index)=>{
      const li=document.createElement('li');
      li.className='global-board-user-row';
      if(row.banner && /^https:\/\/cdn\.discordapp\.com\/banners\//.test(row.banner)){
        li.style.backgroundImage='linear-gradient(90deg,rgba(12,14,22,.88),rgba(12,14,22,.72)),url("'+row.banner.replace(/[\"\\]/g,'')+'")';
        li.classList.add('has-profile-banner');
      }
      const rank=document.createElement('span');rank.className='global-board-rank'+(index<3?' top':'');rank.textContent=['🥇','🥈','🥉'][index]||String(index+1);
      const avatar=document.createElement('img');avatar.className='global-board-avatar';avatar.alt='';avatar.loading='lazy';
      if(row.avatar)avatar.src=row.avatar;else avatar.src='quello-mark.svg';
      const user=document.createElement('a');user.className='global-board-user';user.href='https://discord.com/users/'+encodeURIComponent(row.user_id);user.target='_blank';user.rel='noopener noreferrer';user.textContent=row.name||t('unknown');
      const value=document.createElement('span');value.className='global-board-value';value.textContent=Number(row.value||0).toLocaleString(language)+' '+unit;
      li.append(rank,avatar,user,value);list.append(li);
    });
  }
  async function load(){
    const button=$('boardRefresh');button.disabled=true;
    ids.forEach(id=>{const el=$(id);el.replaceChildren();const li=document.createElement('li');li.className='global-board-placeholder';li.textContent=t('loading');el.append(li);});
    try{
      const base=(window.QUELLO_CONFIG&&window.QUELLO_CONFIG.API_BASE)||'';
      if(!base)throw new Error('API not configured');
      const response=await fetch(base.replace(/\/$/,'')+'/public/global-leaderboard',{headers:{'Accept':'application/json'},cache:'no-store'});
      if(!response.ok)throw new Error('HTTP '+response.status);
      const data=await response.json();
      renderList('creatorsList',data.creators,t('questions'));renderList('respondersList',data.responders,t('answers'));renderList('streaksList',data.streaks,t('days'));
      const time=new Date(Number(data.updated_at)*1000).toLocaleString(language,{dateStyle:'medium',timeStyle:'short'});
      $('boardUpdated').textContent=t('updated').replace('{time}',time);
    }catch(error){
      console.error('Global leaderboard load failed:',error);
      ids.forEach(id=>{const el=$(id);el.replaceChildren();const li=document.createElement('li');li.className='global-board-placeholder';li.textContent=t('error');el.append(li);});
      $('boardUpdated').textContent=t('error');
    }finally{button.disabled=false;}
  }
  const saved=(()=>{try{return localStorage.getItem('quello-site-language-v2')||'en';}catch(e){return 'en';}})();
  language=copy[saved]?saved:'en';$('boardLanguage').value=language;applyLanguage();
  $('boardLanguage').addEventListener('change',event=>{language=copy[event.target.value]?event.target.value:'en';try{localStorage.setItem('quello-site-language-v2',language);}catch(e){}applyLanguage();load();});
  $('boardRefresh').addEventListener('click',load);
  load();
})();
