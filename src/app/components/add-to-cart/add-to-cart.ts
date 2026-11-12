import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  imports: [],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css',
})
export class AddToCart {
  @Input({ required: true }) product!: Product;

  private cartService = inject(CartService);

  isPickerOpen = signal(false);
  quantity = signal(1);
  isAdded = signal(false);

  openPicker(): void {
    this.quantity.set(1);
    this.isPickerOpen.set(true);
  }

  closePicker(): void {
    this.isPickerOpen.set(false);
  }

  increase(): void {
    if (this.quantity() < this.product.stock) {
      this.quantity.update((q) => q + 1);
    }
  }

  decrease(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  confirm(): void {
    for (let i = 0; i < this.quantity(); i++) {
      this.cartService.addToCart(this.product);
    }
    this.isPickerOpen.set(false);
    this.isAdded.set(true);
    setTimeout(() => this.isAdded.set(false), 2000);
  }
}
