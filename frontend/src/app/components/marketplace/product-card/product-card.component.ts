import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import * as CartActions from '../../../store/cart/cart.actions';
@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: Product;
  store = inject(Store<AppState>);
  displayDialog: boolean = false;

  addToCart() {
    this.store.dispatch(CartActions.addToCart({ product: this.product }));
  }
}
