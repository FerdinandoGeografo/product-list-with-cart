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
  total = computed(() =>
    this.cart().reduce(
      (acc, item) => (acc += item.product.price * item.quantity),
      0
    )
  );

  constructor() {
    this.#http
      .get<Product[]>('data/data.json')
      .subscribe((products) =>
        this.#store.update((state) => ({ ...state, products }))
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
