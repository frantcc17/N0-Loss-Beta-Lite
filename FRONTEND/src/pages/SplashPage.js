// pages/SplashPage.js — Pantalla de bienvenida con barra de carga.
import { el } from '../core/dom.js';
import { Logo } from '../components/Logo.js';

export function SplashPage() {
  const screen = el(`<div id="screen-splash" class="screen splash"></div>`);
  screen.appendChild(Logo({ size: 'lg' }));
  screen.appendChild(el(`<div class="tagline">Ahorra sin perder. Nunca.</div>`));
  screen.appendChild(el(`<div class="loadbar"><div class="loadbar-fill"></div></div>`));
  screen.appendChild(el(`<div class="splash-foot">0% DE PÉRDIDA</div>`));
  return screen;
}
