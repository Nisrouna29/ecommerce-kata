import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
  orders = signal<Order[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.loading.set(true);
    this.error.set(null);

    this.orderService.getAllOrders()
      .pipe(
        catchError((err) => {
          console.error('Error fetching orders:', err);
          this.error.set(err.message || 'Failed to load orders');
          return of([]); // Return empty array on error
        }),
        finalize(() => {
          this.loading.set(false); // Always executed, whether success or error
        })
      )
      .subscribe({
        next: (orders) => {
          this.orders.set(orders);
        }
      });
  }

  cancelOrder(orderId: string): void {
    if (!confirm('Do you really want to cancel this order?')) return;

    this.orderService.cancelOrder(orderId)
      .pipe(
        catchError((err) => {
          alert(err.message || 'Failed to cancel order');
          return of(null);
        })
      )
      .subscribe({
        next: (result) => {
          if (result !== null) {
            this.fetchOrders();
          }
        }
      });
  }
   trackByOrderId(index: number, order: Order): string {
    return order.id;
  }
}
