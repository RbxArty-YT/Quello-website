(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const tabs = document.querySelector('.site-tabs');
  const updateTabs = () => tabs?.classList.toggle('is-floating', window.scrollY > 90);
  updateTabs();
  window.addEventListener('scroll', updateTabs, { passive: true });
  if (reduced.matches || !finePointer.matches) return;

  // A restrained spotlight follows the pointer only inside selected glass surfaces.
  const surfaces = document.querySelectorAll(
    '.discord-embed, .hero-feature, .playground-card, .command-embed, .extra-card, ' +
    '.community-spotlight, .changelog-card, .setup-step, .builder-panel, .qotd-floating-card'
  );
  surfaces.forEach(surface => {
    surface.classList.add('q-spotlight-surface');
    surface.addEventListener('pointermove', event => {
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty('--q-spot-x', `${event.clientX - rect.left}px`);
      surface.style.setProperty('--q-spot-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
    surface.addEventListener('pointerleave', () => {
      surface.style.removeProperty('--q-spot-x');
      surface.style.removeProperty('--q-spot-y');
    }, { passive: true });
  });

  // Mark avatar assets as loading only until their real image has decoded.
  document.querySelectorAll('img.brand-avatar, img.hero-bot-avatar, img.qotd-mini-avatar, .fake-avatar img').forEach(img => {
    const finish = () => img.classList.remove('q-image-loading');
    if (img.complete && img.naturalWidth > 0) return;
    img.classList.add('q-image-loading');
    img.addEventListener('load', finish, { once: true });
    img.addEventListener('error', finish, { once: true });
  });
})();
