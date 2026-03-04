import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { filter } from 'rxjs';

interface Perfil {
  id: number;
  nome: string;
  email: string;
}

@Component({
  selector: 'app-area-paciente',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    Footer
  ],
  templateUrl: './area-paciente.html',
  styleUrl: './area-paciente.scss',
})
export class AreaPaciente implements OnInit {

  perfil!: Perfil;
  menuAberto = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('AREA PACIENTE INICIADO');

    // Busca o perfil ao entrar
    this.buscarPerfil();

    // Rebusca ao navegar dentro da área do paciente
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.buscarPerfil();
      });
  }

  buscarPerfil(): void {
    this.http
      .get<{ user: Perfil }>('http://localhost:3000/api/perfil')
      .subscribe({
        next: (res) => {
          this.perfil = res.user;
          console.log('Perfil final:', this.perfil);
        },
        error: (err) => {
          console.error('Erro ao buscar perfil:', err);

          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }
}