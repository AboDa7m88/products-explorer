import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products-page/products-page';
import { ProductDetailsPage } from './pages/product-details-page/product-details-page';

export const routes: Routes = [
  { path: '', component: ProductsPage },
  { path: 'products/:id', component: ProductDetailsPage },
  { path: '**', redirectTo: '' },
];
