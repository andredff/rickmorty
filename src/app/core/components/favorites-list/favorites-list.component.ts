import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Character } from '../../models/characters';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, RouterLink, TranslatePipe],
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent {
  favorites$: Observable<any[]>;

  constructor(private favoritesService: FavoritesService, public router: Router) {
    this.favorites$ = this.favoritesService.favorites$;
    this.favorites$.subscribe((favorites) => {
    });
  }

  trackByFavoriteId(index: number, character: Character): number {
    return character.id; // Retorna o ID único do personagem
  }

  onRemoveFavorite(characterId: number): void {
    this.removeFavorite(characterId);
  }

  // Remove um personagem dos favoritos
  removeFavorite(characterId: number): void {
    this.favoritesService.removeFavorite(characterId);
  }
}
