import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'dashboard',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pecuarista',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pecuarista/novo',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pecuarista/editar/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { id: '1' },
      { id: '2' },
      { id: '3' }
    ]
  },
  {
    path: 'fazenda',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'fazenda/nova',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'fazenda/editar/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { id: '1' },
      { id: '2' }
    ]
  },
  {
    path: 'pesador-gado',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pesador-gado/novo',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pesador-gado/editar/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { id: '1' },
      { id: '2' }
    ]
  },
  {
    path: 'transportador',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'transportador/novo',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'transportador/editar/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { id: '1' },
      { id: '2' }
    ]
  },
  {
    path: 'profile',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'profile/editar',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
