import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { ShopComponent } from './components/marketplace/shop/shop.component';
import { OrdersComponent } from './components/marketplace/orders/orders.component';

export const appRoutes: Routes = [
  {
    path: '', component: MarketplaceComponent,
    children: [
      { path: '', component: ShopComponent },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];
