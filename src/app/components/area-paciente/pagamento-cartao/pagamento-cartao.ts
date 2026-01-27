import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento-cartao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagamento-cartao.html',
  styleUrl: './pagamento-cartao.scss'
})
export class PagamentoCartao {

  valor = 100.00;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      numeroCartao: ['', [Validators.required, Validators.minLength(16)]],
      nomeCartao: ['', Validators.required],
      validade: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  voltar() {
    this.router.navigate(['/area-paciente/selecione-pagamento']);
  }

  pagar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Dados do pagamento:', this.form.value);

    // simulação de pagamento
    alert('Pagamento efetuado com sucesso!');
  }
}
