import { Routes } from '@angular/router';

export const PESADOR_GADO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pesador-gado.component').then(
        (m) => m.PesadorGadoComponent
      ),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./components/pesador-gado.component').then(
        (m) => m.PesadorGadoComponent
      ),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/pesador-gado.component').then(
        (m) => m.PesadorGadoComponent
      ),
  },
];
