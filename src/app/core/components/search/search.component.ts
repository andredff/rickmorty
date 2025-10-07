import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private searchTerms = new Subject<string>(); // Fluxo de termos de busca
  isLoading: boolean = false; // Indica se a busca está em andamento

  constructor(private characterService: CharacterService) {
    this.setupSearchSubscription();
  }

  // Configura o fluxo de busca
  private setupSearchSubscription(): void {
    this.searchTerms.pipe(
      debounceTime(300), // Aguarda 300ms após o último evento
      distinctUntilChanged(), // Ignora se o termo for o mesmo que o anterior
      tap(() => (this.isLoading = true)), // Define o estado de carregamento
      switchMap((term) =>
        term.trim()
          ? this.characterService.searchCharacters(term, true).pipe(
              catchError((err) => {
                console.error('Error during search:', err);
                return of([]); // Retorna um array vazio em caso de erro
              })
            )
          : of([]) // Retorna um array vazio se o termo estiver vazio
      ),
      tap(() => (this.isLoading = false)) // Finaliza o estado de carregamento
    ).subscribe({
      next: () => {
        console.log('Search completed');
      },
    });
  }

  // Método chamado no evento de input
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
