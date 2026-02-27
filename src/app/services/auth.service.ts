import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface Perfil {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  private perfilSubject = new BehaviorSubject<Perfil | null>(null);
  perfil$ = this.perfilSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  carregarPerfil() {
    this.http.get<{ user: Perfil }>(`${this.apiUrl}/perfil`)
      .subscribe(res => {
        this.perfilSubject.next(res.user);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.perfilSubject.next(null);
  }
}