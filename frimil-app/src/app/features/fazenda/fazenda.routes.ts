import { Routes } from '@angular/router';

export const FAZENDA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/fazenda.component').then(
        (m) => m.FazendaComponent
      ),
  },
  {
    path: 'nova',
    loadComponent: () =>
      import('./components/fazenda.component').then(
        (m) => m.FazendaComponent
      ),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/fazenda.component').then(
        (m) => m.FazendaComponent
      ),
  },
];
