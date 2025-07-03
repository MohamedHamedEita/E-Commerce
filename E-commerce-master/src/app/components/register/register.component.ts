import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/custom-validations/match-password';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  errorMessage: string = '';
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
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{5,}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: passwordMatch }
  );

  handelRegister(regForm: FormGroup) {
    console.log(regForm);
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this._Router.navigate(['/login']);
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
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleRepasswordVisibility() {
    this.repasswordFieldType = this.repasswordFieldType === 'password' ? 'text' : 'password';
  }
}
