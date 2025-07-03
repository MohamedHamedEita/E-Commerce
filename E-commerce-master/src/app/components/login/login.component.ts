import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private _CartService: CartService,
    private _WishlistService: WishlistService ,

  ) {}

  ngOnInit(): void {
    this.checkRememberMe();
  }

  checkRememberMe(): void {
    const storedEmail = localStorage.getItem('rememberMeEmail');
    const storedPassword = localStorage.getItem('rememberMePassword');
    if (storedEmail && storedPassword) {
      this.loginForm.patchValue({
        email: storedEmail,
        password: storedPassword,
        rememberMe: true,
      });
    }
  }

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
          if (response.message === 'success') {
            if (loginForm.value.rememberMe) {
              localStorage.setItem('rememberMeEmail', loginForm.value.email);
              localStorage.setItem(
                'rememberMePassword',
                loginForm.value.password
              );
            } else {
              localStorage.removeItem('rememberMeEmail');
              localStorage.removeItem('rememberMePassword');
            }
            localStorage.setItem('userToken', response.token);
            this._CartService.updateCartItemCount();
            this._WishlistService.updateLoggedUserWishListAndCount();
            this._Router.navigate(['/home']);
            this._AuthService.isLogin.next(true);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
        },
      });
    }
  }
}
