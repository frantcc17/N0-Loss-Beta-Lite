// main.js — Punto de entrada. Ensambla las páginas y los componentes
// globales dentro de #app, registra las pantallas en el router y arranca.

import { store } from './state.js';
import { CONFIG } from './config.js';
import { registerScreen, startRouter, navigate } from './core/router.js';

// Páginas
import { SplashPage } from './pages/SplashPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { ProfilePage } from './pages/ProfilePage.js';

// Componentes globales (viven fuera de las páginas)
import { TabBar } from './components/TabBar.js';
import { mountSheet } from './components/Sheet.js';
import { mountToast } from './components/Toast.js';

function bootstrap() {
  const app = document.getElementById('app');

  // 1) Instanciar las páginas.
  const splash = SplashPage();
  const login = LoginPage();
  const register = RegisterPage();
  const dashboard = DashboardPage();
  const profile = ProfilePage({ onLogout: () => login.resetPassword?.() });

  // 2) Registrarlas en el router y añadirlas al DOM.
  const pages = { splash, login, register, dash: dashboard, profile };
  Object.entries(pages).forEach(([name, node]) => {
    registerScreen(name, node);
    app.appendChild(node);
  });

  // 3) Componentes globales.
  app.appendChild(TabBar());
  app.appendChild(mountSheet());
  app.appendChild(mountToast());

  // 4) Arrancar el router (aplica visibilidad según state.screen).
  startRouter();

  // 5) Splash -> login tras el tiempo configurado.
  setTimeout(() => {
    if (store.get().screen === 'splash') navigate('login');
  }, CONFIG.splashMs);
}

bootstrap();
