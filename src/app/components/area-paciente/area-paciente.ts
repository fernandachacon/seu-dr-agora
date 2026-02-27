import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { filter } from 'rxjs';
import { NgZone } from '@angular/core';

interface Perfil {
  id: number;
  nome: string;
  email: string;
}

@Component({
  selector: 'app-area-paciente',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Footer],
  templateUrl: './area-paciente.html',
  styleUrl: './area-paciente.scss',
})
export class AreaPaciente implements OnInit {

  perfil!: Perfil;

  constructor(
    private http: HttpClient,
    private router: Router,
    private zone: NgZone  
  ) {}

  ngOnInit(): void {
    console.log('AREA PACIENTE INICIADO');

    this.buscarPerfil();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.buscarPerfil();
      });
  }

 buscarPerfil(): void {
  this.http
    .get<{ user: Perfil }>('http://localhost:3000/api/perfil')
    .subscribe(res => {

      this.zone.run(() => {
        this.perfil = res.user;
        console.log('Perfil final:', this.perfil);
      });

    });
}
}