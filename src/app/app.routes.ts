import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'favoritos',
    loadChildren: () =>
      import('./core/pages/favorites/favorites-module').then(
        (m) => m.FavoritesModule
      ),
  },
];
