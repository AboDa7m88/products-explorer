import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products-page/products-page';
import { ProductDetailsPage } from './pages/product-details-page/product-details-page';
import { ProductNotFound } from './pages/product-not-found/product-not-found';
import { CartPage } from './pages/cart-page/cart-page';
import { HomePage } from './pages/home-page/home-page';
import { CheckoutPage } from './pages/checkout-page/checkout-page';
import { OrderPlacedPage } from './pages/order-placed-page/order-placed-page';
import { cartNotEmptyGuard, orderExistsGuard } from './guards/checkout.guards';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'products', component: ProductsPage },
  { path: 'products/:id', component: ProductDetailsPage },
  { path: 'cart', component: CartPage },
  { path: 'checkout', component: CheckoutPage, canActivate: [cartNotEmptyGuard] },
  { path: 'order-placed', component: OrderPlacedPage, canActivate: [orderExistsGuard] },
  { path: '**', component: ProductNotFound },
];
