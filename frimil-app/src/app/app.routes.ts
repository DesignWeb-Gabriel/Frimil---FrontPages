import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
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
    loadComponent: () =>
      import('./pages/fazenda/fazenda.component').then(
        (m) => m.FazendaComponent
      ),
  },
  {
    path: 'pesador-gado',
    loadComponent: () =>
      import('./pages/pesador-gado/pesador-gado.component').then(
        (m) => m.PesadorGadoComponent
      ),
  },
  {
    path: 'transportador',
    loadComponent: () =>
      import('./pages/transportador/transportador.component').then(
        (m) => m.TransportadorComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
