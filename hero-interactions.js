(() => {
  'use strict';
  const card = document.querySelector('.qotd-floating-card');
  const body = document.querySelector('.qotd-card-body');
  const question = document.getElementById('heroQotdQuestion');
  const prompt = document.getElementById('heroQotdPrompt');
  const number = document.getElementById('heroQotdNumber');
  const next = document.getElementById('heroNextQuestion');
  const visual = document.querySelector('.hero-visual');
  if (!card || !body || !question || !prompt || !number || !next) return;

  const examplesByLanguage = {
    en: [
      { question: "What's a game you could play forever?", prompt: 'Share your answer with the community.' },
      { question: 'What small thing instantly makes your day better?', prompt: 'Everyone has a different answer.' },
      { question: 'Which fictional world would you visit for a day?', prompt: 'Tell the community what makes it special.' },
      { question: 'What skill would you love to master?', prompt: 'Drop your answer and compare ideas.' }
    ],
    ru: [
      { question: 'В какую игру ты мог бы играть бесконечно?', prompt: 'Поделись ответом с сообществом.' },
      { question: 'Какая мелочь моментально поднимает тебе настроение?', prompt: 'У каждого свой ответ.' },
      { question: 'В какой вымышленный мир ты отправился бы на день?', prompt: 'Расскажи, чем он тебя привлекает.' },
      { question: 'Какой навык ты хотел бы освоить?', prompt: 'Напиши ответ и сравни идеи с другими.' }
    ],
    de: [
      { question: 'Welches Spiel könntest du für immer spielen?', prompt: 'Teile deine Antwort mit der Community.' },
      { question: 'Welche Kleinigkeit macht deinen Tag sofort besser?', prompt: 'Jeder hat eine andere Antwort.' },
      { question: 'Welche fiktive Welt würdest du einen Tag lang besuchen?', prompt: 'Erzähl der Community, was sie besonders macht.' },
      { question: 'Welche Fähigkeit würdest du gern meistern?', prompt: 'Teile deine Antwort und vergleiche Ideen.' }
    ],
    fr: [
      { question: 'À quel jeu pourrais-tu jouer indéfiniment ?', prompt: 'Partage ta réponse avec la communauté.' },
      { question: 'Quelle petite chose améliore instantanément ta journée ?', prompt: 'Chacun a une réponse différente.' },
      { question: 'Quel univers fictif visiterais-tu pendant une journée ?', prompt: 'Explique à la communauté ce qui le rend spécial.' },
      { question: 'Quelle compétence aimerais-tu maîtriser ?', prompt: 'Partage ta réponse et compare les idées.' }
    ],
    it: [
      { question: 'A quale gioco potresti giocare per sempre?', prompt: 'Condividi la tua risposta con la community.' },
      { question: 'Quale piccola cosa migliora subito la tua giornata?', prompt: 'Ognuno ha una risposta diversa.' },
      { question: 'Quale mondo immaginario visiteresti per un giorno?', prompt: 'Racconta alla community cosa lo rende speciale.' },
      { question: 'Quale abilità ti piacerebbe padroneggiare?', prompt: 'Condividi la risposta e confronta le idee.' }
    ]
  };
  let examples = examplesByLanguage[document.documentElement.lang] || examplesByLanguage.en;
  let current = 0;
  let swapTimeout;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function showNextQuestion() {
    current = (current + 1) % examples.length;
    body.classList.add('is-changing');
    card.classList.add('is-changing');
    window.clearTimeout(swapTimeout);
    swapTimeout = window.setTimeout(() => {
      question.textContent = examples[current].question;
      prompt.textContent = examples[current].prompt;
      number.textContent = '#' + String(current + 1).padStart(2, '0');
      body.classList.remove('is-changing');
      card.classList.remove('is-changing');
    }, reduceMotion.matches ? 0 : 170);
  }
  window.addEventListener('quello:languagechange', (event) => {
    const lang = event.detail && event.detail.language;
    examples = examplesByLanguage[lang] || examplesByLanguage.en;
    question.textContent = examples[current].question;
    prompt.textContent = examples[current].prompt;
    number.textContent = '#' + String(current + 1).padStart(2, '0');
  });
  next.addEventListener('click', showNextQuestion);

  // Gentle pointer parallax on devices that have a precise pointer; no motion on touch/reduced-motion.
  if (visual && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion.matches) {
    let frame = 0;
    visual.addEventListener('pointermove', (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const orbitOne = visual.querySelector('.hero-orbit-one');
        const orbitTwo = visual.querySelector('.hero-orbit-two');
        if (orbitOne) orbitOne.style.translate = `${x * 8}px ${y * 7}px`;
        if (orbitTwo) orbitTwo.style.translate = `${x * -6}px ${y * -5}px`;
      });
    });
    visual.addEventListener('pointerleave', () => {
      const orbitOne = visual.querySelector('.hero-orbit-one');
      const orbitTwo = visual.querySelector('.hero-orbit-two');
      if (orbitOne) orbitOne.style.translate = '';
      if (orbitTwo) orbitTwo.style.translate = '';
    });
  }
})();
