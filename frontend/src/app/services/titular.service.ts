import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitularService {
  private readonly baseUrl = 'http://158.69.204.80';

  constructor(private readonly http: HttpClient) {}

  // Obtener todos los titulares
  getTitulares(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/titular`);
  }

  // Obtener provincias para el selector
  getProvincias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/provincia`);
  }

  // Obtener localidades para el selector
  getLocalidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/localidad`);
  }

  // Crear un nuevo titular
  create(titular: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/titular`, titular);
  }

  // Actualizar un titular existente por ID
  update(id: string, titular: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/titular/${id}`, titular);
  }

  // Eliminar un titular por ID
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/titular/${id}`);
  }
}