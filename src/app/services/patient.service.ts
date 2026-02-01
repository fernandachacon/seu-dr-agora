import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'https://api-patients-staging.communicare.com.br/v1/patient';

  constructor(private http: HttpClient) {}

  createPatient(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api_token': '81678F3D240F87CBF444172276C0058E1F80FB7B8C0FE06F4FF5D6D1F40DBF05FB'
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}