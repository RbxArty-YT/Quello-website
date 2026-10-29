(() => {
  'use strict';
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll('.hero-feature, .quick-start, .discord-embed, .playground-card, .community-spotlight, .changelog-card');
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('q-motion-in');
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  targets.forEach((element, index) => {
    if (element.classList.contains('q-reveal') || element.classList.contains('q-motion-reveal')) return;
    element.classList.add('q-motion-reveal');
    element.style.transitionDelay = `${(index % 3) * 45}ms`;
    observer.observe(element);
  });

  motionPreference.addEventListener?.('change', event => {
    if (!event.matches) return;
    targets.forEach(element => {
      element.classList.remove('q-motion-reveal');
      element.classList.add('q-motion-in');
      element.style.transitionDelay = '';
    });
    observer.disconnect();
  });
})();
