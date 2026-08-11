// components/UserName.js — Muestra el nombre del usuario y se mantiene
// sincronizado con el store.
import { el } from '../core/dom.js';
import { store } from '../state.js';

export function UserName({ className = 'username' } = {}) {
  const node = el(`<div class="${className}"></div>`);

  const render = (s) => (node.textContent = s.user.name);
  render(store.get());
  store.subscribe(render);

  return node;
}
