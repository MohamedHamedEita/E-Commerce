import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:3000/api/v1';

  constructor(private _httpClient: HttpClient) {}

  // Get all addresses
  getAddresses(): Observable<any> {
    return this._httpClient.get(`${this.baseURL}/addresses`, {
      withCredentials: true,
    });
  }

  getUserOrders() {
    return this._httpClient.get(`http://localhost:3000/api/v1/orders`, {
      withCredentials: true,
    });
  }
  // Add new address
  addAddress(data: any): Observable<any> {
    return this._httpClient.post(`${this.baseURL}/addresses`, data, {
      withCredentials: true,
    });
  }

  // Update address by ID
  updateAddress(id: string, data: any): Observable<any> {
    return this._httpClient.patch(`${this.baseURL}/addresses/${id}`, data, {
      withCredentials: true,
    });
  }

  // Delete address by ID
  deleteAddress(id: string): Observable<any> {
    return this._httpClient.delete(`${this.baseURL}/addresses/${id}`, {
      withCredentials: true,
    });
  }

  changePassword(payload: {
    currentPassword: string;
    newPassword: string;
    passwordConfirm: string;
  }): Observable<any> {
    return this._httpClient.patch(
      'http://localhost:3000/api/v1/users/changeMyPassword',
      payload,
      { withCredentials: true }
    );
  }
}
