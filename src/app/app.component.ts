import { Component, inject } from '@angular/core';
import { ProductsListComponent } from './ui/products-list.component';
import { CartComponent } from './ui/cart.component';
import { GlobalStoreService } from './global-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent, CartComponent],
  template: `
    <main class="main">
      <app-products-list [products]="store.products()" />
      <app-cart [cart]="store.cart()" />
    </main>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: var(--rose-50);
    }

    .main {
      padding-block: var(--spacing-1100);
      display: grid;
      place-content: center;
      grid-template-columns: repeat(12, 7.2rem);
      column-gap: 3.2rem;

      app-products-list {
        grid-column: 1 / span 8;
      }

      app-cart {
        grid-column: 9 / -1;
      }
    }
  `,
})
export class AppComponent {
  protected store = inject(GlobalStoreService);
}
