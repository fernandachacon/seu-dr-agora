import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
});
}

  proximaEtapa() {
  if (this.etapa === 1) {
    const camposEtapa1 = ['nome', 'email'];

    camposEtapa1.forEach(campo => {
      this.form.get(campo)?.markAsTouched();
    });

    if (
      this.form.get('nome')?.invalid ||
      this.form.get('email')?.invalid
    ) {
      return;
    }
  }

  this.etapa++;
}

  voltarEtapa() {
    this.etapa--;
  }

  finalizarCadastro() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Dados do cadastro:', this.form.value);
  }
}
