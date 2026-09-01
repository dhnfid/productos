import { Turno } from "../../turno/entity/turno.entity";
import { Titular } from "../../titular/entity/titular.entity";
import { Modelo } from "../../modelo/entity/modelo.entity";
export declare class Vehiculo {
    'id': string;
    'patente': string;
    'turno': Turno[];
    'modelo': Modelo;
    'titular': Titular;
}
