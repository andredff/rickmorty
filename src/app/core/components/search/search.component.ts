import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  isFloating(isFloating: any) {
    throw new Error('Method not implemented.');
  }
  private searchTerms = new Subject<string>(); // Fluxo de termos de busca

  constructor(private characterService: CharacterService) {
    this.setupSearchSubscription();
  }

  // Configura o fluxo de busca
  private setupSearchSubscription(): void {
    this.searchTerms.pipe(
      debounceTime(300), // Aguarda 300ms após o último evento
      distinctUntilChanged() // Ignora se o termo for o mesmo que o anterior
    ).subscribe((term) => this.performSearch(term));
  }

  // Realiza a busca inicial
  private performSearch(term: string): void {
    if (term.trim()) {
      this.characterService.searchCharacters(term, true).subscribe({
        next: () => {
          console.log('Search initialized with query:', term);
        },
        error: (err) => {
          console.error('Error during search:', err);
        },
      });
    }
  }

  // Método chamado no evento de input
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
