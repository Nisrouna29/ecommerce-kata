import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: string }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: string; quantity: number }>()
);
export const clearCart = createAction('[Cart] Clear Cart');
