import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-product-gallery',
  imports: [],
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.css',
})
export class ProductGallery {
  @Input() images: string[] = [];
  @Input() title = '';

  selected = signal(0);
}
