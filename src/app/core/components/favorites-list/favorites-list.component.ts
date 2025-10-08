import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, RouterLink],
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

  // Remove um personagem dos favoritos
  removeFavorite(characterId: number): void {
    this.favoritesService.removeFavorite(characterId);
  }
}
