import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FavoritesService } from '../../services/favorites.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // Importação do AsyncPipe
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, AsyncPipe], // Adicione o AsyncPipe aqui
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  favoritesCount$: Observable<number>;

  constructor(private favoritesService: FavoritesService, public router: Router) {
    // Mapeia o Observable para obter a contagem de favoritos
    this.favoritesCount$ = this.favoritesService.favorites$.pipe(
      map((favorites) => favorites.length)
    );
  }

  checkActiveRoute(route: string): boolean {
    console.log(this.router.url === route)
    return this.router.url === route;
  }
}
