// pages/LoginPage.js — Pantalla de inicio de sesión.
import { el, $$ } from '../core/dom.js';
import { Logo } from '../components/Logo.js';
import { Field } from '../components/Field.js';
import { Button } from '../components/Button.js';
import { login } from '../services/auth.service.js';
import { navigate } from '../core/router.js';
import { showToast } from '../components/Toast.js';

export function LoginPage() {
  const screen = el(`<div id="screen-login" class="screen auth hidden"></div>`);

  screen.appendChild(Logo({ size: 'sm' }));
  screen.appendChild(el(`<p class="sub">Inicia sesión para ver tus ahorros.</p>`));

  const fields = el(`<div class="fields"></div>`);
  const email = Field({ type: 'email', id: 'login-email', placeholder: 'Correo electrónico', autocomplete: 'email' });
  const pass = Field({ type: 'password', id: 'login-pass', placeholder: 'Contraseña', autocomplete: 'current-password' });
  fields.append(email, pass);
  screen.appendChild(fields);

  screen.appendChild(el(`<div class="forgot"><a href="#">¿Olvidaste tu contraseña?</a></div>`));

  const submit = Button({
    label: 'Entrar',
    id: 'btn-login',
    onClick: () => {
      const res = login({ email: email.value, password: pass.value });
      if (!res.ok) showToast(res.error);
    },
  });
  screen.appendChild(submit);

  const switchLink = el(`<p class="switch">¿No tienes cuenta? <a href="#">Regístrate</a></p>`);
  switchLink.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    navigate('register');
  });
  screen.appendChild(switchLink);

  // Habilita el botón solo cuando ambos campos tienen contenido.
  const refresh = () =>
    submit.classList.toggle('disabled', !(email.value.trim() && pass.value.trim()));
  [email, pass].forEach((f) => f.addEventListener('input', refresh));
  refresh();

  // Utilidad para que el logout pueda limpiar la contraseña.
  screen.resetPassword = () => {
    pass.value = '';
    refresh();
  };

  return screen;
}
