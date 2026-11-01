import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  imports: [],
  templateUrl: './favorite-button.html',
  styleUrl: './favorite-button.css',
})
export class FavoriteButton {
  @Input() active = false;
  @Output() toggle = new EventEmitter<void>();

  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.toggle.emit();
  }
}
