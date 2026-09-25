import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EsquemaElectrico } from '../models/esquemaElectrico.model';

@Injectable({
  providedIn: 'root'
})
export class EsquemaElectricoService {
  private readonly baseUrl: string = 'http://158.69.204.80:80';

  constructor(private readonly http: HttpClient) {}

  // CRUD Esquemas Eléctricos
  getEsquemas(): Observable<EsquemaElectrico[]> {
    return this.http.get<EsquemaElectrico[]>(`${this.baseUrl}/esquemaElectrico`);
  }

  getEsquemaById(id: string): Observable<EsquemaElectrico> {
    return this.http.get<EsquemaElectrico>(`${this.baseUrl}/esquemaElectrico/${id}`);
  }

  create(esquema: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/esquemaElectrico`, esquema);
  }

  update(id: string, esquema: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/esquemaElectrico/${id}`, esquema);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/esquemaElectrico/${id}`);
  }

  // Endpoints auxiliares
  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/marca`);
  }

  getModelos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/modelo`);
  }

  updateModeloFallas(modeloId: string, fallasHabituales: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modelo/${modeloId}`, { fallasHabituales });
  }
}