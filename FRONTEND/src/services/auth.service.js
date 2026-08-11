// services/auth.service.js — Lógica de autenticación.
// Devuelve siempre { ok, error? } para que la UI decida qué mostrar.
// Aquí es donde en el futuro se llamaría a un backend real.

import { store } from '../state.js';
import { navigate } from '../core/router.js';

export function login({ email, password }) {
  if (!email.trim() || !password.trim()) {
    return { ok: false, error: 'Introduce tu correo y contraseña' };
  }
  store.set((s) => ({ ...s, user: { ...s.user, email: email.trim() } }));
  navigate('dash');
  return { ok: true };
}

export function register({ name, email, password }) {
  if (!name.trim() || !email.trim() || !password.trim()) {
    return { ok: false, error: 'Completa todos los campos' };
  }
  store.set({ user: { name: name.trim(), email: email.trim() } });
  navigate('dash');
  return { ok: true };
}

export function logout() {
  navigate('login');
  return { ok: true };
}
