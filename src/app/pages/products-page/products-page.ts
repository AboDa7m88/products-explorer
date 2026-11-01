import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, catchError, combineLatest, map, switchMap, tap } from 'rxjs';
import { CategoryFilter } from '../../components/category-filter/category-filter';
import { FavoritesOnlyButton } from '../../components/favorites-only-button/favorites-only-button';
import { Pagination } from '../../components/pagination/pagination';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductCardSkeleton } from '../../components/product-card-skeleton/product-card-skeleton';
import { SearchBar } from '../../components/search-bar/search-bar';
import { StateMessage } from '../../components/state-message/state-message';
import { Category, Product } from '../../models/product';
import { FavoritesService } from '../../services/favorites.service';
import { PAGE_SIZE, ProductsService } from '../../services/products.service';

type Status = 'loading' | 'error' | 'success';

@Component({
  selector: 'app-products-page',
  imports: [
    ProductCard,
    ProductCardSkeleton,
    Pagination,
    SearchBar,
    CategoryFilter,
    FavoritesOnlyButton,
    StateMessage,
  ],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage implements OnInit {
  favorites = inject(FavoritesService);
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reload$ = new BehaviorSubject<void>(undefined);

  status = signal<Status>('loading');
  skeletons = Array.from({ length: PAGE_SIZE }, (_, i) => i);

  apiProducts = signal<Product[]>([]);
  apiTotalPages = signal(1);
  categories = signal<Category[]>([]);
  page = signal(1);
  query = signal('');
  category = signal('');
  favoritesOnly = signal(false);

  products = computed(() => {
    if (!this.favoritesOnly()) return this.apiProducts();
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.favorites.favorites().slice(start, start + PAGE_SIZE);
  });

  totalPages = computed(() =>
    this.favoritesOnly()
      ? Math.max(1, Math.ceil(this.favorites.favorites().length / PAGE_SIZE))
      : this.apiTotalPages(),
  );

  emptyMessage = computed(() => {
    if (this.query()) return `No results for "${this.query()}".`;
    if (this.favoritesOnly()) return 'You have not saved any favorites yet.';
    if (this.category()) return 'There are no products in this category.';
    return '';
  });

  emptyButton = computed(() => (this.query() ? 'Clear search' : 'Show all products'));

  ngOnInit() {
    this.productsService.getCategories().subscribe((list) => this.categories.set(list));

    combineLatest([this.route.queryParamMap, this.reload$])
      .pipe(
        map(([params]) => ({
          page: Number(params.get('page')) || 1,
          q: params.get('q') ?? '',
          category: params.get('category') ?? '',
          favoritesOnly: params.get('favorites') === '1',
        })),
        tap(({ page, q, category, favoritesOnly }) => {
          this.page.set(page);
          this.query.set(q);
          this.category.set(category);
          this.favoritesOnly.set(favoritesOnly);
          this.status.set(favoritesOnly ? 'success' : 'loading');
        }),
        switchMap(({ page, q, category, favoritesOnly }) => {
          if (favoritesOnly) return EMPTY;
          const request = q
            ? this.productsService.searchProducts(q, page)
            : category
              ? this.productsService.getProductsByCategory(category, page)
              : this.productsService.getProducts(page);
          return request.pipe(
            catchError(() => {
              this.status.set('error');
              return EMPTY;
            }),
          );
        }),
      )
      .subscribe((res) => {
        this.apiProducts.set(res.products);
        this.apiTotalPages.set(Math.ceil(res.total / PAGE_SIZE));
        this.status.set('success');
      });
  }

  retry() {
    this.reload$.next();
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      queryParams: { page: page === 1 ? null : page },
      queryParamsHandling: 'merge',
    });
  }

  onSearch(q: string) {
    this.router.navigate([], {
      queryParams: { q: q || null, category: null, favorites: null, page: null },
      queryParamsHandling: 'merge',
    });
  }

  onCategoryChange(category: string) {
    this.router.navigate([], {
      queryParams: { category: category || null, q: null, favorites: null, page: null },
      queryParamsHandling: 'merge',
    });
  }

  onFavoritesOnlyToggle() {
    this.router.navigate([], {
      queryParams: {
        favorites: this.favoritesOnly() ? null : '1',
        q: null,
        category: null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onClearFilters() {
    this.router.navigate([], {
      queryParams: { q: null, category: null, favorites: null, page: null },
      queryParamsHandling: 'merge',
    });
  }
}
