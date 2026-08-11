// components/Button.js — Botón reutilizable en sus tres variantes.
import { el } from '../core/dom.js';

const VARIANT_CLASS = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

/**
 * @param {object}   opts
 * @param {string}   opts.label
 * @param {'primary'|'ghost'|'danger'} [opts.variant='primary']
 * @param {string}   [opts.id]
 * @param {Function} [opts.onClick]
 * @param {string}   [opts.style]   estilos inline opcionales
 */
export function Button({ label, variant = 'primary', id, onClick, style } = {}) {
  const cls = VARIANT_CLASS[variant] || VARIANT_CLASS.primary;
  const attrs = [
    `class="${cls}"`,
    id ? `id="${id}"` : '',
    style ? `style="${style}"` : '',
  ].filter(Boolean).join(' ');

  const button = el(`<button ${attrs}>${label}</button>`);
  if (onClick) button.addEventListener('click', onClick);
  return button;
}
