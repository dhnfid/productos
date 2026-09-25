import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email: string = '';
  pass: string = '';
  errorMensaje: string = '';
  cargando: boolean = false;

  constructor(
    private readonly authService: AuthService, 
    private readonly router: Router
  ) {}

  onSubmit(form: NgForm): void {
  if (this.cargando || form.invalid) {
    return;
  }

  this.cargando = true;
  this.errorMensaje = '';

  // Capturamos los valores exactos antes de disparar
  const datosLogin = {
    email: String(this.email).trim(),
    pass: String(this.pass).trim()
  };

  this.authService.login(datosLogin).subscribe({
    next: (res) => {
      console.log('Login exitoso:', res);
      this.router.navigate(['/menu']);
    },
    error: (err) => {
      this.cargando = false;
      this.errorMensaje = 'Credenciales inválidas o error en el servidor.';
      console.error('Error en login:', err);
    }
  });
}}