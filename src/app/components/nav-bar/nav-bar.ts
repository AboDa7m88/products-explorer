import { Component, Input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { CartButton } from '../cart-button/cart-button';
import { FavoritesOnlyButton } from '../favorites-only-button/favorites-only-button';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, FavoritesOnlyButton, CartButton],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  @Input() favoritesCount = 0;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  favoritesOnly = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('favorites') === '1')),
    { initialValue: false },
  );

  isHome = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('?')[0] === '/'),
    ),
    { initialValue: this.router.url.split('?')[0] === '/' },
  );

  onFavoritesToggle() {
    this.router.navigate(['/products'], {
      queryParams: { favorites: this.favoritesOnly() ? null : '1' },
    });
  }
}
