import { Component, computed, input } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="cart">
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

            <button class="item__remove">
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
        <aside class="cart__empty">
          <img src="images/illustration-empty-cart.svg" alt="" />

          <p class="text text--sm text--semibold">
            Your added items will appear here
          </p>
        </aside>
        }
      </ul>

      @if (cart().length > 0) {
      <div class="cart__total">
        <span class="text text--sm text--regular">Order Total</span>
        <span class="text text--lg">{{ total() | currency : '$' }}</span>
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
    </div>
  `,
  styles: `
    :host { grid-column: 9 / -1 }

    .cart {
      background: var(--white);
      border-radius: 1.2rem;
      padding: var(--spacing-300);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-300);

      &__heading {
        color: var(--red);
      }

      &__items {
        display: flex;
        flex-direction:column;
        gap: var(--spacing-200);

        li:not(:last-child) {

        }
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__data-box {
          display: grid;
          grid-template-columns: auto auto auto;
          grid-template-rows: auto auto;
          gap: var(--spacing-100);
        }

        &__name {
          grid-column: 1 / -1;
          color: var(--rose-900);
        }

        &__quantity {
          color: var(--red);
        }

        &__price, &__subtotal {
          color: var(--rose-500);
        }

        &__remove {
          cursor: pointer;
          --btn-color: var(--rose-400);
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          border: none;
          box-shadow: inset 0 0 0 1.25px var(--btn-color);
          background: transparent;
          color: var(--btn-color);
          transition: all .4s;
          position: relative;

          svg {
            transition: transform .4s;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          &:hover {
            --btn-color: var(--rose-900);
          }
        }
      }

      &__empty {
        padding-block: var(--spacing-200);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-200);
        color: var(--rose-500);
      }

      &__total {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__delivery {
        padding: var(--spacing-200);
        background: var(--rose-50);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 8px;
      }

      &__confirm {
        cursor: pointer;
        width: 100%;
        padding: var(--spacing-200) var(--spacing-300);
        border: none;
        outline: none;
        background: var(--red);
        transition: all .4s;
        font-family: inherit;
        border-radius: 999px;
        color: var(--white);

        &:hover {

        }
      }
    }
  `,
})
export class CartComponent {
  cart = input.required<CartItem[]>();

  total = computed(() =>
    this.cart().reduce(
      (acc, item) => (acc += item.product.price * item.quantity),
      0
    )
  );
}
