import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

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

  addCartItem(product: Product) {
    this.#store.update((state) => ({
      ...state,
      cart: [...state.cart, { product, quantity: 1 }],
    }));
  }

  removeCartItem(product: Product) {
    this.#store.update((state) => ({
      ...state,
      cart: state.cart.filter((el) => el.product.name !== product.name),
    }));
  }

  incrementQuantity(product: Product) {
    this.#store.update((state) => ({
      ...state,
      cart: state.cart.map((el) =>
        el.product.name === product.name
          ? { ...el, quantity: el.quantity + 1 }
          : el
      ),
    }));
  }

  decrementQuantity(product: Product) {
    if (
      this.cart().find((el) => el.product.name === product.name)?.quantity === 1
    ) {
      this.removeCartItem(product);
      return;
    }

    this.#store.update((state) => ({
      ...state,
      cart: state.cart.map((el) =>
        el.product.name === product.name
          ? { ...el, quantity: el.quantity - 1 }
          : el
      ),
    }));
  }

  resetCart() {
    this.#store.update((state) => ({ ...state, cart: [] }));
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
