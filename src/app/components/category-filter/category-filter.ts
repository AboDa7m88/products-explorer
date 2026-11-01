import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/product';

@Component({
  selector: 'app-category-filter',
  imports: [],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css',
})
export class CategoryFilter {
  @Input() categories: Category[] = [];
  @Input() value = '';
  @Output() categoryChange = new EventEmitter<string>();

  onChange(event: Event) {
    const slug = (event.target as HTMLSelectElement).value;
    this.categoryChange.emit(slug);
  }
}
