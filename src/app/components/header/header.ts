import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary";
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BtnPrimaryComponent,
    NgOptimizedImage
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  menuAberto = false;

  constructor(private router: Router) {}

  fecharMenu() {
    this.menuAberto = false;
  }
  
  irParaCadastro() {
    this.fecharMenu();
    this.router.navigate(['/form']);
  }

  irParaLogin() {
      window.open(
      'https://seudragora.agendar.cc/#/login',
      '_blank'
    );
  }

  irParaSecao(id: string) {
    this.fecharMenu();
    // Vai pra Home e aplica o fragment (#id)
    this.router.navigate(['/'], { fragment: id });
  }

  irParaAgendarConsulta() {
    window.open(
      'https://seudragora.agendar.cc/#/agendamentos/adicionar',
      '_blank'
    );
  }

  irParaFila() {
    window.open(
      'https://seudragora.agendar.cc/#/login',
      '_blank'
    );
  }

  openWhatsApp() {
    const phone = "558440420431";
    const message = "Olá, quero me consultar agora.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }

}