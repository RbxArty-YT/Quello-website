/* Copyright (c) 2026 Quello. All rights reserved. */
(function () {
  'use strict';
  if (!window.QuelloDrawerCore) return;
  window.QuelloSideDrawer = {
    create(options = {}) {
      return window.QuelloDrawerCore.create({ ...options, edge: 'right' });
    }
  };
})();
