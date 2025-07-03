import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  wishListItemsNum = new BehaviorSubject<number>(0);
  isAddedToWishlist=new BehaviorSubject<boolean> (false)

  wishListProductId: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);


  constructor(private _HttpClient: HttpClient) {
   }



  getAllProducts(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
  }
  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }

  getProductByCategory(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
    );
  }




  getAllBrands(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/brands'
    );
  }


  getBrandsPyId(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?brands=${id}`
    );
  }





}
