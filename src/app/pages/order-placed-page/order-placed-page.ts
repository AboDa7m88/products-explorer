import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-placed-page',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './order-placed-page.html',
  styleUrl: './order-placed-page.css',
})
export class OrderPlacedPage {
  order = inject(OrderService).lastOrder;
}
