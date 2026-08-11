// services/wallet.service.js — Lógica de depósitos y retiros.
// No toca el DOM: solo actualiza el estado y devuelve un resultado.

import { store } from '../state.js';
import { CONFIG } from '../config.js';
import { money, todayLabel } from '../core/format.js';

/**
 * Ejecuta una transacción.
 * @param {'dep'|'ret'} mode
 * @param {number} amount
 * @returns {{ok:boolean, error?:string, tickets?:number}}
 */
export function transact(mode, amount) {
  const s = store.get();
  const isDeposit = mode === 'dep';

  if (!isDeposit && amount > s.balance) {
    return { ok: false, error: 'Saldo insuficiente' };
  }

  const balance = isDeposit ? s.balance + amount : s.balance - amount;
  const tickets = Math.floor(balance / CONFIG.ticketValue);

  const movement = {
    icon: isDeposit ? '▲' : '▼',
    label: isDeposit ? 'Depósito' : 'Retiro',
    date: todayLabel(),
    amt: (isDeposit ? '+' : '−') + money(amount),
    pos: isDeposit,
  };

  store.set({ balance, tickets, movements: [movement, ...s.movements] });

  return { ok: true, tickets: Math.floor(amount / CONFIG.ticketValue) };
}
