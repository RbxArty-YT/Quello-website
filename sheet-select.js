/* Copyright (c) 2026 Quello. All rights reserved. */
/* Shared Quello picker for every single-value <select> on every page.
   The native control remains in the DOM for existing page logic and form data. */
(function () {
  'use strict';
  var drawer, panel, titleEl, optionsEl, active = null, prevOverflow = '';
  var observed = new WeakSet();

  function build() {
    if (drawer) return;
    drawer = document.createElement('div');
    drawer.className = 'command-drawer sheet-drawer q-select-drawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML =
      '<div class="command-drawer-backdrop" data-sheet-close></div>' +
      '<aside class="command-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">' +
        '<div class="command-drawer-head"><div><span class="eyebrow">QUELLO</span><h3 id="sheetTitle"></h3></div>' +
        '<button class="command-drawer-close" type="button" data-sheet-close aria-label="Close">×</button></div>' +
        '<div class="command-options" role="listbox"></div>' +
      '</aside>';
    document.body.appendChild(drawer);
    panel = drawer.querySelector('.command-drawer-panel');
    titleEl = drawer.querySelector('#sheetTitle');
    optionsEl = drawer.querySelector('.command-options');
    drawer.addEventListener('click', function (e) { if (e.target.closest('[data-sheet-close]')) close(); });
    document.addEventListener('keydown', function (e) {
      if (!active) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        var focusables = panel.querySelectorAll('button:not(:disabled)');
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      if (/^(ArrowDown|ArrowUp|Home|End)$/.test(e.key) && e.target.closest('.command-option')) {
        var choices = Array.prototype.slice.call(optionsEl.querySelectorAll('.command-option:not(:disabled)'));
        if (!choices.length) return;
        var index = choices.indexOf(e.target.closest('.command-option'));
        if (e.key === 'Home') index = 0;
        else if (e.key === 'End') index = choices.length - 1;
        else index = (index + (e.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length;
        e.preventDefault(); choices[index].focus();
      }
    });
  }

  function labelText(select) {
    var node = select.id ? document.querySelector('label[for="' + select.id.replace(/(["\\])/g, '\\$1') + '"]') : null;
    return (node && node.textContent.trim()) || select.getAttribute('aria-label') || select.name || 'Choose an option';
  }
  function selectedText(select) {
    var opt = select.options[select.selectedIndex];
    return opt ? opt.textContent.trim() : '';
  }
  function refresh(select) {
    var btn = select._sheetTrigger;
    if (!btn) return;
    var span = btn.querySelector('.sheet-trigger-label');
    if (span) { span.textContent = selectedText(select) || select.getAttribute('data-placeholder') || 'Choose…'; span.classList.toggle('is-placeholder', !select.value); }
    btn.disabled = select.disabled;
    btn.setAttribute('aria-expanded', active === select ? 'true' : 'false');
  }
  function close() {
    if (!active) return;
    var previous = active;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    active = null;
    document.body.style.overflow = prevOverflow;
    refresh(previous);
    if (previous._sheetTrigger && document.contains(previous._sheetTrigger)) previous._sheetTrigger.focus({ preventScroll: true });
  }
  function open(select) {
    build();
    if (active && active !== select) close();
    active = select;
    titleEl.textContent = labelText(select);
    optionsEl.replaceChildren();
    function addOption(opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'command-option' + (opt.value === select.value ? ' active' : '');
      b.setAttribute('role', 'option');
      b.setAttribute('aria-selected', String(opt.value === select.value));
      b.disabled = opt.disabled;
      var main = document.createElement('span'); main.className = 'command-option-main';
      var label = document.createElement('span'); label.className = 'sheet-option-label'; label.textContent = opt.textContent.trim();
      main.appendChild(label);
      var radio = document.createElement('span'); radio.className = 'command-option-radio'; radio.setAttribute('aria-hidden', 'true');
      b.append(main, radio);
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
        var group = document.createElement('div'); group.className = 'sheet-group'; group.textContent = child.label; optionsEl.appendChild(group);
        Array.prototype.forEach.call(child.children, addOption);
      } else if (child.tagName === 'OPTION') addOption(child);
    });
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    refresh(select);
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      var current = optionsEl.querySelector('.command-option.active:not(:disabled)') || optionsEl.querySelector('.command-option:not(:disabled)');
      if (current) { current.focus({ preventScroll: true }); current.scrollIntoView({ block: 'nearest' }); }
      else panel.querySelector('[data-sheet-close]').focus();
    });
  }
  function enhance(select) {
    if (select._sheetTrigger || select.multiple || select.hasAttribute('data-native-select')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'select sheet-trigger q-select-trigger';
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-expanded', 'false');
    var lbl = select.id ? document.querySelector('label[for="' + select.id.replace(/(["\\])/g, '\\$1') + '"]') : null;
    if (lbl) { if (!lbl.id) lbl.id = select.id + '_label'; btn.setAttribute('aria-labelledby', lbl.id); }
    else btn.setAttribute('aria-label', labelText(select));
    var span = document.createElement('span'); span.className = 'sheet-trigger-label'; btn.appendChild(span);
    var chevron = document.createElement('span'); chevron.className = 'q-select-chevron'; chevron.setAttribute('aria-hidden', 'true'); chevron.textContent = '⌄'; btn.appendChild(chevron);
    select._sheetTrigger = btn;
    select.classList.add('sheet-native');
    select.setAttribute('aria-hidden', 'true');
    select.tabIndex = -1;
    select.parentNode.insertBefore(btn, select);
    btn.addEventListener('click', function () { if (!btn.disabled) open(select); });
    select.addEventListener('change', function () { refresh(select); });
    if (!observed.has(select)) {
      observed.add(select);
      new MutationObserver(function () { refresh(select); }).observe(select, { attributes: true, childList: true, subtree: true, attributeFilter: ['disabled', 'selected', 'label', 'value'] });
    }
    refresh(select);
  }
  function scan(node) {
    if (!node || node.nodeType !== 1) return;
    if (node.matches && node.matches('select:not([multiple]):not([data-native-select]):not(.creator-filter-native-select):not(.q-language-source):not(.q-account-language)')) enhance(node);
    if (node.querySelectorAll) node.querySelectorAll('select:not([multiple]):not([data-native-select]):not(.creator-filter-native-select):not(.q-language-source):not(.q-account-language)').forEach(enhance);
  }
  function start() {
    scan(document.body);
    new MutationObserver(function (records) { records.forEach(function (record) { record.addedNodes.forEach(scan); }); }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
