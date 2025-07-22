import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../models/cart-item.model';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartItem[];
}

function getCartFromLocalStorage(): CartState {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : { items: [] };
}

function saveCartToLocalStorage(state: CartState): CartState {
  localStorage.setItem('cart', JSON.stringify(state));
  return state;
}

export const initialState: CartState = getCartFromLocalStorage();

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);

    let newState: CartState;
    if (existingItem) {
      newState = {
        ...state,
        items: state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      newState = {
        ...state,
        items: [...state.items, { product, quantity: 1 }]
      };
    }
    return saveCartToLocalStorage(newState);
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    const newState = {
      ...state,
      items: state.items.filter(item => item.product.id !== productId)
    };
    return saveCartToLocalStorage(newState);
  }),
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    let newState: CartState;
    if (quantity <= 0) {
      newState = {
        ...state,
        items: state.items.filter(item => item.product.id !== productId)
      };
    } else {
      newState = {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      };
    }
    return saveCartToLocalStorage(newState);
  }),
  on(CartActions.clearCart, () => {
    const newState = { items: [] };
    return saveCartToLocalStorage(newState);
  })
);
