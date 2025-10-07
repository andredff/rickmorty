import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FavoritesService } from '../../services/favorites.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  favoritesCount$: Observable<number>;

  constructor(private favoritesService: FavoritesService, public router: Router) {
    this.favoritesCount$ = this.favoritesService.favorites$.pipe(
      map((favorites) => favorites.length)
    );
  }

  checkActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
