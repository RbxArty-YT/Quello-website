/* login.html: send people to Discord (via the bot's API) or let them read the docs as a guest. */
(function () {
  'use strict';
  const { CFG, API_BASE, API_UNSET, t, applyI18n, wireHeader, getToken, clearToken, tokenLooksValid } = window.Q;

  wireHeader();
  applyI18n();

  // Already signed in -> go to the dashboard.
  const existing = getToken();
  if (existing) {
    if (tokenLooksValid(existing)) { location.replace('dashboard.html'); return; }
    clearToken();
  }

  // "Continue without signing in": remember the choice for this tab so login-gate.js lets the docs open.
  document.getElementById('guestBtn').addEventListener('click', () => {
    try { sessionStorage.setItem('quello-guest', '1'); } catch (e) { /* storage blocked */ }
  });

  const discordBtn = document.getElementById('discordBtn');
  const errorBox = document.getElementById('loginError');
  const showError = key => { errorBox.textContent = t(key); errorBox.classList.remove('is-hidden'); };

  if (!API_UNSET) {
    discordBtn.href = API_BASE + '/auth/login';
  } else {
    discordBtn.removeAttribute('href');
    discordBtn.setAttribute('aria-disabled', 'true');
    showError('err_config');
  }

  // The API sends people back here with ?error=state|auth when sign-in fails.
  const params = new URLSearchParams(location.search);
  const error = params.get('error');
  let errorKey = null;
  if (error === 'state') errorKey = 'err_state';
  else if (error === 'auth') errorKey = 'err_auth';
  if (errorKey) {
    showError(errorKey);
    history.replaceState(null, '', location.pathname);
  }
  window.addEventListener('quello:languagechange', () => {
    if (errorKey) showError(errorKey);
    else if (API_UNSET) showError('err_config');
  });
})();
