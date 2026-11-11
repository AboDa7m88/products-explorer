import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EMPTY, catchError, map, switchMap } from 'rxjs';
import { ProductGallery } from '../../components/product-gallery/product-gallery';
import { Product } from '../../models/product';
import { FavoritesService } from '../../services/favorites.service';
import { ProductsService } from '../../services/products.service';
import {BackLink} from "../../components/back-link/back-link";


@Component({
  selector: 'app-product-details-page',
  imports: [CurrencyPipe, DecimalPipe, RouterLink, ProductGallery, BackLink],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.css',
})
export class ProductDetailsPage implements OnInit {
  favorites = inject(FavoritesService);
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  product = signal<Product | null>(null);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) =>
          this.productsService.getProduct(id).pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === 404) {
                this.router.navigate(['/not-found'], { replaceUrl: true });
              }
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe((product) => this.product.set(product));
  }
}
