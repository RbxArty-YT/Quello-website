(() => {
  'use strict';
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll(
    '.hero-feature, .quick-start, .discord-embed, .playground-card, .community-spotlight, .changelog-card, ' +
    '.command-embed, .faq details, .timeline article, .extra-card, .setup-step, .permission-line, ' +
    '.troubleshoot-embed details, .command-detail-list details'
  );

  // If motion is disabled or IntersectionObserver is unavailable, leave content visible.
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      // Apply the visible state on a later frame so the browser paints the hidden
      // starting state first; otherwise the transition can be skipped entirely.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        element.classList.add('q-motion-in');
        element.classList.add('q-in');
      }));
      activeObserver.unobserve(element);
    });
  }, { threshold: 0.04, rootMargin: '0px 0px -5% 0px' });

  targets.forEach((element, index) => {
    element.classList.remove('q-reveal', 'q-in');
    element.classList.add('q-motion-reveal');
    element.style.transitionDelay = `${(index % 4) * 130}ms`; 
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
