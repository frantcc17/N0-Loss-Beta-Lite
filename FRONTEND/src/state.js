// state.js — Estado global de la aplicación (única fuente de verdad).
// Se construye sobre el store reactivo. Cualquier componente puede
// leerlo con store.get() y reaccionar a cambios con store.subscribe().

import { createStore } from './core/store.js';
import { CONFIG } from './config.js';
import { seedMovements } from './data/seed.js';

export const store = createStore({
  screen: 'splash',                       // splash | login | register | dash | profile
  user: { name: CONFIG.defaultUserName, email: '' },
  balance: 250,
  tickets: 25,
  sheet: null,                            // null | 'dep' | 'ret'
  amount: 50,                             // importe seleccionado en el sheet
  movements: seedMovements(),
});
