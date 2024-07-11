import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Product } from './models/product.model';
import { CartItem } from './models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  #http = inject(HttpClient);
  #store = signal<GlobalState>(initialState);
  #logEffect = effect(() => console.log('State changed\t: ', this.#store()));

  products = computed(() => this.#store().products);
  cart = computed(() => this.#store().cart);

  constructor() {
    this.#http.get<Product[]>('data/data.json').subscribe((products) =>
      this.#store.update((state) => ({
        ...state,
        products,
        cart: [
          {
            product: { ...products[3] },
            quantity: 1,
          },
          {
            product: { ...products[1] },
            quantity: 4,
          },
          {
            product: { ...products[8] },
            quantity: 2,
          },
        ],
      }))
    );
  }
}

export type GlobalState = {
  products: Product[];
  cart: CartItem[];
};

const initialState: GlobalState = {
  products: [],
  cart: [],
};
