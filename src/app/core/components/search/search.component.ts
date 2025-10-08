import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CharacterService } from '../../services/character.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private searchTerms = new Subject<string>();

  constructor(private characterService: CharacterService) {
    this.setupSearchSubscription();
  }

  private setupSearchSubscription(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((term) => this.performSearch(term));
  }

  private performSearch(term: string): void {
    this.characterService.searchCharacters(term.trim(), true).subscribe({
      next: () => {
        console.log(
          term.trim()
            ? `Search initialized with query: ${term}`
            : 'Search initialized without filters'
        );
      },
      error: (err) => {
        console.error('Error during search:', err);
      },
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
