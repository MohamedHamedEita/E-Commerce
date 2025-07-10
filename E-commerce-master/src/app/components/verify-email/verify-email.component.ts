import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  message: string = 'Verifying your email...';
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router // 👈 make it public
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.message = 'No token found in URL.';
      return;
    }

    this.http
      .get(`http://localhost:3000/api/v1/auth/verify-email?token=${token}`)
      .subscribe({
        next: () => {
          this.message = '✅ Your email has been verified successfully!';
          this.isSuccess = true;

          // Redirect after short delay
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.message =
            err.error?.message || '❌ Invalid or expired verification link.';
          this.isSuccess = false;
        },
      });
  }
}
