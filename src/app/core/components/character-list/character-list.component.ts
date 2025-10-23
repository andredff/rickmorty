import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { TranslateService } from '@ngx-translate/core';
import { Character } from '../../models/characters';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  favoriteMap: { [id: number]: boolean } = {};
  emptySearchText: string = '';
  tryAgainText: string = '';

  constructor(
    private characterService: CharacterService,
    private favoritesService: FavoritesService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
    this.initializeFavoriteMap();
    this.preTranslateTexts();
  }

  // Método para rastrear itens no *ngFor
  trackByCharacterId(index: number, character: Character): number {
    return character.id;
  }

  // Alterna o estado de favorito de um personagem
  onToggleFavorite(character: Character): void {
    if (this.favoriteMap[character.id]) {
      this.favoritesService.removeFavorite(character.id);
      delete this.favoriteMap[character.id];
    } else {
      this.favoritesService.addFavorite(character);
      this.favoriteMap[character.id] = true;
    }
  }

  // Carrega os personagens iniciais
  private loadCharacters(): void {
    this.characterService.results$.subscribe((characters) => {
      this.characters = characters;
    });
  }

  // Inicializa o mapa de favoritos
  private initializeFavoriteMap(): void {
    this.favoritesService.favorites$.subscribe((favorites) => {
      this.favoriteMap = favorites.reduce((map, character) => {
        map[character.id] = true;
        return map;
      }, {} as { [id: number]: boolean });
    });
  }

  // Pré-traduz os textos para evitar chamadas desnecessárias ao pipe translate
  private preTranslateTexts(): void {
    this.emptySearchText = this.translate.instant('app.emptySearch');
    this.tryAgainText = this.translate.instant('app.tryAgain');
  }
}
