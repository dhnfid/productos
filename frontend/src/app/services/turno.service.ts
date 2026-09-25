import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private readonly baseUrl: string = 'http://158.69.204.80:80';

  constructor(private readonly http: HttpClient) { }

  // CRUD Turnos
  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/turno`);
  }

  create(turno: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/turno`, turno);
  }

  update(id: string | number, turno: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/turno/${id}`, turno);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/turno/${id}`);
  }

  // Endpoint auxiliar para selector de vehículos
  getVehiculos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vehiculo`);
  }
}