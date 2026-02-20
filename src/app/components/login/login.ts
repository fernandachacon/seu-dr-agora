import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Header,
    Footer
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
  private fb: FormBuilder,
  private router: Router,
  private authService: AuthService
) {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });
}
  submit(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { email, senha } = this.loginForm.value;

  this.loading = true;
  this.errorMessage = '';

  this.authService.login(email, senha).subscribe({
    next: () => {
      this.router.navigate(['/area-paciente']);
    },
    error: (err) => {
      this.errorMessage =
        err.error?.error || 'Email ou senha inválidos';
      this.loading = false;
    },
    complete: () => {
      this.loading = false;
    }
  });
}
}
