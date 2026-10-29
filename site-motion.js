(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.hero-feature, .hero-embed, .quick-start, .discord-embed, .extra-card, .command-embed, .faq details, .setup-step, .permission-line, .timeline article');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('q-motion-in');
      observer.unobserve(entry.target);
    });
  }, { threshold:0.08, rootMargin:'0px 0px -30px 0px' });
  targets.forEach((el, index) => {
    el.classList.add('q-motion-reveal');
    el.style.transitionDelay = `${(index % 4) * 55}ms`;
    observer.observe(el);
  });
})();
