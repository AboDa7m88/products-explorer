import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Components
import { NavBar } from './components/nav-bar/nav-bar';
import { ProductCard } from './components/product-card/product-card';
import { Pagination } from './components/pagination/pagination';

// Services
import { Product } from './models/product';
import { FavoritesService } from './services/favorites.service';
import { PAGE_SIZE, ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, ProductCard, Pagination],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  favorites = inject(FavoritesService);
  private productsService = inject(ProductsService);

  products = signal<Product[]>([]);
  page = signal(1);
  totalPages = signal(1);

  ngOnInit() {
    this.load();
  }

  onPageChange(page: number) {
    this.page.set(page);
    this.load();
  }

  private load() {
    this.productsService.getProducts(this.page()).subscribe((res) => {
      this.products.set(res.products);
      this.totalPages.set(Math.ceil(res.total / PAGE_SIZE));
    });
  }
}
