// pages/ProfilePage.js — Pantalla de perfil: datos, menú y cierre de sesión.
import { el } from '../core/dom.js';
import { store } from '../state.js';
import { Avatar } from '../components/Avatar.js';
import { UserName } from '../components/UserName.js';
import { ProfileMenu } from '../components/ProfileMenu.js';
import { Button } from '../components/Button.js';
import { logout } from '../services/auth.service.js';

export function ProfilePage({ onLogout } = {}) {
  const screen = el(`<div id="screen-profile" class="screen page hidden"></div>`);

  screen.appendChild(el(`<h1 class="page-title">Perfil</h1>`));

  // Cabecera con avatar grande, nombre y correo.
  const head = el(`<div class="profile-head"></div>`);
  head.appendChild(Avatar({ size: 'lg' }));

  const info = el(`<div></div>`);
  info.appendChild(UserName());
  const emailEl = el(`<div class="label" id="profile-email"></div>`);
  info.appendChild(emailEl);
  head.appendChild(info);
  screen.appendChild(head);

  // El correo se mantiene sincronizado con el store.
  const renderEmail = (s) =>
    (emailEl.textContent = s.user.email || s.user.name.toLowerCase() + '@correo.com');
  renderEmail(store.get());
  store.subscribe(renderEmail);

  // Menú y acciones.
  screen.appendChild(ProfileMenu());
  screen.appendChild(Button({
    label: 'Cerrar sesión',
    variant: 'danger',
    id: 'btn-logout',
    onClick: () => {
      onLogout?.();
      logout();
    },
  }));
  screen.appendChild(el(`<p class="version">N0Loss Lite · v0.1 beta</p>`));

  return screen;
}
