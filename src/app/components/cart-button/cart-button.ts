import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './cart-button.html',
  styleUrl: './cart-button.css',
})
export class CartButton {
  cart = inject(CartService);
}
