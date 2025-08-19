import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'editar',
    loadComponent: () =>
      import('./components/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
];
