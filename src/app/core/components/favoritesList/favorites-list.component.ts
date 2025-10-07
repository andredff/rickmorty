import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../characterCard/character-card.component';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesList {
  favorites$: Observable<any[]>;

  constructor(private favoritesService: FavoritesService) {
    this.favorites$ = this.favoritesService.favorites$;
    this.favorites$.subscribe((favorites) => {
    });
  }


  // Remove um personagem dos favoritos
  removeFavorite(characterId: number): void {
    this.favoritesService.removeFavorite(characterId);
  }
}
