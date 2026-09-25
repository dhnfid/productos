import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TitularService } from '../services/titular.service';

@Component({
  selector: 'app-titular',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./titular.component.css'],
  template: `
    <div class="container">
      <button (click)="volver()">← Volver al Menú</button>
      <h2>Gestión de Titulares</h2>

      <!-- BUSCADOR REACTIVO -->
      <input 
        type="text" 
        placeholder="Buscar por Nombre, Teléfono, Provincia o Localidad..." 
        [(ngModel)]="filtro" 
        (input)="filtrar()" 
        class="search-bar"
      />

      <!-- FORMULARIO CREAR / EDITAR -->
      <div class="form-card">
        <h3>{{ seleccionado ? 'Editar Titular' : 'Nuevo Titular' }}</h3>

        <!-- NOMBRE COMPLETO -->
        <input 
          type="text" 
          [(ngModel)]="form.nombre" 
          placeholder="Nombre completo (ej: Juan Pérez)" 
        />

        <!-- TELÉFONO -->
        <input 
          type="text" 
          [(ngModel)]="form.telefono" 
          placeholder="Teléfono (ej: 3531234567)" 
        />

        <!-- SELECTOR PROVINCIA -->
        <select [(ngModel)]="form.provinciaId" (change)="onProvinciaChange()">
          <option [ngValue]="''">-- Seleccionar Provincia --</option>
          @for (p of provincias; track p.id) {
            <option [ngValue]="p.id">{{ p.nombre }}</option>
          }
        </select>

        <!-- SELECTOR LOCALIDAD -->
        <select [(ngModel)]="form.localidadId" (change)="onLocalidadChange()" [disabled]="!form.provinciaId">
          <option [ngValue]="''">-- Seleccionar Localidad --</option>
          @for (loc of localidadesFiltradas; track loc.id) {
            <option [ngValue]="loc.id">{{ loc.nombre }}</option>
          }
        </select>

        <button (click)="guardar()">{{ seleccionado ? 'Actualizar' : 'Crear' }}</button>
        <button *ngIf="seleccionado" (click)="cancelarEdicion()">Cancelar</button>
      </div>

      <!-- TABLA DE TITULARES -->
      <table>
        <thead>
          <tr>
            <th class="col-sel">Sel.</th>
            <th>Nombre Completo</th>
            <th>Teléfono</th>
            <th>Provincia</th>
            <th>Localidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (t of titularesFiltrados; track t.id) {
            <tr [class.selected]="seleccionado?.id === t.id">
              <td class="col-sel">
                <input type="radio" name="sel" [checked]="seleccionado?.id === t.id" (change)="seleccionar(t)" />
              </td>
              <td>{{ t.nombre }}</td>
              <td>{{ t.telefono || 'Sin registrar' }}</td>
              <td>{{ t.localidad?.provincia?.nombre || 'Provincia no especificada' }}</td>
              <td>{{ t.localidad?.nombre || 'Localidad no especificada' }}</td>
              <td>
                <button (click)="eliminar(t.id)" class="btn-danger">Eliminar</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="6" style="text-align: center; padding: 15px;">No se encontraron titulares.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class TitularComponent implements OnInit {
  titulares: any[] = [];
  titularesFiltrados: any[] = [];
  provincias: any[] = [];
  localidades: any[] = [];
  localidadesFiltradas: any[] = [];

  filtro: string = '';
  seleccionado: any = null;

  form = {
    provinciaId: '',
    localidadId: '',
    nombre: '',
    telefono: ''
  };

  constructor(
    private readonly titularService: TitularService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.titularService.getTitulares().subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : (res?.data || []);
        this.titulares = [...lista];
        this.titularesFiltrados = [...lista];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar titulares:', err)
    });

    this.titularService.getProvincias().subscribe({
      next: (res: any) => {
        this.provincias = Array.isArray(res) ? res : (res?.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar provincias:', err)
    });

    this.titularService.getLocalidades().subscribe({
      next: (res: any) => {
        this.localidades = Array.isArray(res) ? res : (res?.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar localidades:', err)
    });
  }

  actualizarListaLocalidades(provinciaId: string): void {
    if (provinciaId) {
      this.localidadesFiltradas = this.localidades.filter(l => {
        const pId = l.provincia?.id ?? l.provinciaId;
        return String(pId) === String(provinciaId);
      });
    } else {
      this.localidadesFiltradas = [];
    }
  }

  onProvinciaChange(): void {
    this.actualizarListaLocalidades(this.form.provinciaId);
    this.form.localidadId = '';
    this.cdr.detectChanges();
  }

  onLocalidadChange(): void {
    this.cdr.detectChanges();
  }

  filtrar(): void {
    const query = this.filtro.trim().toLowerCase();
    if (!query) {
      this.titularesFiltrados = [...this.titulares];
      return;
    }

    this.titularesFiltrados = this.titulares.filter(t =>
      t.nombre?.toLowerCase().includes(query) ||
      t.telefono?.toLowerCase().includes(query) ||
      t.localidad?.nombre?.toLowerCase().includes(query) ||
      t.localidad?.provincia?.nombre?.toLowerCase().includes(query)
    );
  }

  seleccionar(t: any): void {
    this.seleccionado = t;

    const locId = t.localidad?.id ?? t.localidadId ?? '';
    const locEncontrada = this.localidades.find(l => String(l.id) === String(locId));

    const pId = t.localidad?.provincia?.id ?? t.provinciaId ?? locEncontrada?.provincia?.id ?? locEncontrada?.provinciaId ?? '';

    this.actualizarListaLocalidades(pId);

    this.form = {
      provinciaId: pId,
      localidadId: locId,
      nombre: t.nombre || '',
      telefono: t.telefono || ''
    };

    this.cdr.detectChanges();
  }

  cancelarEdicion(): void {
    this.seleccionado = null;
    this.form = {
      provinciaId: '',
      localidadId: '',
      nombre: '',
      telefono: ''
    };
    this.localidadesFiltradas = [];
    this.cdr.detectChanges();
  }

  guardar(): void {
    if (!this.form.provinciaId || !this.form.localidadId || !this.form.nombre.trim() || !this.form.telefono.trim()) {
      alert('La Provincia, la Localidad, el Nombre Completo y el Teléfono son obligatorios.');
      return;
    }

    const payload = {
      nombre: this.form.nombre.trim(),
      telefono: this.form.telefono.trim(),
      localidadId: this.form.localidadId
    };

    if (this.seleccionado) {
      this.titularService.update(this.seleccionado.id, payload).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al actualizar titular:', err);
          alert('Error al actualizar el titular.');
        }
      });
    } else {
      this.titularService.create(payload).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al crear titular:', err);
          alert('Error al crear el titular.');
        }
      });
    }
  }

  eliminar(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este titular?')) {
      this.titularService.delete(id).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al eliminar titular:', err);
          alert('Error al eliminar el titular.');
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