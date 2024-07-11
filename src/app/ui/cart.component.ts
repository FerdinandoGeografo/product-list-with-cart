import { Component, input } from '@angular/core';
import { CartItem } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  template: `
    <div class="cart">
      <h2 class="text text--lg">Your Cart ({{ cart().length }})</h2>
    </div>
  `,
  styles: `
    .cart {
      background: var(--white);
      border-radius: 1.2rem;
      padding: var(--spacing-300);
    }
  `,
})
export class CartComponent {
  cart = input.required<CartItem[]>();
}
