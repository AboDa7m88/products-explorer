import { Component, Input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { FavoritesOnlyButton } from '../favorites-only-button/favorites-only-button';
import { CartService } from '../../services/cart.service';
import{ CartButton } from '../cart-button/cart-button';

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
  cart = inject(CartService);

  favoritesOnly = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('favorites') === '1')),
    { initialValue: false },
  );

  onFavoritesToggle() {
    this.router.navigate(['/'], {
      queryParams: { favorites: this.favoritesOnly() ? null : '1' },
    });
  }
}
