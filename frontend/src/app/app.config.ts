import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { productReducer } from './store/product/product.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { ProductEffects } from './store/product/product.effects';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { authInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      products: productReducer,
      cart: cartReducer
    }),
    provideEffects([ProductEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
    provideRouter(appRoutes),
  ]
};
