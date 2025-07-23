import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import * as CartActions from '../../../store/cart/cart.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCartItems, selectCartTotal } from '../../../store/cart/cart.selector';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {
  store = inject(Store<AppState>);
  cartItems = toSignal(this.store.select(selectCartItems), { initialValue: [] });
  total = toSignal(this.store.select(selectCartTotal), { initialValue: 0 });
  discountApplied = computed(() => this.total() > 100);
  auth = inject(AuthService);
  orderService = inject(OrderService); // Assuming OrderService is defined and injected
  discountAmount = computed(() =>
    this.discountApplied() ? this.total() * 0.1 : 0
  );

  updateQuantity(productId: string, quantity: number): void {
    this.store.dispatch(CartActions.updateQuantity({ productId, quantity }));
  }

  removeFromCart(productId: string): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  createOrder(): void {
    const productQuantities: { [productId: string]: number } = {};
    for (const item of this.cartItems()) {
      productQuantities[item.product.id] = item.quantity;
    }
    const username = this.auth.getUsername() || '';
    this.orderService.createOrder(productQuantities, username).subscribe({
      next: (order) => {
        this.clearCart();
        alert('order created successfully !');
      },
    });
  }
}
