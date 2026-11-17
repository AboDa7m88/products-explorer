import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

// /checkout is allowed only if the cart has items
export const cartNotEmptyGuard: CanActivateFn = () => {
  const cart = inject(CartService);
  const router = inject(Router);
  return cart.items().length > 0 ? true : router.createUrlTree(['/products']);
};

// /order-placed is allowed only if an order exists
export const orderExistsGuard: CanActivateFn = () => {
  const orders = inject(OrderService);
  const router = inject(Router);
  return orders.lastOrder() ? true : router.createUrlTree(['/products']);
};
