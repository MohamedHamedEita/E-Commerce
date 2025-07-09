import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  passwordFieldType: string = 'password';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z].{5,}$/),
    ]),
    rememberMe: new FormControl(false),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _HttpClient: HttpClient,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  handelLogin(loginForm: FormGroup) {
    if (loginForm.valid) {
      this.isLoading = true;

      this._AuthService.login(loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.status === 'success') {
            // ✅ تحديث حالة الدخول
            this._AuthService.isLogin.next(true);
            this._CartService.updateCartItemCount();
            this._WishlistService.updateLoggedUserWishListAndCount();

            // ✅ جلب بيانات المستخدم من الكوكي
            this._AuthService.getCurrentUser().subscribe({
              next: (res: any) => {
                const user = res?.data;
                const userRole = user?.role;
                this._AuthService.user.next(user);

                if (userRole === 'admin') {
                  this._Router.navigate(['/admin']);
                } else {
                  this._Router.navigate(['/home']);
                }
              },
              error: () => {
                this.errorMessage = 'Authentication failed.';
              },
            });
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Login failed.';
        },
      });
    }
  }
}
