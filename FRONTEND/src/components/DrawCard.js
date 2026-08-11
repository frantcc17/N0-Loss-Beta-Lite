// components/DrawCard.js — Tarjeta del próximo sorteo semanal.
import { el } from '../core/dom.js';
import { store } from '../state.js';
import { CONFIG } from '../config.js';
import { plainMoney, nextDrawLabel } from '../core/format.js';

export function DrawCard() {
  const card = el(`
    <section class="card draw-card">
      <div class="draw-head">
        <span class="draw-title">Próximo sorteo</span>
        <span class="draw-when accent" data-ref="when">Viernes</span>
      </div>
      <div class="draw-stats">
        <div class="stat">
          <div class="label">Fondo de premios</div>
          <div class="stat-val" data-ref="prize">$0</div>
        </div>
        <div class="stat">
          <div class="label">Tus tickets</div>
          <div class="stat-val" data-ref="tickets">0 activos</div>
        </div>
      </div>
      <p class="draw-note">Cada viernes se reparte el rendimiento. Tu dinero nunca se juega.</p>
    </section>
  `);

  card.querySelector('[data-ref="when"]').textContent = nextDrawLabel();
  card.querySelector('[data-ref="prize"]').textContent = plainMoney(CONFIG.weeklyPrize);

  const ticketsEl = card.querySelector('[data-ref="tickets"]');
  const render = (s) => (ticketsEl.textContent = s.tickets + ' activos');
  render(store.get());
  store.subscribe(render);

  return card;
}
