import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  errorMessage: string = '';
  isLoading: boolean = false;
  passwordFieldType: string = 'password';
  email: string = '';

  resetPassword: FormGroup = new FormGroup({});

  constructor(private _AuthService: AuthService, private _Router: Router) {
    const navigation = this._Router.getCurrentNavigation();
    const state = navigation?.extras?.state as { email: string };

    if (!state?.email) {
      this._Router.navigate(['/verify-reset-code']);
      return; // ✅ stop execution if no email
    }

    this.email = state.email; // ✅ set email safely

    this.resetPassword = new FormGroup(
      {
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[A-Z].{5,}$/),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // ✅ Make sure both password fields match
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  handleResetPassword() {
    if (this.resetPassword.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { newPassword, confirmPassword } = this.resetPassword.value;

    const payload = {
      email: this.email,
      newPassword,
      confirmPassword,
    };

    this._AuthService.resetPassword(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred';
        this.isLoading = false;
      },
    });
  }
}
