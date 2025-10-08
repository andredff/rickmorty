import { RenderMode, ServerRoute } from '@angular/ssr';

export const routesIDs: string[] = [
  '1', // Rick Sanchez
  '2', // Morty Smith
];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'personagem/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      // Mapear os IDs para os parâmetros de prerendering
      return routesIDs.map((id) => ({ id }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
