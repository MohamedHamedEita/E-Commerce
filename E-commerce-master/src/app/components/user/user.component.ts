import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/custom-validations/match-password';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  isLoading: boolean = false;
  selectedFile: File | null = null;
  previewImageUrl: string = '';
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
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: passwordMatch,
      }
    );

    this.loadUserData();
  }

  loadUserData(): void {
    this._AuthService.getCurrentUser().subscribe({
      next: (res: any) => {
        const user = res.data || res.user || res?.data?.user;
        if (user) {
          this.userId = user._id;
          this.previewImageUrl = user.profileImg || '';
          this.profileForm.patchValue({
            name: user.name,
            email: user.email,
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.previewImageUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    const profileValues = this.profileForm.value;

    formData.append('name', profileValues.name);
    formData.append('email', profileValues.email);
    formData.append('phone', profileValues.phone);
    formData.append('address', profileValues.address || '');

    if (this.selectedFile) {
      formData.append('profileImg', this.selectedFile);
    }

    this.http
      .patch(`http://localhost:3000/api/v1/users/updateMe`, formData, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          alert('✅ Profile updated successfully!');
          this.isLoading = false;
          this.loadUserData(); // refresh
        },
        error: (err) => {
          console.error(err);
          alert('❌ Failed to update profile');
          this.isLoading = false;
        },
      });
  }
  onPasswordSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.value;

    this.http
      .patch(
        `http://localhost:3000/api/v1/users/changeMyPassword`,
        {
          currentPassword,
          password: newPassword,
        },
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: () => {
          alert('✅ Password updated successfully!');
          this.passwordForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('❌ Failed to update password');
        },
      });
  }

  passwordsMatch(group: AbstractControl) {
    const newPass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return newPass === confirmPass ? null : { notMatch: true };
  }
}
