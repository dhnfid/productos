import { Localidad } from "../../localidad/entity/localidad.entity";
import { Vehiculo } from "../../vehiculo/entity/vehiculo.entity";
export declare class Titular {
    'id': string;
    'nombre': string;
    'telefono': string;
    'localidad': Localidad;
    'vehiculos': Vehiculo[];
}
