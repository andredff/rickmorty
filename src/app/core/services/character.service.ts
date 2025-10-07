import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Character } from '../models/characters';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character'; // URL da API
  private searchResults = new BehaviorSubject<any[]>([]); // Armazena os resultados da busca
  private currentPage = 1; // Página atual
  private hasMoreResults = true; // Indica se há mais resultados para carregar
  private currentQuery = ''; // Termo de busca atual

  results$ = this.searchResults.asObservable(); // Exponha os resultados como um Observable

  constructor(private http: HttpClient) {}

  // Método para buscar personagens
  searchCharacters(query: string, reset: boolean = false): Observable<any> {
    if (reset) {
      this.resetSearch(query);
    }

    if (!this.hasMoreResults) {
      return new Observable((observer) => observer.complete()); // Retorna um Observable vazio se não houver mais resultados
    }

    // Se o termo de busca estiver vazio, faz um getAll
    if (!query.trim()) {
      return this.fetchAllCharacters();
    }

    return this.fetchCharacters();
  }

  // Verifica se há mais resultados
  hasMore(): boolean {
    return this.hasMoreResults;
  }

  // Reseta a busca
  private resetSearch(query: string): void {
    this.currentPage = 1;
    this.hasMoreResults = true;
    this.searchResults.next([]); // Limpa os resultados anteriores
    this.currentQuery = query; // Atualiza o termo de busca
  }

  // Realiza a chamada à API para buscar personagens com filtro
  private fetchCharacters(): Observable<any> {
    const url = `${this.apiUrl}?name=${this.currentQuery}&page=${this.currentPage}`;
    return this.http.get<Character>(url).pipe(
      tap((response) => this.handleResponse(response))
    );
  }

  // Realiza a chamada à API para buscar todos os personagens
  private fetchAllCharacters(): Observable<any> {
    const url = `${this.apiUrl}?page=${this.currentPage}`;
    return this.http.get<Character>(url).pipe(
      tap((response) => this.handleResponse(response))
    );
  }

  // Manipula a resposta da API
  private handleResponse(response: any): void {
    const currentResults = this.searchResults.value;
    this.searchResults.next([...currentResults, ...response.results]); // Concatena os resultados
    this.hasMoreResults = !!response.info.next; // Verifica se há mais páginas
    this.currentPage++; // Incrementa a página
  }

  clearResults(): void {
    this.searchResults.next([]); // Define os resultados como um array vazio
  }

  getCharacterById(id: string): Observable<any> {
    console.log('Fetching character with ID:', id); // Verifique se o ID está correto
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
