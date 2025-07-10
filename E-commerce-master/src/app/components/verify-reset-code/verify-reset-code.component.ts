import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css'],
})
export class VerifyResetCodeComponent {
  email: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) {
    const navigation = this._Router.getCurrentNavigation();
    const state = navigation?.extras?.state as { email: string };
    if (state?.email) {
      this.email = state.email;
    } else {
      // fallback: redirect or show error
      this._Router.navigate(['/forgot-password']);
    }
  }
  errorMessage: string = '';
  isLoading: boolean = false;
  verifyResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  handleVerifyResetCode() {
    if (this.verifyResetCodeForm.invalid) return;

    this.isLoading = true;

    const payload = {
      email: this.email,
      resetCode: this.verifyResetCodeForm.value.resetCode,
    };

    this._AuthService.verifyResetCode(payload).subscribe({
      next: (res) => {
        this._Router.navigate(['/reset-password'], {
          state: { email: this.email }, // pass email to next step
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message || 'Something went wrong.';
        this.isLoading = false;
      },
    });
  }
}
