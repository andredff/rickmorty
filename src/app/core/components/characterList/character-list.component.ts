import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../characterCard/character-card.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters$: Observable<any>; // Inscreve-se nos resultados da busca
  isLoading: boolean = false; // Controle para evitar chamadas duplicadas

  constructor(
    private characterService: CharacterService,
    public favoritesService: FavoritesService
  ) {
    this.characters$ = this.characterService.results$;
  }

  ngOnInit(): void {
    // Carrega os personagens ao inicializar o componente
    this.characterService.searchCharacters('', true).subscribe({
      next: () => {
        console.log('Initial characters loaded');
      },
      error: (err) => {
        console.error('Error loading initial characters:', err);
      },
    });
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

  // Evento de rolagem para carregar mais personagens
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThreshold = document.body.offsetHeight - 100;

    if (scrollPosition >= scrollThreshold && !this.isLoading) {
      this.loadMoreCharacters();
    }
  }

  private loadMoreCharacters(): void {
    this.isLoading = true; // Define como carregando
    this.characterService.searchCharacters('', false).subscribe({
      next: () => {
        this.isLoading = false; // Libera para novas chamadas após a conclusão
      },
      error: (err) => {
        console.error('Error loading more characters:', err);
        this.isLoading = false; // Libera mesmo em caso de erro
      },
    });
  }
}
