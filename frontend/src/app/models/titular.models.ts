
import { Localidad } from "./localidad.model";
import { Provincia } from "./provincia.model";

export interface Titular {
  'id': string;
  'nombre': string;
  'telefono': string;
  'localidad': Localidad;
  'provincia': Provincia;
}