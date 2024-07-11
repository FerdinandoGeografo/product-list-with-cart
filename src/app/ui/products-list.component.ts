import { Component, input } from '@angular/core';
import { Product } from '../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <section class="products">
      <h1 class="text text--xl">Desserts</h1>

      <ul class="products__list">
        @for (product of products(); track $index) {
        <li>
          <article class="product">
            <div class="product__img-box">
              <img
                class="product__img"
                [src]="product.image.desktop"
                [alt]="product.name"
              />
            </div>

            <div class="product__info">
              <p class="text text--sm text--regular product__category">
                {{ product.category }}
              </p>
              <h3 class="text text--md product__name">{{ product.name }}</h3>
              <p class="text text--md product__price">
                {{ product.price | currency : '$' }}
              </p>
            </div>
          </article>
        </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .products {
      display: flex;
      flex-direction: column;
      gap: 3.2rem;

      &__list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 2.4rem;
        row-gap: 3.2rem;
      }
    }

    .product {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;

      &__img-box {

      }

      &__img {
        width: 100%;
        border-radius: 8px;
      }

      &__info {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      &__category {
        color: var(--rose-500);
        line-height: 1.9rem;
      }

      &__name {
        color: var(--rose-900);
        line-height: 2.1rem;
      }

      &__price {
        color: var(--red);
        line-height: 2.1rem;
      }
    }
  `,
})
export class ProductsListComponent {
  products = input.required<Product[]>();
}
