import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:3000/api/patient';

  constructor(private http: HttpClient) {}

  createPatient(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}