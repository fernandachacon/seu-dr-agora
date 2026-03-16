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

  irParaSecao(id: string) {
    this.fecharMenu();
    // Vai pra Home e aplica o fragment (#id)
    this.router.navigate(['/'], { fragment: id });
  }
}

