import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './painel.html',
  styleUrl: './painel.scss'
})
export class Painel {
  servicos = [
    { titulo: 'Atendimento em a Clínica Médica', preco: 69 },
    { titulo: 'Atendimento com a Psicólogo', preco: 69 },
    { titulo: 'Atendimento Médico em a Saúde Mental', preco: 169 },
    { titulo: 'Atendimento Médico em a Endocrinologia', preco: 169 },
    { titulo: 'Atendimento Médico em a Otorrino', preco: 169 }
  ];

  constructor(private router: Router) {}

  marcarConsulta(servico: { titulo: string; preco: number }) {
    this.router.navigate(['/area-paciente/agendamentos'], {
      state: {
        servicoSelecionado: servico
      }
    });
  }
}
