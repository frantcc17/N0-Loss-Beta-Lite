// pages/RegisterPage.js — Pantalla de creación de cuenta.
import { el } from '../core/dom.js';
import { Field } from '../components/Field.js';
import { Button } from '../components/Button.js';
import { register } from '../services/auth.service.js';
import { navigate } from '../core/router.js';
import { showToast } from '../components/Toast.js';

export function RegisterPage() {
  const screen = el(`<div id="screen-register" class="screen auth hidden"></div>`);

  screen.appendChild(el(`<h1 class="title">Crea tu cuenta</h1>`));
  screen.appendChild(el(`<p class="sub">Tu capital siempre intacto.</p>`));

  const fields = el(`<div class="fields"></div>`);
  const name = Field({ type: 'text', id: 'reg-name', placeholder: 'Nombre', autocomplete: 'name' });
  const email = Field({ type: 'email', id: 'reg-email', placeholder: 'Correo electrónico', autocomplete: 'email' });
  const pass = Field({ type: 'password', id: 'reg-pass', placeholder: 'Contraseña', autocomplete: 'new-password' });
  fields.append(name, email, pass);
  screen.appendChild(fields);

  const submit = Button({
    label: 'Crear cuenta',
    id: 'btn-register',
    style: 'margin-top:24px',
    onClick: () => {
      const res = register({ name: name.value, email: email.value, password: pass.value });
      if (!res.ok) showToast(res.error);
    },
  });
  screen.appendChild(submit);

  const switchLink = el(`<p class="switch">¿Ya tienes cuenta? <a href="#">Inicia sesión</a></p>`);
  switchLink.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    navigate('login');
  });
  screen.appendChild(switchLink);

  const refresh = () =>
    submit.classList.toggle(
      'disabled',
      !(name.value.trim() && email.value.trim() && pass.value.trim())
    );
  [name, email, pass].forEach((f) => f.addEventListener('input', refresh));
  refresh();

  return screen;
}
