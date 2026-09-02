import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Localidad } from "../models/localiadad.model";
import { LocalidadService } from "../services/localidad.service";

@Component({
  selector: "app-localidad",
  templateUrl: "./localidad.component.html",
  styleUrls: ["./localidad.component.css"],
})
export class LocalidadComponent implements OnInit {
  localidades: Localidad[] = [];

  constructor(
    private localidadService: LocalidadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // MAL: Llamar al método sin .subscribe() no hace NADA
    // this.localidadService.getLocalidades();

    // BIEN: Debe tener el .subscribe() para gatillar la petición
    this.localidadService.getLocalidades().subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        this.localidades = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al traer localidades:', err);
      }
    });
  }
}