import { Titular } from "./titular.models";
import { Vehiculo } from "./vehiculo.model";

export interface Turno {
  'id': string;
  'fecha': Date;
  'km': number;
  'descripcion': string;
  'precio': number;
  'vehiculos': Vehiculo;
  'titular': Titular;
}