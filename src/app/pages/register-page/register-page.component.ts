import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { Client, CreateUserDTO } from '../../services/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
errorMessage: string = "";
  constructor(
    private auth: AuthService,
    private client: Client,
    private router: Router,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {}
  private fb = inject(FormBuilder);
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessages: { [key: string]: { [key: string]: string } } = {
    firstName: { required: 'First name is required.' },
    lastName: { required: 'Last name is required.' },
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
  this.errorMessage = "";
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loaderService.showLoader();

  const dto = {
    firstName: this.form.value.firstName!,
    lastName: this.form.value.lastName!,
    email: this.form.value.email!,
    password: this.form.value.password!
  } as CreateUserDTO;

  this.client.users(dto).subscribe({
    next: () => {
      this.loaderService.hideLoader();
      this.messageService.add({ severity: 'success', summary: 'Uspešna registracija', detail: 'Možete se sada ulogovati!', life: 5000 });
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = "Registracija nije uspela.";
      this.loaderService.hideLoader();
    }
  });
}
}
