document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-tabs]').forEach((tabsRoot) => {
    const buttons = tabsRoot.querySelectorAll('[data-tab-btn]');
    const panels = tabsRoot.querySelectorAll('[data-tab-panel]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tabBtn;
        buttons.forEach((b) => b.classList.toggle('active', b === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
      });
    });
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copy || '');
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        const old = button.innerText;
        button.innerText = 'Скопировано';
        setTimeout(() => (button.innerText = old), 1400);
      } catch (err) {
        button.innerText = 'Не удалось';
      }
    });
  });

  const storageKey = 'alfred-guide-checklist';
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  document.querySelectorAll('[data-check]').forEach((input) => {
    if (saved[input.id]) input.checked = true;
    input.addEventListener('change', () => {
      const next = JSON.parse(localStorage.getItem(storageKey) || '{}');
      next[input.id] = input.checked;
      localStorage.setItem(storageKey, JSON.stringify(next));
    });
  });
});
