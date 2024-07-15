import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

import { ButtonComponent } from './../button/button.component';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-confirmed-modal',
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent],
  template: `
    @if(open()) {
    <section class="order">
      <dialog class="order__modal" @modalAnimation>
        <div>
          <img src="images/icon-order-confirmed.svg" alt="" />
          <h1 class="text text--xl order__title">Order Confirmed</h1>
          <p class="text text--md text--regular text--rose-500">
            We hope you enjoy your food!
          </p>
        </div>

        <div class="order__recap">
          <ul class="order__items">
            @for (item of cart(); track $index) {
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
                      <span class="text text--sm text--semibold text--red-100">
                        {{ item.quantity }}x
                      </span>
                      <span class="text text--sm text--rose-500">
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
            <span class="text text--sm"> Order Total </span>
            <span class="text text--lg">
              {{ total() | currency : '$' }}
            </span>
          </div>
        </div>

        <button app-button (onClick)="onStartNewOrder.emit()">
          <span slot="label" class="text text--md">Start New Order</span>
        </button>
      </dialog>
    </section>
    }
  `,
  styleUrl: './confirmed-modal.component.scss',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, scale: '0.8' }),
        animate(
          '300ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
          style({ opacity: 1, scale: '1' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
          style({ opacity: 0, scale: '0.8' })
        ),
      ]),
    ]),
  ],
})
export class ConfirmedModalComponent {
  open = input.required<boolean>();
  cart = input.required<CartItem[]>();
  total = input.required<number>();

  protected onStartNewOrder = output();
}
