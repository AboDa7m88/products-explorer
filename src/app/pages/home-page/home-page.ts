import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../components/hero/hero';
import { ProductMarquee } from '../../components/product-marquee/product-marquee';
import { Category, Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home-page',
  imports: [Hero, ProductMarquee, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private productsService = inject(ProductsService);

  categories = signal<Category[]>([]);
  deals = signal<Product[]>([]);

  ngOnInit() {
    this.productsService.getCategories().subscribe((list) => this.categories.set(list));
    this.productsService.getTopDeals(12).subscribe((res) => this.deals.set(res.products));
  }
}
