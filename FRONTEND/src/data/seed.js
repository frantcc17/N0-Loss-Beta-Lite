// data/seed.js — Datos iniciales de ejemplo.
// Aislar los datos "mock" aquí facilita sustituirlos por una API real
// más adelante sin tocar la lógica ni los componentes.

export function seedMovements() {
  return [
    { icon: '▲', label: 'Depósito',       date: '3 ago 2026',  amt: '+$100.00', pos: true },
    { icon: '★', label: 'Premio semanal', date: '31 jul 2026', amt: '+$4.20',   pos: true },
    { icon: '▲', label: 'Depósito',       date: '20 jul 2026', amt: '+$150.00', pos: true },
    { icon: '▼', label: 'Retiro',         date: '12 jul 2026', amt: '−$40.00',  pos: false },
  ];
}
