import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';

import { Product } from '../../models/product.model';
import { GlobalStoreService } from '../../data-access/global-store.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe, NgClass, ButtonComponent],
  template: `
    <article class="product" [ngClass]="productNgClass()">
      <div class="product__img-box">
        <img
          class="product__img"
          [srcset]="
            product().image.mobile +
            ' 654w, ' +
            product().image.tablet +
            ' 427w, ' +
            product().image.desktop +
            ' 502w'
          "
          sizes="(max-width: 37.5em) 327px, (max-width: 60em) 214px, 251px"
          [src]="product().image.desktop"
          [alt]="product().name"
        />

        <div class="product__btn-box">
          @if (isAdded()) {
          <div class="product__ops-box">
            <button
              app-button
              severity="icon"
              styleClass="btn--icon--ops"
              (onClick)="store.decrementQuantity(product())"
            >
              <svg
                slot="icon"
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
            <button
              app-button
              severity="icon"
              styleClass="btn--icon--ops"
              (onClick)="store.incrementQuantity(product())"
            >
              <svg
                slot="icon"
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
          <button
            app-button
            severity="secondary"
            (onClick)="store.addCartItem(product())"
          >
            <img slot="icon" src="images/icon-add-to-cart.svg" alt="" />
            <span slot="label" class="text text--sm text--semibold">
              Add to Cart
            </span>
          </button>
          }
        </div>
      </div>

      <div class="product__info">
        <p class="text text--sm text--rose-500">
          {{ product().category }}
        </p>
        <h3 class="text text--md">{{ product().name }}</h3>
        <p class="text text--md text--red-100">
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

  protected quantity = computed(
    () =>
      this.store.cart().find((el) => el.product.name === this.product().name)
        ?.quantity || 0
  );
  protected isAdded = computed(() => this.quantity() > 0);
  protected productNgClass = computed(() => ({
    'product--added': this.isAdded(),
  }));
}
