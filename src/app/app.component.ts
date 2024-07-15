import { Component, inject } from '@angular/core';

import { GlobalStoreService } from './data-access/global-store.service';
import { ProductListComponent } from './ui/product-list/product-list.component';
import { CartComponent } from './ui/cart/cart.component';
import { ConfirmedModalComponent } from './ui/confirmed-modal/confirmed-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, CartComponent, ConfirmedModalComponent],
  template: `
    <app-product-list [products]="store.products()" />
    <app-cart
      [cart]="store.cart()"
      [total]="store.total()"
      (onRemoveCartItem)="store.removeCartItem($event.product)"
      (onConfirmOrder)="store.confirmOrder()"
    />

    @if(store.orderConfirmed()) {
    <app-confirmed-modal (onStartNewOrder)="store.startNewOrder()" />
    }
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected store = inject(GlobalStoreService);
}
