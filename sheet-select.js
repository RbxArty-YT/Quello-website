/* Dashboard: turns every <select class="select"> into a styled bottom sheet
   (same look as the Command Playground picker). The native <select> stays in
   the DOM, hidden, so dashboard.js keeps reading .value and 'change' events. */
(function () {
  'use strict';

  var drawer, panel, titleEl, optionsEl, active = null, lastFocus = null, prevOverflow = '';

  function build() {
    if (drawer) return;
    drawer = document.createElement('div');
    drawer.className = 'command-drawer sheet-drawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML =
      '<div class="command-drawer-backdrop" data-sheet-close></div>' +
      '<aside class="command-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">' +
        '<div class="command-drawer-head"><div>' +
          '<span class="eyebrow">QUELLO</span><h3 id="sheetTitle"></h3></div>' +
          '<button class="command-drawer-close" type="button" data-sheet-close aria-label="Close">×</button>' +
        '</div>' +
        '<div class="command-options" role="listbox"></div>' +
      '</aside>';
    document.body.appendChild(drawer);
    panel = drawer.querySelector('.command-drawer-panel');
    titleEl = drawer.querySelector('#sheetTitle');
    optionsEl = drawer.querySelector('.command-options');
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-sheet-close]')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!active) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Tab') {
        var f = panel.querySelectorAll('button:not(:disabled)');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function labelText(select) {
    var node = select.id && document.querySelector('label[for="' + select.id + '"]');
    return (node && node.textContent.trim()) || select.getAttribute('aria-label') || '';
  }

  function selectedText(select) {
    var opt = select.options[select.selectedIndex];
    return opt ? opt.textContent.trim() : '';
  }

  function refresh(select) {
    var btn = select._sheetTrigger;
    if (!btn) return;
    var text = selectedText(select);
    var span = btn.firstChild;
    span.textContent = text || '—';
    span.classList.toggle('is-placeholder', !select.value);
    btn.disabled = select.disabled;
  }

  function open(select) {
    build();
    active = select;
    lastFocus = document.activeElement;
    titleEl.textContent = labelText(select);
    optionsEl.replaceChildren();

    function addOption(opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'command-option' + (opt.value === select.value ? ' active' : '');
      b.setAttribute('role', 'option');
      b.setAttribute('aria-selected', String(opt.value === select.value));
      b.disabled = opt.disabled;
      b.innerHTML = '<span class="command-option-main"><span class="sheet-option-label"></span></span>' +
                    '<span class="command-option-radio" aria-hidden="true"></span>';
      b.querySelector('.sheet-option-label').textContent = opt.textContent.trim();
      b.addEventListener('click', function () {
        var changed = select.value !== opt.value;
        select.value = opt.value;
        close();
        refresh(select);
        if (changed) select.dispatchEvent(new Event('change', { bubbles: true }));
      });
      optionsEl.appendChild(b);
    }
    Array.prototype.forEach.call(select.children, function (child) {
      if (child.tagName === 'OPTGROUP') {
        var g = document.createElement('div');
        g.className = 'sheet-group';
        g.textContent = child.label;
        optionsEl.appendChild(g);
        Array.prototype.forEach.call(child.children, addOption);
      } else if (child.tagName === 'OPTION') addOption(child);
    });

    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    select._sheetTrigger.setAttribute('aria-expanded', 'true');
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      var cur = optionsEl.querySelector('.command-option.active') || optionsEl.querySelector('.command-option');
      if (cur) { cur.focus({ preventScroll: true }); cur.scrollIntoView({ block: 'center' }); }
    });
  }

  function close() {
    if (!active) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    active._sheetTrigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = prevOverflow;
    var back = active._sheetTrigger;
    active = null;
    if (back && document.contains(back)) back.focus({ preventScroll: true });
  }

  function enhance(select) {
    if (select._sheetTrigger) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'select sheet-trigger';
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-expanded', 'false');
    var lbl = select.id && document.querySelector('label[for="' + select.id + '"]');
    if (lbl) { if (!lbl.id) lbl.id = select.id + '_label'; btn.setAttribute('aria-labelledby', lbl.id); }
    btn.appendChild(Object.assign(document.createElement('span'), { className: 'sheet-trigger-label' }));
    select._sheetTrigger = btn;
    select.classList.add('sheet-native');
    select.setAttribute('aria-hidden', 'true');
    select.tabIndex = -1;
    select.parentNode.insertBefore(btn, select);
    btn.addEventListener('click', function () { open(select); });
    select.addEventListener('change', function () { refresh(select); });
    new MutationObserver(function () { refresh(select); })
      .observe(select, { attributes: true, attributeFilter: ['disabled'] });
    refresh(select);
  }

  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches && root.matches('select.select')) enhance(root);
    var list = root.querySelectorAll ? root.querySelectorAll('select.select') : [];
    Array.prototype.forEach.call(list, enhance);
  }

  function start() {
    scan(document.body);
    new MutationObserver(function (records) {
      records.forEach(function (r) { Array.prototype.forEach.call(r.addedNodes, scan); });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
