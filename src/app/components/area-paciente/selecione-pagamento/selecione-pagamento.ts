import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selecione-pagamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecione-pagamento.html',
  styleUrl: './selecione-pagamento.scss',
})
export class SelecionePagamento {

  constructor(private router: Router) {}

  irParaPix() {
  this.router.navigate(['/area-paciente/pagamento-pix']);
}

  pagarCartao() {
    this.router.navigate(['/area-paciente/pagamento-cartao']);
  }
}
