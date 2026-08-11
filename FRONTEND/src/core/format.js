// core/format.js — Funciones puras de formato (dinero, fechas, iniciales).

/** 250 -> "$250.00" */
export const money = (n) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 12480 -> "$12,480" (sin decimales, para el fondo de premios) */
export const plainMoney = (n) => '$' + n.toLocaleString('en-US');

/** Fecha de hoy en formato "3 ago 2026". */
export const todayLabel = () =>
  new Date()
    .toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    .replace('.', '');

/** Iniciales a partir de un nombre: "Dylan Pérez" -> "DP". */
export const initialsOf = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** Etiqueta del próximo sorteo (viernes = 5). */
export function nextDrawLabel() {
  const d = (5 - new Date().getDay() + 7) % 7;
  if (d === 0) return 'Hoy · viernes';
  if (d === 1) return 'Mañana · viernes';
  return 'Viernes · en ' + d + ' días';
}
