// core/store.js — Store reactivo minimalista (patrón observable / pub-sub).
// No requiere ninguna librería: mantiene un estado inmutable y notifica
// a los suscriptores en cada cambio.

export function createStore(initialState) {
  let state = initialState;
  const subscribers = new Set();

  /** Devuelve el estado actual (solo lectura). */
  const get = () => state;

  /**
   * Actualiza el estado. Acepta:
   *  - un objeto parcial:  set({ balance: 300 })
   *  - una función:        set(s => ({ ...s, balance: s.balance + 10 }))
   * y avisa a todos los suscriptores.
   */
  const set = (patch) => {
    const next = typeof patch === 'function' ? patch(state) : { ...state, ...patch };
    state = next;
    subscribers.forEach((fn) => fn(state));
    return state;
  };

  /**
   * Registra un suscriptor. Se ejecuta en cada cambio de estado.
   * Devuelve una función para cancelar la suscripción.
   */
  const subscribe = (fn) => {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  };

  return { get, set, subscribe };
}
