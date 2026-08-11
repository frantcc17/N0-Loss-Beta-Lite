// pages/DashboardPage.js — Pantalla principal: saldo, sorteo y movimientos.
import { el } from '../core/dom.js';
import { Avatar } from '../components/Avatar.js';
import { UserName } from '../components/UserName.js';
import { BalanceCard } from '../components/BalanceCard.js';
import { DrawCard } from '../components/DrawCard.js';
import { MovementList } from '../components/MovementList.js';
import { navigate } from '../core/router.js';
import { openSheet } from '../components/Sheet.js';

export function DashboardPage() {
  const screen = el(`<div id="screen-dash" class="screen page hidden"></div>`);

  // Cabecera: saludo + avatar (el avatar lleva al perfil).
  const header = el(`
    <header class="dash-head">
      <div><div class="hello">Hola,</div></div>
    </header>
  `);
  header.querySelector('div > div').after(UserName());
  header.appendChild(Avatar({ size: 'sm', onClick: () => navigate('profile') }));
  screen.appendChild(header);

  // Tarjetas y lista.
  screen.appendChild(BalanceCard({
    onDeposit: () => openSheet('dep'),
    onWithdraw: () => openSheet('ret'),
  }));
  screen.appendChild(DrawCard());
  screen.appendChild(el(`<h2 class="section-title">Movimientos</h2>`));
  screen.appendChild(MovementList());

  return screen;
}
