import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading: boolean = false;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      address: [''],
      password: [''],
    });

    this.loadUserData();
  }

  loadUserData(): void {
    this._AuthService.getCurrentUser().subscribe({
      next: (res: any) => {
        const user = res.data || res.user || res?.data?.user;
        if (user) {
          this.userId = user._id;
          this.profileForm.patchValue({
            name: user.name,
            phone: user.phone || '',
            address: user.addresses?.[0] || '',
          });
        }
      },
      error: () => {
        alert('Failed to load user data');
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = { ...this.profileForm.value };
    if (!formData.password) delete formData.password;

    this.http
      .put(`http://localhost:3000/api/v1/users/updateMe`, formData)
      .subscribe({
        next: () => {
          alert('✅ Profile updated successfully!');
          this.isLoading = false;
          this.loadUserData(); // reload latest info
        },
        error: (err) => {
          console.error(err);
          alert('❌ Failed to update profile');
          this.isLoading = false;
        },
      });
  }
}
