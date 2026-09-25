import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TurnoService } from '../services/turno.service';

@Component({
  selector: 'app-turno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./turno.component.css'],
  template: `
    <div class="container">
      <button (click)="volver()">← Volver al Menú</button>
      <h2>Gestión de Turnos</h2>

      <!-- BUSCADOR REACTIVO -->
      <input 
        type="text" 
        placeholder="Buscar por Fecha, Titular, Patente, Descripción..." 
        [(ngModel)]="filtro" 
        (input)="filtrar()" 
        class="search-bar"
      />

      <!-- FORMULARIO CREAR / EDITAR -->
      <div class="form-card">
        <h3>{{ seleccionado ? 'Editar Turno' : 'Nuevo Turno' }}</h3>
        
        <input type="date" [(ngModel)]="form.fecha" placeholder="Fecha" />

        <!-- SELECTOR TITULAR -->
        <select [(ngModel)]="titularSeleccionadoId" (change)="onTitularChange()">
          <option [ngValue]="''">-- Todos / Seleccionar Titular --</option>
          @for (t of titulares; track t.id) {
            <option [ngValue]="t.id">
              {{ t.nombre }}
            </option>
          }
        </select>

        <!-- SELECTOR VEHÍCULO -->
        <select [(ngModel)]="form.vehiculoId" (change)="onVehiculoChange()">
          <option [ngValue]="''">-- Seleccionar Vehículo --</option>
          @for (v of vehiculosFiltradosForm; track v.id) {
            <option [ngValue]="v.id">
              {{ v.patente }} - {{ v.titular ? v.titular.nombre : 'Sin Titular' }}
            </option>
          }
        </select>

        <input type="number" [(ngModel)]="form.km" placeholder="Kilometraje (km)" min="0" />
        <input [(ngModel)]="form.descripcion" placeholder="Descripción / Trabajo a realizar" />
        <input type="number" [(ngModel)]="form.precio" placeholder="Precio ($)" min="0" step="0.01" />

        <!-- CONTENEDOR DE ACCIONES -->
        <div class="form-actions">
          <button (click)="guardar()">{{ seleccionado ? 'Actualizar' : 'Crear' }}</button>
          <button *ngIf="seleccionado" (click)="cancelarEdicion()">Cancelar</button>
        </div>
      </div>

      <!-- TABLA DE TURNOS -->
      <table>
        <thead>
          <tr>
            <th class="col-sel">Sel.</th>
            <th>Fecha</th>
            <th>Titular</th>
            <th>Patente</th>
            <th>Kilometraje</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (t of turnosFiltrados; track t.id) {
            <tr [class.selected]="seleccionado?.id === t.id">
              <td class="col-sel">
                <input type="radio" name="sel" [checked]="seleccionado?.id === t.id" (change)="seleccionar(t)" />
              </td>
              <!-- Se agrega timezone UTC para que la tabla no reste horas locales -->
              <td>{{ t.fecha | date:'dd/MM/yyyy':'UTC' }}</td>
              <td>
                {{ t.vehiculos?.titular ? t.vehiculos.titular.nombre : 'Sin Titular' }}
              </td>
              <td>{{ t.vehiculos?.patente || 'Sin vehículo' }}</td>
              <td>{{ t.km }} km</td>
              <td>{{ t.descripcion }}</td>
              <td>{{ t.precio | currency:'ARS':'symbol':'1.2-2' }}</td>
              <td>
                <button (click)="eliminar(t.id)" class="btn-danger">Eliminar</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="8" style="text-align: center; padding: 15px;">No se encontraron turnos.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class TurnoComponent implements OnInit {
  turnos: any[] = [];
  turnosFiltrados: any[] = [];
  vehiculos: any[] = [];
  vehiculosFiltradosForm: any[] = [];
  titulares: any[] = [];

  filtro: string = '';
  seleccionado: any = null;
  titularSeleccionadoId: string = '';

  form = {
    fecha: '',
    km: null as number | null,
    descripcion: '',
    precio: null as number | null,
    vehiculoId: ''
  };

  constructor(
    private readonly turnoService: TurnoService, 
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.turnoService.getTurnos().subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : (res?.data || []);
        this.turnos = [...lista];
        this.turnosFiltrados = [...lista];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar turnos:', err)
    });

    this.turnoService.getVehiculos().subscribe({
      next: (res: any) => {
        this.vehiculos = Array.isArray(res) ? res : (res?.data || []);
        this.vehiculosFiltradosForm = [...this.vehiculos];
        
        // Extraer titulares únicos de los vehículos recibidos
        this.extraerTitulares();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar vehículos:', err)
    });
  }

  extraerTitulares(): void {
    const mapaTitulares = new Map<string, any>();
    this.vehiculos.forEach(v => {
      if (v.titular && v.titular.id) {
        mapaTitulares.set(v.titular.id, v.titular);
      }
    });
    this.titulares = Array.from(mapaTitulares.values());
  }

  onTitularChange(): void {
    if (!this.titularSeleccionadoId) {
      this.vehiculosFiltradosForm = [...this.vehiculos];
    } else {
      this.vehiculosFiltradosForm = this.vehiculos.filter(
        v => v.titular?.id === this.titularSeleccionadoId
      );
    }

    const existeEnFiltrados = this.vehiculosFiltradosForm.some(v => v.id === this.form.vehiculoId);
    if (!existeEnFiltrados) {
      this.form.vehiculoId = '';
    }
  }

  onVehiculoChange(): void {
    if (this.form.vehiculoId) {
      const vehiculoEncontrado = this.vehiculos.find(v => v.id === this.form.vehiculoId);
      if (vehiculoEncontrado?.titular?.id) {
        this.titularSeleccionadoId = vehiculoEncontrado.titular.id;
        this.vehiculosFiltradosForm = this.vehiculos.filter(
          v => v.titular?.id === this.titularSeleccionadoId
        );
      }
    }
  }

  filtrar(): void {
    const query = this.filtro.trim().toLowerCase();
    if (!query) {
      this.turnosFiltrados = [...this.turnos];
      return;
    }
    
    this.turnosFiltrados = this.turnos.filter(t => {
      const titularNombre = t.vehiculos?.titular?.nombre?.toLowerCase() || '';

      return (
        t.fecha?.toString().includes(query) || 
        titularNombre.includes(query) ||
        t.vehiculos?.patente?.toLowerCase().includes(query) ||
        t.descripcion?.toLowerCase().includes(query)
      );
    });
  }

  seleccionar(t: any): void {
    this.seleccionado = t;
    
    const vId = t.vehiculos?.id ?? t.vehiculoId ?? '';

    // Extraer AAAA-MM-DD forzando lectura UTC para evitar desfasaje de zona horaria local
    let fechaFormateada = '';
    if (t.fecha) {
      if (typeof t.fecha === 'string' && t.fecha.includes('-')) {
        fechaFormateada = t.fecha.split('T')[0];
      } else {
        const d = new Date(t.fecha);
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        fechaFormateada = `${yyyy}-${mm}-${dd}`;
      }
    }

    this.form = {
      fecha: fechaFormateada,
      km: t.km,
      descripcion: t.descripcion,
      precio: t.precio,
      vehiculoId: vId
    };

    if (t.vehiculos?.titular?.id) {
      this.titularSeleccionadoId = t.vehiculos.titular.id;
      this.vehiculosFiltradosForm = this.vehiculos.filter(
        v => v.titular?.id === this.titularSeleccionadoId
      );
    } else {
      this.titularSeleccionadoId = '';
      this.vehiculosFiltradosForm = [...this.vehiculos];
    }

    this.cdr.detectChanges();
  }

  cancelarEdicion(): void {
    this.seleccionado = null;
    this.titularSeleccionadoId = '';
    this.vehiculosFiltradosForm = [...this.vehiculos];
    this.form = { fecha: '', km: null, descripcion: '', precio: null, vehiculoId: '' };
    this.cdr.detectChanges();
  }

  guardar(): void {
    const descripcion = this.form.descripcion?.trim();

    if (!this.form.fecha || this.form.km === null || this.form.km === undefined || 
        !descripcion || this.form.precio === null || this.form.precio === undefined || 
        !this.form.vehiculoId) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (this.form.km < 0) {
      alert('El kilometraje debe ser un valor numérico igual o mayor a 0.');
      return;
    }

    if (this.form.precio < 0) {
      alert('El precio debe ser un valor numérico igual o mayor a 0.');
      return;
    }

    const payload = {
      fecha: this.form.fecha,
      km: Number(this.form.km),
      descripcion: descripcion,
      precio: Number(this.form.precio),
      vehiculoId: this.form.vehiculoId
    };

    if (this.seleccionado) {
      this.turnoService.update(this.seleccionado.id, payload).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el turno.');
        }
      });
    } else {
      this.turnoService.create(payload).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Error al crear el turno.');
        }
      });
    }
  }

  eliminar(id: string | number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este turno?')) {
      this.turnoService.delete(id).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al eliminar turno:', err);
          alert('Error al eliminar el turno.');
        }
      });
    }
  }

  reset(): void {
    this.cancelarEdicion();
    this.cargar();
  }

  volver(): void {
    this.router.navigate(['/menu']);
  }
}