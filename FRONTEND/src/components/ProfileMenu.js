// components/ProfileMenu.js — Menú de opciones del perfil.
import { el } from '../core/dom.js';
import { MENU_ITEMS } from '../config.js';

export function ProfileMenu({ items = MENU_ITEMS } = {}) {
  const menu = el(`<div class="menu" id="menu"></div>`);
  menu.innerHTML = items
    .map((label) => `<div class="menu-item"><span>${label}</span><span class="chev">›</span></div>`)
    .join('');
  return menu;
}
