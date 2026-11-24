document.addEventListener('DOMContentLoaded', () => {
 const tabs = [...document.querySelectorAll('.tab-button')];
 function activate(tab, focus=false) {
   tabs.forEach(t => { const active=t===tab; t.classList.toggle('is-active',active); t.setAttribute('aria-selected',String(active)); t.tabIndex=active?0:-1; const panel=document.getElementById(t.getAttribute('aria-controls')); panel.hidden=!active; panel.classList.toggle('is-visible',active); });
   if(focus) tab.focus();
 }
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',event=>{let j; if(event.key==='ArrowRight')j=(i+1)%tabs.length;else if(event.key==='ArrowLeft')j=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')j=0;else if(event.key==='End')j=tabs.length-1;else return;event.preventDefault();activate(tabs[j],true);});});
 document.querySelectorAll('.pub-filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.pub-filter').forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));document.getElementById('pub-'+b.dataset.pub).hidden=!active;});}));
 ['current-year','footer-year'].forEach(id=>document.getElementById(id).textContent=new Date().getFullYear());
});