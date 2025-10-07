import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { FavoritesList } from "../../components/favoritesList/favorites-list.component";

@Component({
  selector: 'app-favorites-list',
  imports: [TitleComponent, FavoritesList],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
