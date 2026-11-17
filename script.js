const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateTab(tab, updateHash = true) {
  const targetId = tab.getAttribute('aria-controls');
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    item.classList.toggle('is-active', selected);
  });
  panels.forEach((panel) => {
    const visible = panel.id === targetId;
    panel.hidden = !visible;
    panel.classList.toggle('is-visible', visible);
  });
  if (updateHash) history.replaceState(null, '', `#${tab.dataset.tab}`);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);
    }
  });
});

const initialTabName = window.location.hash.slice(1);
const initialTab = tabs.find((tab) => tab.dataset.tab === initialTabName);
if (initialTab) activateTab(initialTab, false);

const year = new Date().getFullYear();
document.querySelector('#current-year').textContent = year;
document.querySelector('#footer-year').textContent = year;
