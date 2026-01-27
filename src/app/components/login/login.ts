import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

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
    private router: Router
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

    // 🔒 Simulação de login (depois você troca pelo backend)
    setTimeout(() => {
      if (email === 'teste@email.com' && senha === '123456') {

        // Aqui você pode salvar token, user, etc
        localStorage.setItem('auth', 'true');

        this.router.navigate(['/area-paciente']);
      } else {
        this.errorMessage = 'Email ou senha inválidos';
      }

      this.loading = false;
    }, 1000);
  }
}
