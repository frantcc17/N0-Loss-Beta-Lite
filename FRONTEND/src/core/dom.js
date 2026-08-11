// core/dom.js — Utilidades ligeras de DOM compartidas por componentes y páginas.

/** querySelector abreviado. */
export const $ = (selector, root = document) => root.querySelector(selector);

/** querySelectorAll como array. */
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/**
 * Crea un HTMLElement a partir de una cadena de HTML.
 * Permite escribir componentes con template literals, igual que en el
 * código original, pero devolviendo nodos reales y reutilizables.
 *
 *   const btn = el(`<button class="btn-primary">Entrar</button>`);
 */
export function el(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}
