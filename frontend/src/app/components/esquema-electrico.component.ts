import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EsquemaElectricoService } from '../services/esquema-electrico.service';

@Component({
  selector: 'app-esquema-electrico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./esquema-electrico.component.css'],
  template: `
    <div class="container">
      <button (click)="volver()">← Volver al Menú</button>
      <h2>Gestión de Esquemas Electrónicos</h2>

      <!-- BUSCADOR REACTIVO -->
      <input 
        type="text" 
        placeholder="Buscar por Marca, Modelo o Fallas..." 
        [(ngModel)]="filtro" 
        (input)="filtrar()" 
        class="search-bar"
      />

      <!-- FORMULARIO CREAR / EDITAR -->
      <div class="form-card">
        <h3>{{ seleccionado ? 'Editar Esquema Electrónico' : 'Nuevo Esquema Electrónico' }}</h3>
        
        <!-- SELECTOR MARCA -->
        <select [(ngModel)]="form.marcaId" (change)="onMarcaChange()">
          <option [ngValue]="''">-- Seleccionar Marca --</option>
          @for (m of marcas; track m.id) {
            <option [ngValue]="m.id">{{ m.nombre }}</option>
          }
        </select>

        <!-- SELECTOR MODELO -->
        <select [(ngModel)]="form.modeloId" (change)="onModeloChange()" [disabled]="!form.marcaId">
          <option [ngValue]="''">-- Seleccionar Modelo --</option>
          @for (mod of modelosFiltrados; track mod.id) {
            <option [ngValue]="mod.id">{{ mod.nombre }}</option>
          }
        </select>

        <!-- SELECCIÓN DE ARCHIVOS PDF LOCALES (MÚLTIPLE) -->
        <input 
          type="file" 
          accept="application/pdf" 
          multiple
          (change)="onFilesSelected($event)" 
        />
        <small *ngIf="archivosSeleccionados.length > 0" style="display:block; margin-top: 5px; color: #555;">
          {{ archivosSeleccionados.length }} archivo(s) seleccionado(s)
        </small>

        <!-- FALLAS HABITUALES DEL ESQUEMA -->
        <div class="full-width">
          <textarea 
            [(ngModel)]="form.fallasHabituales" 
            placeholder="Fallas habituales de este esquema (Opcional)..." 
            rows="3"
            class="textarea-fallas"
          ></textarea>
        </div>

        <button (click)="guardar()">{{ seleccionado ? 'Actualizar' : 'Crear' }}</button>
        <button *ngIf="seleccionado" (click)="cancelarEdicion()">Cancelar</button>
      </div>

      <!-- TABLA DE ESQUEMAS ELECTRÓNICOS -->
      <table>
        <thead>
          <tr>
            <th class="col-sel">Sel.</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Fallas Habituales</th>
            <th>Esquemas Eléctricos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (e of esquemasFiltrados; track e.id) {
            <tr [class.selected]="seleccionado?.id === e.id">
              <td class="col-sel">
                <input type="radio" name="sel" [checked]="seleccionado?.id === e.id" (change)="seleccionar(e)" />
              </td>
              <td>{{ e.modelo?.marca?.nombre || 'Marca no especificada' }}</td>
              <td>{{ e.modelo?.nombre || 'Modelo no especificado' }}</td>
              <td>{{ e.fallasHabituales || 'Sin registrar' }}</td>
              <td>
                <ng-container *ngIf="obtenerListaPdfs(e.urlArchivo).length > 0; else sinEnlace">
                  <div *ngFor="let pdfUrl of obtenerListaPdfs(e.urlArchivo)" style="margin-bottom: 4px;">
                    <a [href]="obtenerUrlPdf(pdfUrl)" target="_blank" class="pdf-link">
                      📄 {{ obtenerNombrePdf(pdfUrl) }}
                    </a>
                  </div>
                </ng-container>
                <ng-template #sinEnlace>
                  <span>Sin enlace</span>
                </ng-template>
              </td>
              <td>
                <button (click)="eliminar(e.id)" class="btn-danger">Eliminar</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="6" style="text-align: center; padding: 15px;">No se encontraron esquemas electrónicos.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class EsquemaElectricoComponent implements OnInit {
  esquemas: any[] = [];
  esquemasFiltrados: any[] = [];
  marcas: any[] = [];
  modelos: any[] = [];
  modelosFiltrados: any[] = [];

  filtro: string = '';
  seleccionado: any = null;
  archivosSeleccionados: File[] = [];

  form = {
    marcaId: '',
    modeloId: '',
    fallasHabituales: ''
  };

  constructor(
    private readonly esquemaService: EsquemaElectricoService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.esquemaService.getEsquemas().subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : (res?.data || []);
        this.esquemas = [...lista];
        this.esquemasFiltrados = [...lista];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar esquemas:', err)
    });

    this.esquemaService.getMarcas().subscribe({
      next: (res: any) => {
        this.marcas = Array.isArray(res) ? res : (res?.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar marcas:', err)
    });

    this.esquemaService.getModelos().subscribe({
      next: (res: any) => {
        this.modelos = Array.isArray(res) ? res : (res?.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar modelos:', err)
    });
  }

  actualizarListaModelos(marcaId: string): void {
    if (marcaId) {
      this.modelosFiltrados = this.modelos.filter(m => {
        const mMarcaId = m.marca?.id ?? m.marcaId;
        return String(mMarcaId) === String(marcaId);
      });
    } else {
      this.modelosFiltrados = [];
    }
  }

  onMarcaChange(): void {
    this.actualizarListaModelos(this.form.marcaId);
    this.form.modeloId = '';
    this.form.fallasHabituales = '';
    this.cdr.detectChanges();
  }

  onModeloChange(): void {
    // Si no está editando un esquema preexistente, resetea el texto de fallas
    if (!this.seleccionado) {
      this.form.fallasHabituales = '';
    }
    this.cdr.detectChanges();
  }

  onFilesSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const archivos = Array.from(event.target.files) as File[];
      const todosSonPdf = archivos.every(f => f.type === 'application/pdf');

      if (todosSonPdf) {
        this.archivosSeleccionados = archivos;
      } else {
        alert('Por favor, selecciona únicamente archivos en formato PDF.');
        event.target.value = '';
        this.archivosSeleccionados = [];
      }
    }
  }

  filtrar(): void {
    const query = this.filtro.trim().toLowerCase();
    if (!query) {
      this.esquemasFiltrados = [...this.esquemas];
      return;
    }

    this.esquemasFiltrados = this.esquemas.filter(e =>
      e.modelo?.nombre?.toLowerCase().includes(query) ||
      e.modelo?.marca?.nombre?.toLowerCase().includes(query) ||
      e.fallasHabituales?.toLowerCase().includes(query)
    );
  }

  seleccionar(e: any): void {
    this.seleccionado = e;

    const modId = e.modelo?.id ?? e.modeloId ?? '';
    const modEncontrado = this.modelos.find(m => String(m.id) === String(modId));
    const mId = e.modelo?.marca?.id ?? e.marcaId ?? modEncontrado?.marca?.id ?? modEncontrado?.marcaId ?? '';

    this.actualizarListaModelos(mId);

    this.form = {
      marcaId: mId,
      modeloId: modId,
      fallasHabituales: e.fallasHabituales || ''
    };

    this.archivosSeleccionados = [];
    this.cdr.detectChanges();
  }

  cancelarEdicion(): void {
    this.seleccionado = null;
    this.archivosSeleccionados = [];
    this.form = {
      marcaId: '',
      modeloId: '',
      fallasHabituales: ''
    };
    this.modelosFiltrados = [];
    this.cdr.detectChanges();
  }

  guardar(): void {
    if (!this.form.marcaId || !this.form.modeloId) {
      alert('La Marca y el Modelo son obligatorios.');
      return;
    }

    if (!this.seleccionado && this.archivosSeleccionados.length === 0) {
      alert('Debes seleccionar al menos un archivo PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('modeloId', this.form.modeloId);
    formData.append('fallasHabituales', this.form.fallasHabituales || '');

    for (let i = 0; i < this.archivosSeleccionados.length; i++) {
      formData.append('files', this.archivosSeleccionados[i]);
    }

    if (this.seleccionado) {
      this.esquemaService.update(this.seleccionado.id, formData).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al actualizar esquema:', err);
          alert('Error al actualizar el esquema electrónico.');
        }
      });
    } else {
      this.esquemaService.create(formData).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al crear esquema:', err);
          alert('Error al crear el esquema electrónico.');
        }
      });
    }
  }

  obtenerListaPdfs(urlArchivoData: any): string[] {
    if (!urlArchivoData) return [];
    if (Array.isArray(urlArchivoData)) return urlArchivoData;
    if (typeof urlArchivoData === 'string') return [urlArchivoData];
    return [];
  }

  obtenerUrlPdf(path: string): string {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    return `http://158.69.204.80/${path.replace(/^[\/\\]+/, '')}`;
  }

  obtenerNombrePdf(path: string): string {
    if (!path) return 'Archivo PDF';
    const partes = path.split(/[\/\\]/);
    return partes[partes.length - 1] || 'Archivo PDF';
  }

  eliminar(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este esquema electrónico?')) {
      this.esquemaService.delete(id).subscribe({
        next: () => this.reset(),
        error: (err) => {
          console.error('Error al eliminar esquema:', err);
          alert('Error al eliminar el esquema electrónico.');
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