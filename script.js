document.addEventListener('DOMContentLoaded', () => {
 const tabs = [...document.querySelectorAll('.tab-button')];
 function activate(tab, focus=false) {
   tabs.forEach(t => { const active=t===tab; t.classList.toggle('is-active',active); t.setAttribute('aria-selected',String(active)); t.tabIndex=active?0:-1; const panel=document.getElementById(t.getAttribute('aria-controls')); panel.hidden=!active; panel.classList.toggle('is-visible',active); });
   if(focus) tab.focus();
 }
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',event=>{let j; if(event.key==='ArrowRight')j=(i+1)%tabs.length;else if(event.key==='ArrowLeft')j=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')j=0;else if(event.key==='End')j=tabs.length-1;else return;event.preventDefault();activate(tabs[j],true);});});
 const filters = [...document.querySelectorAll('.pub-filter')];
 function showPublications(mode) {
   for (const button of filters) {
     const active = button.dataset.pub === mode;
     button.classList.toggle('is-active', active);
     button.setAttribute('aria-pressed', String(active));
     const list = document.getElementById('pub-' + button.dataset.pub);
     if (list) list.hidden = !active;
   }
 }
 filters.forEach(button => button.addEventListener('click', () => showPublications(button.dataset.pub)));
 showPublications('selected');
 ['current-year','footer-year'].forEach(id=>document.getElementById(id).textContent=new Date().getFullYear());
});