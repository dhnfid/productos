import { Modelo } from "./modelo.model";
import { Titular } from "./titular.models";

export interface Vehiculo {
  'id': string;
  'patente': string;
  'modelo': Modelo;
  'titular': Titular;
}