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
    :host { grid-column: 1 / span 8 }

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
  `,
})
export class ProductListComponent {
  products = input.required<Product[]>();
}
