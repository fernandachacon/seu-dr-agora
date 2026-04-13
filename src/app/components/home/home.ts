import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { NgOptimizedImage } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Header,
    Footer,
    NgOptimizedImage,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  activeIndex: number | null = null;

  faqs = [
    {
      pergunta: 'Qual o valor da consulta?',
      resposta: 'Os valores mudam conforme a área de atendimento, mas estamos aqui para te orientar e encontrar a melhor opção para você.'
    },
    {
      pergunta: 'Quais receituários podem ser emitidos digitalmente?',
      resposta: 'Emitimos receitas simples e controladas de forma digital, com toda a segurança, cuidado e praticidade, sempre dentro das normas legais.'
    },
    {
      pergunta: 'Como acessar a receita digital?',
      resposta: 'Depois da sua consulta, sua receita digital fica disponível na plataforma para você acessar com calma, segurança e sempre que precisar. Estamos aqui para facilitar seu cuidado.'
    },
    {
      pergunta: 'Posso solicitar meus exames pela plataforma?',
      resposta: 'Pode sim. Durante a consulta, o médico vai ouvir você com atenção e cuidado. Se houver necessidade, ele já realiza a solicitação dos seus exames ali mesmo, de forma online, para que você tenha mais praticidade.'
    },
    {
      pergunta: 'Preciso de e-mail para acessar a plataforma?',
      resposta: 'Sim. O e-mail é necessário para criar seu cadastro, confirmar seu agendamento e receber o link da consulta online, além de garantir que você receba todas as informações importantes sobre o seu atendimento.'
    },
    {
      pergunta: 'Como posso confirmar que serei atendido(a) por um médico?',
      resposta: 'Todos os atendimentos são realizados exclusivamente por médicos com registro ativo no Conselho Regional de Medicina (CRM). No momento da consulta, você pode visualizar as informações do profissional responsável, garantindo transparência, segurança e confiança no seu atendimento.'
    },
    {
      pergunta: 'Como funciona a proteção dos meus dados?',
      resposta: 'Seus dados são protegidos conforme a Lei Geral de Proteção de Dados (LGPD). Utilizamos sistemas seguros, com criptografia e controle de acesso, para garantir a confidencialidade, a integridade e a privacidade das suas informações. O acesso ao seu prontuário é restrito apenas ao médico responsável pelo seu atendimento. Você pode ficar tranquilo(a): cuidamos dos seus dados com a mesma responsabilidade e atenção que cuidamos da sua saúde.'
    },
    {
      pergunta: 'Como posso realizar o pagamento da consulta?',
      resposta: 'O pagamento é realizado online, no momento do agendamento, em um ambiente seguro e protegido. Você pode escolher pagar via Pix ou cartão de crédito. Assim que o pagamento é confirmado, você fica à vontade para escolher o dia e horário que melhor se encaixam na sua rotina. Tudo pensado para tornar seu cuidado mais simples, tranquilo e prático.'
    },

  ];

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  closeFaq(): void {
    this.activeIndex = null;
  }

  irParaFila() {
    window.open(
      'https://seudragora.agendar.cc/#/agendamentos/pronto-atendimento/entrar',
      '_blank'
    );
  }

}

