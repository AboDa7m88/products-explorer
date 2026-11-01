import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ProductGallery } from '../../components/product-gallery/product-gallery';
import { Product } from '../../models/product';
import { FavoritesService } from '../../services/favorites.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details-page',
  imports: [CurrencyPipe, RouterLink, ProductGallery],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.css',
})
export class ProductDetailsPage implements OnInit {
  favorites = inject(FavoritesService);
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  product = signal<Product | null>(null);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) => this.productsService.getProduct(id)),
      )
      .subscribe((product) => this.product.set(product));
  }
}
