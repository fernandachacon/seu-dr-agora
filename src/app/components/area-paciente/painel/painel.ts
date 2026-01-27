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
    { titulo: 'Plantão Médico 24H', preco: 69 },
    { titulo: 'Renovação de Receita', preco: 69 },
    { titulo: 'Psicologia', preco: 69 },
    { titulo: 'Endocrinologia', preco: 69 },
    { titulo: 'Psiquiatria', preco: 69 },
    { titulo: 'Nutrição', preco: 69 }
  ];
}
