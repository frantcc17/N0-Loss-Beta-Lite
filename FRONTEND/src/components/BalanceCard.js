// components/DrawCard.js — Tarjeta del sorteo del viernes con cuenta atrás
// en vivo y tres métricas (bote, tickets, probabilidad).
import { el } from '../core/dom.js';
import { store } from '../state.js';
import { CONFIG } from '../config.js';
import { plainMoney } from '../core/format.js';

const pad = (n) => String(n).padStart(2, '0');

/** Milisegundos hasta el próximo viernes a la hora del sorteo. */
function msUntilDraw(hour) {
  const now = new Date();
  const target = new Date(now);
  const add = (5 - now.getDay() + 7) % 7; // viernes = 5
  target.setDate(now.getDate() + add);
  target.setHours(hour, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 7);
  return target - now;
}

/** Formatea el tiempo restante como "2d 07:14:51" o "07:14:51". */
function countdownParts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { days: d, time: `${pad(h)}:${pad(m)}:${pad(sec)}` };
}

export function DrawCard() {
  const card = el(`
    <section class="card draw-card">
      <div class="draw-head">
        <span class="draw-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="17" height="17">
            <rect x="3" y="8" width="18" height="12" rx="1.5"/><path d="M3 12h18M12 8v12"/>
            <path d="M12 8S9.5 3 7.5 4.5 9.5 8 12 8zM12 8s2.5-5 4.5-3.5S14.5 8 12 8z"/>
          </svg>
          Sorteo del viernes
        </span>
        <span class="badge-live">EN CURSO</span>
      </div>

      <div class="countdown">
        <span class="cd-days" data-ref="days"></span>
        <span class="cd-time" data-ref="time"></span>
      </div>

      <div class="draw-divider"></div>

      <div class="draw-stats">
        <div class="stat">
          <div class="stat-label">Bote estimado</div>
          <div class="stat-val gold" data-ref="prize"></div>
        </div>
        <div class="stat">
          <div class="stat-label">Tus tickets</div>
          <div class="stat-val" data-ref="tickets"></div>
        </div>
        <div class="stat">
          <div class="stat-label">Probabilidad</div>
          <div class="stat-val" data-ref="odds"></div>
        </div>
      </div>
    </section>
  `);

  card.querySelector('[data-ref="prize"]').textContent = plainMoney(CONFIG.weeklyPrize);
  card.querySelector('[data-ref="odds"]').textContent = CONFIG.odds;

  const daysEl = card.querySelector('[data-ref="days"]');
  const timeEl = card.querySelector('[data-ref="time"]');
  const ticketsEl = card.querySelector('[data-ref="tickets"]');

  // Cuenta atrás en vivo (tick cada segundo).
  const tick = () => {
    const { days, time } = countdownParts(msUntilDraw(CONFIG.drawHour));
    daysEl.textContent = days > 0 ? `${days}d` : '';
    daysEl.style.display = days > 0 ? '' : 'none';
    timeEl.textContent = time;
  };
  tick();
  setInterval(tick, 1000);

  // Tickets reactivos.
  const renderTickets = (s) => (ticketsEl.textContent = s.tickets);
  renderTickets(store.get());
  store.subscribe(renderTickets);

  return card;
}
