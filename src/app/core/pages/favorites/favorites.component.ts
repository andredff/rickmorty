import { Component } from '@angular/core';
import { FavoritesList } from "../../components/favoritesList/favorites-list.component";

@Component({
  selector: 'app-favorites-list',
  imports: [FavoritesList],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
