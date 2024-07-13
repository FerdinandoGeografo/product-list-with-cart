import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';

import { Product } from '../../models/product.model';
import { GlobalStoreService } from '../../data-access/global-store.service';

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

        @if (isAdded()) {
        <div class="button button--tool">
          <button class="icon" (click)="store.decrementQuantity(product())">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              fill="none"
              viewBox="0 0 10 2"
            >
              <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          </button>
          <span class="text text--sm text--semibold">{{ quantity() }}</span>
          <button class="icon" (click)="store.incrementQuantity(product())">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path
                fill="currentColor"
                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
              />
            </svg>
          </button>
        </div>
        } @else {
        <button class="button" (click)="store.addCartItem(product())">
          <img src="images/icon-add-to-cart.svg" alt="" />
          <span class="text text--sm text--semibold"> Add to Cart </span>
        </button>
        }
      </div>

      <div class="product__info">
        <p class="text text--sm text--rose-500">
          {{ product().category }}
        </p>
        <h3 class="text text--md">{{ product().name }}</h3>
        <p class="text text--md text--red">
          {{ product().price | currency : '$' }}
        </p>
      </div>
    </article>
  `,
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  protected store = inject(GlobalStoreService);

  product = input.required<Product>();

  quantity = computed(
    () =>
      this.store.cart().find((el) => el.product.name === this.product().name)
        ?.quantity || 0
  );
  isAdded = computed(() => this.quantity() > 0);
  productNgClass = computed(() => ({ 'product--added': this.isAdded() }));
}
