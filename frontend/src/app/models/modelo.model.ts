import { Marca } from "./marca.model";

export interface Modelo {
  'id': string;
  'nombre': string;
  'marca': Marca;
}