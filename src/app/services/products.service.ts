import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product, ProductsResponse } from '../models/product';

const BASE_URL = 'https://dummyjson.com';
export const PAGE_SIZE = 12;

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  getProducts(page: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${BASE_URL}/products?limit=${PAGE_SIZE}&skip=${this.skip(page)}`
    );
  }

  searchProducts(query: string, page: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}&skip=${this.skip(page)}`
    );
  }

  getProductsByCategory(slug: string, page: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${BASE_URL}/products/category/${slug}?limit=${PAGE_SIZE}&skip=${this.skip(page)}`
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL}/products/categories`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/products/${id}`);
  }

  private skip(page: number): number {
    return (page - 1) * PAGE_SIZE;
  }
}
