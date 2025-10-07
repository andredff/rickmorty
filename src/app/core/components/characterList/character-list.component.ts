import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent {
  characters$: Observable<any>; // Inscreve-se nos resultados da busca
  isLoading: boolean = false; // Controle para evitar chamadas duplicadas

  constructor(
    private characterService: CharacterService,
    private favoritesService: FavoritesService
  ) {
    this.characters$ = this.characterService.results$;
  }

  // Adiciona ou remove um personagem dos favoritos
  toggleFavorite(character: any): void {
    if (this.favoritesService.isFavorite(character.id)) {
      this.favoritesService.removeFavorite(character.id);
    } else {
      this.favoritesService.addFavorite(character);
    }
  }

  // Verifica se um personagem está nos favoritos
  isFavorite(characterId: number): boolean {
    return this.favoritesService.isFavorite(characterId);
  }
}
