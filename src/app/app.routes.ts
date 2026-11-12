import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products-page/products-page';
import { ProductDetailsPage } from './pages/product-details-page/product-details-page';
import { ProductNotFound } from './pages/product-not-found/product-not-found';
import { CartPage } from './pages/cart-page/cart-page';
export const routes: Routes = [
  { path: '', component: ProductsPage },
  { path: 'products/:id', component: ProductDetailsPage },
  { path: 'cart', component: CartPage },
  { path: '**', component: ProductNotFound },
];
