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
      resposta: 'O valor pode variar conforme a especialidade.'
    },
    {
      pergunta: 'Quais receituários podem ser emitidos digitalmente?',
      resposta: 'Receitas simples e controladas conforme a legislação.'
    },
    {
      pergunta: 'Como acessar a receita digital?',
      resposta: 'Ela fica disponível na plataforma após a consulta.'
    }
  ];

  toggle(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  closeFaq(): void {
    this.activeIndex = null;
  }
}

