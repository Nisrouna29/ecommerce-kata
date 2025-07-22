import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly API_URL = 'http://localhost:8080/api/orders';

  createOrder(productQuantities: { [productId: string]: number }, username: string): Observable<any> {
    return this.http.post(this.API_URL, { productQuantities, username }, {
      responseType: 'text'
    }).pipe(
      catchError((error) => {
        console.error('Error creating order:', error);
        return throwError(() => new Error('Failed to create order. Please try again later.'));
      })
    );
  }

  getAllOrders(): Observable<Order[]> {
    const username = this.auth.getUsername();
    return this.http.get<Order[]>(`${this.API_URL}/user/${username}`).pipe(
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Failed to fetch orders. Please try again later.'));
      })
    );
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${orderId}/cancel`, {
      responseType: 'text'
    }).pipe(
      catchError((error: any) => {
        console.error('Error cancelling order:', error);
        return throwError(() => new Error('Failed to cancel order. Please try again later.'));
      })
    );
  }
}
