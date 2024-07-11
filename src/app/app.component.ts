import { Component, inject } from '@angular/core';
import { ProductListComponent } from './ui/product-list.component';
import { CartComponent } from './ui/cart.component';
import { GlobalStoreService } from './global-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, CartComponent],
  template: `
    <main class="main">
      <app-product-list [products]="store.products()" />
      <app-cart [cart]="store.cart()" />
    </main>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: var(--rose-50);
      position: relative;
    }

    .main {
      padding-block: var(--spacing-1100);
      display: grid;
      place-content: center;
      grid-template-columns: repeat(12, 7.2rem);
      column-gap: var(--spacing-400);
    }
  `,
})
export class AppComponent {
  protected store = inject(GlobalStoreService);
}
