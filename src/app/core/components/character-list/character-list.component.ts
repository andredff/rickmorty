import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Character } from '../../models/characters';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, TranslatePipe],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters$: Observable<Character[]>; // Tipagem ajustada para maior clareza
  isLoading: boolean = false;
  favoriteMap: { [id: number]: boolean } = {}; // Mapa para otimizar o acesso aos favoritos

  constructor(
    private characterService: CharacterService,
    private favoritesService: FavoritesService
  ) {
    this.characters$ = this.characterService.results$;
  }

  ngOnInit(): void {
    // Inicializa os personagens e o mapa de favoritos
    this.loadInitialCharacters();
    this.initializeFavoriteMap();
  }

  // Método para rastrear itens no *ngFor
  trackByCharacterId(index: number, character: Character): number {
    return character.id;
  }

  // Alterna o estado de favorito de um personagem
  toggleFavorite(character: Character): void {
    if (this.favoriteMap[character.id]) {
      this.favoritesService.removeFavorite(character.id);
      delete this.favoriteMap[character.id];
    } else {
      this.favoritesService.addFavorite(character);
      this.favoriteMap[character.id] = true;
    }
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

  // Carrega os personagens iniciais
  private loadInitialCharacters(): void {
    this.characterService.searchCharacters('', true).subscribe({
      next: () => {
        console.log('Initial characters loaded');
      },
      error: (err) => {
        console.error('Error loading initial characters:', err);
      },
    });
  }

  // Detecta o scroll para carregar mais personagens
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThreshold = document.body.offsetHeight - 100;

    if (scrollPosition >= scrollThreshold && !this.isLoading) {
      this.loadMoreCharacters();
    }
  }

  // Carrega mais personagens ao atingir o final da página
  private loadMoreCharacters(): void {
    this.isLoading = true;
    this.characterService.searchCharacters('', false).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading more characters:', err);
        this.isLoading = false;
      },
    });
  }
}
