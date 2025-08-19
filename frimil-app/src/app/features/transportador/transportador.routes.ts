import { Routes } from '@angular/router';

export const TRANSPORTADOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/transportador.component').then(
        (m) => m.TransportadorComponent
      ),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./components/transportador.component').then(
        (m) => m.TransportadorComponent
      ),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/transportador.component').then(
        (m) => m.TransportadorComponent
      ),
  },
];
