import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input({ required: true }) page!: number;
  @Input({ required: true }) totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  get isFirst(): boolean {
    return this.page <= 1;
  }

  get isLast(): boolean {
    return this.page >= this.totalPages;
  }

  go(page: number) {
    this.pageChange.emit(page);
  }
}
