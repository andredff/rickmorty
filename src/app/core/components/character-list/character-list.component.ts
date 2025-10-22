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
  characters$: Observable<any>;
  isLoading: boolean = false;

  constructor(
    private characterService: CharacterService,
    public favoritesService: FavoritesService,
  ) {
    this.characters$ = this.characterService.results$;
  }

  ngOnInit(): void {
    this.characterService.searchCharacters('', true).subscribe({
      next: () => {
        console.log('Initial characters loaded');
      },
      error: (err) => {
        console.error('Error loading initial characters:', err);
      },
    });
  }

  trackByCharacterId(index: number, character: Character): number {
    return character.id;
  }

  toggleFavorite(character: any): void {
    if (this.favoritesService.isFavorite(character.id)) {
      this.favoritesService.removeFavorite(character.id);
    } else {
      this.favoritesService.addFavorite(character);
    }
  }

  isFavorite(characterId: number): boolean {
    return this.favoritesService.isFavorite(characterId);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThreshold = document.body.offsetHeight - 100;

    if (scrollPosition >= scrollThreshold && !this.isLoading) {
      this.loadMoreCharacters();
    }
  }

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
