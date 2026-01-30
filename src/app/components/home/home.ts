import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer,
    NgOptimizedImage
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  activeIndex: number | null = null;

  faqs = [
    {
      pergunta: 'Qual o valor da consulta?',
      resposta: 'O valor pode variar conforme a área de atuação.'
    },
    {
      pergunta: 'Quais receituários podem ser emitidos digitalmente?',
      resposta: 'Receitas simples e controladas conforme a legislação.'
    },
    {
      pergunta: 'Como acessar a receita digital?',
      resposta: 'Ela fica disponível na plataforma após a consulta.'
    },
    {
      pergunta: 'Posso solicitar meus exames pela plataforma?',
      resposta: 'Sim, você pode solicitar exames pela paltaforma.'
    },
    {
      pergunta: 'Preciso de e-mail para acessar a plataforma?',
      resposta: 'Sim. O e-mail é necessário para criar seu cadastro, confirmar o agendamento e receber o link da consulta online, além de comunicações importantes sobre o atendimento.'
    },
    {
      pergunta: 'Como posso confirmar que serei atendido(a) por um médico?',
      resposta: 'Todos os atendimentos são realizados exclusivamente por médicos devidamente registrados no Conselho Regional de Medicina (CRM). As informações do profissional responsável pelo atendimento são apresentadas no momento da consulta.'
    },
    {
      pergunta: 'Como funciona a proteção dos meus dados?',
      resposta: 'Seus dados são protegidos conforme a Lei Geral de Proteção de Dados (LGPD). Utilizamos sistemas seguros, com criptografia e controle de acesso, garantindo confidencialidade, integridade e privacidade das suas informações.'
    },
    {
      pergunta: 'Como posso realizar o pagamento da consulta?',
      resposta: 'O pagamento é realizado de forma online, no momento do agendamento, por meio de ambiente seguro. Aceitamos Pix e cartão de crédito. Após a confirmação do pagamento, você poderá escolher o dia e horário da sua consulta.'
    },

  ];

  toggle(index: number) {
    alert('clicou ' + index);
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  closeFaq(): void {
    this.activeIndex = null;
  }

  testeClique() {
    alert('CLICOU');
  }
}

