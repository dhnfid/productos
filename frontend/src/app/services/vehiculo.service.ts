import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private readonly baseUrl: string = 'http://158.69.204.80:80';

  constructor(private readonly http: HttpClient) { }

  // CRUD Vehículos
  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.baseUrl}/vehiculo`);
  }

  create(vehiculo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/vehiculo`, vehiculo);
  }

  update(id: string | number, vehiculo: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/vehiculo/${id}`, vehiculo);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/vehiculo/${id}`);
  }

  // Endpoints auxiliares para selectores
  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/marca`);
  }

  getModelos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/modelo`);
  }

  getTitulares(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/titular`);
  }
}