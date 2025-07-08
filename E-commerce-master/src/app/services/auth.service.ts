import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<any>(null);

  private baseURL = 'https://car-parts-seven.vercel.app/api/v1';

  constructor(private http: HttpClient, private router: Router) {
    this.checkTokenOnStart();
  }

 checkTokenOnStart(): void {
  this.http.get('https://car-parts-seven.vercel.app/api/v1/users/getMe', { withCredentials: true }).subscribe({
    next: (res: any) => {
      this.isLogin.next(true);
      this.user.next(res.user);
    },
    error: () => {
      this.isLogin.next(false);
    }
  });
}

login(formData: any): Observable<any> {
  return this.http.post('https://car-parts-seven.vercel.app/api/v1/auth/login',
    formData,
    { withCredentials: true }
  );
}
logout(): void {
    this.http
      .get('https://car-parts-seven.vercel.app/api/v1/auth/logout', {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.isLogin.next(false);
          this.user.next(null);
          this.router.navigate(['/login']);
        },
        error: () => {
          this.isLogin.next(false);
          this.user.next(null);
          this.router.navigate(['/login']);
        },
      });
  }
getCurrentUser(): Observable<any> {
  return this.http.get('https://car-parts-seven.vercel.app/api/v1/users/getMe', {
    withCredentials: true,
  });
}


  register(regForm: any): Observable<any> {
    return this.http.post(`https://car-parts-seven.vercel.app/api/v1/auth/signup`, regForm);
  }

  forGetPassword(forGetPasswordForm: any): Observable<any> {
    return this.http.post(`https://car-parts-seven.vercel.app/api/v1/auth/forgotpassword`, forGetPasswordForm);
  }

  verifyResetCode(verifyResetForm: any): Observable<any> {
    return this.http.post(`https://car-parts-seven.vercel.app/api/v1/auth/verifyResetCode`, verifyResetForm);
  }

  resetPassword(resetPassword: any): Observable<any> {
    return this.http.put(`https://car-parts-seven.vercel.app/api/v1/auth/resetPassword`, resetPassword);
  }
}
