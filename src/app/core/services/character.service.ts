import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Character } from '../models/characters';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';
  private searchResults = new BehaviorSubject<any[]>([]);
  private currentPage = 1;
  private hasMoreResults = true;
  private currentQuery = '';

  results$ = this.searchResults.asObservable();
  constructor(private http: HttpClient) {}

  searchCharacters(query: string, reset: boolean = false): Observable<any> {
    if (reset) {
      this.resetSearch(query);
    }

    if (!this.hasMoreResults) {
      return new Observable((observer) => observer.complete()); // Retorna um Observable vazio se não houver mais resultados
    }

    if (!query.trim()) {
      return this.fetchAllCharacters();
    }

    return this.fetchCharacters();
  }

  hasMore(): boolean {
    return this.hasMoreResults;
  }

  private resetSearch(query: string): void {
    this.currentPage = 1;
    this.hasMoreResults = true;
    this.searchResults.next([]);
    this.currentQuery = query;
  }

  private fetchCharacters(): Observable<any> {
    const url = `${this.apiUrl}?name=${this.currentQuery}&page=${this.currentPage}`;
    return this.http.get<Character>(url).pipe(
      tap((response) => this.handleResponse(response))
    );
  }

  private fetchAllCharacters(): Observable<any> {
    const url = `${this.apiUrl}?page=${this.currentPage}`;
    return this.http.get<Character>(url).pipe(
      tap((response) => this.handleResponse(response))
    );
  }

  private handleResponse(response: any): void {
    const currentResults = this.searchResults.value;
    this.searchResults.next([...currentResults, ...response.results]);
    this.hasMoreResults = !!response.info.next;
    this.currentPage++;
  }

  clearResults(): void {
    this.searchResults.next([]);
  }

  getCharacterById(id: string): Observable<any> {
    console.log('Fetching character with ID:', id);
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
