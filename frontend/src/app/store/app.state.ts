import { ProductState } from './product/product.reducer';
import { CartState } from './cart/cart.reducer';

export interface AppState {
  products: ProductState;
  cart: CartState;
}
