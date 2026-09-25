import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { TitularComponent } from './components/titular.component';
import { VehiculoComponent } from './components/vehiculo.component';
import { TurnoComponent } from './components/turno.component';
import { EsquemaElectricoComponent } from './components/esquema-electrico.component'; // Importación agregada
import { authGuard } from './guards/auth.guard';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [authGuard] },
  { path: 'vehiculo', component: VehiculoComponent, canActivate: [authGuard] },
  { path: 'titular', component: TitularComponent, canActivate: [authGuard] },
  { path: 'turno', component: TurnoComponent, canActivate: [authGuard] },
  { path: 'esquema-electrico', component: EsquemaElectricoComponent, canActivate: [authGuard] }, // Ruta agregada
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];