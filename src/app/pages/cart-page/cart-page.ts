import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import {BackLink} from "../../components/back-link/back-link";
@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, RouterLink, BackLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  cart = inject(CartService);
}
