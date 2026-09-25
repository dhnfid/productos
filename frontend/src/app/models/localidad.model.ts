import { Provincia } from "./provincia.model";

export interface Localidad {
  'id': string;
  'nombre': string;
  "provincia": Provincia;
}