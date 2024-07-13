import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { CurrencyPipe } from '@angular/common';
import { GlobalStoreService } from '../../data-access/global-store.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <aside class="cart">
      <h2 class="cart__heading text text--lg">
        Your Cart ({{ cart().length }})
      </h2>

      <ul class="cart__items">
        @for (item of cart(); track $index) {
        <li>
          <div class="item">
            <div class="item__data-box">
              <p class="text text--sm text--semibold item__name">
                {{ item.product.name }}
              </p>

              <span class="text text--sm text--semibold item__quantity">
                {{ item.quantity }}x
              </span>

              <span class="text text--sm text--regular item__price">
                &commat; {{ item.product.price | currency : '$' }}
              </span>

              <span class="text text--sm text--semibold item__subtotal">
                {{ item.product.price * item.quantity | currency : '$' }}
              </span>
            </div>

            <button
              class="item__remove"
              (click)="store.removeCartItem(item.product)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8.75"
                height="8.75"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="currentColor"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </button>
          </div>
        </li>
        } @empty {
        <div class="cart__empty">
          <img src="images/illustration-empty-cart.svg" alt="" />

          <p class="text text--sm text--semibold">
            Your added items will appear here
          </p>
        </div>
        }
      </ul>

      @if (cart().length > 0) {
      <div class="cart__total">
        <span class="text text--sm text--regular">Order Total</span>
        <span class="text text--lg">{{ store.total() | currency : '$' }}</span>
      </div>

      <div class="cart__delivery">
        <img src="images/icon-carbon-neutral.svg" alt="" />
        <span class="text text--sm text--regular">
          This is a
          <span class="text--semibold">carbon-neutral</span> delivery
        </span>
      </div>

      <button class="cart__confirm">
        <span class="text text--md text--semibold">Confirm Order</span>
      </button>
      }
    </aside>
  `,
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  protected store = inject(GlobalStoreService);
  cart = input.required<CartItem[]>();
}
