import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackLink } from '../../components/back-link/back-link';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout-page',
  imports: [CurrencyPipe, ReactiveFormsModule, BackLink],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  cart = inject(CartService);
  private orders = inject(OrderService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
  });

  // Show an error only after the user touched the field (or pressed submit)
  isInvalid(name: 'fullName' | 'phone' | 'address'): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // reveals all errors at once
      return;
    }
    this.orders.placeOrder(this.form.getRawValue());
    this.router.navigate(['/order-placed']);
  }
}
