import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { NgOptimizedImage } from '@angular/common';
import { PatientService } from '../../services/patient.service';

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
    private patientService: PatientService,
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
      termos: [false, Validators.requiredTrue],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
    name: this.form.value.nome,
    cpf: this.form.value.cpf,
    email: this.form.value.email,
    mobileNumber: this.formatPhone(this.form.value.celular),
    birthDate: this.formatDateToApi(this.form.value.data),
    gender: this.formatGender(this.form.value.gender),

    address: {
    address: this.form.value.rua,
    number: this.form.value.numero,
    complement: this.form.value.complemento,
    neighborhood: this.form.value.bairro,
    city: this.form.value.cidade,
    state: this.form.value.estado,
    country: this.form.value.pais || 'Brasil', // se quiser padrão
    zipcode: this.form.value.cep
  }
    

  };

  console.log('Payload enviado:', payload);

  this.patientService.createPatient(payload).subscribe({
    next: res => {
      console.log('Paciente criado com sucesso', res);
      this.router.navigate(['/login']);
    },
    error: err => {
      console.error('Erro da API', err);
    }
  });

    // depois conecta no backend
    this.router.navigate(['/login']);
  }

  // Função para formatar a data no padrão DDMMYYYY
  private formatDateToApi(date: Date | string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // meses começam do 0
    const year = d.getFullYear();
    return `${day}${month}${year}`;
  }
  private formatGender(gender: string | undefined | null): string {
    if (!gender) return 'I'; // se não houver valor, assume "Indefinido"
    
    switch (gender.toLowerCase()) {
      case 'masculino':
      case 'm':
        return 'M';
      case 'feminino':
      case 'f':
        return 'F';
      default:
        return 'I'; // qualquer outro valor → 'Indefinido'
    }
  }
  private formatPhone(phone: string | undefined | null): string {
    if (!phone) {
      throw new Error("Telefone obrigatório"); // ou retornar null e tratar depois
    }

    // Remove tudo que não for número
    const digits = phone.replace(/\D/g, '');

    // Verifica se tem ao menos 10 ou 11 dígitos (DDD + número)
    if (digits.length < 10 || digits.length > 11) {
      throw new Error("Telefone inválido, formato correto: 11999999999");
    }

    return digits;
  }


  voltar() {
    this.router.navigate(['/home']);
  }
  login() {
    this.router.navigate(['/login']);
  }
}