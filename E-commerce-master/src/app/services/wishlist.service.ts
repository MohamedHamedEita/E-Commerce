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
    this.updateLoggedUserWishListAndCount();
  }
  updateLoggedUserWishListAndCount() {
    this.getAllWishList().subscribe({
      next: (res) => {
        // console.log(res);
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
      `http://localhost:3000/api/v1/wishlist`,

      {
        productId: productId,
      },
      {
        withCredentials: true,
      }
    );
  }

  getAllWishList(): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/wishlist`, {
      withCredentials: true,
    });
  }
  removeProductFromWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `http://localhost:3000/api/v1/wishlist/${productId}`,
      {
        withCredentials: true,
      }
    );
  }
}
