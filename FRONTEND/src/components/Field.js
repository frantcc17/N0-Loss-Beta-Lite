// components/Field.js — Campo de formulario reutilizable.
import { el } from '../core/dom.js';

export function Field({ type = 'text', id, placeholder, autocomplete }) {
  const auto = autocomplete ? ` autocomplete="${autocomplete}"` : '';
  return el(
    `<input type="${type}" id="${id}" placeholder="${placeholder}"${auto}>`
  );
}
