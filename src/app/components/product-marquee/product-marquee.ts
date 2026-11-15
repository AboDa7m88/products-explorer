import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { FavoritesService } from '../../services/favorites.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-marquee',
  imports: [RouterLink, ProductCard],
  templateUrl: './product-marquee.html',
  styleUrl: './product-marquee.css',
})
export class ProductMarquee {
  heading = input('');
  products = input<Product[]>([]);
  favorites = inject(FavoritesService);

  loopProducts = computed(() => [...this.products(), ...this.products()]);
}
