import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-state-message',
  imports: [],
  templateUrl: './state-message.html',
  styleUrl: './state-message.css',
})
export class StateMessage {
  @Input() icon = '⚠️';
  @Input({ required: true }) title!: string;
  @Input() message = '';
  @Input() buttonLabel = '';
  @Input() outline = false;
  @Output() action = new EventEmitter<void>();
}
