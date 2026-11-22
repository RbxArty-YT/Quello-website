/* Copyright (c) 2026 Quello. All rights reserved. */
(() => {
  'use strict';
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll(
    '.hero-feature, .quick-start, .discord-embed, .playground-card, .community-spotlight, .changelog-card, ' +
    '.command-embed, .faq details, .timeline article, .extra-card, .setup-step, .permission-line, ' +
    '.troubleshoot-embed details, .command-detail-list details, .evolution-card, .evolution-step-list li'
  );

  // If motion is disabled or IntersectionObserver is unavailable, leave content visible.
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;

  // Start a card's reveal only once a meaningful part of it is on screen (a quarter of its height, at most
  // 160px), so tall cards at the bottom of a page fade in where the reader can see it instead of while
  // only a thin sliver touches the bottom edge of the screen.
  const THRESHOLDS = [0, .02, .04, .06, .08, .1, .15, .2, .25, .3, .4, .5, .75, 1];
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const needed = Math.min(entry.boundingClientRect.height * 0.25, 160);
      if (entry.intersectionRect.height < needed) return;
      const element = entry.target;
      // Apply the visible state on a later frame so the browser paints the hidden
      // starting state first; otherwise the transition can be skipped entirely.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        element.classList.add('q-motion-in');
        element.classList.add('q-in');
      }));
      activeObserver.unobserve(element);
    });
  }, { threshold: THRESHOLDS, rootMargin: '0px 0px -6% 0px' });

  targets.forEach((element, index) => {
    element.classList.remove('q-reveal', 'q-in');
    element.classList.add('q-motion-reveal');
    element.style.transitionDelay = `${(index % 4) * 115}ms`;
    element.style.setProperty('--q-reveal-order', String(index % 4)); 
    observer.observe(element);
  });

  motionPreference.addEventListener?.('change', event => {
    if (!event.matches) return;
    targets.forEach(element => {
      element.classList.remove('q-motion-reveal');
      element.classList.add('q-motion-in', 'q-in');
      element.style.transitionDelay = '';
    });
    observer.disconnect();
  });
})();
