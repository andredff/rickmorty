import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../models/characters';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites = new BehaviorSubject<Character[]>([]); // Lista de favoritos
  favorites$ = this.favorites.asObservable(); // Observable para expor os favoritos

  addFavorite(character: Character): void {
    const currentFavorites = this.favorites.value;
    if (!currentFavorites.find((fav) => fav.id === character.id)) {
      this.favorites.next([...currentFavorites, character]);
    }
  }

  removeFavorite(characterId: number): void {
    const currentFavorites = this.favorites.value;
    this.favorites.next(currentFavorites.filter((fav) => fav.id !== characterId));
  }

  getFavoritesCount(): number {
    return this.favorites.value.length; // Retorna a contagem de favoritos
  }

  isFavorite(characterId: number): boolean {
    return this.favorites.value.some((fav) => fav.id === characterId);
  }
}
