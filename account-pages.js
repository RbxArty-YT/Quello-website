/* Quello account pages: reuse the exact header language control used on the main site. */
(()=>{'use strict';
const wrap=document.getElementById('headerLanguage');
const button=document.getElementById('headerLanguageButton');
const flag=document.getElementById('headerLanguageFlag');
const code=document.getElementById('headerLanguageCode');
const source=document.getElementById('accountLanguage')||document.getElementById('profileLanguage');
const meta={en:['🇬🇧','EN'],ru:['🇷🇺','RU'],de:['🇩🇪','DE'],fr:['🇫🇷','FR'],it:['🇮🇹','IT']};
let lang='en';try{lang=localStorage.getItem('quello-site-language-v2')||'en'}catch(_){}if(!meta[lang])lang='en';
function setOpen(value){if(!wrap||!button)return;wrap.classList.toggle('open',value);button.setAttribute('aria-expanded',String(value));}
function update(value){lang=meta[value]?value:'en';if(flag)flag.textContent=meta[lang][0];if(code)code.textContent=meta[lang][1];wrap?.querySelectorAll('[data-header-language]').forEach(item=>{const active=item.dataset.headerLanguage===lang;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));});if(source)source.value=lang;}
update(lang);
button?.addEventListener('click',event=>{event.stopPropagation();setOpen(!wrap.classList.contains('open'));});
wrap?.querySelectorAll('[data-header-language]').forEach(item=>item.addEventListener('click',()=>{const next=item.dataset.headerLanguage;if(!meta[next])return;try{localStorage.setItem('quello-site-language-v2',next)}catch(_){}update(next);setOpen(false);if(source){source.value=next;source.dispatchEvent(new Event('change',{bubbles:true}));}location.reload();}));
document.addEventListener('click',event=>{if(wrap&&!wrap.contains(event.target))setOpen(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape')setOpen(false);});
// Theme click behavior is owned by theme-switch.js, exactly as on the main site.
})();
