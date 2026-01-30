import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel.html',
  styleUrl: './painel.scss'
})
export class Painel {
  servicos = [
    { titulo: 'Atendimento em Clínica Médica', preco: 69 },
    { titulo: 'Atendimento Médico em Otorrino', preco: 169 },
    { titulo: 'Atendimento Médico em Saúde Mental', preco: 169 },
    { titulo: 'Atendimento Médico em Endocrinologia', preco: 169 },
    { titulo: 'Atendimento com Psicólogo', preco: 69 }
  ];
}
