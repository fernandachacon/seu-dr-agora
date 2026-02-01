import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Header,
    Footer,
    NgOptimizedImage
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  etapa = 1;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      celular: ['', Validators.required],
      genero: ['', Validators.required],
      data: ['', Validators.required],
      cep: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
      termos: [false, Validators.requiredTrue]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dadosCadastro = this.form.value;

    console.log('Cadastro do paciente:', dadosCadastro);

    // depois conecta no backend
    this.router.navigate(['/login']);
  }
}