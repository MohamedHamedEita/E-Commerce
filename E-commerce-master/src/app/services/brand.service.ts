import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private baseUrl = 'https://car-parts-seven.vercel.app/api/v1/brands';

  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}?limit=300`, {
      withCredentials: true,
    });
  }

  addBrand(formData: FormData): Observable<any> {
    return this._HttpClient.post(this.baseUrl, formData, {
      withCredentials: true,
    });
  }

  deleteBrand(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getBrand(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/${id}`);
  }

  updateBrand(id: string, formData: FormData): Observable<any> {
    return this._HttpClient.patch(`${this.baseUrl}/${id}`, formData, {
      withCredentials: true,
    });
  }
}
