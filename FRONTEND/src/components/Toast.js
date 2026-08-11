// components/Toast.js — Notificación efímera.
// mountToast() crea el nodo una sola vez; showToast(msg) lo muestra
// desde cualquier parte de la app sin acoplar componentes entre sí.
import { el } from '../core/dom.js';

let node = null;
let timer = null;

/** Crea el elemento del toast y lo devuelve para añadirlo al DOM. */
export function mountToast() {
  node = el(`<div id="toast" class="toast hidden"></div>`);
  return node;
}

/** Muestra un mensaje durante ~2.4s. */
export function showToast(message) {
  if (!node) return;
  clearTimeout(timer);
  node.textContent = message;
  node.classList.remove('hidden');
  timer = setTimeout(() => node.classList.add('hidden'), 2400);
}
