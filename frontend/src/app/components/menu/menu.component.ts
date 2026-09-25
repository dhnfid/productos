import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  template: `
    <div class="menu-container">
      <h2>Menú Principal - Taller Mecánico</h2>
      <div class="cards-grid">
        <div class="card" (click)="navegar('/titular')">
          <h3>Titulares</h3>
          <p>Gestión de clientes y propietarios</p>
        </div>
        <div class="card" (click)="navegar('/vehiculo')">
          <h3>Vehículos</h3>
          <p>Gestión de patentes y modelos</p>
        </div>
        <div class="card" (click)="navegar('/turno')">
          <h3>Turnos</h3>
          <p>Historial de servicios y precios</p>
        </div>
        <div class="card" (click)="navegar('/esquema-electrico')">
          <h3>Esquemas Eléctricos</h3>
          <p>Consulta de diagramas y planos</p>
        </div>
      </div>
      <button class="btn-logout" (click)="salir()">Cerrar Sesión</button>
    </div>
  `,
  styles: [`
    .menu-container { max-width: 900px; margin: 40px auto; text-align: center; }
    .cards-grid { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 30px; }
    .card { border: 1px solid #ccc; padding: 25px; border-radius: 8px; cursor: pointer; width: 200px; transition: 0.2s; }
    .card:hover { border-color: #007bff; background-color: #f8f9fa; transform: translateY(-3px); }
    .btn-logout { margin-top: 40px; padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class MenuComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

  salir() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}