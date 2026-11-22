/* Copyright (c) 2026 Quello. All rights reserved. */
/* Runs in <head>: applies the saved theme before first paint (same logic as index.html). */
(function(){try{var t=localStorage.getItem("quello-theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();
