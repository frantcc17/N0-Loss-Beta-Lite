// components/MovementList.js — Lista de movimientos.
// Se vuelve a renderizar cuando cambian los movimientos del store.
import { el } from '../core/dom.js';
import { store } from '../state.js';

function movementRow(m) {
  return `
    <div class="mov">
      <div class="mov-icon ${m.pos ? 'pos' : 'neg'}">${m.icon}</div>
      <div class="mov-body">
        <div class="mov-label">${m.label}</div>
        <div class="mov-date">${m.date}</div>
      </div>
      <div class="mov-amt ${m.pos ? 'pos' : 'neg'}">${m.amt}</div>
    </div>`;
}

export function MovementList() {
  const list = el(`<div class="movs" id="movs"></div>`);

  const render = (s) => (list.innerHTML = s.movements.map(movementRow).join(''));
  render(store.get());
  store.subscribe(render);

  return list;
}
