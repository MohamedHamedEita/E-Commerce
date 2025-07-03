import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //singleton instance
  // headers: any = { token: localStorage.getItem('userToken') };
  cartItemsNum=new BehaviorSubject<number>(0)

  constructor(private _HttpClient: HttpClient) {
    this.updateCartItemCount()
  }

updateCartItemCount(){
  this.getUserCart().subscribe({
    next: (res) => {
      // console.log(res.numOfCartItems);
      this.cartItemsNum.next(res.numOfCartItems) ;
    },
    error:(err)=>{
      console.error(err);
      if(err.status==404){
        this.cartItemsNum.next(0);
      }
    }
  });
 }

  addCartItem(id: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      }
      // {
      //   headers: this.headers,
      // }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      // headers: this.headers,
    });
  }

  removeCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
      // { headers: this.headers }
    );
  }

  updateCartItem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count }
      // { headers: this.headers }
    );
  }

  onLinePayMent(cartId: string, shippingAddress: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://fresh-cart-fc1.vercel.app/`,
      { shippingAddress: shippingAddress }
    );
  }



  ClearUserCart(): Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      // headers: this.headers,
    });
  }
}
