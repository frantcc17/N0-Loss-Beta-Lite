// pages/DashboardPage.js — Pantalla principal:
// cabecera (logo + avatar), ahorro, sorteo, rendimiento y acciones.
import { el } from '../core/dom.js';
import { CONFIG } from '../config.js';
import { money } from '../core/format.js';
import { Logo } from '../components/Logo.js';
import { Avatar } from '../components/Avatar.js';
import { BalanceCard } from '../components/BalanceCard.js';
import { DrawCard } from '../components/DrawCard.js';
import { Button } from '../components/Button.js';
import { navigate } from '../core/router.js';
import { openSheet } from '../components/Sheet.js';

export function DashboardPage() {
  const screen = el(`<div id="screen-dash" class="screen page hidden"></div>`);

  // Cabecera: logo a la izquierda, avatar (→ perfil) a la derecha.
  const header = el(`<header class="dash-head"></header>`);
  header.appendChild(Logo({ size: 'sm' }));
  header.appendChild(Avatar({ size: 'sm', onClick: () => navigate('profile') }));
  screen.appendChild(header);

  // Ahorro + sorteo.
  screen.appendChild(BalanceCard());
  screen.appendChild(DrawCard());

  // Línea de rendimiento generado.
  screen.appendChild(el(`
    <div class="yield">
      <svg class="yield-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18">
        <path d="M7 17 17 7M9 7h8v8"/>
      </svg>
      <span class="yield-amt">+${money(CONFIG.monthlyYield)}</span>
      <span class="yield-note">generados este mes para el bote · tu capital no se toca</span>
    </div>
  `));
