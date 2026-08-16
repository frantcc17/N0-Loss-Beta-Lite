// components/BalanceCard.js — Bloque de ahorro: "TU AHORRO", saldo en serif
// y sello de "Capital intacto". Sin borde ni botones (van en la página).
import { el } from '../core/dom.js';
import { store } from '../state.js';
import { money } from '../core/format.js';

export function BalanceCard() {
  const block = el(`
    <section class="savings">
      <div class="eyebrow">TU AHORRO</div>
      <div class="balance" data-ref="balance"></div>
      <div class="assurance">
        <span class="pill-safe">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/>
          </svg>
          Capital intacto
        </span>
        <span class="assurance-note">Retira cuando quieras</span>
      </div>
    </section>
  `);

  const balanceEl = block.querySelector('[data-ref="balance"]');
  const render = (s) => {
    const [int, dec] = money(s.balance).split('.');
    balanceEl.innerHTML = `${int}<span class="cents">.${dec}</span>`;
  };
  render(store.get());
  store.subscribe(render);

  return block;
}
