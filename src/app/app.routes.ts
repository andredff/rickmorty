import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { FavoritesComponent } from './core/pages/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'favoritos',
    component: FavoritesComponent
  }
];
