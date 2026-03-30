import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3000/api/pagamentos';

  constructor(private http: HttpClient) {}

  criarCheckout(dados: {
    consultaId: number;
    valor: number;
    nomePaciente: string;
    email?: string;
    cpfCnpj?: string;
    telefone?: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkout`, dados);
  }
}