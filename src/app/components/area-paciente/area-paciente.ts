import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { ChangeDetectorRef } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-area-paciente',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    Footer

  ],
  templateUrl: './area-paciente.html',
  styleUrl: './area-paciente.scss',
})
export class AreaPaciente implements OnInit { // Boa prática: adicione o 'implements OnInit'
  menuAberto = false;
  perfil: any;
  isBrowser = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Definimos se é browser logo no construtor
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // PROTEÇÃO: Só busca o perfil se estiver no navegador
    // Isso evita que o servidor tente fazer uma requisição autenticada sem ter o token
    if (this.isBrowser) {
      this.buscarPerfil();
    }
  }

  fecharMenu() {
    this.menuAberto = false;
  }

  buscarPerfil(): void {
    this.http.get<any>('http://localhost:3000/api/perfil').subscribe({
      next: res => {
        this.perfil = res.user; 
        this.cdr.detectChanges(); 
      },
      error: err => {
        console.error('Erro na requisição:', err);
        // Se der erro de autenticação (401), você pode redirecionar aqui também
        if (err.status === 401 && this.isBrowser) {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}