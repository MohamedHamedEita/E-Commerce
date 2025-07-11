import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = 'https://car-parts-seven.vercel.app/api/v1/categories';

  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(this.baseUrl,{withCredentials:true});
  }

  addCategory(formData: FormData): Observable<any> {
    return this._HttpClient.post(this.baseUrl, formData,{withCredentials:true});
  }

  deleteCategory(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${id}`,{withCredentials:true});
  }

  getCategory(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/${id}`);
  }

  updateCategory(id: string, formData: FormData): Observable<any> {
    return this._HttpClient.patch(`${this.baseUrl}/${id}`, formData,{withCredentials:true});
  }
}
