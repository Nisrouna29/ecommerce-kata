import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { AppStateService } from '../../../services/app.state.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent, ShoppingCartComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit {
  appStateService = inject(AppStateService);
  showCart = signal<boolean>(false);

  ngOnInit() {
    this.appStateService.showCart$.subscribe(show => {
      this.showCart.set(show);
    });
  }

}
