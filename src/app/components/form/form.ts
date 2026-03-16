import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { NgOptimizedImage } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { HttpClient } from '@angular/common/http';


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
  enviando = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      celular: ['', Validators.required],
      genero: ['', Validators.required],
      data: ['', Validators.required],
      cep: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [
        '', 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
        ]
      ],
      confirmarSenha: ['', Validators.required],
      
      terms1: [false, Validators.requiredTrue],
      terms2: [false, Validators.requiredTrue],
      terms3: [false, Validators.requiredTrue],
      terms4: [false, Validators.requiredTrue],

      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    }, 
    { validators: this.senhasIguais }
  );
  }
/* =========================
  🔐 VALIDAÇÃO SENHAS IGUAIS
  ========================= */
  private senhasIguais(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;

    if (!senha || !confirmar) return null;

    return senha === confirmar ? null : { senhasDiferentes: true };
  }
/* =========================
🔍 BUSCA CEP (ViaCEP)
========================= */
  buscarCep(): void {
    const cep = this.form.get('cep')?.value;

    if (!cep) return;

    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return;

    this.http
      .get<any>(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .subscribe({
        next: (res) => {
          if (res.erro) {
            console.warn('CEP não encontrado');
            return;
          }

          this.form.patchValue({
            rua: res.logradouro,
            bairro: res.bairro,
            cidade: res.localidade,
            estado: res.uf
          });
        },
        error: (err) => {
          console.error('Erro ao buscar CEP', err);
        }
      });
  }

// =========================
// 👁️ VISIBILIDADE DA SENHA
// =========================
mostrarSenha = false;
mostrarConfirmarSenha = false;

toggleSenha() {
  this.mostrarSenha = !this.mostrarSenha;
}

toggleConfirmarSenha() {
  this.mostrarConfirmarSenha = !this.mostrarConfirmarSenha;
}

/* =========================
📤 SUBMIT
========================= */
  submit(): void {
    if (this.form.invalid || this.enviando) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;

    const payload = {
      cpf: this.form.value.cpf,
      email: this.form.value.email,
      senha: this.form.value.senha,

      patientData: {
        name: this.form.value.nome,
        cpf: this.form.value.cpf,
        email: this.form.value.email,
        mobileNumber: this.formatPhone(this.form.value.celular),
        birthDate: this.formatDateToApi(this.form.value.data),
        gender: this.formatGender(this.form.value.genero),

        address: {
          address: this.form.value.rua,
          number: this.form.value.numero,
          complement: this.form.value.complemento,
          neighborhood: this.form.value.bairro,
          city: this.form.value.cidade,
          state: this.form.value.estado,
          zipcode: this.form.value.cep,
          country: 'Brasil'
        }
      }
    };

    console.log('📦 Payload enviado:', payload);

    this.patientService.createPatient(payload).subscribe({
      next: res => {
        console.log('✅ Cadastro completo', res);
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('❌ Erro da API', err);
        alert(err.error?.details?.message || 'Erro ao cadastrar');
      }
    });
  }

  /* =========================
🔧 HELPERS
========================= */
  private formatDateToApi(date: Date | string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}${month}${year}`;
  }

  private formatGender(gender: string | null | undefined): string {
    if (!gender) return 'I';

    switch (gender.toLowerCase()) {
      case 'masculino':
      case 'm':
        return 'M';
      case 'feminino':
      case 'f':
        return 'F';
      default:
        return 'I';
    }
  }

  private formatPhone(phone: string | null | undefined): string {
    if (!phone) {
      throw new Error('Telefone obrigatório');
    }

    const digits = phone.replace(/\D/g, '');

    if (digits.length < 10 || digits.length > 11) {
      throw new Error('Telefone inválido. Use DDD + número');
    }

    return digits;
  }
/* =========================
🔙 NAVEGAÇÃO
========================= */
  voltar() {
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
