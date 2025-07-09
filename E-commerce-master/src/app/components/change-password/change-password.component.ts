import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const passwordConfirm = form.get('passwordConfirm')?.value;
    return newPassword === passwordConfirm ? null : { passwordMisMatch: true };
  }

  submitPasswordChange(): void {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword, passwordConfirm } =
      this.passwordForm.value;

    this.userService
      .changePassword({
        currentPassword,
        newPassword,
        passwordConfirm,
      })
      .subscribe({
        next: () => {
          alert('Password changed successfully!');
          this.passwordForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert(err.error.message || 'Failed to change password.');
        },
      });
  }
}
