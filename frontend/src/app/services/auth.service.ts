import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://158.69.204.80/auth';

  constructor(private readonly http: HttpClient) {}

  login(credenciales: { email: string; pass: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, {
      email: credenciales.email,
      pass: credenciales.pass
    }).pipe(
      take(1), // Destruye el flujo tras la 1ª respuesta para evitar re-suscripciones
      tap((respuesta) => {
        if (respuesta?.access_token) {
          localStorage.setItem('token', respuesta.access_token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método requerido por auth.guard.ts
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  logout(): void {
    localStorage.removeItem('token');
  }
}