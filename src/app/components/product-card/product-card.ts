import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { FavoriteButton } from '../favorite-button/favorite-button';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, FavoriteButton],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Input() isFavorite = false;
  @Output() favoriteToggle = new EventEmitter<Product>();

  get hasDiscount(): boolean {
    return this.product.discountPercentage > 0;
  }
  get discountedPrice(): number {
    return this.product.price * (1 - this.product.discountPercentage / 100);
  }
}
