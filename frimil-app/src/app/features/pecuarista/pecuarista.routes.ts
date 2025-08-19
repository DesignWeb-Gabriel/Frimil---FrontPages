import { Routes } from '@angular/router';

export const PECUARISTA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pecuarista.component').then(
        (m) => m.PecuaristaComponent
      ),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./components/pecuarista.component').then(
        (m) => m.PecuaristaComponent
      ),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/pecuarista.component').then(
        (m) => m.PecuaristaComponent
      ),
  },
];
