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
    { titulo: 'Atendimento em a Clínica Médica', preco: 69 },
    { titulo: 'Atendimento com a Psicólogo', preco: 69 },
    { titulo: 'Atendimento Médico em a Otorrino', preco: 169 },
    { titulo: 'Atendimento Médico em a Saúde Mental', preco: 169 },
    { titulo: 'Atendimento Médico em a Endocrinologia', preco: 169 }
  ];
}
