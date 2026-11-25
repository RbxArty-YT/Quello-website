/* Quello shared account-page controls. */
(()=>{'use strict';
const select=document.getElementById('accountLanguage');
if(select){let current='en';try{current=localStorage.getItem('quello-site-language-v2')||'en'}catch(_){}if(!['en','ru','de','fr','it'].includes(current))current='en';select.value=current;select.addEventListener('change',()=>{try{localStorage.setItem('quello-site-language-v2',select.value)}catch(_){}location.reload();});}
const theme=document.getElementById('themeToggle')||document.getElementById('accountTheme');
if(theme){theme.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';if(window.QThemeSwitch&&typeof window.QThemeSwitch.set==='function')window.QThemeSwitch.set(next,theme);else{document.documentElement.dataset.theme=next;try{localStorage.setItem('quello-theme',next)}catch(_){}}});}
})();
