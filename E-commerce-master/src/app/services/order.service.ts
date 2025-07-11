import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'https://car-parts-seven.vercel.app/api/v1/orders'; // replace with your actual API base

  constructor(private _HttpClient: HttpClient) {}

  // ✅ Fetch all orders (paginated for admin)
  getAllOrders(page: number = 1, limit: number = 10): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  }

  // ✅ Optionally: Get single order details
  getOrderById(orderId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/${orderId}`, {
      withCredentials: true,
    });
  }

  // ✅ Optional: Update order status (approve/cancel/etc.)
  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this._HttpClient.patch(
      `${this.baseUrl}/${orderId}`,
      { status },
      { withCredentials: true }
    );
  }
}
