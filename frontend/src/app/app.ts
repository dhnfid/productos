import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalidadComponent } from './components/localidad.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LocalidadComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontend';
}