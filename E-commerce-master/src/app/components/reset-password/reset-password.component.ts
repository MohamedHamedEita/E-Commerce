import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errorMessage: string = '';
  isLoading: boolean = false;
  passwordFieldType: string = 'password'; // default to password

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{5,}$/)])
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  handelResetPassword(form: FormGroup) {
    if (this.resetPassword.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this._AuthService.resetPassword(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message || 'An error occurred';
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
