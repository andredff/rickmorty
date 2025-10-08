import { Component } from '@angular/core';
import { FavoritesListComponent } from "../../components/favorites-list/favorites-list.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites-list',
  imports: [FavoritesListComponent, TranslatePipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
