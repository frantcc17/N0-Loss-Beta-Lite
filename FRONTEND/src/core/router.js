// core/router.js — Navegación entre pantallas.
// Cada página se registra con su nodo raíz; el router muestra la pantalla
// activa (según state.screen) y oculta el resto. Mantener todas las páginas
// en el DOM preserva las animaciones y el estado de los formularios.

import { store } from '../state.js';

const screens = new Map();

/** Registra el nodo raíz de una pantalla bajo un nombre. */
export function registerScreen(name, node) {
  screens.set(name, node);
}

/** Cambia la pantalla activa. */
export function navigate(name) {
  store.set({ screen: name });
}

/** ¿La pantalla actual muestra la barra de pestañas? */
export const screenHasTabs = (name) => name === 'dash' || name === 'profile';

/** Arranca el router: aplica la visibilidad inicial y reacciona a cambios. */
export function startRouter() {
  const apply = (state) => {
    screens.forEach((node, name) =>
      node.classList.toggle('hidden', name !== state.screen)
    );
  };
  apply(store.get());
  store.subscribe(apply);
}
