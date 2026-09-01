import { Vehiculo } from "../../vehiculo/entity/vehiculo.entity";
import { Titular } from "../../titular/entity/titular.entity";
export declare class Turno {
    'id': string;
    'fecha': Date;
    'km': number;
    'vehiculos': Vehiculo;
    'titular': Titular;
    'descripcion': string;
    'precio': number;
}
