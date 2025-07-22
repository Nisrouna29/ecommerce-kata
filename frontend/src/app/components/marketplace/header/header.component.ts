import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCartItemCount } from '../../../store/cart/cart.selector';
import { AuthService } from '../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppStateService } from '../../../services/app.state.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private routerSubscription!: Subscription;
  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkOrdersRoute();
      });
  }
  store = inject(Store<AppState>);
  cartItemCount = toSignal(this.store.select(selectCartItemCount), { initialValue: 0 });
  auth = inject(AuthService);
  router = inject(Router);
  appStateService = inject(AppStateService);
  isAuthenticated: boolean = this.auth.isAuthenticated();
  showProducts = signal(true);
  showOrders = signal(false);

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  clickOrders() {
    this.showOrders.set(true);
    this.showProducts.set(false);
    this.router.navigate(['/orders']);
  }
  clickStore() {
    this.showOrders.set(false);
    this.showProducts.set(true);
    this.router.navigate(['']);
  }

  toggleCart() {
    this.appStateService.toggleCart();
  }

  checkOrdersRoute() {
    if (this.router.url === '/orders') {
      this.showOrders.set(true);
      this.showProducts.set(false);
    } else {
      this.showProducts.set(true);
      this.showOrders.set(false);
    }
  }

}



