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
  isAddedToWishlist = new BehaviorSubject<boolean>(false);

  wishListProductId: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(
      'http://localhost:3000/api/v1/products?limit=10&sort=-ratingsAverage'
    );
  }

  getBrandsByCategory(categoryId: any): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:3000/api/v1/brands/byCategory/${categoryId}`
    );
  }

  getProductsPaginated(
    page: number,
    limit: number,
    search = '',
    category = '',
    brand = '',
    minRating = 0,
    maxPrice = 10000,
    sort = '-price'
  ): Observable<any> {
    const params: any = {
      page,
      limit,
      sort,
    };

    if (search?.trim()) params.search = search;
    if (category) params.category = category;
    if (brand) params.brand = brand;
    if (minRating > 0) params['ratingsAverage[gte]'] = minRating;
    if (maxPrice < 10000) params['price[lte]'] = maxPrice;

    return this._HttpClient.get('http://localhost:3000/api/v1/products', {
      params,
    });
  }

  getProductById(_id: string): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/products/${_id}`);
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(
      'http://localhost:3000/api/v1/categories?limit=10'
    );
  }

  getProductByCategory(id: string): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:3000/api/v1/products?limit=100&category=${id}`
    );
  }

  getAllBrands(): Observable<any> {
    return this._HttpClient.get('http://localhost:3000/api/v1/brands?limit=30');
  }

  getBrandsPyId(id: string): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:3000/api/v1/products?limit=50&brand=${id}`
    );
  }
}
