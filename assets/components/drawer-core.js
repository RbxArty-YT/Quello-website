/* Copyright (c) 2026 Quello. All rights reserved.
 * Shared accessible drawer primitive for the standalone UI samples.
 */
(function () {
  'use strict';

  function createDrawer(options) {
    const edge = options.edge === 'right' ? 'right' : 'bottom';
    const overlay = document.createElement('div');
    overlay.className = 'q-sample-drawer-overlay q-sample-drawer-' + edge;
    overlay.hidden = true;
    overlay.innerHTML = `
      <section class="q-sample-drawer-panel" role="dialog" aria-modal="true">
        <header class="q-sample-drawer-head">
          <div class="q-sample-drawer-heading">
            <span class="q-sample-drawer-eyebrow">QUELLO COMPONENT</span>
            <h2 class="q-sample-drawer-title"></h2>
          </div>
          <button class="q-sample-drawer-close" type="button" aria-label="Close">×</button>
        </header>
        <div class="q-sample-drawer-content"></div>
      </section>`;
    const panel = overlay.querySelector('.q-sample-drawer-panel');
    const title = overlay.querySelector('.q-sample-drawer-title');
    const content = overlay.querySelector('.q-sample-drawer-content');
    const closeButton = overlay.querySelector('.q-sample-drawer-close');
    let previousFocus = null;

    function close() {
      if (overlay.hidden) return;
      overlay.classList.remove('is-open');
      document.body.classList.remove('q-sample-drawer-active');
      window.setTimeout(() => { overlay.hidden = true; }, 240);
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus && previousFocus.isConnected) previousFocus.focus();
      if (typeof options.onClose === 'function') options.onClose();
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(panel.querySelectorAll(
        'button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])'
      )).filter(node => node.offsetParent !== null);
      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }

    closeButton.addEventListener('click', close);
    overlay.addEventListener('click', event => {
      if (event.target === overlay) close();
    });
    document.body.append(overlay);

    return {
      open(config = {}) {
        previousFocus = document.activeElement;
        title.textContent = config.title || options.title || 'Quello';
        closeButton.setAttribute('aria-label', config.closeLabel || 'Close');
        panel.setAttribute('aria-label', config.title || options.title || 'Quello drawer');
        content.replaceChildren();
        if (config.content instanceof Node) content.append(config.content);
        else if (typeof config.content === 'string') content.textContent = config.content;
        overlay.hidden = false;
        document.body.classList.add('q-sample-drawer-active');
        requestAnimationFrame(() => {
          overlay.classList.add('is-open');
          const first = panel.querySelector('button:not(:disabled),a[href],input:not(:disabled)');
          (first || closeButton).focus();
        });
        document.addEventListener('keydown', onKeyDown);
      },
      close,
      destroy() {
        close();
        overlay.remove();
      },
      element: overlay
    };
  }

  window.QuelloDrawerCore = { create: createDrawer };
})();
