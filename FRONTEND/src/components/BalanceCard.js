/ components/BalanceCard.js — Tarjeta de saldo total con acciones.
import { el } from '../core/dom.js';
import { store } from '../state.js';
import { money } from '../core/format.js';

/**
 * @param {object}   handlers
 * @param {Function} handlers.onDeposit
 * @param {Function} handlers.onWithdraw
 */
export function BalanceCard({ onDeposit, onWithdraw } = {}) {
  const card = el(`
    <section class="card balance-card">
      <div class="label">Saldo total</div>
      <div class="balance" data-ref="balance">$0.00</div>
      <div class="note"><span class="dot"></span>Capital intacto · retira cuando quieras</div>
      <div class="actions">
        <button class="btn-primary" data-ref="dep">Depositar</button>
        <button class="btn-ghost" data-ref="ret">Retirar</button>
      </div>
    </section>
  `);

  const balanceEl = card.querySelector('[data-ref="balance"]');
  card.querySelector('[data-ref="dep"]').addEventListener('click', () => onDeposit?.());
  card.querySelector('[data-ref="ret"]').addEventListener('click', () => onWithdraw?.());

  const render = (s) => (balanceEl.textContent = money(s.balance));
  render(store.get());
  store.subscribe(render);

  return card;
}
