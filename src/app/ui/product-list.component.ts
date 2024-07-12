import { Component, input } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductItemComponent } from './product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  template: `
    <section class="products">
      <h1 class="text text--xl">Desserts</h1>

      <ul class="products__list">
        @for (product of products(); track $index) {
        <li>
          <app-product-item [product]="product" />
        </li>
        }
      </ul>
    </section>
  `,
  styles: `
    @use "../../../public/scss/_query-mixin.scss" as mixin;


    :host {
      grid-column: 1 / span 8;

      @include mixin.respond(tablet) {
        grid-column-end: -1;
      }
    }

    .products {
      display: flex;
      flex-direction: column;
      gap: 3.2rem;

      &__list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: var(--spacing-300);
        row-gap: var(--spacing-400);

        @include mixin.respond(phone) {
          grid-template-columns: 1fr;
          gap: var(--spacing-400);
        }
      }
    }
  `,
})
export class ProductListComponent {
  products = input.required<Product[]>();
}
