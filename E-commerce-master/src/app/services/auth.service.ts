import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin=new BehaviorSubject<boolean>(localStorage.getItem('userToken')?true:false);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  register(regForm: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      regForm
    );
  }
  login(loginForm: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      loginForm
    );
  }

  logOut() {
    localStorage.removeItem('userToken');
    // this.userData.next(null);
    this._Router.navigate(['/login']);
    this.isLogin.next(false);
    // console.log(this.userData);
  }


  forGetPassword(forGetPasswordForm: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      forGetPasswordForm
    );
  }
  verifyResetCode(verifyResetForm: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      verifyResetForm
    );
  }
  resetPassword(resetPassword: any): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      resetPassword
    );
  }
}
