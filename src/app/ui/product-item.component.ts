import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <article class="product">
      <div class="product__img-box">
        <img
          class="product__img"
          [src]="product().image.desktop"
          [alt]="product().name"
        />
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
    .product {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-200);

      &__img-box {

      }

      &__img {
        width: 100%;
        border-radius: 8px;
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
  product = input.required<Product>();
}
