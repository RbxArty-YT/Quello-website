/* Quello — sign-in gate.
   Every page except the ones listed in OPEN needs a signed-in Discord session;
   visitors without one are sent to login.html. Runs synchronously in <head>
   so the protected page never flashes before the redirect.
   After signing in, dashboard.js returns the person to the page they asked for
   (via the "quello-after-login" key). */
(function () {
  'use strict';

  // Pages anyone can open without signing in.
  var OPEN = ['login.html', 'dashboard.html', 'about.html', 'privacy.html', 'terms.html'];
  var TOKEN_KEY = 'quello-dash-token';
  var AFTER_KEY = 'quello-after-login';

  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file.indexOf('.') === -1) file = 'index.html';   // "/", "/Quello-website/" -> index.html
  if (OPEN.indexOf(file) !== -1) return;

  function signedIn() {
    try {
      var token = localStorage.getItem(TOKEN_KEY) || '';
      var body = token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/');
      var p = JSON.parse(atob(body + '='.repeat((4 - body.length % 4) % 4)));
      return !!(p && p.t === 'session' && p.exp * 1000 > Date.now());
    } catch (e) { return false; }
  }
  if (signedIn()) return;

  // Remember where the person was going (only simple #section anchors are kept).
  try {
    var hash = /^#[A-Za-z0-9_-]{1,40}$/.test(location.hash) ? location.hash : '';
    sessionStorage.setItem(AFTER_KEY, file + hash);
  } catch (e) { /* storage blocked */ }

  // Hide the page while the browser follows the redirect.
  document.documentElement.style.visibility = 'hidden';
  location.replace('login.html');
})();
