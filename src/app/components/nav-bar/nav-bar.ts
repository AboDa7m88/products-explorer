import { Component, Input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { FavoritesOnlyButton } from '../favorites-only-button/favorites-only-button';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, FavoritesOnlyButton],
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

  onFavoritesToggle() {
    this.router.navigate(['/'], {
      queryParams: { favorites: this.favoritesOnly() ? null : '1' },
    });
  }
}
