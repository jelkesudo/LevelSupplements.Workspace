import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(private router:Router){}
private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessages: { [key: string]: { [key: string]: string } } = {
    email: {
      required: 'Email is required.',
      email: 'Email must be valid.'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters.'
    }
  };

  getErrors(controlName: string): string[] {
    const control = this.form.get(controlName);
    if (!control || !control.errors || !control.touched) return [];
    return Object.keys(control.errors).map(err => this.errorMessages[controlName][err]);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: () => {
        console.log('Login success');
        this.router.navigate([""]);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
