import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';

import { Product } from '../models/product.model';
import { GlobalStoreService } from '../global-store.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  template: `
    <article class="product" [ngClass]="productNgClass()">
      <div class="product__img-box">
        <img
          class="product__img"
          [src]="product().image.desktop"
          [alt]="product().name"
        />

        <button class="button" (click)="store.addCartItem(product())">
          <img src="images/icon-add-to-cart.svg" alt="" />
          <span class="text text--sm text--semibold"> Add to Cart </span>
        </button>
      </div>

      <div class="product__info">
        <p class="text text--sm text--regular product__category">
          {{ product().category }}
        </p>
        <h3 class="text text--md product__name">{{ product().name }}</h3>
        <p class="text text--md product__price">
          {{ product().price | currency : '$' }}
        </p>
      </div>
    </article>
  `,
  styles: `
    :host {
      width: 100%;
    }

    .product {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-200);

      &--added {
        .product__img-box div {
          box-shadow: inset 0 0 0 2px var(--red);
        }
      }

      &__img-box {
        position: relative;
        margin-bottom: 2.2rem;
      }

      .button {
        padding: var(--spacing-150);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-100);

        color: inherit;
        font-family: inherit;
        background: var(--white);
        border-radius: 999px;
        border: none;
        outline: none;
        cursor: pointer;

        box-shadow: inset 0 0 0 1px var(--rose-400);
        transition: all .4s;

        position: absolute;
        width: 16rem;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);

        img {
          transition: scale .4s;
        }

        &:hover {
          color: var(--red);
          box-shadow: inset 0 0 0 1px var(--red);

          img {
            scale: 1.1;
          }
        }
      }

      &__img {
        width: 100%;
        border-radius: .8rem;
        transition: all .4s;
      }

      &__info {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-50);
      }

      &__category {
        color: var(--rose-500);
      }

      &__name {
        color: var(--rose-900);
      }

      &__price {
        color: var(--red);
      }
    }
  `,
})
export class ProductItemComponent {
  protected store = inject(GlobalStoreService);

  product = input.required<Product>();

  isAdded = computed(() =>
    this.store
      .cart()
      .map((el) => el.product.name)
      .includes(this.product().name)
  );
  productNgClass = computed(() => ({ 'product--added': this.isAdded() }));
}
