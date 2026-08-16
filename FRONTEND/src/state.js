// state.js — Estado global (única fuente de verdad).
import { createStore } from './core/store.js';
import { CONFIG } from './config.js';
import { seedMovements } from './data/seed.js';

export const store = createStore({
  screen: 'splash',
  user: { name: CONFIG.defaultUserName, email: '' },
  balance: 2500,
  tickets: 250,
  sheet: null,
  amount: 100,
  movements: seedMovements(),
});
