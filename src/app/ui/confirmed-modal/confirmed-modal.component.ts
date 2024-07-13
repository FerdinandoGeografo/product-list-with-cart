import { Component, inject, input } from '@angular/core';
import { GlobalStoreService } from '../../data-access/global-store.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-confirmed-modal',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <dialog #dialogRef class="order">
      <div class="order__title-box">
        <img class="order__icon" src="images/icon-order-confirmed.svg" alt="" />
        <h1 class="text text--xl">Order Confirmed</h1>
        <p class="text text--md">We hope you enjoy your food!</p>
      </div>

      <div class="order__recap">
        <ul class="order__items">
          @for (item of store.cart(); track $index) {
          <li>
            <article class="order__item">
              <div class="order__data-box">
                <img
                  class="order__img"
                  [src]="item.product.image.thumbnail"
                  [alt]="item.product.name"
                />

                <div class="order__text-box">
                  <h3 class="text text--sm text--semibold">
                    {{ item.product.name }}
                  </h3>

                  <div class="order__values">
                    <span class="order__quantity text text--sm text--semibold">
                      {{ item.quantity }}x
                    </span>
                    <span class="order__price text text--sm">
                      &commat; {{ item.product.price | currency : '$' }}
                    </span>
                  </div>
                </div>
              </div>
              <span class="text text--md">
                {{ item.product.price * item.quantity | currency : '$' }}
              </span>
            </article>
          </li>
          }
        </ul>

        <div class="order__total-box">
          <span class="text text--regular text--sm"> Order Total </span>
          <span class="text text--lg">
            {{ store.total() | currency : '$' }}
          </span>
        </div>
      </div>

      <button class="order__btn">
        <span class="text text--md">Start New Order</span>
      </button>
    </dialog>
  `,
  styleUrl: './confirmed-modal.component.scss',
})
export class ConfirmedModalComponent {
  protected store = inject(GlobalStoreService);
  open = input<boolean>(false);
}
