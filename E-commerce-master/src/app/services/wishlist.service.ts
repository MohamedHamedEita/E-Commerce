import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishListProductIds = new BehaviorSubject<string[]>([]);
  wishListItemsCount = new BehaviorSubject<number>(0);
  constructor(private _HttpClient: HttpClient) {
this.updateLoggedUserWishListAndCount()
  }
  updateLoggedUserWishListAndCount(){
    this.getAllWishList().subscribe({
      next: (res) => {
        console.log(res);
        console.log((res.data as IProduct[]).map((product) => product._id));
        this.wishListProductIds.next(
          (res.data as IProduct[]).map((product) => product._id)
        );
        this.wishListItemsCount.next(res.data.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: productId,
      }
    );
  }

  getAllWishList(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`
    );
  }
  removeProductFromWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
    );
  }
}
