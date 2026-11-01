import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorites-only-button',
  imports: [],
  templateUrl: './favorites-only-button.html',
  styleUrl: './favorites-only-button.css',
})
export class FavoritesOnlyButton {
  @Input() active = false;
  @Output() toggle = new EventEmitter<void>();
}
