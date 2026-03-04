import { Component } from '@angular/core';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary";
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    NgOptimizedImage
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  menuAberto = false;

  constructor(private router: Router) {}

  irParaCadastro() {
    this.router.navigate(['/form']);
    this.menuAberto = false; // fecha o menu no mobile
  }

  fecharMenu() {
    this.menuAberto = false;
  }
}

