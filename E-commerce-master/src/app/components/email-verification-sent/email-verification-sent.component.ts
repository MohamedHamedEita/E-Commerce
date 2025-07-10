import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-verification-sent',
  templateUrl: './email-verification-sent.component.html',
  styleUrls: ['./email-verification-sent.component.css'],
})
export class EmailVerificationSentComponent {
  email: string = '';
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { email: string };
    this.email = state?.email || '';
  }

  resendVerificationEmail() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    this.http
      .post(
        'https://car-parts-seven.vercel.app/api/v1/auth/resend-verification-email',
        {
          email: this.email,
        }
      )
      .subscribe({
        next: (res: any) => {
          this.successMessage = res.message || 'Verification email resent.';
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Something went wrong.';
          this.isLoading = false;
        },
      });
  }
}
