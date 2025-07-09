import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/custom-validations/match-password';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _Router: Router
  ) {}
  errorMessage: string = '';
  isLoading: boolean = false;
  passwordFieldType: string = 'password';
  repasswordFieldType: string = 'password';

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{5,}$/),
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{5,}$/),
      ]),
      /*
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),*/
    },
    { validators: passwordMatch }
  );

  handelRegister(regForm: FormGroup) {
    console.log(regForm);
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            // ✅ تحديث حالة الدخول
            this._AuthService.isLogin.next(true);
            this._CartService.updateCartItemCount();
            this._WishlistService.updateLoggedUserWishListAndCount();

            // ✅ جلب بيانات المستخدم من الكوكي
            this._AuthService.getCurrentUser().subscribe({
              next: (res: any) => {
                const user = res?.user;
                const userRole = user?.role;
                this._AuthService.user.next(user);

                if (userRole === 'admin') {
                  this._Router.navigate(['/admin-dashboard']);
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
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleRepasswordVisibility() {
    this.repasswordFieldType =
      this.repasswordFieldType === 'password' ? 'text' : 'passwordConfirm';
  }
}
