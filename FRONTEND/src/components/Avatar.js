// components/Avatar.js — Avatar circular que muestra las iniciales del usuario.
// Se suscribe al store para mantenerse sincronizado con el nombre.
import { el } from '../core/dom.js';
import { store } from '../state.js';
import { initialsOf } from '../core/format.js';

export function Avatar({ size = 'sm', onClick } = {}) {
  const cls = size === 'lg' ? 'avatar lg' : 'avatar';
  const node = el(`<div class="${cls}">D</div>`);

  const render = (s) => (node.textContent = initialsOf(s.user.name));
  render(store.get());
  store.subscribe(render);

  if (onClick) node.addEventListener('click', onClick);
  return node;
}
