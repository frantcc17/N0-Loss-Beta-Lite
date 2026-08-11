// components/Logo.js — Logotipo N0Loss con el "0" acentuado.
import { el } from '../core/dom.js';

export function Logo({ size = 'lg' } = {}) {
  const cls = size === 'sm' ? 'logo sm' : 'logo';
  return el(`<div class="${cls}">N<span class="accent">0</span>Loss</div>`);
}
