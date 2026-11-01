import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

const STORAGE_KEY = 'favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _favorites = signal<Product[]>(this.load());

  readonly favorites = this._favorites.asReadonly();
  readonly count = computed(() => this._favorites().length);

  isFavorite(id: number): boolean {
    return this._favorites().some((p) => p.id === id);
  }

  toggle(product: Product): void {
    if (this.isFavorite(product.id)) {
      this._favorites.update((list) => list.filter((p) => p.id !== product.id));
    } else {
      this._favorites.update((list) => [...list, product]);
    }
    this.save();
  }

  private load(): Product[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._favorites()));
    } catch {
      // If storage is not available, it won't stop the application.
    }
  }
}
