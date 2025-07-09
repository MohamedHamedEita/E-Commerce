// user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/custom-validations/match-password';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  addressForm!: FormGroup;
  isLoading: boolean = false;
  selectedFile: File | null = null;
  previewImageUrl: string = '';
  userId!: string;
  originalUser: any = {};
  addresses: any[] = [];
  editingAddressId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _AuthService: AuthService,
    private _UserService: UserService,
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
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', Validators.required],
      },
      { validators: passwordMatch }
    );

    this.initAddressForm();
    this.loadUserData();
    this.getAddresses();
  }

  initAddressForm() {
    this.addressForm = this.fb.group({
      alias: ['', Validators.required],
      details: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  loadUserData(): void {
    this._AuthService.getCurrentUser().subscribe({
      next: (res: any) => {
        const user = res.data || res.user || res?.data?.user;
        if (user) {
          this.userId = user._id;
          this.previewImageUrl = user.profileImg || '';

          const patchData = {
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            address: user.addresses?.[0] || '',
          };

          this.originalUser = { ...patchData };
          this.profileForm.patchValue(patchData);
        }
      },
      error: () => {
        alert('Failed to load user data');
      },
    });
  }

  onFileSelected(event: Event): void {
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

    const currentValues = this.profileForm.value;
    const formData = new FormData();
    let changesDetected = false;

    for (const key of Object.keys(currentValues)) {
      const currentValue = currentValues[key] ?? '';
      const originalValue = this.originalUser[key] ?? '';
      if (currentValue !== originalValue) {
        formData.append(key, currentValue);
        changesDetected = true;
      }
    }

    if (this.selectedFile) {
      formData.append('profileImg', this.selectedFile);
      changesDetected = true;
    }

    if (!changesDetected) {
      alert('No changes detected.');
      this.isLoading = false;
      return;
    }

    this.http
      .patch(`http://localhost:3000/api/v1/users/updateMe`, formData, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          alert('✅ Profile updated successfully!');
          this.isLoading = false;
          this.loadUserData();
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

  getAddresses() {
    this.http
      .get<{ data: any[] }>('http://localhost:3000/api/v1/addresses', {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => (this.addresses = res.data),
        error: () => alert('❌ Failed to load addresses'),
      });
  }

  submitAddress() {
    if (this.addressForm.invalid) return;

    const addressData = this.addressForm.value;
    const url = this.editingAddressId
      ? `http://localhost:3000/api/v1/addresses/${this.editingAddressId}`
      : `http://localhost:3000/api/v1/addresses`;

    const request = this.editingAddressId
      ? this.http.patch(url, addressData, { withCredentials: true })
      : this.http.post(url, addressData, { withCredentials: true });

    request.subscribe({
      next: () => {
        this.getAddresses();
        this.addressForm.reset();
        this.editingAddressId = null;
      },
      error: () => alert('❌ Failed to save address'),
    });
  }

  editAddress(addr: any) {
    this.editingAddressId = addr._id;
    this.addressForm.patchValue(addr);
  }

  deleteAddress(id: string) {
    this.http
      .delete(`http://localhost:3000/api/v1/addresses/${id}`, {
        withCredentials: true,
      })
      .subscribe({
        next: () => this.getAddresses(),
        error: () => alert('❌ Failed to delete address'),
      });
  }

  deleteAccount(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this._UserService.deleteMe().subscribe({
        next: () => {
          alert('Your account has been deleted.');

          // Call backend logout endpoint to clear cookie
          this._AuthService.logout();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete account.');
        },
      });
    }
  }
}
