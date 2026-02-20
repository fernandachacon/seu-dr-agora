import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-area-paciente',
  standalone: true,
  imports: [
    CommonModule,   
    RouterOutlet,   
    Footer          
  ],
  templateUrl: './area-paciente.html',
  styleUrl: './area-paciente.scss',
})
export class AreaPaciente implements OnInit {

  perfil: any;
  isBrowser = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.buscarPerfil();
  }

 buscarPerfil(): void {
  this.http.get<any>('http://localhost:3000/api/perfil').subscribe({
    next: res => {
      this.perfil = res.user; 
      this.cdr.detectChanges(); 
    },
    error: err => console.error('Erro na requisição:', err)
  });
}
}