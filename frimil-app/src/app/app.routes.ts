import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'pecuarista',
    loadChildren: () =>
      import('./features/pecuarista/pecuarista.routes').then(
        (m) => m.PECUARISTA_ROUTES
      ),
  },
  {
    path: 'fazenda',
    loadChildren: () =>
      import('./features/fazenda/fazenda.routes').then((m) => m.FAZENDA_ROUTES),
  },
  {
    path: 'pesador-gado',
    loadChildren: () =>
      import('./features/pesador-gado/pesador-gado.routes').then(
        (m) => m.PESADOR_GADO_ROUTES
      ),
  },
  {
    path: 'transportador',
    loadChildren: () =>
      import('./features/transportador/transportador.routes').then(
        (m) => m.TRANSPORTADOR_ROUTES
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/register/register.routes').then((m) => m.REGISTER_ROUTES),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
