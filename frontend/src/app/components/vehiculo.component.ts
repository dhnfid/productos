import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculoService } from '../services/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./vehiculo.component.css'],
  template: `
    <div class="container">
      <button (click)="volver()">← Volver al Menú</button>
      <h2>Gestión de Vehículos</h2>

      <!-- BUSCADOR REACTIVO -->
      <input 
        type="text" 
        placeholder="Buscar por Patente, Marca, Modelo o Titular..." 
        [(ngModel)]="filtro" 
        (input)="filtrar()" 
        class="search-bar"
      />

      <!-- FORMULARIO CREAR / EDITAR -->
      <div class="form-card">
        <h3>{{ seleccionado ? 'Editar Vehículo' : 'Nuevo Vehículo' }}</h3>
        <input [(ngModel)]="form.patente" placeholder="Patente (ej: AA123CD)" />

        <!-- SELECTOR MARCA -->
        <select [(ngModel)]="form.marcaId" (change)="onMarcaChange()">
          <option [ngValue]="''">-- Seleccionar Marca --</option>
          @for (m of marcas; track m.id) {
            <option [ngValue]="m.id">{{ m.nombre }}</option>
          }
        </select>

        <!-- SELECTOR MODELO -->
        <select [(ngModel)]="form.modeloId" [disabled]="!form.marcaId">
          <option [ngValue]="''">-- Seleccionar Modelo --</option>
          @for (mod of modelosFiltrados; track mod.id) {
            <option [ngValue]="mod.id">{{ mod.nombre }}</option>
          }
        </select>

        <!-- SELECTOR TITULAR -->
        <select [(ngModel)]="form.titularId">
          <option [ngValue]="''">-- Seleccionar Titular --</option>
          @for (t of titulares; track t.id) {
            <option [ngValue]="t.id">{{ t.nombre }} </option>
          }
        </select>
        
        <button (click)="guardar()">{{ seleccionado ? 'Actualizar' : 'Crear' }}</button>
        <button *ngIf="seleccionado" (click)="cancelarEdicion()">Cancelar</button>
      </div>

      <!-- TABLA DE VEHÍCULOS -->
      <table>
        <thead>
          <tr>
            <th class="col-sel">Sel.</th>
            <th>Patente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Titular</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (v of vehiculosFiltrados; track v.id) {
            <tr [class.selected]="seleccionado?.id === v.id">
              <td class="col-sel">
                <input type="radio" name="sel" [checked]="seleccionado?.id === v.id" (change)="seleccionar(v)" />
              </td>
              <td>{{ v.patente }}</td>
              <td>{{ v.modelo?.marca?.nombre || 'Marca no especificada' }}</td>
              <td>{{ v.modelo?.nombre || 'Modelo no especificado' }}</td>
              <td>{{ v.titular?.nombre || 'Sin titular' }}</td>
              <td>
                <button (click)="eliminar(v.id)" class="btn-danger">Eliminar</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="6" style="text-align: center; padding: 15px;">No se encontraron vehículos.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class VehiculoComponent implements OnInit {
  vehiculos: any[] = [];
  vehiculosFiltrados: any[] = [];
  marcas: any[] = [];
  modelos: any[] = [];
  modelosFiltrados: any[] = [];
  titulares: any[] = [];

  filtro: string = '';
  seleccionado: any = null;

  form = {
    patente: '',
    marcaId: '',
    modeloId: '',
    titularId: ''
  };

  constructor(
    private readonly vehiculoService: VehiculoService, 
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : (res?.data || []);
        this.vehiculos = [...lista];
        this.vehiculosFiltrados = [...lista];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar vehículos:', err)
    });

    this.vehiculoService.getMarcas().subscribe({
      next: (res: any) => {
        this.marcas = Array.isArray(res) ? res : (res?.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar marcas:', err)
    });

    this.vehiculoService.getModelos().subscribe({
      next: (res: any) => {
        this.modelos = Array.isArray(res) ? res : (res?.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar modelos:', err)
    });

    this.vehiculoService.getTitulares().subscribe({
      next: (res: any) => {
        this.titulares = Array.isArray(res) ? res : (res?.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar titulares:', err)
    });
  }

  onMarcaChange(): void {
    if (this.form.marcaId) {
      this.modelosFiltrados = this.modelos.filter(m => {
        const marcaId = m.marca?.id ?? m.marcaId;
        return String(marcaId) === String(this.form.marcaId);
      });
    } else {
      this.modelosFiltrados = [];
    }
    this.form.modeloId = '';
    this.cdr.detectChanges();
  }

  filtrar(): void {
    const query = this.filtro.trim().toLowerCase();
    if (!query) {
      this.vehiculosFiltrados = [...this.vehiculos];
      return;
    }
    
    this.vehiculosFiltrados = this.vehiculos.filter(v => 
      v.patente?.toLowerCase().includes(query) || 
      v.modelo?.marca?.nombre?.toLowerCase().includes(query) ||
      v.modelo?.nombre?.toLowerCase().includes(query) ||
      v.titular?.nombre?.toLowerCase().includes(query) 
    );
  }

  seleccionar(v: any): void {
    this.seleccionado = v;
    
    const mId = v.modelo?.marca?.id ?? v.marcaId ?? '';
    const modId = v.modelo?.id ?? v.modeloId ?? '';
    const tId = v.titular?.id ?? v.titularId ?? '';

    this.form = {
      patente: v.patente,
      marcaId: mId,
      modeloId: modId,
      titularId: tId
    };

    this.onMarcaChange();
    this.form.modeloId = modId;
    this.cdr.detectChanges();
  }

  cancelarEdicion(): void {
    this.seleccionado = null;
    this.form = { patente: '', marcaId: '', modeloId: '', titularId: '' };
    this.modelosFiltrados = [];
    this.cdr.detectChanges();
  }

  guardar(): void {
    const patente = this.form.patente?.trim().toUpperCase();

    // 1. Validar campos incompletos
    if (!patente || !this.form.marcaId || !this.form.modeloId || !this.form.titularId) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // 2. Validar formato de Patente (Formato viejo 6 caract. O formato nuevo Mercosur 7 caract.)
    const regexPatente = /^([A-Z]{3}[0-9]{3}|[A-Z]{2}[0-9]{3}[A-Z]{2})$/;
    if (!regexPatente.test(patente)) {
      alert('El formato de la patente es inválido. Ejemplos válidos: ABC123 o AB123CD.');
      return;
    }

    const payload = {
      patente: patente,
      modeloId: this.form.modeloId,
      titularId: this.form.titularId
    };

    if (this.seleccionado) {
      this.vehiculoService.update(this.seleccionado.id, payload).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el vehículo.');
        }
      });
    } else {
      this.vehiculoService.create(payload).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Error al crear el vehículo.');
        }
      });
    }
  }

  eliminar(id: string | number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      this.vehiculoService.delete(id).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al eliminar vehículo:', err);
          alert('Error al eliminar el vehículo.');
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