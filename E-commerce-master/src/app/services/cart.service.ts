import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //singleton instance
  // headers: any = { token: localStorage.getItem('userToken') };
  cartItemsNum = new BehaviorSubject<number>(0);

  constructor(private _HttpClient: HttpClient) {
    this.updateCartItemCount();
  }

  updateCartItemCount() {
    this.getUserCart().subscribe({
      next: (res) => {
        // console.log(res.numOfCartItems);
        this.cartItemsNum.next(res.numOfCartItems);
      },
      error: (err) => {
        console.error(err);
        if (err.status == 404) {
          this.cartItemsNum.next(0);
        }
      },
    });
  }

  addCartItem(id: string): Observable<any> {
    return this._HttpClient.post(
      `https://car-parts-seven.vercel.app/api/v1/cart`,
      {
        productId: id,
      },
      {
        withCredentials: true,
      }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(
      `https://car-parts-seven.vercel.app/api/v1/cart`,
      {
        withCredentials: true,
      }
    );
  }

  removeCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://car-parts-seven.vercel.app/api/v1/cart/${id}`,

      {
        withCredentials: true,
      }
    );
  }

  updateCartItem(id: string, count: number): Observable<any> {
    return this._HttpClient.patch(
      `https://car-parts-seven.vercel.app/api/v1/cart/${id}`,
      { quantity: count },
      {
        withCredentials: true,
      }
    );
  }

  onLinePayMent(cartId: string, shippingAddress: any): Observable<any> {
    return this._HttpClient.post(
      `https://car-parts-seven.vercel.app/api/v1/orders/checkout-session/${cartId}`,
      { shippingAddress: shippingAddress },
      {
        withCredentials: true,
      }
    );
  }

  ClearUserCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://car-parts-seven.vercel.app/api/v1/cart`,
      {
        withCredentials: true,
      }
    );
  }
}
