import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private storageKey = 'shopping_cart';

  // Load cart from LocalStorage
  private loadCart(): CartItem[] {
    try {
      const savedCart = localStorage.getItem(this.storageKey);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  }

  // Cart State
  private cart = signal<CartItem[]>(this.loadCart());

  // Expose cart as readonly
  items = this.cart.asReadonly();

  // Total quantity of all products
  totalItems = computed(() =>
    this.cart().reduce((total, item) => total + item.quantity, 0)
  );

  // Calculate discounted price
  discountedPrice(product: Product): number {
    return product.price * (1 - product.discountPercentage / 100);
  }

  // Calculate subtotal for one product
  itemSubtotal(item: CartItem): number {
    return this.discountedPrice(item.product) * item.quantity;
  }

  // Calculate total cart price
  subtotal = computed(() =>
    this.cart().reduce(
      (total, item) => total + this.itemSubtotal(item),
      0
    )
  );

  // Save cart to LocalStorage
  private saveCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart()));
  }

  // Add product to cart
  addToCart(product: Product): void {
    if (product.stock <= 0) return;

    this.cart.update(items => {
      const existingItem = items.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stock),
              }
            : item
        );
      }

      return [...items, { product, quantity: 1 }];
    });

    this.saveCart();
  }

  // Increase quantity
  increaseQuantity(productId: number): void {
    this.cart.update(items =>
      items.map(item =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.product.stock),
            }
          : item
      )
    );

    this.saveCart();
  }

  // Decrease quantity
  decreaseQuantity(productId: number): void {
    this.cart.update(items =>
      items
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );

    this.saveCart();
  }

  // Remove product
  removeFromCart(productId: number): void {
    this.cart.update(items =>
      items.filter(item => item.product.id !== productId)
    );

    this.saveCart();
  }

  // Clear cart
  clearCart(): void {
    this.cart.set([]);
    this.saveCart();
  }
}
