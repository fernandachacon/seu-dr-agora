import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento-pix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagamento-pix.html',
  styleUrl: './pagamento-pix.scss'
})
export class PagamentoPix {

  valor = 100.00;
  codigoPix = '00020101021226870014br.gov.bcb.pix...'; // mock
  tempoRestante = '15:00';

  constructor(private router: Router) {}

  copiarCodigo() {
    navigator.clipboard.writeText(this.codigoPix);
    alert('Código PIX copiado!');
  }

  voltar() {
    this.router.navigate(['/area-paciente/selecione-pagamento']);
  }
}
