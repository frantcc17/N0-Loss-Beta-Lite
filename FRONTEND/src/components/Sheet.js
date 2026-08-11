// components/Sheet.js — Hoja inferior (bottom sheet) para depositar / retirar.
// Expone mountSheet() para crear el nodo y openSheet()/closeSheet() como
// controlador. Encapsula sus chips de importe y la confirmación.
import { el } from '../core/dom.js';
import { store } from '../state.js';
import { AMOUNTS } from '../config.js';
import { transact } from '../services/wallet.service.js';
import { showToast } from './Toast.js';

let overlay = null;
let sheet = null;
let refs = {};

const COPY = {
  dep: {
    title: 'Depositar',
    sub: '1 ticket = $10 · sin comisiones de entrada',
    confirm: 'Confirmar depósito',
  },
  ret: {
    title: 'Retirar',
    sub: 'Sin penalización · disponible en 24 h',
    confirm: 'Confirmar retiro',
  },
};

function renderChips() {
  const { amount } = store.get();
  refs.chips.innerHTML = AMOUNTS.map(
    (v) => `<button class="chip${v === amount ? ' selected' : ''}" data-amount="${v}">$${v}</button>`
  ).join('');
}

function confirm() {
  const { sheet: mode, amount } = store.get();
  const result = transact(mode, amount);
  if (!result.ok) {
    showToast(result.error);
    return;
  }
  closeSheet();
  showToast(
    mode === 'dep'
      ? 'Depósito confirmado · +' + result.tickets + ' tickets'
      : 'Retiro solicitado · llega en 24 h'
  );
}

/** Crea overlay + sheet y devuelve un fragmento para añadir al DOM. */
export function mountSheet() {
  const frag = document.createDocumentFragment();

  overlay = el(`<div id="sheet-overlay" class="overlay hidden"></div>`);
  overlay.addEventListener('click', closeSheet);

  sheet = el(`
    <div id="sheet" class="sheet hidden">
      <div class="grabber"></div>
      <h2 class="sheet-title" data-ref="title">Depositar</h2>
      <p class="sub" data-ref="sub"></p>
      <div class="chips" data-ref="chips"></div>
      <button class="btn-primary" data-ref="confirm">Confirmar depósito</button>
    </div>
  `);

  refs = {
    title: sheet.querySelector('[data-ref="title"]'),
    sub: sheet.querySelector('[data-ref="sub"]'),
    chips: sheet.querySelector('[data-ref="chips"]'),
    confirm: sheet.querySelector('[data-ref="confirm"]'),
  };

  refs.confirm.addEventListener('click', confirm);
  refs.chips.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-amount]');
    if (chip) {
      store.set({ amount: Number(chip.dataset.amount) });
      renderChips();
    }
  });

  frag.appendChild(overlay);
  frag.appendChild(sheet);
  return frag;
}

/** Abre el sheet en modo 'dep' o 'ret'. */
export function openSheet(mode) {
  store.set({ sheet: mode, amount: 50 });
  const copy = COPY[mode];
  refs.title.textContent = copy.title;
  refs.sub.textContent = copy.sub;
  refs.confirm.textContent = copy.confirm;
  renderChips();
  sheet.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

/** Cierra el sheet. */
export function closeSheet() {
  store.set({ sheet: null });
  sheet.classList.add('hidden');
  overlay.classList.add('hidden');
}
