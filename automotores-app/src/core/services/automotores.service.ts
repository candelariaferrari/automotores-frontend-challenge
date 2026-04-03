import { Automotor } from './../models/automotor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomotoresService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAutomotores(): Observable<Automotor[]> {
    return this.http.get<Automotor[]>(`${this.apiUrl}/automotores`);
  }

  getAutomotor(domain: string): Observable<Automotor> {
    return this.http.get<Automotor>(`${this.apiUrl}/automotores/${domain}`);
  }

  createAutomotor(data: Automotor) {
    return this.http.post(`${this.apiUrl}/automotores`, data);
  }

  updateAutomotor(domain: string, data: Automotor) {
    return this.http.put(`${this.apiUrl}/automotores/${domain}`, data);
  }

  deleteAutomotor(id: number) {
    return this.http.delete(`${this.apiUrl}/automotores/${id}`);
  }
}
