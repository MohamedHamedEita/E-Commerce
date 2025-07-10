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
  errorMessage: string = '';
  successMessage: string = ''; // ✅ add this

  constructor(
    private _AuthService: AuthService,
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _Router: Router
  ) {}
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
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response.status);
          if (response.status === 'success') {
            this.successMessage =
              'User created. Please check your email to verify.';
            this.errorMessage = ''; // clear error
            this._Router.navigate(['/email-verification-sent']);
            this._Router.navigate(['/email-verification-sent'], {
              state: { email: this.registerForm.value.email },
            });
            console.log('success sate');
          } else {
            this.errorMessage = response.message;
            console.log('error sate');
          }
          this.isLoading = false;
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
