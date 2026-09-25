import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitularComponent } from './components/titular.component';
import { TurnoComponent } from './components/turno.component';
import { VehiculoComponent } from './components/vehiculo.component';
import { RouterOutlet } from '@angular/router';
import { EsquemaElectricoComponent } from './components/esquema-electrico.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TitularComponent, VehiculoComponent, TurnoComponent,EsquemaElectricoComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontend';
}