import { Injectable, inject, signal } from '@angular/core';
import { CustomerInfo, Order } from '../models/order';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private cart = inject(CartService);
  private storageKey = 'last_order';

  // Last placed order (null if there is none)
  lastOrder = signal<Order | null>(this.load());

  placeOrder(customer: CustomerInfo): Order {
    const order: Order = {
      id: `PE-${Math.floor(100000 + Math.random() * 900000)}`, // fake order number
      customer,
      items: this.cart.items(),
      total: this.cart.subtotal(),
      createdAt: new Date().toISOString(),
    };

    this.lastOrder.set(order);
    this.save(order);
    this.cart.clearCart(); // empty the cart after we copied its items
    return order;
  }

  private load(): Order | null {
    try {
      const saved = sessionStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  private save(order: Order): void {
    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(order));
    } catch {
      // ignore storage errors
    }
  }
}
