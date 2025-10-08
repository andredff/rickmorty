import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { FavoritesService } from '../../services/favorites.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CharacterCardComponent, TranslatePipe],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  characterId!: string;
  character$!: Observable<any>;

  constructor(private route: ActivatedRoute, public characterService: CharacterService, public favoritesService: FavoritesService,) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.characterId = this.route.snapshot.paramMap.get('id')!;
    console.log('Character ID:', this.characterId);
    this.fetchCharacterDetails();
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


  fetchCharacterDetails(): void {
    this.character$ = this.characterService.getCharacterById(this.characterId);
  }
}
