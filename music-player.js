/* Quello About Creator — mini music player. Playback starts only after a click/tap. */
(function () {
  'use strict';
  const root = document.getElementById('aboutMusic');
  if (!root) return;

  // Order: Автоспорт, Rebzyyx, iGottic, Mekbok, Oh Dam, Toby Fox, then the rest in their original order.
  // `file` is relative to music/, `cover` to music/covers/, `dur` is seconds (shown until metadata loads).
  const TRACKS = [
    { file: 'Автоспорт - Я не буду спать.mp3', cover: 'avtosport-ya-ne-budu-spat', title: 'Я не буду спать', artist: 'Автоспорт', dur: 198 },
    { file: 'Автоспорт - Пожалуйста, Только Не Домой.mp3', cover: 'avtosport-pozhaluysta-tolko-ne-domoy', title: 'Пожалуйста, Только Не Домой', artist: 'Автоспорт', dur: 185 },
    { file: 'Rebzyyx feat. hoshie star - all I want is you (1).mp3', cover: 'rebzyyx-all-i-want-is-you', title: 'all I want is you', artist: 'Rebzyyx feat. hoshie star', dur: 151 },
    { file: 'iGottic - Evil Barzil.mp3', cover: 'igottic-evil-barzil', title: 'Evil Barzil', artist: 'iGottic', dur: 116 },
    { file: 'iGottic - Final Showdown.mp3', cover: 'igottic-final-showdown', title: 'Final Showdown', artist: 'iGottic', dur: 122 },
    { file: 'iGottic - Heating Things Up.mp3', cover: 'igottic-heating-things-up', title: 'Heating Things Up', artist: 'iGottic', dur: 100 },
    { file: 'Terminal Velocity - Mekbok.mp3', cover: 'mekbok-terminal-velocity', title: 'Terminal Velocity', artist: 'Mekbok', dur: 157 },
    { file: 'Watch This - Mekbok.mp3', cover: 'mekbok-watch-this', title: 'Watch This', artist: 'Mekbok', dur: 125 },
    { file: 'Eleventh Hour (Remix) - Mekbok.mp3', cover: 'mekbok-eleventh-hour-remix', title: 'Eleventh Hour (Remix)', artist: 'Mekbok', dur: 123 },
    { file: 'Oh Dam - LSplash.mp3', cover: 'lsplash-oh-dam', title: 'Oh Dam', artist: 'LSplash', dur: 186 },
    { file: 'tobyfox - SAVE the World.mp3', cover: 'toby-fox-save-the-world', title: 'SAVE the World', artist: 'Toby Fox', dur: 113 },
    { file: 'undertale_098. Battle Against a True Hero.mp3', cover: 'toby-fox-battle-against-a-true-hero', title: 'Battle Against a True Hero', artist: 'Toby Fox', dur: 157 },
    { file: 'Dutch Melrose - Runrunrun.mp3', cover: 'dutch-melrose-runrunrun', title: 'Runrunrun', artist: 'Dutch Melrose', dur: 141 },
    { file: 'Lady Gaga - Americano.mp3', cover: 'lady-gaga-americano', title: 'Americano', artist: 'Lady Gaga', dur: 247 },
    { file: 'The Living Tombstone - Fight Til I m Good Enough (feat Allanah Fitzgerald Elsie Lovelock MichaelK).mp3', cover: 'living-tombstone-fight-til-im-good-enough', title: 'Fight Til I’m Good Enough', artist: 'The Living Tombstone feat. Allanah Fitzgerald, Elsie Lovelock & MichaelK', dur: 210 },
    { file: 'MaxNRG - Arkan.mp3', cover: 'maxnrg-arkan', title: 'Arkan', artist: 'MaxNRG', dur: 320 },
    { file: 'Lindsey Stirling - Roundtable Rival.mp3', cover: 'lindsey-stirling-roundtable-rival', title: 'Roundtable Rival', artist: 'Lindsey Stirling', dur: 204 }
  ];

  const I18N = {
    en: { eyebrow: 'MUSIC', title: 'What I listen to', intro: 'A small playlist of tracks I like. Press play to start — nothing plays automatically.', prev: 'Previous track', next: 'Next track', play: 'Play', pause: 'Pause', seek: 'Track progress', list: 'Tracklist', hide: 'Hide tracklist', error: 'This track could not be loaded.', player: 'Music player' },
    ru: { eyebrow: 'МУЗЫКА', title: 'Что я слушаю', intro: 'Небольшой плейлист из треков, которые мне нравятся. Нажмите Play, чтобы начать — автоматически ничего не воспроизводится.', prev: 'Предыдущий трек', next: 'Следующий трек', play: 'Воспроизвести', pause: 'Пауза', seek: 'Прогресс трека', list: 'Список треков', hide: 'Скрыть список треков', error: 'Не удалось загрузить этот трек.', player: 'Музыкальный плеер' },
    de: { eyebrow: 'MUSIK', title: 'Was ich höre', intro: 'Eine kleine Playlist mit Titeln, die ich mag. Zum Starten auf Play drücken – es startet nichts automatisch.', prev: 'Vorheriger Titel', next: 'Nächster Titel', play: 'Wiedergabe', pause: 'Pause', seek: 'Titelfortschritt', list: 'Titelliste', hide: 'Titelliste ausblenden', error: 'Dieser Titel konnte nicht geladen werden.', player: 'Musikplayer' },
    fr: { eyebrow: 'MUSIQUE', title: 'Ce que j’écoute', intro: 'Une petite playlist de morceaux que j’aime. Appuyez sur lecture pour démarrer — rien ne se lance automatiquement.', prev: 'Morceau précédent', next: 'Morceau suivant', play: 'Lecture', pause: 'Pause', seek: 'Progression du morceau', list: 'Liste des morceaux', hide: 'Masquer la liste des morceaux', error: 'Impossible de charger ce morceau.', player: 'Lecteur de musique' },
    it: { eyebrow: 'MUSICA', title: 'Cosa ascolto', intro: 'Una piccola playlist di brani che mi piacciono. Premi play per iniziare: nulla parte automaticamente.', prev: 'Brano precedente', next: 'Brano successivo', play: 'Riproduci', pause: 'Pausa', seek: 'Avanzamento del brano', list: 'Elenco dei brani', hide: 'Nascondi l’elenco dei brani', error: 'Impossibile caricare questo brano.', player: 'Lettore musicale' }
  };

  const $ = id => document.getElementById(id);
  const audio = $('mpAudio'), coverBox = $('mpCover'), coverImg = coverBox.querySelector('img');
  const titleEl = $('mpTitle'), artistEl = $('mpArtist'), curEl = $('mpCur'), durEl = $('mpDur');
  const seek = $('mpSeek'), prevBtn = $('mpPrev'), nextBtn = $('mpNext'), playBtn = $('mpPlay');
  const listBtn = $('mpListToggle'), listEl = $('mpList'), countEl = $('mpCount'), errEl = $('mpError');

  let index = 0, loadedIndex = -1, pendingSeek = null, scrubbing = false, failed = false;

  const lang = () => { const l = (document.documentElement.lang || 'en').slice(0, 2); return I18N[l] ? l : 'en'; };
  const t = k => I18N[lang()][k];
  const fmt = s => { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const srcOf = tr => 'music/' + encodeURIComponent(tr.file);
  const coverOf = tr => 'music/covers/' + tr.cover + '.webp';
  const duration = () => (isFinite(audio.duration) && audio.duration > 0) ? audio.duration : TRACKS[index].dur;

  function applyLanguage() {
    root.querySelectorAll('[data-mp-i18n]').forEach(n => { n.textContent = t(n.dataset.mpI18n); });
    root.setAttribute('aria-label', t('player'));
    prevBtn.setAttribute('aria-label', t('prev'));
    nextBtn.setAttribute('aria-label', t('next'));
    seek.setAttribute('aria-label', t('seek'));
    renderPlayState();
    renderListState();
    if (failed) errEl.textContent = t('error');
  }

  function renderPlayState() {
    const playing = !audio.paused && !audio.ended;
    root.classList.toggle('is-playing', playing);
    playBtn.setAttribute('aria-label', playing ? t('pause') : t('play'));
    playBtn.setAttribute('aria-pressed', String(playing));
    playBtn.title = playing ? t('pause') : t('play');
    listEl.querySelectorAll('li').forEach((li, i) => li.classList.toggle('is-playing', playing && i === index));
  }

  function renderListState() {
    const open = !listEl.hidden;
    listBtn.setAttribute('aria-expanded', String(open));
    listBtn.setAttribute('aria-label', open ? t('hide') : t('list'));
    listBtn.title = open ? t('hide') : t('list');
  }

  function renderProgress() {
    const d = duration(), c = scrubbing ? (seek.value / 1000) * d : audio.currentTime;
    const p = d ? Math.min(100, (c / d) * 100) : 0;
    if (!scrubbing) seek.value = String(Math.round(p * 10));
    seek.style.setProperty('--p', p + '%');
    seek.setAttribute('aria-valuetext', fmt(c) + ' / ' + fmt(d));
    curEl.textContent = fmt(c);
    durEl.textContent = fmt(d);
  }

  function renderTrack() {
    const tr = TRACKS[index];
    titleEl.textContent = tr.title;
    artistEl.textContent = tr.artist;
    countEl.textContent = (index + 1) + ' / ' + TRACKS.length;
    coverBox.classList.remove('has-image');
    coverImg.onload = () => coverBox.classList.add('has-image');
    coverImg.onerror = () => coverBox.classList.remove('has-image');
    coverImg.src = coverOf(tr);
    listEl.querySelectorAll('li').forEach((li, i) => {
      li.classList.toggle('is-current', i === index);
      if (i === index) li.setAttribute('aria-current', 'true'); else li.removeAttribute('aria-current');
    });
    failed = false; errEl.textContent = '';
    renderProgress();
    renderPlayState();
    if ('mediaSession' in navigator && window.MediaMetadata) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: tr.title, artist: tr.artist, album: 'Quello',
        artwork: [{ src: new URL(coverOf(tr), location.href).href, sizes: '512x512', type: 'image/webp' }]
      });
    }
  }

  // The source is attached lazily, so the page downloads no audio until the visitor asks for it.
  function ensureSource() {
    if (loadedIndex === index) return;
    audio.src = srcOf(TRACKS[index]);
    loadedIndex = index;
    pendingSeek = null;
  }

  function select(i, autoplay) {
    index = (i + TRACKS.length) % TRACKS.length;
    audio.pause();
    loadedIndex = -1;
    audio.removeAttribute('src');
    audio.load();
    renderTrack();
    if (autoplay) play();
  }

  function play() {
    ensureSource();
    const p = audio.play();
    if (p && p.catch) p.catch(() => { renderPlayState(); });
  }

  function togglePlay() {
    if (audio.paused || audio.ended) play(); else audio.pause();
  }

  function step(dir) {
    const wasPlaying = !audio.paused && !audio.ended;
    if (dir < 0 && audio.currentTime > 3) { audio.currentTime = 0; return; }
    select(index + dir, wasPlaying);   // a paused player stays paused
  }

  // Playlist
  TRACKS.forEach((tr, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mp-item';
    const img = document.createElement('img');
    img.src = coverOf(tr); img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.width = 40; img.height = 40;
    const txt = document.createElement('span'); txt.className = 'mp-item-text';
    const n = document.createElement('strong'); n.textContent = tr.title;
    const a = document.createElement('small'); a.textContent = tr.artist;
    txt.append(n, a);
    const d = document.createElement('span'); d.className = 'mp-item-dur'; d.textContent = fmt(tr.dur);
    b.append(img, txt, d);
    b.addEventListener('click', () => { if (i === index && !audio.paused) { audio.pause(); } else if (i === index) { play(); } else { select(i, true); } });
    li.appendChild(b); listEl.appendChild(li);
  });

  // Controls
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  listBtn.addEventListener('click', () => { listEl.hidden = !listEl.hidden; renderListState(); });

  seek.addEventListener('pointerdown', () => { scrubbing = true; });
  seek.addEventListener('input', () => {
    scrubbing = true;
    renderProgress();
  });
  seek.addEventListener('change', () => {
    const target = (seek.value / 1000) * duration();
    scrubbing = false;
    if (loadedIndex !== index) { ensureSource(); }
    if (audio.readyState < 1) { pendingSeek = target; audio.load(); } else { audio.currentTime = target; }
    renderProgress();
  });
  ['pointerup', 'pointercancel', 'blur'].forEach(ev => seek.addEventListener(ev, () => { scrubbing = false; }));

  // Audio events
  audio.addEventListener('loadedmetadata', () => {
    if (pendingSeek != null) { audio.currentTime = Math.min(pendingSeek, audio.duration || pendingSeek); pendingSeek = null; }
    renderProgress();
  });
  audio.addEventListener('timeupdate', renderProgress);
  audio.addEventListener('durationchange', renderProgress);
  audio.addEventListener('play', () => { errEl.textContent = ''; failed = false; renderPlayState(); if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing'; });
  audio.addEventListener('pause', () => { renderPlayState(); if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused'; });
  audio.addEventListener('ended', () => { select(index + 1, true); });   // continues only after the visitor started playback
  audio.addEventListener('error', () => {
    if (!audio.getAttribute('src')) return;
    failed = true; errEl.textContent = t('error'); renderPlayState();
  });

  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', () => audio.pause());
      navigator.mediaSession.setActionHandler('previoustrack', () => step(-1));
      navigator.mediaSession.setActionHandler('nexttrack', () => step(1));
    } catch (_) { /* some browsers do not support every action */ }
  }

  new MutationObserver(applyLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  audio.preload = 'none';
  audio.autoplay = false;
  renderTrack();
  applyLanguage();
})();
