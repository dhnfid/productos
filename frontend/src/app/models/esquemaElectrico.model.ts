import { Modelo } from "./modelo.model";


export interface EsquemaElectrico {
  'id': string;
  'urlArchivo': string;
  'fallasHabituales'?: string;
  'modelo': Modelo;
}