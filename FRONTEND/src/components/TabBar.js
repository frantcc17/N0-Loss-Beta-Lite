// components/TabBar.js — Barra de navegación inferior.
// Se muestra solo en las pantallas con pestañas y marca la activa,
// reaccionando por sí misma a los cambios de state.screen.
import { el } from '../core/dom.js';
import { store } from '../state.js';
import { navigate, screenHasTabs } from '../core/router.js';

const TABS = [
  { id: 'dash', label: 'Inicio', icon: 'icon-home' },
  { id: 'profile', label: 'Perfil', icon: 'icon-user' },
];

export function TabBar() {
  const nav = el(`<nav id="tabbar" class="tabbar hidden"></nav>`);

  TABS.forEach((t) => {
    const btn = el(
      `<button class="tab" data-tab="${t.id}"><span class="tab-icon ${t.icon}"></span>${t.label}</button>`
    );
    btn.addEventListener('click', () => navigate(t.id));
    nav.appendChild(btn);
  });

  const render = (s) => {
    nav.classList.toggle('hidden', !screenHasTabs(s.screen));
    nav.querySelectorAll('.tab').forEach((btn) =>
      btn.classList.toggle('active', btn.dataset.tab === s.screen)
    );
  };
  render(store.get());
  store.subscribe(render);

  return nav;
}
