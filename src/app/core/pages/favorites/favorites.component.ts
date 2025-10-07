import { Component } from '@angular/core';
import { FavoritesListComponent } from "../../components/favorites-list/favorites-list.component";

@Component({
  selector: 'app-favorites-list',
  imports: [FavoritesListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
