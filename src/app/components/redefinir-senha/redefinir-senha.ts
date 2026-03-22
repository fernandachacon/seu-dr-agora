import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    Header,
    Footer
  ],
  templateUrl: './redefinir-senha.html',
  styleUrl: './redefinir-senha.scss',
})
export class RedefinirSenha {
  form: FormGroup;
  mostrarSenha = false;
  mostrarConfirmarSenha = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        senha: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
          ]
        ],
        confirmarSenha: ['', [Validators.required]]
      },
      {
        validators: this.senhasIguaisValidator()
      }
    );
  }

  senhasIguaisValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const senha = group.get('senha')?.value;
      const confirmarSenha = group.get('confirmarSenha')?.value;

      if (!senha || !confirmarSenha) {
        return null;
      }

      return senha === confirmarSenha ? null : { senhasDiferentes: true };
    };
  }

  toggleSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  toggleConfirmarSenha(): void {
    this.mostrarConfirmarSenha = !this.mostrarConfirmarSenha;
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const novaSenha = this.form.value.senha;

    console.log('Nova senha:', novaSenha);

    // depois você pode trocar isso pela chamada ao backend
    // this.authService.redefinirSenha(novaSenha).subscribe(...)

    this.router.navigate(['/login']);
  }
}