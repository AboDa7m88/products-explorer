import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar implements OnInit, OnDestroy {
  @Input() value = '';
  @Output() searchChange = new EventEmitter<string>();

  private typed$ = new Subject<string>();
  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.typed$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((text) => this.searchChange.emit(text));
  }

  onInput(event: Event) {
    const text = (event.target as HTMLInputElement).value.trim();
    this.typed$.next(text);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
